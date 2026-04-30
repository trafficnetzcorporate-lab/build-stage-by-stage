import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { PageHero } from "@/components/pages/PageHero";
import { ClosingBand } from "@/components/pages/ClosingBand";
import { PAGES, TESTIMONIALS } from "@/content/site";
import portrait from "@/assets/nancy-portrait.jpg";

const META_TITLE = "About Nancy Clarke — #1 Adams Homes Realtor, St. Lucie County";
const META_DESC =
  "Meet Nancy Clarke: top-performing Adams Homes sales associate in St. Lucie County. Read her story, stats, and client testimonials.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESC },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESC },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { hero, bio, stats, values, testimonialsBlock, closing } = PAGES.about;

  return (
    <>
      <PageHero {...hero} />

      <Section tone="white" size="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeInOnScroll className="lg:col-span-5">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl bg-cream-deep">
                  <img
                    src={portrait}
                    alt="Portrait of Nancy Clarke, Sales Associate for Adams Homes"
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-gold"
                />
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={150} className="lg:col-span-7 lg:pl-4">
              <Eyebrow>Bio</Eyebrow>
              <div className="mt-6 space-y-5">
                {bio.map((p, i) => (
                  <p
                    key={i}
                    className="text-[17px] leading-relaxed text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gold/40 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-4xl font-medium text-navy md:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInOnScroll>
          </div>
        </Container>
      </Section>

      <Section tone="cream" size="lg">
        <Container>
          <FadeInOnScroll>
            <Eyebrow>{values.eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
              {values.headline}
            </h2>
          </FadeInOnScroll>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {values.cards.map((c, i) => (
              <FadeInOnScroll key={c.title} delay={i * 120}>
                <article className="h-full rounded-2xl border border-gold-soft/60 bg-white p-8 md:p-10">
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

      <Section tone="white" size="lg">
        <Container>
          <FadeInOnScroll>
            <div className="text-center">
              <div className="flex justify-center">
                <Eyebrow>{testimonialsBlock.eyebrow}</Eyebrow>
              </div>
              <h2 className="text-display-2 mx-auto mt-6 max-w-3xl text-navy">
                {testimonialsBlock.headline}
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FadeInOnScroll key={t.attribution} delay={(i % 3) * 100}>
                <article className="h-full rounded-2xl border border-gold-soft/60 bg-cream p-8 md:p-10">
                  <Quote
                    size={24}
                    strokeWidth={1.5}
                    className="text-gold"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-base leading-relaxed text-navy">
                    {t.quote}
                  </p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t.attribution}
                  </div>
                </article>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <ClosingBand {...closing} />
    </>
  );
}
