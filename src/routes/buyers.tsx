import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Quote, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { PageHero } from "@/components/pages/PageHero";
import { ClosingBand } from "@/components/pages/ClosingBand";
import { SubmarketCard } from "@/components/shared/SubmarketCard";
import { PAGES, COMMUNITIES, TESTIMONIALS, SITE } from "@/content/site";

const CARD_ICONS = [ShieldCheck, Sparkles, Wallet] as const;

const META_TITLE = "Buying New Construction in St. Lucie County — Nancy Clarke";
const META_DESC =
  "What to expect when buying a new Adams Homes home in St. Lucie County — pricing, process, floor plans, and the people who'll guide the move.";

export const Route = createFileRoute("/buyers")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
    ],
  }),
  component: BuyersPage,
});

function BuyersPage() {
  const { hero, whyNew, process, snapshot, closing } = PAGES.buyers;
  return (
    <>
      <PageHero {...hero} />

      {/* Stat strip — fast credibility for visiting buyers */}
      <Section tone="navy" size="sm">
        <Container>
          <div className="grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: "60+", label: "Families closed in 2025" },
              { value: "3", label: "St. Lucie County communities" },
              { value: "#1", label: "Adams Homes agent in territory" },
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
            <Eyebrow>{whyNew.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {whyNew.headline}
            </h2>
          </FadeInOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {whyNew.cards.map((c, i) => {
              const Icon = CARD_ICONS[i] ?? ShieldCheck;
              return (
                <FadeInOnScroll key={c.title} delay={i * 120}>
                  <article className="group h-full rounded-2xl border border-gold-soft/60 bg-cream p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-gold/10 md:p-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="text-display-3 mt-6 text-navy">{c.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      {c.body}
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s, i) => (
              <FadeInOnScroll key={s.n} delay={i * 100}>
                <div className="h-full rounded-2xl border border-navy/10 bg-white p-7">
                  <div className="font-display text-3xl text-gold">{s.n}</div>
                  <h3 className="mt-4 font-display text-lg font-medium text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow tone="cream">{snapshot.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-cream">
              {snapshot.headline}
            </h2>
            <p className="mt-6 max-w-[640px] text-base leading-relaxed text-cream/80">
              {snapshot.subhead}
            </p>
          </FadeInOnScroll>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {COMMUNITIES.map((c, i) => (
              <FadeInOnScroll key={c.slug} delay={i * 100}>
                <SubmarketCard name={c.name} to="/communities" blurb={c.blurb} />
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials — three real buyer quotes */}
      <Section tone="cream-deep" size="lg">
        <Container>
          <FadeInOnScroll>
            <div className="text-center">
              <Eyebrow>What buyers say</Eyebrow>
              <h2 className="text-display-2 mt-6 text-navy">Families who closed with Nancy.</h2>
            </div>
          </FadeInOnScroll>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <FadeInOnScroll key={t.attribution} delay={i * 120}>
                <article className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-8">
                  <Quote size={28} className="text-gold" strokeWidth={1.5} />
                  <p className="mt-5 flex-1 text-[15px] leading-relaxed text-navy/85">
                    {t.quote}
                  </p>
                  <div className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
                    — {t.attribution}
                  </div>
                </article>
              </FadeInOnScroll>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-success px-7 text-sm font-semibold text-cream shadow shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Start your home search with Nancy
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <div className="mt-3 text-xs text-muted-foreground">
              Or call directly: <a href={SITE.phoneHref} className="font-medium text-navy hover:text-gold">{SITE.phone}</a>
            </div>
          </div>
        </Container>
      </Section>

      <ClosingBand {...closing} />
    </>
  );
}
