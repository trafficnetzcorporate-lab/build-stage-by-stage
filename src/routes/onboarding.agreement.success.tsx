import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/onboarding/agreement/success")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Agreement signed · Nancy Clarke" },
    ],
  }),
  component: AgreementSuccess,
});

function AgreementSuccess() {
  return (
    <Container className="max-w-2xl py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
      <h1 className="mt-6 font-display text-display-3 text-navy">Agreement signed</h1>
      <p className="mt-3 text-base text-muted-foreground">
        A signed PDF has been downloaded to your device, and a copy has been emailed to both parties.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          to="/onboarding/intake"
          className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm font-medium text-cream hover:bg-navy-deep"
        >
          Continue to intake form →
        </Link>
        <Link
          to="/onboarding"
          className="inline-flex items-center justify-center rounded-full border border-navy px-6 py-3 text-sm font-medium text-navy hover:bg-cream-deep"
        >
          Back to onboarding
        </Link>
      </div>
    </Container>
  );
}
