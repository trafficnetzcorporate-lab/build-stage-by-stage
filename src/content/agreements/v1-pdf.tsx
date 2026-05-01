/**
 * Service agreement v1 — PDF version using @react-pdf/renderer.
 * Mirrors `v1.tsx` content. Rendered client-side and downloaded as a Blob.
 */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

// Use built-in Helvetica family — no font registration needed, no network fetch.

const styles = StyleSheet.create({
  page: {
    padding: 56,
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: "#0F2547",
    lineHeight: 1.5,
  },
  h1: { fontSize: 22, fontFamily: "Helvetica-Bold", marginBottom: 14 },
  h2: { fontSize: 14, fontFamily: "Helvetica-Bold", marginTop: 18, marginBottom: 8 },
  h3: { fontSize: 11.5, fontFamily: "Helvetica-Bold", marginTop: 12, marginBottom: 6 },
  p: { marginBottom: 6 },
  li: { marginBottom: 3, paddingLeft: 12 },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#C8A24F",
    marginVertical: 12,
  },
  meta: { marginBottom: 4 },
  bold: { fontFamily: "Helvetica-Bold" },
  italic: { fontFamily: "Helvetica-Oblique" },
  signatureBlock: {
    marginTop: 28,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#0F2547",
  },
  signatureImage: { width: 240, height: 90, marginVertical: 8 },
  signatureLine: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    marginTop: 6,
  },
  small: { fontSize: 9, color: "#5b6373" },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 56,
    right: 56,
    fontSize: 8,
    color: "#5b6373",
    textAlign: "center",
  },
});

interface AgreementPDFProps {
  clientName: string;
  signatureDataUrl: string;
  signedAtIso: string;
  agreementNumber: string;
  ipAddress?: string | null;
  userAgent?: string | null;
}

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.li}>• {children}</Text>
);

export function AgreementPDF({
  clientName,
  signatureDataUrl,
  signedAtIso,
  agreementNumber,
  ipAddress,
  userAgent,
}: AgreementPDFProps) {
  const signedDate = new Date(signedAtIso);
  const signedDateLong = signedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document
      title={`JMS Web Studio Service Agreement — ${clientName}`}
      author="JMS Web Studio"
      subject={`Service Agreement ${agreementNumber}`}
    >
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>Service Agreement</Text>
        <Text style={styles.meta}>
          <Text style={styles.bold}>Between: </Text>
          JMS Web Studio (operated by J. Michael Duclair) — "Service Provider"
        </Text>
        <Text style={styles.meta}>
          <Text style={styles.bold}>And: </Text>
          {clientName} — "Client"
        </Text>
        <Text style={styles.meta}>
          <Text style={styles.bold}>Effective Date: </Text>
          {signedDateLong}
        </Text>
        <Text style={styles.meta}>
          <Text style={styles.bold}>Agreement #: </Text>
          {agreementNumber}
        </Text>

        <View style={styles.hr} />

        <Text style={styles.h2}>1. Overview</Text>
        <Text style={styles.p}>
          This agreement covers two distinct services Service Provider will deliver to Client:
        </Text>
        <Bullet>
          <Text style={styles.bold}>Service A:</Text> Website design, development, hosting, and ongoing
          maintenance ("Website Services")
        </Bullet>
        <Bullet>
          <Text style={styles.bold}>Service B:</Text> Meta (Facebook + Instagram) advertising management on a
          case-study basis ("Ad Services")
        </Bullet>
        <Text style={styles.p}>
          Each service has its own scope, fees, and termination terms, defined below.
        </Text>

        <Text style={styles.h2}>2. Service A — Website Services ($500 / month retainer)</Text>
        <Text style={styles.h3}>2.1 What's included each month</Text>
        <Text style={styles.p}>For the monthly retainer fee, Service Provider will provide:</Text>
        <Bullet>Hosting and uptime monitoring of the website at nancyclarkerealtor.com</Bullet>
        <Bullet>Up to five (5) small content edits per month</Bullet>
        <Bullet>Up to two (2) hours of design or layout adjustments per month</Bullet>
        <Bullet>One (1) 30-minute monthly check-in call</Bullet>
        <Bullet>Domain renewal management (Client responsible for cost not exceeding $25/year)</Bullet>
        <Bullet>Basic analytics review and reporting, monthly</Bullet>
        <Bullet>Bug fixes and security updates as needed</Bullet>
        <Bullet>Coverage of third-party platform fees up to $20/month total</Bullet>

        <Text style={styles.h3}>2.2 What's not included</Text>
        <Text style={styles.p}>Out of scope, quoted separately:</Text>
        <Bullet>New pages, sections, or features beyond the original build</Bullet>
        <Bullet>Major redesigns or visual overhauls</Bullet>
        <Bullet>Integrations with new third-party tools</Bullet>
        <Bullet>E-commerce functionality</Bullet>
        <Bullet>Custom backend development beyond original</Bullet>
        <Bullet>Email marketing setup or management</Bullet>
        <Bullet>SEO campaigns beyond on-site optimization in original build</Bullet>
        <Bullet>Copywriting beyond minor edits</Bullet>
        <Text style={styles.p}>For out-of-scope work, Service Provider provides written quote first.</Text>

        <Text style={styles.h3}>2.3 Fees and payment</Text>
        <Bullet>
          Monthly retainer: <Text style={styles.bold}>$500 USD per month</Text>, due 1st of each month
        </Bullet>
        <Bullet>Payment method: Stripe autopay</Bullet>
        <Bullet>First month's payment, already received, credited as inaugural month</Bullet>
        <Bullet>Late payments (more than 7 days past due) may result in suspension until current</Bullet>

        <Text style={styles.h3}>2.4 Term and termination</Text>
        <Bullet>Initial term: month-to-month, automatically renewing</Bullet>
        <Bullet>Either party may terminate with 30 days written notice</Bullet>
        <Bullet>No early termination fees</Bullet>
        <Bullet>
          Upon termination, Service Provider transfers GitHub repository, domain ownership, and Client-provided
          content to Client at no cost. Service Provider retains rights to design system components, internal
          tooling, and case study materials. Client is responsible for finding new hosting after the 30-day
          notice period.
        </Bullet>
      </Page>

      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h2}>3. Service B — Ad Services (Case-Study Engagement)</Text>

        <Text style={styles.h3}>3.1 The arrangement</Text>
        <Text style={styles.p}>
          Service Provider will manage Client's Meta advertising at{" "}
          <Text style={styles.bold}>no management fee</Text> for a defined period, in exchange for the right to
          use the engagement as a public case study (Section 4).
        </Text>
        <Text style={styles.p}>
          Client pays only for ad spend, charged directly by Meta to Client's payment method. Service Provider
          does not handle, hold, or invoice ad spend.
        </Text>

        <Text style={styles.h3}>3.2 Scope of Ad Services</Text>
        <Text style={styles.p}>Service Provider provides:</Text>
        <Bullet>Initial setup of Meta Business Manager, ad account, Facebook Pixel, Instagram connection</Bullet>
        <Bullet>Campaign strategy and audience targeting</Bullet>
        <Bullet>Ad creative selection from Client's existing asset library</Bullet>
        <Bullet>Campaign launch, monitoring, optimization, and budget management</Bullet>
        <Bullet>Monthly performance reports (ROAS, lead volume, cost per acquisition)</Bullet>
        <Bullet>Quarterly strategy reviews</Bullet>
        <Text style={styles.p}>NOT provided:</Text>
        <Bullet>Production of new ad creative (separately quoted)</Bullet>
        <Bullet>Management of organic social media posting</Bullet>
        <Bullet>Email or SMS marketing</Bullet>
        <Bullet>Landing page development beyond existing website</Bullet>

        <Text style={styles.h3}>3.3 Initial budget and budget escalation</Text>
        <Bullet>
          Initial monthly ad spend: <Text style={styles.bold}>$500/month</Text>, paid by Client directly to Meta
        </Bullet>
        <Bullet>
          Client agrees to incrementally increase ad budget when 14-day rolling ROAS exceeds 3x, in mutually-agreed
          increments
        </Bullet>
        <Bullet>
          Maximum monthly ad spend during case-study period capped at $5,000/month unless both parties agree in
          writing
        </Bullet>
        <Bullet>Client retains full authority to pause, reduce, or stop ad spend at any time</Bullet>

        <Text style={styles.h3}>3.4 Case-study termination triggers</Text>
        <Text style={styles.p}>Engagement ends when either condition is met, whichever first:</Text>
        <Bullet>
          <Text style={styles.bold}>Trigger A (Success):</Text> Sustained 3x ROAS or higher for 30 consecutive
          days at $1,000+/month ad spend
        </Bullet>
        <Bullet>
          <Text style={styles.bold}>Trigger B (Time Cap):</Text> Ninety (90) days from date ads first go live
        </Bullet>
        <Text style={styles.p}>When either trigger fires, three options:</Text>
        <Bullet>Continue with paid management (Service Provider proposes monthly fee based on ROAS and spend)</Bullet>
        <Bullet>End the engagement (no further obligation; Client retains ad account, pixel data, audience lists, creative)</Bullet>
        <Bullet>Renegotiate case-study terms in writing</Bullet>

        <Text style={styles.h3}>3.5 If Trigger A is not reached by Day 90</Text>
        <Text style={styles.p}>
          Case-study engagement ends automatically. Service Provider may still use engagement as case study
          (Section 4) if it honestly represents outcomes achieved.
        </Text>

        <Text style={styles.h2}>4. Case Study Rights</Text>
        <Text style={styles.p}>
          In exchange for Service B at no management fee, Client grants Service Provider rights to:
        </Text>
        <Bullet>
          Publicly describe engagement, methodology, results, and approximate revenue figures in case studies,
          sales materials, social media, video, and pitches
        </Bullet>
        <Bullet>
          Use Client's name, business name, photo (current professional headshot only), and quoted testimonials
          provided by Client
        </Bullet>
        <Bullet>
          Share screenshots of Meta Ads Manager performance dashboards (sensitive financial data redacted at
          Client's request)
        </Bullet>
        <Text style={styles.p}>Client retains right to:</Text>
        <Bullet>Review and approve any case study before public publication</Bullet>
        <Bullet>Request reasonable redactions before publication</Bullet>
        <Bullet>Withdraw case study with 30 days notice (Service Provider may keep already-published versions live)</Bullet>
        <Text style={styles.p}>
          If Service B ends without producing a meaningful case study, Service Provider will not publish but may
          reference engagement generically.
        </Text>
      </Page>

      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h2}>5. Mutual Obligations</Text>

        <Text style={styles.h3}>5.1 Client obligations</Text>
        <Bullet>Provide timely access to required accounts (Meta, Instagram, domain registrar, etc.)</Bullet>
        <Bullet>Respond to Service Provider's questions within 3 business days when possible</Bullet>
        <Bullet>Provide marketing assets requested for ad creative</Bullet>
        <Bullet>Honor payment terms in Section 2.3</Bullet>
        <Bullet>Not run competing or conflicting ad campaigns through other parties without notifying Service Provider</Bullet>
        <Bullet>Maintain a valid Meta Ads payment method</Bullet>

        <Text style={styles.h3}>5.2 Service Provider obligations</Text>
        <Bullet>Deliver Website Services as defined in Section 2</Bullet>
        <Bullet>Manage Ad Services with care, attention, and same standard of professional effort as paid engagement</Bullet>
        <Bullet>Communicate honestly about results, including underperformance</Bullet>
        <Bullet>
          Maintain confidentiality of Client's business data, financial details, and non-public information
          except as needed for case study (Section 4)
        </Bullet>
        <Bullet>Not use Client's accounts for any purpose other than this agreement</Bullet>

        <Text style={styles.h2}>6. Liability and Risk</Text>
        <Bullet>Service Provider makes no guarantees about specific business outcomes, revenue figures, lead volume, or ROAS</Bullet>
        <Bullet>Ad performance depends on factors outside Service Provider's control</Bullet>
        <Bullet>Service Provider's total liability under this agreement is limited to fees Client has paid in trailing 90 days</Bullet>
        <Bullet>Neither party liable for indirect, consequential, or punitive damages</Bullet>
        <Bullet>
          Client acknowledges ad spend is paid directly to Meta and is non-refundable; Service Provider not
          responsible for ad spend losses
        </Bullet>

        <Text style={styles.h2}>7. Other Terms</Text>
        <Bullet>Governed by laws of the State of Florida</Bullet>
        <Bullet>Disputes addressed first through good-faith conversation, then mediation before any litigation</Bullet>
        <Bullet>Agreement may only be amended in writing, signed by both parties</Bullet>
        <Bullet>If any clause is unenforceable, rest of agreement remains in effect</Bullet>
        <Bullet>This agreement represents complete understanding between parties; supersedes prior verbal or written agreements</Bullet>

        <Text style={styles.h2}>8. Service Provider Signature</Text>
        <Text style={styles.p}>J. Michael Duclair, JMS Web Studio</Text>
        <Text style={styles.p}>
          <Text style={styles.italic}>Pre-signed digitally on agreement issuance</Text>
        </Text>
        <Text style={styles.p}>Date: April 30, 2026</Text>

        <Text style={styles.h2}>9. Client Signature</Text>
        <Text style={styles.p}>By signing below, Client agrees to all terms above.</Text>

        <View style={styles.signatureBlock}>
          <Image src={signatureDataUrl} style={styles.signatureImage} />
          <Text style={styles.signatureLine}>{clientName}</Text>
          <Text style={styles.small}>Signed electronically on {signedDateLong}</Text>
          {ipAddress ? <Text style={styles.small}>IP address: {ipAddress}</Text> : null}
          {userAgent ? <Text style={styles.small}>User agent: {userAgent}</Text> : null}
          <Text style={[styles.small, { marginTop: 6 }]}>
            This electronic signature has the same legal effect as a handwritten signature under the E-SIGN Act.
          </Text>
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Agreement ${agreementNumber} · Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
