import { ArrowRight, Phone } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE, SITE, PROAGENT_SEARCH_URL } from "@/content/site";
import { isPlaceholder } from "@/lib/safe-link";
import interiorImg from "@/assets/inventory-interior.jpg";

function GuardedAnchor({
  url,
  children,
  className,
  primary = false,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
}) {
  const disabled = isPlaceholder(url);
  if (disabled) {
    return (
      <span
        title="Link not yet configured"
        aria-disabled="true"
        className={`${className ?? ""} cursor-not-allowed opacity-50`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-primary={primary || undefined}
    >
      {children}
    </a>
  );
}

export function LiveInventory() {
  const { eyebrow, headline, subhead, cardEyebrow, cardTitle, cardBody, quickLinks } =
    HOMEPAGE.inventory;

  return (
    <Section tone="cream" size="lg">
      <Container>
        <FadeInOnScroll>
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2 className="text-display-2 mt-6 text-navy">{headline}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {subhead}
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={150}>
          <div className="relative mx-auto mt-14 max-w-[900px] overflow-hidden rounded-3xl bg-navy-deep text-cream shadow-2xl shadow-navy/20">
            <img
              src={interiorImg}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-navy-deep/90 via-navy/70 to-navy-deep/95"
            />
            <div className="relative px-8 py-14 text-center md:px-16 md:py-20">
              <div className="text-eyebrow text-gold">{cardEyebrow}</div>
              <h3 className="mx-auto mt-5 max-w-xl font-display text-2xl font-medium leading-tight text-cream md:text-3xl">
                {cardTitle}
              </h3>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/80 md:text-base">
                {cardBody}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <GuardedAnchor
                  url={PROAGENT_SEARCH_URL}
                  primary
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-8 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Search Listings
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </GuardedAnchor>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-cream/40 px-8 text-sm font-medium text-cream backdrop-blur-sm transition-colors duration-300 hover:border-cream hover:bg-cream/5"
                >
                  <Phone size={16} />
                  Call Nancy
                </a>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {quickLinks.map((q) => (
              <GuardedAnchor
                key={q.label}
                url={q.url}
                className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:border-gold hover:text-navy-deep"
              >
                {q.label}
                <ArrowRight size={14} />
              </GuardedAnchor>
            ))}
          </div>
        </FadeInOnScroll>
      </Container>
    </Section>
  );
}
