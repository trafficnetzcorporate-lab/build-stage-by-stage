import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import * as React from "react";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SITE, CONTACT_CONSENT } from "@/content/site";
import { submitContactFn } from "@/integrations/contact/contact.functions";
import { ContactSchema } from "@/integrations/contact/contact.server";

// TODO(prompt-3B): Preserve this validateSearch contract when building the
// real contact form. The InventoryCard CTA on the homepage carousel,
// /communities carousel, and /communities/inventory grid all deep-link
// here as <Link to="/contact" search={{ property, community }}>. The form
// must read these params and pre-fill the message field. Removing or
// renaming these fields breaks the inventory → contact integration silently.
const contactSearchSchema = z.object({
  property: fallback(z.string(), "").default(""),
  community: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/contact")({
  validateSearch: zodValidator(contactSearchSchema),
  head: () => ({
    meta: [
      { title: "Contact Nancy Clarke — Adams Homes, St. Lucie County" },
      {
        name: "description",
        content:
          "Get in touch with Nancy Clarke. Realtor partnerships and buyer inquiries welcome.",
      },
    ],
  }),
  component: ContactPage,
});

type Audience = "realtor" | "buyer";

const REALTOR_AREAS = [
  "Port St. Lucie",
  "Fort Pierce",
  "Okeechobee County",
  "Other",
  "Buyer is exploring",
] as const;

const REALTOR_TIMELINES = [
  "Ready now",
  "30 days",
  "60-90 days",
  "Just exploring",
] as const;

const BUYER_COMMUNITIES = [
  "Waterstone",
  "Bayshore",
  "Gatlin",
  "Indian River Estates",
  "Torino & St. James",
  "Okeechobee",
  "Not sure",
] as const;

const BUYER_BUDGETS = ["Under $300k", "$300-400k", "$400-500k", "$500k+"] as const;
const BUYER_MOVE_INS = ["ASAP", "3 months", "6 months", "Just researching"] as const;

function ContactPage() {
  const { property, community } = Route.useSearch();
  const hasInquiry = !!(property || community);
  const submit = useServerFn(submitContactFn);

  // Always default to "realtor" — even when arriving from an inventory card.
  // Realtors and buyers can both arrive on the same URL; auto-switching would
  // mis-tag realtor referrals as buyer inquiries.
  const [audience, setAudience] = React.useState<Audience>("realtor");

  const defaultMessage = React.useMemo(() => {
    if (!hasInquiry) return "";
    const what = property || "this property";
    const where = community ? ` in ${community}` : "";
    return `I'm interested in ${what}${where}. Please reach out about availability.`;
  }, [property, community, hasInquiry]);

  const [form, setForm] = React.useState<Record<string, string>>(() => ({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: defaultMessage,
    brokerage: "",
    buyerArea: REALTOR_AREAS[0],
    buyerTimeline: REALTOR_TIMELINES[0],
    preferredCommunity: BUYER_COMMUNITIES[0],
    budget: BUYER_BUDGETS[0],
    moveInTimeline: BUYER_MOVE_INS[0],
  }));
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Re-fill message if user arrives at /contact via client nav with new params
  // and hasn't typed anything custom yet.
  React.useEffect(() => {
    setForm((f) => (f.message === "" ? { ...f, message: defaultMessage } : f));
  }, [defaultMessage]);

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const payload =
      audience === "realtor"
        ? {
            audience: "realtor" as const,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            message: form.message,
            consent: consent as true,
            property,
            community,
            brokerage: form.brokerage,
            buyerArea: form.buyerArea as (typeof REALTOR_AREAS)[number],
            buyerTimeline: form.buyerTimeline as (typeof REALTOR_TIMELINES)[number],
          }
        : {
            audience: "buyer" as const,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            message: form.message,
            consent: consent as true,
            property,
            community,
            preferredCommunity: form.preferredCommunity as (typeof BUYER_COMMUNITIES)[number],
            budget: form.budget as (typeof BUYER_BUDGETS)[number],
            moveInTimeline: form.moveInTimeline as (typeof BUYER_MOVE_INS)[number],
          };

    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "_";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      if (!consent && !fieldErrors.consent)
        fieldErrors.consent = "Required to send your message.";
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      await submit({ data: parsed.data });
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section tone="cream" size="lg">
      <Container>
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-display-2 mt-4 max-w-3xl text-navy">
            Talk to Nancy.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Whether you're a realtor with a buyer or buying for yourself, this form
            goes straight to Nancy.
          </p>

          {submitted ? (
            <SuccessState />
          ) : (
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              {/* LEFT: form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {hasInquiry ? (
                  <div className="rounded-lg border-l-4 border-gold bg-cream-deep px-4 py-3 text-sm text-navy">
                    You're inquiring about:{" "}
                    <span className="font-semibold">{community || "(community)"}</span>
                    {property ? (
                      <>
                        {" "}
                        — <span className="font-mono text-xs">{property}</span>
                      </>
                    ) : null}
                    . We'll include this in your message.
                  </div>
                ) : null}

                {/* Audience toggle */}
                <div className="inline-flex rounded-full border border-navy/15 bg-white p-1">
                  {(["realtor", "buyer"] as const).map((a) => {
                    const active = audience === a;
                    const activeBg = a === "realtor" ? "bg-success text-cream" : "bg-gold text-navy-deep";
                    return (
                      <button
                        type="button"
                        key={a}
                        onClick={() => setAudience(a)}
                        className={
                          "rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
                          (active ? activeBg : "text-navy hover:text-navy-deep")
                        }
                      >
                        {a === "realtor" ? "I'm a Realtor" : "I'm a Buyer"}
                      </button>
                    );
                  })}
                </div>

                {/* Shared fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldText
                    id="firstName"
                    label="First name"
                    value={form.firstName}
                    onChange={update("firstName")}
                    error={errors.firstName}
                    required
                  />
                  <FieldText
                    id="lastName"
                    label="Last name"
                    value={form.lastName}
                    onChange={update("lastName")}
                    error={errors.lastName}
                    required
                  />
                  <FieldText
                    id="email"
                    type="email"
                    label="Email"
                    value={form.email}
                    onChange={update("email")}
                    error={errors.email}
                    required
                  />
                  <FieldText
                    id="phone"
                    type="tel"
                    label="Phone"
                    value={form.phone}
                    onChange={update("phone")}
                    error={errors.phone}
                    required
                  />
                </div>

                {/* Conditional fields */}
                {audience === "realtor" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldText
                      id="brokerage"
                      label="Brokerage"
                      value={form.brokerage}
                      onChange={update("brokerage")}
                      error={errors.brokerage}
                      required
                    />
                    <FieldSelect
                      id="buyerArea"
                      label="Buyer's preferred area"
                      value={form.buyerArea}
                      onChange={update("buyerArea")}
                      options={REALTOR_AREAS}
                    />
                    <FieldSelect
                      id="buyerTimeline"
                      label="Buyer timeline"
                      value={form.buyerTimeline}
                      onChange={update("buyerTimeline")}
                      options={REALTOR_TIMELINES}
                    />
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FieldSelect
                      id="preferredCommunity"
                      label="Preferred community"
                      value={form.preferredCommunity}
                      onChange={update("preferredCommunity")}
                      options={BUYER_COMMUNITIES}
                    />
                    <FieldSelect
                      id="budget"
                      label="Budget range"
                      value={form.budget}
                      onChange={update("budget")}
                      options={BUYER_BUDGETS}
                    />
                    <FieldSelect
                      id="moveInTimeline"
                      label="Move-in timeline"
                      value={form.moveInTimeline}
                      onChange={update("moveInTimeline")}
                      options={BUYER_MOVE_INS}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="message" className="text-sm font-semibold text-navy">
                    Message <span className="font-normal text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    className="mt-1.5"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3 rounded-lg bg-white/60 p-4">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="consent" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
                    {CONTACT_CONSENT}
                  </Label>
                </div>
                {errors.consent ? (
                  <p className="-mt-4 text-xs text-destructive">{errors.consent}</p>
                ) : null}

                {serverError ? (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {serverError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-success px-6 text-sm font-semibold text-cream shadow shadow-success/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto sm:min-w-[220px]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Securely
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* RIGHT: direct contact */}
              <aside className="space-y-6">
                <div className="rounded-2xl bg-white p-6 ring-1 ring-navy/10">
                  <p className="text-eyebrow text-gold">Direct line</p>
                  <a
                    href={SITE.phoneHref}
                    className="mt-2 block font-display text-[36px] leading-tight text-navy hover:text-navy-deep"
                  >
                    {SITE.phone}
                  </a>
                  <a
                    href={SITE.emailHref}
                    className="mt-3 block text-sm text-navy underline-offset-4 hover:underline"
                  >
                    {SITE.email}
                  </a>
                </div>

                <div className="rounded-2xl border-l-4 border-gold bg-cream-deep p-6">
                  <p className="text-sm font-semibold text-navy">My promise:</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy/80">
                    Every realtor inquiry gets a personal response. New construction
                    buyers move fast — so do I.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

function SuccessState() {
  return (
    <div className="mt-12 rounded-3xl border border-success/30 bg-white p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success text-cream">
        <Check className="h-7 w-7" />
      </div>
      <h2 className="mt-6 font-display text-2xl text-navy">
        Got it. I'll be in touch shortly.
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">— Nancy</p>
    </div>
  );
}

function FieldText({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-navy">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1.5"
        aria-invalid={!!error}
      />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function FieldSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: readonly string[];
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
