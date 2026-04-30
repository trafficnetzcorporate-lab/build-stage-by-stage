import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, HardHat, Home } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { PageHero } from "@/components/pages/PageHero";
import { ClosingBand } from "@/components/pages/ClosingBand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PAGES } from "@/content/site";

const ICONS = { DollarSign, HardHat, Home } as const;

const META_TITLE = "For Realtors — Refer to Nancy Clarke | Adams Homes";
const META_DESC =
  "Refer your buyer to Nancy and keep 100% of your commission. The #1 Adams Homes sales associate in St. Lucie County, Florida.";

export const Route = createFileRoute("/realtors")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
    ],
  }),
  component: RealtorsPage,
});

function RealtorsPage() {
  const { hero, whyPartner, process, faq, closing } = PAGES.realtors;
  return (
    <>
      <PageHero {...hero} />

      <Section tone="white" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{whyPartner.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {whyPartner.headline}
            </h2>
            <p className="mt-7 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
              {whyPartner.lead}
            </p>
          </FadeInOnScroll>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {whyPartner.cards.map((card, i) => {
              const Icon = ICONS[card.icon as keyof typeof ICONS];
              return (
                <FadeInOnScroll key={card.title} delay={i * 150}>
                  <article className="group h-full rounded-2xl border border-gold-soft/60 bg-cream p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-gold/10 md:p-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-display-3 mt-6 text-navy">{card.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </article>
                </FadeInOnScroll>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section tone="cream" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {process.headline}
            </h2>
          </FadeInOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {process.steps.map((s, i) => (
              <FadeInOnScroll key={s.n} delay={i * 120}>
                <div className="rounded-2xl border border-navy/10 bg-white p-8">
                  <div className="font-display text-3xl text-gold">{s.n}</div>
                  <h3 className="mt-4 font-display text-xl font-medium text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" size="lg">
        <Container size="narrow">
          <FadeInOnScroll>
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 text-navy">{faq.headline}</h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={150}>
            <Accordion type="single" collapsible className="mt-10">
              {faq.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-left font-display text-lg font-medium text-navy">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeInOnScroll>
        </Container>
      </Section>

      <ClosingBand {...closing} />
    </>
  );
}
