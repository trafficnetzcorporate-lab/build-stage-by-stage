import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { ClosingBand } from "@/components/pages/ClosingBand";
import { SubmarketCard } from "@/components/shared/SubmarketCard";
import { InventoryCarousel } from "@/components/inventory/InventoryCarousel";
import { PAGES, COMMUNITIES } from "@/content/site";

const META_TITLE = "Live Inventory — Adams Homes in St. Lucie County | Nancy Clarke";
const META_DESC =
  "Browse every active Adams Homes listing in Port St. Lucie, Fort Pierce, and Okeechobee County — updated from the live builder feed.";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
    ],
  }),
  component: CommunitiesPage,
});

function CommunitiesPage() {
  const { waterstone, submarkets, closing } = PAGES.communities;

  return (
    <>
      {/* Inventory first — the reason most visitors come to this page */}
      <Section tone="cream" size="lg" className="pt-32 md:pt-36">
        <Container>
          <FadeInOnScroll>
            <div className="text-center">
              <div className="flex justify-center">
                <Eyebrow>Live Inventory</Eyebrow>
              </div>
              <h1 className="text-display-1 mt-6 text-navy">Inventory</h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                Active Adams Homes listings across Port St. Lucie, Fort Pierce, and Okeechobee County — straight from the live builder feed, sorted by price.
              </p>
            </div>
          </FadeInOnScroll>
          <div className="mt-12">
            <InventoryCarousel />
          </div>
        </Container>
      </Section>

      <Section tone="white" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{waterstone.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {waterstone.headline}
            </h2>
            <p className="mt-7 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
              {waterstone.subhead}
            </p>
          </FadeInOnScroll>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <FadeInOnScroll>
              <article className="rounded-2xl border border-gold-soft/60 bg-cream p-8 md:p-10">
                <div className="text-eyebrow text-gold">Single Family</div>
                <h3 className="text-display-3 mt-4 text-navy">
                  Waterstone — Single Family Homes
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  1,780 to 2,557 sqft floor plans inside a gated community with resort-style amenities, fitness center, pickleball, and playground. Built for families who want room to grow without leaving the conveniences behind.
                </p>
              </article>
            </FadeInOnScroll>
            <FadeInOnScroll delay={150}>
              <article className="rounded-2xl border border-gold-soft/60 bg-cream p-8 md:p-10">
                <div className="text-eyebrow text-gold">Villas</div>
                <h3 className="text-display-3 mt-4 text-navy">
                  Waterstone — Villas
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  Attached single-story villa plans with low-maintenance living and access to the same gated amenity package as the single-family side. A natural fit for downsizers and lock-and-leave buyers.
                </p>
              </article>
            </FadeInOnScroll>
          </div>
        </Container>
      </Section>

      <Section tone="navy" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow tone="cream">{submarkets.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-cream">
              {submarkets.headline}
            </h2>
            <p className="mt-6 max-w-[640px] text-base leading-relaxed text-cream/80">
              {submarkets.subhead}
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
