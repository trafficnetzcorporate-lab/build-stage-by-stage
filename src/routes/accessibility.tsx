import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Nancy Clarke Realtor" },
      { name: "description", content: "Accessibility statement for nancyclarkerealtor.com." },
    ],
  }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <h1 className="text-display-2 text-navy">Accessibility</h1>
        <p className="mt-6 text-muted-foreground">Coming soon.</p>
      </Container>
    </Section>
  );
}
