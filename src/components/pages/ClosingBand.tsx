import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";

/**
 * Per-page closing band. Each page passes its own headline + CTA from
 * PAGES.{page}.closing. No two pages share copy.
 */
export function ClosingBand({
  headline,
  ctaLabel,
  ctaTo,
}: {
  headline: string;
  ctaLabel: string;
  ctaTo: string;
}) {
  return (
    <Section tone="navy" size="lg">
      <Container>
        <FadeInOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-display-2 text-cream">{headline}</h2>
            <div className="mt-10 flex justify-center">
              <Link
                to={ctaTo}
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-9 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {ctaLabel}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </FadeInOnScroll>
      </Container>
    </Section>
  );
}
