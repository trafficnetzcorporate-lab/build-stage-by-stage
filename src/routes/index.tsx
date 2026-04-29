import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Scaffold ready</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Foundation in place. Homepage lands in Prompt 2.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Design tokens, layout primitives, navigation, footer, and the placeholder
          guard system are wired up. Tap the dev banner at the bottom of the screen
          to see the unresolved values that still need verification before launch.
        </p>
      </Container>
    </Section>
  );
}
