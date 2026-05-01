import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import * as React from "react";
import {
  getAgreementStatusFn,
  getIntakeDraftFn,
} from "@/integrations/onboarding/onboarding.functions";
import { StatusPill } from "@/components/onboarding/StatusPill";
import { Container } from "@/components/layout/Container";
import { ArrowRight, FileSignature, ClipboardList, Lock } from "lucide-react";

const CLIENT_SLUG = "nancy-clarke";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Onboarding · Nancy Clarke" },
    ],
  }),
  loader: async () => {
    const [agreement, intake] = await Promise.all([
      getAgreementStatusFn({ data: { clientSlug: CLIENT_SLUG } }),
      getIntakeDraftFn({ data: { clientSlug: CLIENT_SLUG } }),
    ]);
    return { agreement, intake };
  },
  errorComponent: ({ error }) => (
    <Container className="py-20 text-center text-destructive">
      Could not load onboarding status: {error.message}
    </Container>
  ),
  component: OnboardingIndex,
});

function OnboardingIndex() {
  const { agreement, intake } = Route.useLoaderData();
  const agreementSigned = agreement.signed;
  const intakeStatus = intake?.status ?? null;
  const intakeStarted = !!intake;
  const intakeComplete = intake?.is_complete === true;

  return (
    <Container className="max-w-3xl py-16 md:py-24">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Private Onboarding
        </p>
        <h1 className="mt-3 font-display text-display-3 text-navy md:text-display-2">
          Welcome, Nancy
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Two short steps to get your engagement underway.
        </p>
      </div>

      <div className="space-y-4">
        <StepCard
          step={1}
          icon={<FileSignature className="h-5 w-5" />}
          title="Service Agreement"
          description="Read and sign the JMS Web Studio service agreement."
          to="/onboarding/agreement"
          status={
            agreementSigned ? (
              <StatusPill tone="success" icon="check">
                Signed {agreement.signedAt ? new Date(agreement.signedAt).toLocaleDateString() : ""}
              </StatusPill>
            ) : (
              <StatusPill tone="gold">Not yet signed</StatusPill>
            )
          }
          ctaLabel={agreementSigned ? "Review" : "Sign agreement"}
        />

        <StepCard
          step={2}
          icon={<ClipboardList className="h-5 w-5" />}
          title="Onboarding Intake"
          description="Tell us about your business, brand, and accounts. About 15 minutes."
          to="/onboarding/intake"
          status={
            !agreementSigned ? (
              <StatusPill tone="muted" icon="lock">
                Locked — sign agreement first
              </StatusPill>
            ) : intakeComplete ? (
              <StatusPill tone="success" icon="check">
                Submitted
              </StatusPill>
            ) : intakeStarted ? (
              <StatusPill tone="gold">In progress</StatusPill>
            ) : (
              <StatusPill tone="gold">Not started</StatusPill>
            )
          }
          ctaLabel={intakeComplete ? "Review" : intakeStarted ? "Continue" : "Start intake"}
          locked={!agreementSigned}
        />
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        This is a private workspace. Your responses are saved as you go.
      </p>
    </Container>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
  to,
  status,
  ctaLabel,
  locked,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  status: React.ReactNode;
  ctaLabel: string;
  locked?: boolean;
}) {
  const inner = (
    <div
      className={`flex items-start gap-4 rounded-3xl border p-6 transition-all md:p-8 ${
        locked
          ? "cursor-not-allowed border-border bg-muted/40 opacity-70"
          : "border-border bg-white hover:border-navy hover:shadow-lg"
      }`}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-cream">
        {locked ? <Lock className="h-5 w-5" /> : icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Step {step}
            </p>
            <h2 className="mt-1 font-display text-xl text-navy md:text-2xl">{title}</h2>
          </div>
          <div className="hidden md:block">{status}</div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-4 md:hidden">{status}</div>
        {!locked ? (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy">
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </div>
        ) : null}
      </div>
    </div>
  );
  if (locked) return inner;
  return (
    <Link to={to as never} className="block">
      {inner}
    </Link>
  );
}
