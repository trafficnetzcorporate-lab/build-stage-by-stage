import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/home-loans")({
  head: () => ({
    meta: [
      { title: "Home Loans — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Trusted mortgage partners for Adams Homes new construction buyers in St. Lucie County.",
      },
    ],
  }),
  component: HomeLoansPage,
});

function HomeLoansPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Home Loans</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Mortgage partners + calculator land in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
