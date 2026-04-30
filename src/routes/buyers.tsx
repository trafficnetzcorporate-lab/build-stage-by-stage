import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { PageHero } from "@/components/pages/PageHero";
import { ClosingBand } from "@/components/pages/ClosingBand";
import { SubmarketCard } from "@/components/shared/SubmarketCard";
import { PAGES, COMMUNITIES } from "@/content/site";

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

      <Section tone="white" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{whyNew.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {whyNew.headline}
            </h2>
          </FadeInOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {whyNew.cards.map((c, i) => (
              <FadeInOnScroll key={c.title} delay={i * 120}>
                <article className="h-full rounded-2xl border border-gold-soft/60 bg-cream p-8 md:p-10">
                  <h3 className="text-display-3 text-navy">{c.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {c.body}
                  </p>
                </article>
              </FadeInOnScroll>
            ))}
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

      <ClosingBand {...closing} />
    </>
  );
}
