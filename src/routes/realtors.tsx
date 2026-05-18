import { createFileRoute, Link } from "@tanstack/react-router";
import { DollarSign, HardHat, Home, ArrowRight, Quote } from "lucide-react";
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
import { PAGES, TESTIMONIALS, SITE } from "@/content/site";

const ICONS = { DollarSign, HardHat, Home } as const;

const META_TITLE = "For Realtors — Refer to Nancy Clarke | Adams Homes";
const META_DESC =
  "Refer your buyer to Nancy and keep 100% of your commission. The #1 Adams Homes Sales Associate in St. Lucie County, Florida.";

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

      {/* Stat strip — instant credibility */}
      <Section tone="navy" size="sm">
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: "60+", label: "Closings in 2025" },
              { value: "#1", label: "Adams Homes agent in St. Lucie County" },
              { value: "100%", label: "Of your buyer-side commission" },
            ].map((s, i) => (
              <FadeInOnScroll key={s.label} delay={i * 100}>
                <div>
                  <div className="font-display text-5xl text-gold md:text-6xl">{s.value}</div>
                  <div className="mt-2 text-xs uppercase tracking-widest text-cream/70">{s.label}</div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </Section>


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

      {/* Testimonial pull-quote band */}
      <Section tone="cream-deep" size="lg">
        <Container size="narrow">
          <FadeInOnScroll>
            <div className="text-center">
              <Quote size={36} className="mx-auto text-gold" strokeWidth={1.5} />
              <blockquote className="text-display-3 mt-6 text-navy">
                "{TESTIMONIALS[0].quote}"
              </blockquote>
              <div className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
                — {TESTIMONIALS[0].attribution} · Buyer
              </div>
              <Link
                to="/contact"
                className="group mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-navy px-7 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-deep"
              >
                Refer a buyer to Nancy
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <div className="mt-4 text-xs text-muted-foreground">
                Or call directly: <a href={SITE.phoneHref} className="font-medium text-navy hover:text-gold">{SITE.phone}</a>
              </div>
            </div>
          </FadeInOnScroll>
        </Container>
      </Section>

      <ClosingBand {...closing} />
    </>
  );
}
