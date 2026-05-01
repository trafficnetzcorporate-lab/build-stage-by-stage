import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";

// TODO(prompt-3B): Preserve this validateSearch contract when building the
// real contact form. The InventoryCard CTA on the homepage carousel,
// /communities carousel, and /communities/inventory grid all deep-link
// here as <Link to="/contact" search={{ property, community }}>. The form
// must read these params and pre-fill the message field. Removing or
// renaming these fields breaks the inventory → contact integration silently.
const contactSearchSchema = z.object({
  property: fallback(z.string(), "").default(""),
  community: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(contactSearchSchema),
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
  const { property, community } = Route.useSearch();
  const hasInquiry = property || community;

  return (
    <Section tone="cream" size="lg">
      <Container>
        <Eyebrow>Contact</Eyebrow>
        {hasInquiry ? (
          <p className="mt-4 rounded-lg border border-gold-soft bg-white px-4 py-3 text-sm text-navy">
            Inquiring about: <span className="font-semibold">{community || "(community)"}</span>
            {property ? <> — <span className="font-mono text-xs">{property}</span></> : null}
          </p>
        ) : null}
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Realtor / buyer contact form lands in Prompt 3.
        </h1>
        <p className="mt-6 text-base text-muted-foreground">
          Call Nancy directly at <a className="font-semibold text-navy underline" href="tel:+17728997333">(772) 899-7333</a>{" "}
          or <Link to="/" className="font-semibold text-navy underline">return home</Link>.
        </p>
      </Container>
    </Section>
  );
}
