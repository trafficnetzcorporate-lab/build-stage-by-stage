import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE } from "@/content/site";
import portrait from "@/assets/nancy-portrait.jpg";

export function MeetNancy() {
  const { eyebrow, caption, headline, body, stats } = HOMEPAGE.meetNancy;

  return (
    <Section tone="white" size="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeInOnScroll className="lg:col-span-5">
            <div className="relative">
              <span className="block text-sm italic text-navy/60 font-display">
                {caption}
              </span>
              <div className="relative mt-4">
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
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={150} className="lg:col-span-7 lg:pl-8">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-display-2 mt-6 text-navy">{headline}</h2>
            <p className="mt-7 max-w-[540px] text-[17px] leading-relaxed text-muted-foreground">
              {body}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gold/40 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-medium text-navy md:text-5xl">
                    {s.value}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-navy"
              >
                <span className="relative">
                  Read full bio
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-100 bg-gold transition-transform duration-300 group-hover:scale-x-50" />
                </span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-success px-7 text-sm font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-success/20"
              >
                Schedule a call
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeInOnScroll>
        </div>
      </Container>
    </Section>
  );
}
