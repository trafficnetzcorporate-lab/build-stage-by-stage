import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { MORTGAGE_PARTNERS, MORTGAGE_DISCLAIMER } from "@/content/site";
import acrisureLogo from "@/assets/acrisure-mortgage-logo.png";
import guildLogo from "@/assets/guild-mortgage-logo.png";
import scottHeadshot from "@/assets/scott-stinson-headshot.jpg";
import ginoHeadshot from "@/assets/gino-giandurco-headshot.jpg";

const ASSETS_BY_NAME: Record<string, { logo: string; headshot: string }> = {
  "Scott A. Stinson": { logo: acrisureLogo, headshot: scottHeadshot },
  "Gino Giandurco": { logo: guildLogo, headshot: ginoHeadshot },
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
            const assets = ASSETS_BY_NAME[p.name];
            return (
              <FadeInOnScroll key={p.company} delay={i * 120}>
                <article className="flex h-full flex-col rounded-2xl border border-gold-soft/60 bg-white p-8">
                  <div className="flex h-12 items-center md:h-14">
                    {assets?.logo ? (
                      <img
                        src={assets.logo}
                        alt={`${p.company} logo`}
                        className="h-8 w-auto object-contain md:h-10"
                      />
                    ) : (
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        {p.company}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-start gap-5">
                    {assets?.headshot && (
                      <img
                        src={assets.headshot}
                        alt={`${p.name} headshot`}
                        className="h-24 w-24 flex-none rounded-full object-cover ring-1 ring-gold-soft/60"
                      />
                    )}
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl text-navy">{p.name}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{p.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">NMLS #{p.nmls}</p>
                    </div>
                  </div>

                  <dl className="mt-6 space-y-2 text-sm text-navy">
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd>{p.address}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>
                        <a href={p.phoneHref} className="hover:text-gold">
                          {p.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd className="break-all">
                        <a href={`mailto:${p.email}`} className="hover:text-gold">
                          {p.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Website</dt>
                      <dd>
                        <a
                          href={p.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-gold hover:underline"
                        >
                          Apply online at {p.websiteLabel}
                        </a>
                      </dd>
                    </div>
                  </dl>
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
