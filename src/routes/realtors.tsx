import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/realtors")({
  head: () => ({
    meta: [
      { title: "For Realtors — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Bring your buyer to a Nancy Clarke listing and keep 100% of your buyer-side commission, paid by Adams Homes.",
      },
    ],
  }),
  component: RealtorsPage,
});

function RealtorsPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>For Realtors</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Realtor partnership page lands in Prompt 3.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Long-form pitch, partnership math, and the realtor lead form will live here.
        </p>
      </Container>
    </Section>
  );
}
