import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";
import { IntakeStepper } from "@/components/onboarding/IntakeStepper";
import {
  getAgreementStatusFn,
  getIntakeDraftFn,
} from "@/integrations/onboarding/onboarding.functions";
import { ChevronLeft } from "lucide-react";

const CLIENT_SLUG = "nancy-clarke";

export const Route = createFileRoute("/onboarding/intake")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "Onboarding intake · Nancy Clarke" },
    ],
  }),
  beforeLoad: async () => {
    // Gate: must have signed agreement first
    const status = await getAgreementStatusFn({ data: { clientSlug: CLIENT_SLUG } });
    if (!status.signed) {
      throw redirect({ to: "/onboarding/agreement" });
    }
  },
  loader: async () => {
    const draft = await getIntakeDraftFn({ data: { clientSlug: CLIENT_SLUG } });
    return { draft };
  },
  errorComponent: ({ error }) => (
    <Container className="py-20 text-center text-destructive">{error.message}</Container>
  ),
  component: IntakePage,
});

function IntakePage() {
  const { draft } = Route.useLoaderData();
  const initialFormData =
    (draft?.form_data as Record<string, unknown> | undefined) ?? {};
  const initialSectionIndex = draft?.current_section_index ?? 0;
  const isComplete = draft?.is_complete === true;

  if (isComplete) {
    return (
      <Container className="max-w-2xl py-20 text-center">
        <h1 className="font-display text-display-3 text-navy">Already submitted</h1>
        <p className="mt-3 text-muted-foreground">
          Your intake has been submitted. We'll be in touch shortly.
        </p>
        <Link
          to="/onboarding"
          className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-navy px-5 py-2.5 text-sm font-medium text-navy hover:bg-cream-deep"
        >
          <ChevronLeft className="h-4 w-4" /> Back to onboarding
        </Link>
      </Container>
    );
  }

  return (
    <Container className="max-w-3xl py-12 md:py-16">
      <Link
        to="/onboarding"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy"
      >
        <ChevronLeft className="h-4 w-4" /> Back to onboarding
      </Link>

      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Step 2 of 2</p>
        <h1 className="mt-2 font-display text-display-3 text-navy md:text-display-2">
          Onboarding Intake
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Your answers are saved automatically as you type. Come back anytime.
        </p>
      </div>

      <IntakeStepper
        clientSlug={CLIENT_SLUG}
        initialFormData={initialFormData}
        initialSectionIndex={initialSectionIndex}
      />
    </Container>
  );
}
