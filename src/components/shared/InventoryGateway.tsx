// EMERGENCY REVERT ONLY — production renders <InventoryCarousel />.
// This component is retained as a one-line revert option in case the
// Adams Homes scraper integration needs to be temporarily disabled.
// See post-call change 5.
import { ArrowRight, Phone } from "lucide-react";
import { GuardedExternalLink } from "@/components/shared/GuardedExternalLink";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { SITE } from "@/content/site";
import interiorImg from "@/assets/inventory-interior.jpg";

const FALLBACK_URL = "PROAGENT_SEARCH_URL_TBD";
const QUICK_LINKS = [
  { label: "Port St. Lucie listings", url: "PROAGENT_PSL_URL_TBD" },
  { label: "Fort Pierce listings", url: "PROAGENT_FP_URL_TBD" },
  { label: "Okeechobee County listings", url: "PROAGENT_OKE_URL_TBD" },
];

export function InventoryGateway({
  cardEyebrow,
  cardTitle,
  cardBody,
}: {
  cardEyebrow: string;
  cardTitle: string;
  cardBody: string;
}) {
  return (
    <>
      <FadeInOnScroll delay={150}>
        <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-3xl bg-navy-deep text-cream shadow-2xl shadow-navy/20">
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
              <GuardedExternalLink
                url={FALLBACK_URL}
                primary
                className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-8 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                Search Listings
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </GuardedExternalLink>
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
          {QUICK_LINKS.map((q) => (
            <GuardedExternalLink
              key={q.label}
              url={q.url}
              className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-medium text-navy transition-all duration-300 hover:border-gold hover:text-navy-deep"
            >
              {q.label}
              <ArrowRight size={14} />
            </GuardedExternalLink>
          ))}
        </div>
      </FadeInOnScroll>
    </>
  );
}
