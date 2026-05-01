/**
 * Server functions for onboarding flow.
 * Safe to import from client components — handlers stripped at build time.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRequestHeader } from "@tanstack/react-start/server";
import {
  submitAgreement,
  sendAgreementEmail,
  getAgreementStatus,
} from "./agreement.server";
import { saveIntakeDraft, getIntakeDraft, submitIntake } from "./intake.server";

// ===== Agreement =====

const SubmitAgreementSchema = z.object({
  clientSlug: z.string().min(1).max(64),
  signatureDataUrl: z
    .string()
    .startsWith("data:image/")
    .max(2_000_000),
  pdfBase64: z.string().min(1).max(8_000_000), // ~6MB raw PDF max
  agreementVersion: z.string().min(1).max(16),
});

export const submitAgreementFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SubmitAgreementSchema.parse(input))
  .handler(async ({ data }) => {
    const ipAddress =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;
    const userAgent = getRequestHeader("user-agent") ?? null;

    const result = await submitAgreement({
      clientSlug: data.clientSlug,
      signatureDataUrl: data.signatureDataUrl,
      pdfBase64: data.pdfBase64,
      ipAddress,
      userAgent,
      agreementVersion: data.agreementVersion,
    });

    // Best-effort email; don't block client on failure.
    await sendAgreementEmail({
      clientName: "Nancy Clarke",
      clientEmail: null,
      signedAt: result.signedAt,
      pdfBase64: data.pdfBase64,
      agreementNumber: "JMS-NC-2026-001",
    }).catch((err) => console.error("[submitAgreementFn] email failed:", err));

    return result;
  });

const ClientSlugSchema = z.object({ clientSlug: z.string().min(1).max(64) });

export const getAgreementStatusFn = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => ClientSlugSchema.parse(input))
  .handler(async ({ data }) => {
    return getAgreementStatus(data.clientSlug);
  });

// ===== Intake =====

const SaveIntakeSchema = z.object({
  clientSlug: z.string().min(1).max(64),
  formData: z.record(z.string(), z.unknown()),
  currentSectionIndex: z.number().int().min(0).max(50),
});

export const saveIntakeDraftFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SaveIntakeSchema.parse(input))
  .handler(async ({ data }) => {
    return saveIntakeDraft(data);
  });

export const getIntakeDraftFn = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => ClientSlugSchema.parse(input))
  .handler(async ({ data }) => {
    return getIntakeDraft(data.clientSlug);
  });

const SubmitIntakeSchema = z.object({
  clientSlug: z.string().min(1).max(64),
  formData: z.record(z.string(), z.unknown()),
});

export const submitIntakeFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SubmitIntakeSchema.parse(input))
  .handler(async ({ data }) => {
    return submitIntake(data);
  });
