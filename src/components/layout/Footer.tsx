import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { SITE, NAV_LINKS } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-3xl">Nancy Clarke</div>
            <div className="mt-1 text-sm text-cream/70">{SITE.role}</div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/80">
              New construction specialist in {SITE.territory}. Partnering with realtors
              whose buyers want a brand-new Adams Home — without giving up a dollar of
              their commission.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href={SITE.phoneHref} className="hover:text-gold">
                {SITE.phone}
              </a>
              <a href={SITE.emailHref} className="hover:text-gold">
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <Eyebrow tone="cream">Explore</Eyebrow>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-cream/80 hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <Eyebrow tone="cream">Connect</Eyebrow>
            <p className="mt-5 text-sm text-cream/70">
              Reach out by phone or email — both are checked daily.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              className="text-cream"
              aria-label="Equal Housing Opportunity"
              role="img"
            >
              <rect x="1" y="1" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M16 6 L26 14 H22 V24 H10 V14 H6 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <text x="16" y="20" textAnchor="middle" fontSize="6" fill="currentColor" fontWeight="bold">=</text>
            </svg>
            <span className="text-xs uppercase tracking-widest text-cream/70">
              Equal Housing Opportunity
            </span>
          </div>
          <div className="text-xs text-cream/60">
            Independent sales associate with Adams Homes of Northwest Florida.
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} {SITE.name}. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-cream">Privacy</Link>
            <Link to="/terms" className="hover:text-cream">Terms</Link>
            <Link to="/accessibility" className="hover:text-cream">Accessibility</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
