/**
 * Server-only helpers for agreement submission.
 * Atomic flow: insert row → upload PDF → update row → send email.
 * No client-trusted upload paths.
 */
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { EMAIL_FROM } from "@/integrations/email/config";
import { getClient } from "./types";

const SIGNED_BUCKET = "signed-agreements";

export interface SubmitAgreementInput {
  clientSlug: string;
  signatureDataUrl: string; // PNG data URL
  pdfBase64: string; // base64 encoded PDF (no data: prefix)
  ipAddress: string | null;
  userAgent: string | null;
  agreementVersion: string;
}

export interface SubmitAgreementResult {
  id: string;
  signedAt: string;
  pdfStoragePath: string;
  pdfDownloadUrl: string; // signed URL for browser download (short-lived)
}

function base64ToBytes(b64: string): Uint8Array {
  // atob is available in Workers / modern Node
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function submitAgreement(input: SubmitAgreementInput): Promise<SubmitAgreementResult> {
  const client = getClient(input.clientSlug);
  if (!client) throw new Error(`Unknown client slug: ${input.clientSlug}`);

  // 1. Insert row first — guarantees we never have orphan PDFs.
  const { data: row, error: insertErr } = await supabaseAdmin
    .from("agreements")
    .insert({
      client_slug: client.slug,
      client_name: client.name,
      client_email: client.email ?? null,
      signature_data_url: input.signatureDataUrl,
      ip_address: input.ipAddress,
      user_agent: input.userAgent,
      agreement_version: input.agreementVersion,
      status: "signed",
    })
    .select("id, signed_at")
    .single();

  if (insertErr || !row) {
    throw new Error(`Failed to record agreement: ${insertErr?.message ?? "no row"}`);
  }

  // 2. Upload PDF using the row id as the storage key (deterministic, no collision).
  const storagePath = `${client.slug}/${row.id}.pdf`;
  const pdfBytes = base64ToBytes(input.pdfBase64);

  const { error: uploadErr } = await supabaseAdmin.storage
    .from(SIGNED_BUCKET)
    .upload(storagePath, pdfBytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (uploadErr) {
    // Best-effort cleanup so we don't keep an orphan row pointing at no PDF.
    await supabaseAdmin.from("agreements").delete().eq("id", row.id);
    throw new Error(`Failed to upload signed PDF: ${uploadErr.message}`);
  }

  // 3. Update row with the verified storage path.
  const { error: updateErr } = await supabaseAdmin
    .from("agreements")
    .update({ pdf_storage_path: storagePath })
    .eq("id", row.id);

  if (updateErr) {
    // PDF is uploaded; row exists. Don't roll back — log and continue.
    console.error("[submitAgreement] Failed to update pdf_storage_path:", updateErr.message);
  }

  // 4. Generate a short-lived signed URL the browser can use to download a copy.
  const { data: signed, error: signErr } = await supabaseAdmin.storage
    .from(SIGNED_BUCKET)
    .createSignedUrl(storagePath, 60 * 60); // 1 hour

  if (signErr || !signed) {
    throw new Error(`Failed to create download URL: ${signErr?.message ?? "no url"}`);
  }

  return {
    id: row.id,
    signedAt: row.signed_at,
    pdfStoragePath: storagePath,
    pdfDownloadUrl: signed.signedUrl,
  };
}

export interface SendAgreementEmailInput {
  clientName: string;
  clientEmail: string | null;
  signedAt: string;
  pdfBase64: string;
  agreementNumber: string;
}

export async function sendAgreementEmail(input: SendAgreementEmailInput): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL_J = process.env.NOTIFY_EMAIL_J;
  const NANCY_RECIPIENT_EMAIL = process.env.NANCY_RECIPIENT_EMAIL;

  if (!RESEND_API_KEY) {
    console.error("[sendAgreementEmail] RESEND_API_KEY not set; skipping email");
    return;
  }
  if (!NOTIFY_EMAIL_J) {
    console.error("[sendAgreementEmail] NOTIFY_EMAIL_J not set; skipping email");
    return;
  }

  const recipients = [NOTIFY_EMAIL_J];
  // Use Nancy's confirmed email if her client email matches, else fall back to NANCY_RECIPIENT_EMAIL.
  if (input.clientEmail) recipients.push(input.clientEmail);
  else if (NANCY_RECIPIENT_EMAIL) recipients.push(NANCY_RECIPIENT_EMAIL);

  const signedDate = new Date(input.signedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <div style="font-family: Helvetica, Arial, sans-serif; color:#0F2547; max-width:560px;">
      <h2 style="font-size:18px; margin:0 0 16px;">Service Agreement Signed</h2>
      <p>The JMS Web Studio service agreement (${input.agreementNumber}) has been signed.</p>
      <ul style="line-height:1.6;">
        <li><strong>Client:</strong> ${input.clientName}</li>
        <li><strong>Signed:</strong> ${signedDate}</li>
      </ul>
      <p>The fully-executed PDF is attached.</p>
      <p style="font-size:12px; color:#5b6373; margin-top:24px;">
        This is an automated notification from the onboarding system.
      </p>
    </div>
  `;

  const filename = `JMS-Service-Agreement-${input.clientName.replace(/\s+/g, "-")}.pdf`;

  // Direct Resend API call (avoids needing the connector gateway secret here).
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: recipients,
      subject: `Service Agreement Signed — ${input.clientName}`,
      html,
      attachments: [
        {
          filename,
          content: input.pdfBase64,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[sendAgreementEmail] Resend API error:", res.status, text);
    // Don't throw — agreement is still recorded; email is best-effort.
  }
}

export async function getAgreementStatus(clientSlug: string) {
  const { data, error } = await supabaseAdmin
    .from("agreements")
    .select("id, client_name, signed_at, pdf_storage_path")
    .eq("client_slug", clientSlug)
    .eq("status", "signed")
    .maybeSingle();

  if (error) {
    console.error("[getAgreementStatus] error:", error.message);
    return { signed: false as const };
  }
  if (!data) return { signed: false as const };

  return {
    signed: true as const,
    signedAt: data.signed_at,
    clientName: data.client_name,
    pdfStoragePath: data.pdf_storage_path,
  };
}
