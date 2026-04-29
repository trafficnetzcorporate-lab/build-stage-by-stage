import * as React from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE, TESTIMONIALS } from "@/content/site";

export function Testimonials() {
  const { eyebrow, headline, featuredAttribution } = HOMEPAGE.testimonials;
  const featured = TESTIMONIALS.find((t) => t.attribution === featuredAttribution);
  const others = TESTIMONIALS.filter((t) => t.attribution !== featuredAttribution);

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % others.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused, others.length]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - 24, behavior: "smooth" });
    }
  }, [index]);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + others.length) % others.length);
  };

  return (
    <Section tone="cream" size="lg">
      <Container>
        <FadeInOnScroll>
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2 className="text-display-2 mx-auto mt-6 max-w-3xl text-navy">{headline}</h2>
          </div>
        </FadeInOnScroll>

        {featured ? (
          <FadeInOnScroll delay={150}>
            <figure className="mx-auto mt-14 max-w-3xl text-center">
              <Quote
                size={48}
                strokeWidth={1.5}
                className="mx-auto text-gold"
                aria-hidden="true"
              />
              <blockquote className="mt-6 font-display text-[26px] italic leading-[1.4] text-navy md:text-[28px]">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-gold">
                — {featured.attribution}
              </figcaption>
            </figure>
          </FadeInOnScroll>
        ) : null}

        <FadeInOnScroll delay={300}>
          <div
            className="relative mt-16"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {others.map((t) => (
                <article
                  key={t.attribution}
                  className="w-[85%] shrink-0 snap-center rounded-2xl border border-gold-soft/60 bg-white p-8 md:w-[420px] md:p-10"
                >
                  <Quote
                    size={24}
                    strokeWidth={1.5}
                    className="text-gold"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-base leading-relaxed text-navy">{t.quote}</p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {t.attribution}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-gold hover:text-navy-deep"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {others.map((t, i) => (
                  <button
                    key={t.attribution}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-6 bg-gold" : "w-1.5 bg-navy/20"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-gold hover:text-navy-deep"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </Section>
  );
}
