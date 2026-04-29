import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Nancy Clarke — Adams Homes, St. Lucie County" },
      {
        name: "description",
        content:
          "Get in touch with Nancy Clarke. Realtor partnerships and buyer inquiries welcome.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Realtor / buyer contact form lands in Prompt 3.
        </h1>
      </Container>
    </Section>
  );
}
