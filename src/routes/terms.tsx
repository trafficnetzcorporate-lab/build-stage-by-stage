import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Nancy Clarke Realtor" },
      {
        name: "description",
        content:
          "Terms governing use of nancyclarkerealtor.com, the personal site of Nancy Clarke, Sales Associate with Adams Homes of Northwest Florida.",
      },
      { property: "og:title", content: "Terms of Service — Nancy Clarke Realtor" },
      {
        property: "og:description",
        content:
          "Terms governing use of nancyclarkerealtor.com.",
      },
      { property: "og:url", content: "https://nancyclarkerealtor.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://nancyclarkerealtor.com/terms" }],
  }),
  component: TermsPage,
});

const EFFECTIVE_DATE = "May 15, 2026";

function TermsPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Effective {EFFECTIVE_DATE}
        </p>
        <h1 className="mt-3 text-display-2 text-navy">Terms of Service</h1>
        <p className="mt-6 text-muted-foreground">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of <span className="font-medium text-navy">{SITE.domain}</span> (the
          &ldquo;Site&rdquo;), operated by Nancy Clarke, an independent Sales
          Associate with Adams Homes of Northwest Florida. By using the Site, you
          agree to these Terms.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-navy/85">
          <section>
            <h2 className="text-2xl font-display text-navy">Informational use only</h2>
            <p className="mt-3">
              Content on the Site — including community descriptions, floor plan
              references, pricing, availability, school information, and inventory
              listings — is provided for general informational purposes only and is
              subject to change without notice. Nothing on the Site constitutes a
              binding offer to sell or a guarantee of availability, price, or
              specifications. Always confirm current details directly with Nancy
              and Adams Homes of Northwest Florida before making any decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">No professional advice</h2>
            <p className="mt-3">
              The Site does not provide legal, tax, financial, mortgage, or
              investment advice. Real estate transactions are complex and involve
              risk. You should consult appropriately licensed professionals before
              acting on any information you find here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Brokerage relationship</h2>
            <p className="mt-3">
              Nancy Clarke is an independent Sales Associate with Adams Homes of
              Northwest Florida, a Florida licensed real estate brokerage. Use of
              the Site, submission of the contact form, or general communication
              with Nancy does not, by itself, create a brokerage, fiduciary, or
              agency relationship. A formal relationship arises only when both
              parties have signed a written representation agreement that complies
              with Florida law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Equal Housing Opportunity</h2>
            <p className="mt-3">
              Nancy Clarke supports the Fair Housing Act and Equal Housing
              Opportunity. Housing opportunities are made available without regard
              to race, color, religion, sex, handicap, familial status, national
              origin, sexual orientation, gender identity, or any other class
              protected by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Acceptable use</h2>
            <p className="mt-3">You agree not to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Use the Site for any unlawful purpose or in violation of these Terms.</li>
              <li>
                Submit false, misleading, or fraudulent information through any form
                on the Site.
              </li>
              <li>
                Attempt to disrupt, probe, scrape, or gain unauthorized access to the
                Site, its servers, or related systems.
              </li>
              <li>
                Use the Site, its content, or its inventory data for commercial
                redistribution without written permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Intellectual property</h2>
            <p className="mt-3">
              All text, photography, graphics, and design elements on the Site are
              owned by Nancy Clarke, Adams Homes of Northwest Florida, or their
              respective licensors, and are protected by U.S. copyright and
              trademark law. You may not copy, modify, distribute, or create
              derivative works from Site content without prior written consent,
              except for ordinary personal browsing and saving of pages for your
              own real estate research.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Third-party links</h2>
            <p className="mt-3">
              The Site may link to third-party websites — for example, Adams Homes
              corporate pages, mortgage partners, or community resources. We do not
              control and are not responsible for the content, policies, or
              practices of those sites. Visiting them is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Disclaimers</h2>
            <p className="mt-3">
              The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without warranties of any kind, express or
              implied, including warranties of merchantability, fitness for a
              particular purpose, accuracy, or non-infringement. We do not warrant
              that the Site will be uninterrupted, error-free, or secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, Nancy Clarke and Adams Homes
              of Northwest Florida will not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits
              or revenues, arising from or related to your use of the Site or
              reliance on its content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Governing law</h2>
            <p className="mt-3">
              These Terms are governed by the laws of the State of Florida, without
              regard to its conflict-of-laws principles. Any dispute relating to
              the Site will be resolved exclusively in the state or federal courts
              located in St. Lucie County, Florida.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Changes</h2>
            <p className="mt-3">
              We may update these Terms from time to time. The &ldquo;Effective&rdquo;
              date above reflects the most recent version. Continued use of the
              Site after changes are posted constitutes acceptance of the updated
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Contact</h2>
            <p className="mt-3">
              Questions about these Terms can be sent to{" "}
              <a className="text-navy underline" href={SITE.emailHref}>
                {SITE.email}
              </a>{" "}
              or{" "}
              <a className="text-navy underline" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
