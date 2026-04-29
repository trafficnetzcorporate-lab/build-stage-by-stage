import { Link } from "@tanstack/react-router";
import { ArrowRight, DollarSign, HardHat, Home } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE } from "@/content/site";

const ICONS = { DollarSign, HardHat, Home } as const;

export function PartnershipMath() {
  const { eyebrow, headlineA, headlineB, lead, cards, cta } = HOMEPAGE.partnership;

  return (
    <Section tone="cream" size="lg">
      <Container>
        <FadeInOnScroll>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-display-2 mt-6 max-w-3xl text-navy">
            {headlineA}
            <br />
            <span className="font-display italic text-navy/90">{headlineB}</span>
          </h2>
          <p className="mt-7 max-w-[680px] text-[17px] leading-relaxed text-muted-foreground">
            {lead}
          </p>
        </FadeInOnScroll>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <FadeInOnScroll key={card.title} delay={i * 150}>
                <article className="group h-full rounded-2xl border border-gold-soft/60 bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-gold/10 md:p-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/40 text-gold">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-display-3 mt-6 text-navy">{card.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {card.body}
                  </p>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>

        <FadeInOnScroll delay={450}>
          <div className="mt-16 flex justify-center">
            <Link
              to={cta.to}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-9 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-success/30"
            >
              {cta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </FadeInOnScroll>
      </Container>
    </Section>
  );
}
