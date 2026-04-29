import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/sellers")({
  head: () => ({
    meta: [
      { title: "Sellers — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Selling your home in St. Lucie County? Nancy Clarke can help you list and sell with the same care she brings to new construction.",
      },
    ],
  }),
  component: SellersPage,
});

function SellersPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Sellers</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Sellers page lands in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
