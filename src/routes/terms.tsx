import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Nancy Clarke Realtor" },
      { name: "description", content: "Terms of service for nancyclarkerealtor.com." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <h1 className="text-display-2 text-navy">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground">Coming soon.</p>
      </Container>
    </Section>
  );
}
