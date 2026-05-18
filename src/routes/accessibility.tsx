import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/accessibility")({
  head: () => ({
    meta: [
      { title: "Accessibility — Nancy Clarke Realtor" },
      {
        name: "description",
        content:
          "Nancy Clarke's commitment to making nancyclarkerealtor.com usable for everyone, including people with disabilities.",
      },
      { property: "og:title", content: "Accessibility — Nancy Clarke Realtor" },
      {
        property: "og:description",
        content:
          "Our commitment to WCAG 2.1 AA accessibility on nancyclarkerealtor.com.",
      },
      { property: "og:url", content: "https://nancyclarkerealtor.com/accessibility" },
    ],
    links: [{ rel: "canonical", href: "https://nancyclarkerealtor.com/accessibility" }],
  }),
  component: AccessibilityPage,
});

const EFFECTIVE_DATE = "May 15, 2026";

function AccessibilityPage() {
  return (
    <Section tone="cream">
      <Container size="narrow">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Updated {EFFECTIVE_DATE}
        </p>
        <h1 className="mt-3 text-display-2 text-navy">Accessibility Statement</h1>
        <p className="mt-6 text-muted-foreground">
          Nancy Clarke is committed to making{" "}
          <span className="font-medium text-navy">{SITE.domain}</span> accessible to
          the widest possible audience, including buyers, sellers, and cooperating
          realtors who use assistive technology.
        </p>

        <div className="mt-12 space-y-10 text-base leading-relaxed text-navy/85">
          <section>
            <h2 className="text-2xl font-display text-navy">Our commitment</h2>
            <p className="mt-3">
              We strive to align this Site with the Web Content Accessibility
              Guidelines (WCAG) 2.1 Level AA, an internationally recognized
              standard for accessible web content. We also work in the spirit of
              the Americans with Disabilities Act (ADA) and the Fair Housing Act,
              which protects equal access to housing information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">What we&rsquo;ve done</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Semantic HTML structure with clear headings and landmarks.</li>
              <li>
                Color combinations chosen to meet WCAG AA contrast ratios for body
                text and interactive elements.
              </li>
              <li>
                Keyboard-navigable menus, forms, and interactive controls with
                visible focus states.
              </li>
              <li>Descriptive alternative text for meaningful images.</li>
              <li>
                Form fields with associated labels, helpful error messages, and
                required-field indicators.
              </li>
              <li>
                Responsive layouts that scale comfortably on mobile, tablet, and
                desktop without loss of content.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Ongoing work</h2>
            <p className="mt-3">
              Accessibility is an ongoing effort, not a one-time fix. We
              periodically review the Site, incorporate feedback, and update pages
              as content evolves. Some third-party content (such as embedded video
              from external platforms or legacy inventory media) may not yet meet
              the same standard; we are working to improve it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Need help or alternative formats?</h2>
            <p className="mt-3">
              If you have difficulty accessing any part of this Site, need an
              alternative format, or want help completing a form or buyer
              representation agreement, Nancy will personally assist you. There is
              no cost or obligation to ask.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Phone:{" "}
                <a className="text-navy underline" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                Email:{" "}
                <a className="text-navy underline" href={SITE.emailHref}>
                  {SITE.email}
                </a>
              </li>
            </ul>
            <p className="mt-3">
              When you contact us, please describe the page or content involved and
              the assistive technology you use. We aim to respond within two
              business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display text-navy">Equal Housing Opportunity</h2>
            <p className="mt-3">
              Nancy Clarke and Adams Homes of Northwest Florida support the Fair
              Housing Act and Equal Housing Opportunity. Housing opportunities are
              made available without regard to race, color, religion, sex,
              handicap, familial status, national origin, or any other class
              protected by law.
            </p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
