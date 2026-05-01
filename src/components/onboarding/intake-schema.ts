/**
 * Intake form schema. Generic field definitions consumed by the form
 * renderer. Keep this file UI-agnostic — it defines what to ask, not how
 * to render it.
 */

export type FieldType =
  | "short-text"
  | "long-text"
  | "email"
  | "tel"
  | "url"
  | "radio"
  | "checkbox-group"
  | "select"
  | "file"
  | "repeater"; // for testimonials etc.

export interface FieldOption {
  value: string;
  label: string;
}

export interface RepeaterItem {
  key: string;
  label: string;
  type: Exclude<FieldType, "repeater">;
}

export interface Field {
  /** Stored under this key in `form_data` */
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: FieldOption[];
  /** For repeater: the sub-fields per item */
  itemFields?: RepeaterItem[];
  /** Conditional render: only show when another field has this value */
  conditionalOn?: { field: string; equals: string };
  /** For file uploads: accepted MIME types */
  accept?: string;
  /** For file uploads: allow multiple */
  multiple?: boolean;
}

export interface IntakeSection {
  /** Stable key (used for navigation, completion tracking) */
  key: string;
  title: string;
  description?: string;
  fields: Field[];
  /** Conditional: only render this section for certain client_slug values */
  conditionalOnClient?: string[];
  /** Conditional: render only when prior field answer matches */
  conditionalOnField?: { field: string; equals: string };
}

/**
 * 9 sections — 8 universal + Nancy-specific addendum (Section 9).
 * Nancy's engagement includes ads, so Section 6 (Advertising Setup)
 * is included unconditionally for her.
 */
export const INTAKE_SECTIONS: IntakeSection[] = [
  // ===== Section 1 =====
  {
    key: "about",
    title: "About You and Your Business",
    description: "The basics — who you are and what you do.",
    fields: [
      { name: "full_name", label: "Your full name", type: "short-text", required: true, placeholder: "Nancy Clarke" },
      { name: "business_name", label: "Business name", type: "short-text", required: true },
      { name: "role", label: "Your role / title", type: "short-text", required: true },
      { name: "email", label: "Best email", type: "email", required: true },
      { name: "phone", label: "Best phone", type: "tel", required: true },
      { name: "address", label: "Business address", type: "long-text" },
      { name: "service_area", label: "Service area / territory", type: "short-text", required: true },
      { name: "business_description", label: "Brief description of your business", type: "long-text", required: true, helpText: "2-4 sentences." },
    ],
  },

  // ===== Section 2 =====
  {
    key: "brand",
    title: "Brand and Marketing Assets",
    description: "Visuals and voice we'll use across the site and ads.",
    fields: [
      { name: "headshot", label: "Professional headshot", type: "file", accept: "image/*", helpText: "High-res preferred." },
      { name: "logo", label: "Logo file (if you have one)", type: "file", accept: "image/*,.svg,.ai,.pdf" },
      { name: "photos", label: "Other photos to use (homes, listings, lifestyle)", type: "file", accept: "image/*", multiple: true },
      { name: "brand_colors", label: "Brand colors (hex codes if known)", type: "short-text", placeholder: "e.g. #0F2547, #C8A24F" },
      { name: "brand_fonts", label: "Preferred fonts (if any)", type: "short-text" },
      { name: "tone_of_voice", label: "How should the brand sound? (warm, expert, friendly, polished…)", type: "long-text" },
    ],
  },

  // ===== Section 3 =====
  {
    key: "domain",
    title: "Domain and Existing Website",
    fields: [
      {
        name: "domain_status",
        label: "Do you already own a domain?",
        type: "radio",
        required: true,
        options: [
          { value: "owned", label: "Yes — I own it" },
          { value: "need", label: "No — I need to register one" },
          { value: "unsure", label: "Not sure" },
        ],
      },
      { name: "domain_name", label: "Domain name", type: "short-text", placeholder: "nancyclarkerealtor.com" },
      { name: "registrar", label: "Where is it registered? (GoDaddy, Namecheap, etc.)", type: "short-text" },
      { name: "current_website", label: "Current website URL (if any)", type: "url" },
      { name: "current_hosting", label: "Current hosting provider (if any)", type: "short-text" },
      { name: "domain_email", label: "Custom email at this domain? (e.g. nancy@…)", type: "short-text" },
    ],
  },

  // ===== Section 4 =====
  {
    key: "social",
    title: "Social Media Accounts",
    description: "Links to anything you actively use.",
    fields: [
      { name: "facebook_url", label: "Facebook page URL", type: "url" },
      { name: "instagram_url", label: "Instagram URL", type: "url" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "url" },
      { name: "youtube_url", label: "YouTube URL", type: "url" },
      { name: "tiktok_url", label: "TikTok URL", type: "url" },
      { name: "other_social", label: "Other social URLs", type: "long-text" },
    ],
  },

  // ===== Section 5 =====
  {
    key: "testimonials",
    title: "Testimonials and Reviews",
    description: "Quotes from past clients we can feature on the site.",
    fields: [
      {
        name: "testimonials",
        label: "Testimonials",
        type: "repeater",
        itemFields: [
          { key: "quote", label: "Quote", type: "long-text" },
          { key: "from", label: "From (name + role)", type: "short-text" },
          { key: "when", label: "When (year or month/year)", type: "short-text" },
        ],
      },
    ],
  },

  // ===== Section 6 — Advertising (always included for Nancy) =====
  {
    key: "advertising",
    title: "Advertising Setup",
    description: "For the Meta ads engagement.",
    fields: [
      { name: "meta_business_id", label: "Meta Business Manager ID (if known)", type: "short-text" },
      { name: "facebook_page_url", label: "Facebook page URL for ads", type: "url" },
      {
        name: "ads_manager_status",
        label: "Do you have an active Meta Ads Manager account?",
        type: "radio",
        options: [
          { value: "active", label: "Yes — active account" },
          { value: "exists_inactive", label: "Account exists but inactive" },
          { value: "none", label: "No — need to create one" },
        ],
      },
      { name: "payment_method_last4", label: "Ads payment method (last 4 of card)", type: "short-text", placeholder: "1234" },
      { name: "asset_folder_link", label: "Link to existing ad creative / asset folder (Drive, Dropbox)", type: "url" },
      { name: "sales_tracking", label: "How are you currently tracking sales / leads?", type: "long-text" },
    ],
  },

  // ===== Section 7 =====
  {
    key: "communication",
    title: "Communication Preferences",
    fields: [
      {
        name: "preferred_contact",
        label: "Best way to reach you",
        type: "radio",
        required: true,
        options: [
          { value: "email", label: "Email" },
          { value: "text", label: "Text" },
          { value: "phone", label: "Phone" },
        ],
      },
      {
        name: "preferred_time",
        label: "Best time of day",
        type: "radio",
        options: [
          { value: "morning", label: "Morning" },
          { value: "afternoon", label: "Afternoon" },
          { value: "evening", label: "Evening" },
        ],
      },
      { name: "time_zone", label: "Time zone", type: "short-text", placeholder: "EST" },
      {
        name: "checkin_frequency",
        label: "How often do you want check-ins?",
        type: "radio",
        options: [
          { value: "weekly", label: "Weekly" },
          { value: "biweekly", label: "Bi-weekly" },
          { value: "monthly", label: "Monthly" },
        ],
      },
    ],
  },

  // ===== Section 8 =====
  {
    key: "anything_else",
    title: "Anything Else?",
    fields: [
      {
        name: "anything_else",
        label: "Anything else we should know — concerns, hopes, deal-breakers, ideas?",
        type: "long-text",
      },
    ],
  },

  // ===== Section 9 — Nancy-specific =====
  {
    key: "nancy_addendum",
    title: "Nancy-Specific Details",
    description: "A few things specific to your Adams Homes engagement and partner network.",
    conditionalOnClient: ["nancy-clarke"],
    fields: [
      { name: "adams_corporate_url", label: "Adams Homes corporate website URL", type: "url", placeholder: "https://www.adamshomes.com" },
      { name: "adams_regional_manager_name", label: "Adams Homes regional manager — name", type: "short-text" },
      { name: "adams_regional_manager_email", label: "Adams Homes regional manager — email", type: "email" },
      { name: "adams_marketing_rules", label: "Adams Homes marketing / co-branding rules to know about", type: "long-text" },

      // Acrisure confirmation
      {
        name: "acrisure_contact_confirmation",
        label: "Is Scott Stinson still your main contact at Acrisure Mortgage?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "Yes — Scott is still my main contact" },
          { value: "someone_else", label: "No — someone else on his team" },
        ],
      },
      {
        name: "acrisure_alternate_contact",
        label: "Who is the new contact?",
        type: "short-text",
        conditionalOn: { field: "acrisure_contact_confirmation", equals: "someone_else" },
      },

      // Guild confirmation
      {
        name: "guild_address_confirmation",
        label: "Did Gino Giandurco move to 1860 SW Fountainview Blvd, Suite 109 when he switched to Guild Mortgage?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "Yes — that's the correct new address" },
          { value: "no", label: "No — different address" },
        ],
      },
      {
        name: "guild_correct_address",
        label: "What is the correct address?",
        type: "long-text",
        conditionalOn: { field: "guild_address_confirmation", equals: "no" },
      },

      // Territory + partners
      {
        name: "territory_confirmation",
        label: "Is your service territory still PSL / Fort Pierce / Okeechobee County?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "Yes — that's correct" },
          { value: "different", label: "No — different territory" },
        ],
      },
      {
        name: "territory_correction",
        label: "What's the correct territory?",
        type: "long-text",
        conditionalOn: { field: "territory_confirmation", equals: "different" },
      },
      {
        name: "realtor_partners",
        label: "2-3 example realtor partners (name, brokerage, why the partnership works)",
        type: "long-text",
        helpText: "One per line is fine.",
      },
    ],
  },
];

/** Total section count for the current client (after conditional filters). */
export function getSectionsForClient(clientSlug: string): IntakeSection[] {
  return INTAKE_SECTIONS.filter(
    (s) => !s.conditionalOnClient || s.conditionalOnClient.includes(clientSlug),
  );
}

/** Required fields completed in a section, given current form_data. */
export function isSectionComplete(section: IntakeSection, data: Record<string, unknown>): boolean {
  const requiredFields = section.fields.filter((f) => {
    if (!f.required) return false;
    if (f.conditionalOn) {
      return data[f.conditionalOn.field] === f.conditionalOn.equals;
    }
    return true;
  });
  if (requiredFields.length === 0) {
    // Section has no required fields — consider complete if any field has a value
    return section.fields.some((f) => {
      const v = data[f.name];
      return v !== undefined && v !== null && v !== "";
    });
  }
  return requiredFields.every((f) => {
    const v = data[f.name];
    return v !== undefined && v !== null && v !== "";
  });
}

export function isSectionStarted(section: IntakeSection, data: Record<string, unknown>): boolean {
  return section.fields.some((f) => {
    const v = data[f.name];
    return v !== undefined && v !== null && v !== "";
  });
}
