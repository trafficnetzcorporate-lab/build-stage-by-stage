import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HERO_IMAGES, HOMEPAGE } from "@/content/site";

export function CommunitiesGallery() {
  const { eyebrow, headline, subhead } = HOMEPAGE.communities.gallery;

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
      </Container>

      {/* Full-bleed horizontal scroll strip */}
      <div className="relative mt-14 w-screen left-1/2 right-1/2 -mx-[50vw]">
        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Communities photo gallery"
        >
          <div className="shrink-0 w-6 md:w-[15vw]" aria-hidden="true" />
          {HERO_IMAGES.map((img) => (
            <div
              key={img.src}
              className="group flex-shrink-0 snap-center overflow-hidden rounded-2xl ring-1 ring-navy/10 motion-safe:transition-all motion-safe:duration-500 md:motion-safe:hover:scale-[1.02] md:hover:shadow-2xl md:hover:shadow-navy/20"
              style={{
                width: "clamp(280px, 85vw, 1200px)",
              }}
            >
              <div className="aspect-[16/10] w-full md:w-[70vw]">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
          <div className="shrink-0 w-6 md:w-[15vw]" aria-hidden="true" />
        </div>

        <p className="mt-6 text-center font-display text-sm italic text-navy/60">
          <span className="md:hidden">Swipe →</span>
          <span className="hidden md:inline">Scroll →</span>
        </p>
      </div>
    </Section>
  );
}
