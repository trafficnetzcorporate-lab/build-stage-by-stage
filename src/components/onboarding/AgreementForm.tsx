import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { pdf } from "@react-pdf/renderer";
import { AgreementBody, AGREEMENT_VERSION, AGREEMENT_NUMBER } from "@/content/agreements/v1";
import { AgreementPDF } from "@/content/agreements/v1-pdf";
import { SignaturePad, type SignaturePadHandle } from "./SignaturePad";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Eraser, Undo2 } from "lucide-react";
import { submitAgreementFn } from "@/integrations/onboarding/onboarding.functions";

interface AgreementFormProps {
  clientSlug: string;
  clientName: string;
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function AgreementForm({ clientSlug, clientName }: AgreementFormProps) {
  const navigate = useNavigate();
  const sigRef = React.useRef<SignaturePadHandle>(null);
  const [acknowledged, setAcknowledged] = React.useState(false);
  const [hasSignature, setHasSignature] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const submit = useServerFn(submitAgreementFn);

  const handleSubmit = async () => {
    setError(null);
    const dataUrl = sigRef.current?.getDataUrl();
    if (!dataUrl) {
      setError("Please sign in the box below before submitting.");
      return;
    }
    if (!acknowledged) {
      setError("Please acknowledge that you have read the agreement.");
      return;
    }

    setSubmitting(true);
    try {
      const signedAtIso = new Date().toISOString();
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;

      // 1. Generate PDF in browser
      const pdfBlob = await pdf(
        <AgreementPDF
          clientName={clientName}
          signatureDataUrl={dataUrl}
          signedAtIso={signedAtIso}
          agreementNumber={AGREEMENT_NUMBER}
          ipAddress={null /* server captures real IP */}
          userAgent={userAgent}
        />,
      ).toBlob();
      const pdfBase64 = await blobToBase64(pdfBlob);

      // 2. Submit to server (atomic: row → upload → email)
      const result = await submit({
        data: {
          clientSlug,
          signatureDataUrl: dataUrl,
          pdfBase64,
          agreementVersion: AGREEMENT_VERSION,
        },
      });

      // 3. Trigger browser download from the captured blob (no storage round-trip)
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `JMS-Service-Agreement-${clientName.replace(/\s+/g, "-")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // 4. Redirect to success
      void navigate({ to: "/onboarding/agreement/success" });
      void result;
    } catch (err) {
      console.error("[AgreementForm] submit failed:", err);
      setError(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Agreement text */}
      <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
        <AgreementBody />
      </div>

      {/* Acknowledge + sign */}
      <div className="space-y-4 rounded-3xl border border-navy/20 bg-cream-deep p-6 md:p-8">
        <h3 className="font-display text-xl text-navy">Sign to accept</h3>

        <label className="flex items-start gap-3 text-sm text-navy">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-navy"
          />
          <span>
            I, <strong>{clientName}</strong>, have read this agreement in full and agree to all terms.
          </span>
        </label>

        <div>
          <p className="mb-2 text-sm font-medium text-navy">Draw your signature</p>
          <SignaturePad ref={sigRef} onChange={(empty) => setHasSignature(!empty)} />
          <div className="mt-2 flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                sigRef.current?.undo();
                setHasSignature(!sigRef.current?.isEmpty());
              }}
              disabled={submitting}
            >
              <Undo2 className="h-3.5 w-3.5" /> Undo
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                sigRef.current?.clear();
                setHasSignature(false);
              }}
              disabled={submitting}
            >
              <Eraser className="h-3.5 w-3.5" /> Clear
            </Button>
          </div>
        </div>

        {error ? (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={submitting || !acknowledged || !hasSignature}
          className="w-full bg-navy hover:bg-navy-deep md:w-auto"
          size="lg"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            "Sign agreement"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Your signature has the same legal effect as a handwritten signature under the E-SIGN Act.
          A signed PDF will be emailed to both parties and downloaded to your device.
        </p>
      </div>
    </div>
  );
}
