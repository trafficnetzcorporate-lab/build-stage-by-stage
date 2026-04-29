import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "Communities — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Adams Homes communities across St. Lucie County: Waterstone in Port St. Lucie, plus Fort Pierce and Vero Beach.",
      },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Communities</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Community detail pages land in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
