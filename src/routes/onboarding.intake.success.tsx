import { createFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/onboarding/intake/success")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Intake submitted · Nancy Clarke" },
    ],
  }),
  component: IntakeSuccess,
});

function IntakeSuccess() {
  return (
    <Container className="max-w-2xl py-20 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
      <h1 className="mt-6 font-display text-display-3 text-navy">Intake submitted</h1>
      <p className="mt-3 text-base text-muted-foreground">
        Thank you, Nancy. Your responses have been received and we'll be in touch shortly to schedule
        next steps.
      </p>
      <div className="mt-10">
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
