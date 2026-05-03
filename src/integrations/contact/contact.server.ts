/**
 * Server-only helper for the public /contact form.
 * Resend wiring mirrors intake.server.ts.
 */
import { EMAIL_FROM } from "@/integrations/email/config";
import { escapeHtml } from "@/lib/email-utils";
import type { ContactInput } from "./contact-schema";

export async function submitContactForm(input: ContactInput): Promise<{ ok: true }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFY_EMAIL_J = process.env.NOTIFY_EMAIL_J;

  if (!RESEND_API_KEY || !NOTIFY_EMAIL_J) {
    console.error("[submitContactForm] secrets missing; skipping send");
    return { ok: true };
  }

  const fullName = `${input.firstName} ${input.lastName}`.trim();
  const subject = `New contact: ${fullName} (${input.audience})${
    input.community ? ` — ${input.community}` : ""
  }`;

  const rows: Array<[string, string]> = [
    ["Audience", input.audience === "realtor" ? "Realtor" : "Buyer"],
    ["Name", fullName],
    ["Email", input.email],
    ["Phone", input.phone],
  ];

  if (input.audience === "realtor") {
    rows.push(["Brokerage", input.brokerage]);
    rows.push(["Buyer's preferred area", input.buyerArea]);
    rows.push(["Buyer timeline", input.buyerTimeline]);
  } else {
    rows.push(["Preferred community", input.preferredCommunity]);
    rows.push(["Budget range", input.budget]);
    rows.push(["Move-in timeline", input.moveInTimeline]);
  }

  if (input.community) rows.push(["Inquiring about community", input.community]);
  if (input.property) rows.push(["Inquiring about property", input.property]);
  if (input.message) rows.push(["Message", input.message]);

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0; vertical-align:top; color:#5b6373; font-size:12px; text-transform:uppercase; letter-spacing:0.04em;">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0; font-size:14px; color:#0F2547;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const html = `
    <div style="font-family: Helvetica, Arial, sans-serif; color:#0F2547; max-width:640px;">
      <h2 style="font-size:18px; margin:0 0 16px;">New contact form submission</h2>
      <p style="font-size:13px; color:#5b6373;">From nancyclarkerealtor.com</p>
      <table style="border-collapse:collapse; margin-top:16px;">${tableRows}</table>
      <p style="font-size:11px; color:#5b6373; margin-top:24px;">
        Submitted ${new Date().toLocaleString("en-US")}
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
      reply_to: input.email,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[submitContactForm] Resend error:", res.status, text);
    throw new Error("Could not send your message. Please call Nancy directly.");
  }

  return { ok: true };
}
