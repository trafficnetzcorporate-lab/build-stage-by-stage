import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nancy Clarke Realtor" },
      {
        name: "description",
        content:
          "How Nancy Clarke, Sales Associate with Adams Homes of Northwest Florida, collects, uses, and protects information submitted through nancyclarkerealtor.com.",
      },
      { property: "og:title", content: "Privacy Policy — Nancy Clarke Realtor" },
      {
        property: "og:description",
        content:
          "How we collect, use, and protect information submitted through nancyclarkerealtor.com.",
      },
      { property: "og:url", content: "https://nancyclarkerealtor.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://nancyclarkerealtor.com/privacy" }],
  }),
  component: PrivacyPage,
});

const EFFECTIVE_DATE = "May 15, 2026";

function PrivacyPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Effective {EFFECTIVE_DATE}
        </p>
        <h1 className="mt-3 text-display-2 text-navy">Privacy Policy</h1>
        <p className="mt-6 text-muted-foreground">
          This Privacy Policy explains how Nancy Clarke (&ldquo;Nancy,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us&rdquo;), an independent Sales Associate with
          Adams Homes of Northwest Florida, collects, uses, and shares information
          when you visit{" "}
          <span className="font-medium text-navy">{SITE.domain}</span> (the
          &ldquo;Site&rdquo;) or contact Nancy through the Site.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-navy/85">
          <section>
            <h2 className="text-2xl font-display text-navy">Information we collect</h2>
            <p className="mt-3">
              We collect information you voluntarily provide when you submit the
              contact form, request a buyer or realtor consultation, or sign a buyer
              representation agreement. This typically includes your name, email
              address, phone number, the message you send, and — for representation
              agreements — your address, signature, and the property or community
              you are interested in.
            </p>
            <p className="mt-3">
              We also automatically collect limited technical information from your
              device, including IP address, browser type, referring URL, pages
              viewed, and timestamps. This information is used to operate the Site,
              measure traffic, and protect against abuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">How we use information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>To respond to your inquiry and provide real estate services.</li>
              <li>
                To send you property information, community updates, and follow-up
                messages related to your request.
              </li>
              <li>
                To create and store buyer representation agreements and intake forms
                you submit.
              </li>
              <li>
                To operate, secure, and improve the Site and measure marketing
                effectiveness.
              </li>
              <li>To comply with legal, regulatory, and brokerage obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Cookies and analytics</h2>
            <p className="mt-3">
              We use cookies and similar technologies for basic Site functionality
              and to measure traffic. We also use the Meta Pixel to understand how
              visitors interact with the Site and the effectiveness of advertising.
              The Meta Pixel may set cookies and share information (such as page
              views and form submissions) with Meta Platforms, Inc. You can manage
              cookies in your browser settings and adjust ad preferences in your
              Facebook or Instagram account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">How we share information</h2>
            <p className="mt-3">
              We do not sell your personal information. We share information only as
              needed to deliver the services you request, including with:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Adams Homes of Northwest Florida and its sales staff, when relevant
                to your inquiry.
              </li>
              <li>
                Cooperating realtors when you have asked Nancy to coordinate with
                your agent.
              </li>
              <li>
                Service providers that host the Site, send email, store documents,
                and provide analytics, under contractual confidentiality obligations.
              </li>
              <li>
                Authorities or third parties when required by law, subpoena, or to
                protect legal rights and safety.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Text messaging</h2>
            <p className="mt-3">
              If you provide your phone number and consent to be contacted, you may
              receive calls or text messages from Nancy regarding your inquiry.
              Message and data rates may apply. Reply STOP to opt out of text
              messages at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Data retention</h2>
            <p className="mt-3">
              We retain inquiry and agreement records for as long as needed to
              provide services and to meet recordkeeping, tax, audit, and legal
              obligations under Florida real estate law. You may request deletion of
              your information by contacting us, subject to those obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Your choices</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of personal
              information you have submitted by emailing{" "}
              <a className="text-navy underline" href={SITE.emailHref}>
                {SITE.email}
              </a>
              . You may opt out of future marketing emails using the unsubscribe
              link in any message we send.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Children&rsquo;s privacy</h2>
            <p className="mt-3">
              The Site is intended for adults considering a real estate transaction.
              We do not knowingly collect personal information from children under
              13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Changes to this policy</h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. The
              &ldquo;Effective&rdquo; date at the top reflects the most recent
              revision. Material changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Contact</h2>
            <p className="mt-3">
              Questions about this Privacy Policy can be directed to Nancy Clarke at{" "}
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
