import portrait from "@/assets/nancy-portrait.jpg";
import adamsLogo from "@/assets/adams-homes-logo.png";
import { SITE } from "@/content/site";
import { Phone, Mail } from "lucide-react";

/**
 * Name plate band — sits directly under the hero. Mirrors the layout of
 * Nancy's existing site (headshot + identity left, builder logo right) but
 * in a polished navy band that locks the hero to the rest of the page.
 */
export function NamePlate() {
  return (
    <section
      aria-label="Nancy Clarke contact and builder affiliation"
      className="relative bg-navy text-cream"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 py-6 md:grid-cols-[auto_1fr_auto] md:gap-8 md:py-8">
          {/* Headshot */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-cream/15 shadow-elegant md:h-32 md:w-32">
              <img
                src={portrait}
                alt="Nancy Clarke, Sales Associate at Adams Homes"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Identity + contact */}
          <div className="text-center md:text-left">
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 md:justify-start">
              <h2 className="font-display text-3xl leading-none md:text-4xl">
                {SITE.name}
              </h2>
              <span className="text-sm uppercase tracking-[0.18em] text-cream/70">
                Realtor
              </span>
            </div>
            <p className="mt-1 text-sm text-cream/80 md:text-base">
              {SITE.role} · {SITE.territory}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm md:justify-start md:text-base">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 text-cream transition-colors hover:text-cream/70"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                <span className="font-medium">{SITE.phone}</span>
              </a>
              <a
                href={SITE.emailHref}
                className="inline-flex items-center gap-2 text-cream transition-colors hover:text-cream/70"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                <span className="font-medium">{SITE.email}</span>
              </a>
            </div>
          </div>

          {/* Builder logo — right side, like the original site */}
          <div className="flex justify-center md:justify-end">
            <div className="rounded-xl bg-cream p-3 shadow-elegant md:p-4">
              <img
                src={adamsLogo}
                alt="Adams Homes — building since 1991"
                className="h-20 w-auto md:h-24"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
