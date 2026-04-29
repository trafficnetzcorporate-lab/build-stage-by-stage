import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nancy Clarke — #1 Adams Homes Realtor, St. Lucie County" },
      {
        name: "description",
        content:
          "Nancy Clarke is the top-performing sales associate for Adams Homes in St. Lucie County, Florida.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>About</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Full bio lands in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
