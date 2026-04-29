import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { HOMEPAGE } from "@/content/site";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const { eyebrow, headlineLines, subhead, primaryCta, secondaryCta, trustStrip } =
    HOMEPAGE.hero;

  return (
    <section className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden bg-navy-deep text-cream md:min-h-screen">
      {/* YouTube video background — Waterstone Single Family (HZet4A8DAyc) */}
      <HeroVideo />

      {/* Top gradient — guarantees nav legibility against bright video moments */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-deep/40 to-transparent"
      />
      {/* Left-to-right gradient overlay for headline legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/65 to-navy-deep/35"
      />
      {/* Bottom vignette for trust strip legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy-deep/60 to-transparent"
      />

      <Container size="wide" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[720px]">
          {/* Eyebrow with decorative gold rule */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            <span className="text-eyebrow text-gold">{eyebrow}</span>
          </div>

          <h1 className="text-display-1 mt-9 text-cream">
            {headlineLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headlineLines.length - 1 ? <br /> : null}
              </React.Fragment>
            ))}
          </h1>

          <p className="mt-7 max-w-[540px] text-base leading-[1.65] text-cream/90 md:text-lg">
            {subhead}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to={primaryCta.to}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-success px-8 text-sm font-semibold text-cream shadow-lg shadow-success/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-success/30"
            >
              {primaryCta.label}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to={secondaryCta.to}
              className="inline-flex h-14 items-center justify-center rounded-full border border-cream/40 px-8 text-sm font-medium text-cream backdrop-blur-sm transition-colors duration-300 hover:border-cream hover:bg-cream/5"
            >
              {secondaryCta.label}
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-20 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.14em] text-cream/70">
            {trustStrip.map((item, i) => (
              <React.Fragment key={item}>
                <span>{item}</span>
                {i < trustStrip.length - 1 ? (
                  <span className="h-3 w-px bg-gold/60" aria-hidden="true" />
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue (desktop only) */}
      <div
        className="absolute bottom-8 left-8 hidden flex-col items-center gap-3 md:flex"
        aria-hidden="true"
      >
        <span
          className="text-eyebrow whitespace-nowrap text-cream/60"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Scroll to explore
        </span>
        <span className="block h-12 w-px animate-pulse bg-gold/80" />
      </div>
    </section>
  );
}
