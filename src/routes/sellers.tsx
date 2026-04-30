import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { PageHero } from "@/components/pages/PageHero";
import { ClosingBand } from "@/components/pages/ClosingBand";
import { PAGES } from "@/content/site";

const META_TITLE = "Selling Your Home in St. Lucie County — Nancy Clarke";
const META_DESC =
  "Selling your current home so you can move into a new Adams Homes build? Nancy bridges the resale and new-construction sides of the move.";

export const Route = createFileRoute("/sellers")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
    ],
  }),
  component: SellersPage,
});

function SellersPage() {
  const { hero, bridge, process, closing } = PAGES.sellers;

  return (
    <>
      <PageHero {...hero} />

      <Section tone="white" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{bridge.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {bridge.headline}
            </h2>
            <p className="mt-7 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
              {bridge.lead}
            </p>
          </FadeInOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {bridge.cards.map((c, i) => (
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

      <ClosingBand {...closing} />
    </>
  );
}
