/**
 * Server-only helpers for intake form auto-save and submission.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { EMAIL_FROM } from "@/integrations/email/config";
import { escapeHtml } from "@/lib/email-utils";
import { getClient } from "./types";

export interface SaveIntakeDraftInput {
  clientSlug: string;
  formData: Record<string, unknown>;
  currentSectionIndex: number;
}

export async function saveIntakeDraft(input: SaveIntakeDraftInput) {
  const client = getClient(input.clientSlug);
  if (!client) throw new Error(`Unknown client slug: ${input.clientSlug}`);

  // Upsert by composite (client_slug, status='draft')
  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .upsert(
      [
        {
          client_slug: client.slug,
          client_name: client.name,
          client_email: client.email ?? null,
          form_data: input.formData as never,
          current_section_index: input.currentSectionIndex,
          status: "draft",
          is_complete: false,
        },
      ],
      { onConflict: "client_slug,status" },
    )
    .select("id, updated_at")
    .single();

  if (error) throw new Error(`Failed to save draft: ${error.message}`);
  return { id: data.id, updatedAt: data.updated_at };
}

export async function getIntakeDraft(clientSlug: string) {
  // Prefer submitted, fall back to draft
  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .select("id, form_data, current_section_index, status, is_complete, updated_at, submitted_at")
    .eq("client_slug", clientSlug)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getIntakeDraft] error:", error.message);
    return null;
  }
  return data;
}

export interface SubmitIntakeInput {
  clientSlug: string;
  formData: Record<string, unknown>;
}

export async function submitIntake(input: SubmitIntakeInput) {
  const client = getClient(input.clientSlug);
  if (!client) throw new Error(`Unknown client slug: ${input.clientSlug}`);

  // 1. Mark the draft submitted (upsert into submitted slot)
  const now = new Date().toISOString();

  // First, delete any prior submitted row to keep composite unique happy if re-submit happens
  await supabaseAdmin
    .from("intake_submissions")
    .delete()
    .eq("client_slug", client.slug)
    .eq("status", "submitted");

  const { data, error } = await supabaseAdmin
    .from("intake_submissions")
    .upsert(
      [
        {
          client_slug: client.slug,
          client_name: client.name,
          client_email: client.email ?? null,
          form_data: input.formData as never,
          current_section_index: 0,
          status: "submitted",
          is_complete: true,
          submitted_at: now,
        },
      ],
      { onConflict: "client_slug,status" },
    )
    .select("id, submitted_at")
    .single();

  if (error) throw new Error(`Failed to submit intake: ${error.message}`);

  // 2. Drop any draft row now that submitted exists
  await supabaseAdmin
    .from("intake_submissions")
    .delete()
    .eq("client_slug", client.slug)
    .eq("status", "draft");

  // 3. Send notification email (best-effort)
  await sendIntakeNotification({
    clientName: client.name,
    submittedAt: data.submitted_at!,
    formData: input.formData,
  });

  return { id: data.id, submittedAt: data.submitted_at };
}

interface SendIntakeNotificationInput {
  clientName: string;
  submittedAt: string;
  formData: Record<string, unknown>;
}

async function sendIntakeNotification(input: SendIntakeNotificationInput): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL_J = process.env.NOTIFY_EMAIL_J;

  if (!RESEND_API_KEY || !NOTIFY_EMAIL_J) {
    console.error("[sendIntakeNotification] secrets missing; skipping");
    return;
  }

  const summary = Object.entries(input.formData)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .slice(0, 25)
    .map(
      ([k, v]) =>
        `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(
          typeof v === "string" ? v : JSON.stringify(v),
        ).slice(0, 300)}</li>`,
    )
    .join("");

  const html = `
    <div style="font-family: Helvetica, Arial, sans-serif; color:#0F2547; max-width:640px;">
      <h2 style="font-size:18px; margin:0 0 16px;">Onboarding Intake Submitted</h2>
      <p><strong>${escapeHtml(input.clientName)}</strong> has submitted the onboarding intake form.</p>
      <p style="font-size:13px; color:#5b6373;">Submitted ${new Date(
        input.submittedAt,
      ).toLocaleString("en-US")}</p>
      <h3 style="font-size:14px; margin-top:24px;">Summary</h3>
      <ul style="line-height:1.6; font-size:13px;">${summary}</ul>
      <p style="font-size:12px; color:#5b6373; margin-top:24px;">
        Full submission stored in the onboarding database.
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: [NOTIFY_EMAIL_J],
      subject: `Intake Submitted — ${input.clientName}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[sendIntakeNotification] Resend error:", res.status, text);
  }
}
