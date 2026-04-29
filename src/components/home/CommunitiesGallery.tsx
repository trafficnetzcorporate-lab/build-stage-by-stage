import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HERO_IMAGES, HOMEPAGE } from "@/content/site";

export function CommunitiesGallery() {
  const { eyebrow, headline, subhead } = HOMEPAGE.communities.gallery;
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-card]");
    const delta = card ? card.offsetWidth + 24 : node.clientWidth * 0.85;
    node.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  return (
    <Section tone="cream" size="lg">
      <Container>
        <FadeInOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-display-2 mt-6 max-w-3xl text-navy">{headline}</h2>
          <p className="mt-6 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
            {subhead}
          </p>
        </FadeInOnScroll>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Communities photo gallery"
          >
            {HERO_IMAGES.map((img) => (
              <div
                key={img.src}
                data-card
                className="group relative shrink-0 snap-center overflow-hidden rounded-2xl bg-cream-deep ring-1 ring-navy/10 motion-safe:transition-all motion-safe:duration-500 md:motion-safe:hover:scale-[1.01] md:hover:shadow-2xl md:hover:shadow-navy/20"
                style={{ width: "min(100%, 880px)" }}
              >
                <div className="aspect-[16/10] w-full">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop chevron controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous photo"
              className="pointer-events-auto -ml-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-navy shadow-lg ring-1 ring-navy/10 backdrop-blur transition hover:bg-cream"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next photo"
              className="pointer-events-auto -mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/90 text-navy shadow-lg ring-1 ring-navy/10 backdrop-blur transition hover:bg-cream"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <p className="mt-6 text-center font-display text-sm italic text-navy/60">
          <span className="md:hidden">Swipe →</span>
          <span className="hidden md:inline">Use the arrows to explore →</span>
        </p>
      </Container>
    </Section>
  );
}
