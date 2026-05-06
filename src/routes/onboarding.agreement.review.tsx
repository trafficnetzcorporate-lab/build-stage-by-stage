import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { getAgreementReviewFn } from "@/integrations/onboarding/onboarding.functions";
import { AgreementBody, AGREEMENT_NUMBER } from "@/content/agreements/v1";
import { ChevronLeft, Download, FileText } from "lucide-react";

const CLIENT_SLUG = "nancy-clarke";

export const Route = createFileRoute("/onboarding/agreement/review")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Agreement Review · Admin" },
    ],
  }),
  loader: async () => {
    const agreement = await getAgreementReviewFn({ data: { clientSlug: CLIENT_SLUG } });
    return { agreement };
  },
  errorComponent: ({ error }) => (
    <Container className="py-20 text-center text-destructive">{error.message}</Container>
  ),
  component: AgreementReviewPage,
});

function AgreementReviewPage() {
  const { agreement } = Route.useLoaderData();

  if (!agreement) {
    return (
      <Container className="max-w-3xl py-20 text-center">
        <h1 className="font-display text-display-3 text-navy">No signed agreement</h1>
        <p className="mt-3 text-muted-foreground">
          The client hasn't signed the agreement yet.
        </p>
        <Link
          to="/onboarding"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-navy underline"
        >
          <ChevronLeft className="h-4 w-4" /> Back to onboarding
        </Link>
      </Container>
    );
  }

  const signedAt = new Date(agreement.signedAt);

  return (
    <Container className="max-w-4xl py-12 md:py-16">
      <Link
        to="/onboarding"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy"
      >
        <ChevronLeft className="h-4 w-4" /> Back to onboarding
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Admin Review
        </p>
        <h1 className="mt-2 font-display text-display-3 text-navy md:text-display-2">
          Signed Agreement
        </h1>
      </div>

      <div className="mb-8 rounded-3xl border border-border bg-white p-6 md:p-8">
        <h2 className="font-display text-xl text-navy">Signing details</h2>
        <dl className="mt-4 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
          <Detail label="Agreement #" value={AGREEMENT_NUMBER} />
          <Detail label="Version" value={agreement.agreementVersion} />
          <Detail label="Client" value={agreement.clientName} />
          <Detail label="Client email" value={agreement.clientEmail ?? "—"} />
          <Detail
            label="Signed at"
            value={signedAt.toLocaleString("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          />
          <Detail label="Status" value={agreement.status ?? "signed"} />
          <Detail label="IP address" value={agreement.ipAddress ?? "—"} />
          <Detail
            label="User agent"
            value={agreement.userAgent ?? "—"}
            className="md:col-span-2"
          />
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {agreement.pdfDownloadUrl ? (
            <a
              href={agreement.pdfDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy-deep"
            >
              <Download className="h-4 w-4" /> Download signed PDF
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" /> PDF not available
            </span>
          )}
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-border bg-white p-6 md:p-8">
        <h2 className="font-display text-xl text-navy">Signature</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Captured on {signedAt.toLocaleDateString()}
        </p>
        <div className="mt-4 rounded-xl border border-border bg-cream/40 p-4">
          <img
            src={agreement.signatureDataUrl}
            alt="Client signature"
            className="max-h-48 w-auto"
          />
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-white p-6 md:p-10">
        <h2 className="font-display text-xl text-navy">Agreement contents</h2>
        <div className="mt-6">
          <AgreementBody />
        </div>
      </div>
    </Container>
  );
}

function Detail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-navy">{value}</dd>
    </div>
  );
}
