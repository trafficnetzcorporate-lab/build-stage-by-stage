import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE } from "@/content/site";

export function DualPathCta() {
  const { realtor, buyer } = HOMEPAGE.dualCta;

  return (
    <section className="bg-gradient-to-br from-navy via-navy to-navy-deep py-20 text-cream md:py-28 lg:py-32">
      <Container>
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-2">
          <FadeInOnScroll>
            <article className="relative h-full overflow-hidden rounded-3xl bg-navy-deep/60 p-10 ring-1 ring-cream/10 transition-all duration-500 hover:ring-cream/20 md:p-14">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-success"
              />
              <span className="text-eyebrow text-gold">{realtor.eyebrow}</span>
              <h3 className="text-display-3 mt-5 text-cream">{realtor.headline}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80">
                {realtor.body}
              </p>
              <Link
                to={realtor.cta.to}
                className="group mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-8 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-success/30"
              >
                {realtor.cta.label}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </FadeInOnScroll>

          <FadeInOnScroll delay={150}>
            <article className="relative h-full overflow-hidden rounded-3xl bg-navy-deep/60 p-10 ring-1 ring-cream/10 transition-all duration-500 hover:ring-cream/20 md:p-14">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gold"
              />
              <span className="text-eyebrow text-gold">{buyer.eyebrow}</span>
              <h3 className="text-display-3 mt-5 text-cream">{buyer.headline}</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80">
                {buyer.body}
              </p>
              <Link
                to={buyer.cta.to}
                className="group mt-9 inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gold px-8 text-sm font-semibold text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy-deep"
              >
                {buyer.cta.label}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </FadeInOnScroll>
        </div>
      </Container>
    </section>
  );
}
