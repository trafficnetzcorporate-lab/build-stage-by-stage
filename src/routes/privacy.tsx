import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nancy Clarke Realtor" },
      { name: "description", content: "Privacy policy for nancyclarkerealtor.com." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <h1 className="text-display-2 text-navy">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">Coming soon.</p>
      </Container>
    </Section>
  );
}
