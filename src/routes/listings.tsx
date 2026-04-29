import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "Listings — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Browse available Adams Homes new construction listings in St. Lucie County, Florida.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Listings</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Listings gateway lands in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
