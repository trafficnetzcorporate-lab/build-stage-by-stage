/**
 * Service agreement v1 — display copy as React JSX.
 *
 * Source of truth: render this in the browser. The PDF version
 * (`v1-pdf.tsx`) mirrors this content for @react-pdf/renderer.
 * If you change one, change the other.
 */

export const AGREEMENT_VERSION = "v1";
export const AGREEMENT_NUMBER = "JMS-NC-2026-001";

export function AgreementBody() {
  return (
    <div className="prose prose-navy max-w-none text-navy [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:my-3 [&_ul]:my-3 [&_li]:my-1">
      <h1 className="text-display-3 text-navy">Service Agreement</h1>

      <p>
        <strong>Between:</strong> JMS Web Studio (operated by J. Michael Duclair) — "Service Provider"
        <br />
        <strong>And:</strong> Nancy Clarke — "Client"
        <br />
        <strong>Effective Date:</strong> Date of signature below
      </p>

      <hr />

      <h2>1. Overview</h2>
      <p>This agreement covers two distinct services Service Provider will deliver to Client:</p>
      <ul>
        <li><strong>Service A:</strong> Website design, development, hosting, and ongoing maintenance ("Website Services")</li>
        <li><strong>Service B:</strong> Meta (Facebook + Instagram) advertising management on a case-study basis ("Ad Services")</li>
      </ul>
      <p>Each service has its own scope, fees, and termination terms, defined below.</p>

      <h2>2. Service A — Website Services ($500 / month retainer)</h2>

      <h3>2.1 What's included each month</h3>
      <p>For the monthly retainer fee, Service Provider will provide:</p>
      <ul>
        <li>Hosting and uptime monitoring of the website at nancyclarkerealtor.com</li>
        <li>Up to five (5) small content edits per month</li>
        <li>Up to two (2) hours of design or layout adjustments per month</li>
        <li>One (1) 30-minute monthly check-in call</li>
        <li>Domain renewal management (Client responsible for cost not exceeding $25/year)</li>
        <li>Basic analytics review and reporting, monthly</li>
        <li>Bug fixes and security updates as needed</li>
        <li>Coverage of third-party platform fees up to $20/month total</li>
      </ul>

      <h3>2.2 What's not included</h3>
      <p>Out of scope, quoted separately:</p>
      <ul>
        <li>New pages, sections, or features beyond the original build</li>
        <li>Major redesigns or visual overhauls</li>
        <li>Integrations with new third-party tools</li>
        <li>E-commerce functionality</li>
        <li>Custom backend development beyond original</li>
        <li>Email marketing setup or management</li>
        <li>SEO campaigns beyond on-site optimization in original build</li>
        <li>Copywriting beyond minor edits</li>
      </ul>
      <p>For out-of-scope work, Service Provider provides written quote first.</p>

      <h3>2.3 Fees and payment</h3>
      <ul>
        <li>Monthly retainer: <strong>$500 USD per month</strong>, due 1st of each month</li>
        <li>Payment method: Stripe autopay</li>
        <li>First month's payment, already received, credited as inaugural month</li>
        <li>Late payments (more than 7 days past due) may result in suspension until current</li>
      </ul>

      <h3>2.4 Term and termination</h3>
      <ul>
        <li>Initial term: month-to-month, automatically renewing</li>
        <li>Either party may terminate with 30 days written notice</li>
        <li>No early termination fees</li>
        <li>
          Upon termination, Service Provider transfers GitHub repository, domain ownership, and Client-provided
          content to Client at no cost. Service Provider retains rights to design system components, internal
          tooling, and case study materials. Client is responsible for finding new hosting after the 30-day
          notice period.
        </li>
      </ul>

      <h2>3. Service B — Ad Services (Case-Study Engagement)</h2>

      <h3>3.1 The arrangement</h3>
      <p>
        Service Provider will manage Client's Meta advertising at <strong>no management fee</strong> for a
        defined period, in exchange for the right to use the engagement as a public case study (Section 4).
      </p>
      <p>
        Client pays only for ad spend, charged directly by Meta to Client's payment method. Service Provider
        does not handle, hold, or invoice ad spend.
      </p>

      <h3>3.2 Scope of Ad Services</h3>
      <p>Service Provider provides:</p>
      <ul>
        <li>Initial setup of Meta Business Manager, ad account, Facebook Pixel, Instagram connection</li>
        <li>Campaign strategy and audience targeting</li>
        <li>Ad creative selection from Client's existing asset library</li>
        <li>Campaign launch, monitoring, optimization, and budget management</li>
        <li>Monthly performance reports (ROAS, lead volume, cost per acquisition)</li>
        <li>Quarterly strategy reviews</li>
      </ul>
      <p>NOT provided:</p>
      <ul>
        <li>Production of new ad creative (separately quoted)</li>
        <li>Management of organic social media posting</li>
        <li>Email or SMS marketing</li>
        <li>Landing page development beyond existing website</li>
      </ul>

      <h3>3.3 Initial budget and budget escalation</h3>
      <ul>
        <li>Initial monthly ad spend: <strong>$500/month</strong>, paid by Client directly to Meta</li>
        <li>
          Client agrees to incrementally increase ad budget when 14-day rolling ROAS exceeds 3x, in mutually-agreed
          increments
        </li>
        <li>
          Maximum monthly ad spend during case-study period capped at $5,000/month unless both parties agree in
          writing
        </li>
        <li>Client retains full authority to pause, reduce, or stop ad spend at any time</li>
      </ul>

      <h3>3.4 Case-study termination triggers</h3>
      <p>Engagement ends when either condition is met, whichever first:</p>
      <ul>
        <li>
          <strong>Trigger A (Success):</strong> Sustained 3x ROAS or higher for 30 consecutive days at $1,000+/month
          ad spend
        </li>
        <li><strong>Trigger B (Time Cap):</strong> Ninety (90) days from date ads first go live</li>
      </ul>
      <p>When either trigger fires, three options:</p>
      <ol>
        <li>Continue with paid management (Service Provider proposes monthly fee based on ROAS and spend)</li>
        <li>
          End the engagement (no further obligation; Client retains ad account, pixel data, audience lists,
          creative)
        </li>
        <li>Renegotiate case-study terms in writing</li>
      </ol>

      <h3>3.5 If Trigger A is not reached by Day 90</h3>
      <p>
        Case-study engagement ends automatically. Service Provider may still use engagement as case study
        (Section 4) if it honestly represents outcomes achieved.
      </p>

      <h2>4. Case Study Rights</h2>
      <p>In exchange for Service B at no management fee, Client grants Service Provider rights to:</p>
      <ul>
        <li>
          Publicly describe engagement, methodology, results, and approximate revenue figures in case studies,
          sales materials, social media, video, and pitches
        </li>
        <li>
          Use Client's name, business name, photo (current professional headshot only), and quoted testimonials
          provided by Client
        </li>
        <li>
          Share screenshots of Meta Ads Manager performance dashboards (sensitive financial data redacted at
          Client's request)
        </li>
      </ul>
      <p>Client retains right to:</p>
      <ul>
        <li>Review and approve any case study before public publication</li>
        <li>Request reasonable redactions before publication</li>
        <li>Withdraw case study with 30 days notice (Service Provider may keep already-published versions live)</li>
      </ul>
      <p>
        If Service B ends without producing a meaningful case study, Service Provider will not publish but may
        reference engagement generically.
      </p>

      <h2>5. Mutual Obligations</h2>

      <h3>5.1 Client obligations</h3>
      <ul>
        <li>Provide timely access to required accounts (Meta, Instagram, domain registrar, etc.)</li>
        <li>Respond to Service Provider's questions within 3 business days when possible</li>
        <li>Provide marketing assets requested for ad creative</li>
        <li>Honor payment terms in Section 2.3</li>
        <li>Not run competing or conflicting ad campaigns through other parties without notifying Service Provider</li>
        <li>Maintain a valid Meta Ads payment method</li>
      </ul>

      <h3>5.2 Service Provider obligations</h3>
      <ul>
        <li>Deliver Website Services as defined in Section 2</li>
        <li>Manage Ad Services with care, attention, and same standard of professional effort as paid engagement</li>
        <li>Communicate honestly about results, including underperformance</li>
        <li>
          Maintain confidentiality of Client's business data, financial details, and non-public information except
          as needed for case study (Section 4)
        </li>
        <li>Not use Client's accounts for any purpose other than this agreement</li>
      </ul>

      <h2>6. Liability and Risk</h2>
      <ul>
        <li>
          Service Provider makes no guarantees about specific business outcomes, revenue figures, lead volume, or
          ROAS
        </li>
        <li>Ad performance depends on factors outside Service Provider's control</li>
        <li>Service Provider's total liability under this agreement is limited to fees Client has paid in trailing 90 days</li>
        <li>Neither party liable for indirect, consequential, or punitive damages</li>
        <li>
          Client acknowledges ad spend is paid directly to Meta and is non-refundable; Service Provider not
          responsible for ad spend losses
        </li>
      </ul>

      <h2>7. Other Terms</h2>
      <ul>
        <li>Governed by laws of the State of Florida</li>
        <li>Disputes addressed first through good-faith conversation, then mediation before any litigation</li>
        <li>Agreement may only be amended in writing, signed by both parties</li>
        <li>If any clause is unenforceable, rest of agreement remains in effect</li>
        <li>This agreement represents complete understanding between parties; supersedes prior verbal or written agreements</li>
      </ul>

      <h2>8. Service Provider Signature (pre-filled)</h2>
      <p>
        J. Michael Duclair, JMS Web Studio
        <br />
        Signed: <em>Pre-signed digitally on agreement issuance</em>
        <br />
        Date: April 30, 2026
      </p>

      <h2>9. Client Signature</h2>
      <p>By signing below, Client agrees to all terms above.</p>
    </div>
  );
}
