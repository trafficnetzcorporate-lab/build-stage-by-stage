import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { AgreementForm } from "@/components/onboarding/AgreementForm";
import { getAgreementStatusFn } from "@/integrations/onboarding/onboarding.functions";
import { CLIENTS } from "@/integrations/onboarding/types";
import { ChevronLeft, CheckCircle2 } from "lucide-react";

const CLIENT_SLUG = "nancy-clarke";

export const Route = createFileRoute("/onboarding/agreement")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Service Agreement · Nancy Clarke" },
    ],
  }),
  loader: async () => {
    const status = await getAgreementStatusFn({ data: { clientSlug: CLIENT_SLUG } });
    return { status };
  },
  errorComponent: ({ error }) => (
    <Container className="py-20 text-center text-destructive">{error.message}</Container>
  ),
  component: AgreementPage,
});

function AgreementPage() {
  const { status } = Route.useLoaderData();
  const client = CLIENTS[CLIENT_SLUG];

  return (
    <Container className="max-w-4xl py-12 md:py-16">
      <Link
        to="/onboarding"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy"
      >
        <ChevronLeft className="h-4 w-4" /> Back to onboarding
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Step 1 of 2</p>
        <h1 className="mt-2 font-display text-display-3 text-navy md:text-display-2">
          Service Agreement
        </h1>
      </div>

      {status.signed ? (
        <div className="rounded-3xl border border-success/30 bg-success/5 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h2 className="mt-4 font-display text-2xl text-navy">Already signed</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You signed this agreement on{" "}
            {status.signedAt ? new Date(status.signedAt).toLocaleDateString() : "an earlier date"}.
          </p>
          <Link
            to="/onboarding/intake"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream hover:bg-navy-deep"
          >
            Continue to intake →
          </Link>
        </div>
      ) : (
        <AgreementForm clientSlug={CLIENT_SLUG} clientName={client.name} />
      )}
    </Container>
  );
}
