import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";

/**
 * Standard page hero band. ~60vh on desktop, comfortable on mobile.
 * Used by the five inner content pages.
 */
export function PageHero({
  eyebrow,
  headline,
  subhead,
}: {
  eyebrow: string;
  headline: string;
  subhead?: string;
}) {
  return (
    <Section tone="cream" size="lg" className="pt-32 md:pt-40">
      <Container>
        <FadeInOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-display-1 mt-6 max-w-3xl text-navy">{headline}</h1>
          {subhead ? (
            <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
              {subhead}
            </p>
          ) : null}
        </FadeInOnScroll>
      </Container>
    </Section>
  );
}
