import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/buyers")({
  head: () => ({
    meta: [
      { title: "For Buyers — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Tour Adams Homes new construction in St. Lucie County with Nancy Clarke. Move-in-ready and to-be-built floor plans.",
      },
    ],
  }),
  component: BuyersPage,
});

function BuyersPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>For Buyers</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Buyer experience lands in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
