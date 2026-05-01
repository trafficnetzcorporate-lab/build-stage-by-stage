import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { MORTGAGE_PARTNERS, MORTGAGE_DISCLAIMER } from "@/content/site";
import acrisureLogo from "@/assets/acrisure-mortgage-logo.png";
import guildLogo from "@/assets/guild-mortgage-logo.png";

const LOGO_BY_COMPANY: Record<string, string> = {
  "Acrisure Mortgage": acrisureLogo,
  "Guild Mortgage": guildLogo,
};

export const Route = createFileRoute("/home-loans")({
  head: () => ({
    meta: [
      { title: "Home Loans — Nancy Clarke, Adams Homes" },
      {
        name: "description",
        content:
          "Trusted mortgage partners for Adams Homes new construction buyers in St. Lucie County.",
      },
    ],
  }),
  component: HomeLoansPage,
});

function HomeLoansPage() {
  return (
    <Section tone="cream" size="lg" className="pt-32 md:pt-40">
      <Container>
        <Eyebrow>Home Loans</Eyebrow>
        <h1 className="text-display-1 mt-6 max-w-3xl text-navy">
          Trusted mortgage partners for new construction.
        </h1>
        <p className="mt-6 max-w-[640px] text-[17px] leading-relaxed text-muted-foreground">
          Nancy works closely with these lenders. Both know Adams Homes
          construction timelines and incentives — the kind of details a generic
          mortgage broker often gets wrong.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {MORTGAGE_PARTNERS.map((p, i) => {
            const logo = LOGO_BY_COMPANY[p.company];
            return (
              <FadeInOnScroll key={p.company} delay={i * 120}>
                <article className="flex h-full flex-col rounded-2xl border border-gold-soft/60 bg-white p-8">
                  {/* Fixed-height logo container so both partners visually align */}
                  <div className="flex h-12 items-center md:h-14">
                    {logo ? (
                      <img
                        src={logo}
                        alt={`${p.company} logo`}
                        className="h-8 w-auto object-contain md:h-10"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        {p.company}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 font-display text-2xl text-navy">{p.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{p.title}</p>
                  <p className="mt-4 text-sm text-navy">{p.address}</p>
                  <p className="mt-1 text-sm text-navy">{p.phone}</p>
                  <p className="mt-1 text-xs text-muted-foreground">NMLS {p.nmls}</p>
                </article>
              </FadeInOnScroll>
            );
          })}
        </div>

        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {MORTGAGE_DISCLAIMER}
        </p>
      </Container>
    </Section>
  );
}
