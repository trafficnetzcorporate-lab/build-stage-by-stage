/**
 * Single source of truth for content that may change frequently or that
 * requires verification before launch.
 */

export const SITE = {
  name: "Nancy Clarke",
  role: "Sales Associate, Adams Homes of Northwest Florida",
  territory: "St. Lucie County, Florida",
  phone: "(772) 899-7333",
  phoneHref: "tel:+17728997333",
  email: "nancy.clarke@adamshomes.com",
  emailHref: "mailto:nancy.clarke@adamshomes.com",
  domain: "nancyclarkerealtor.com",
} as const;

// TODO before launch: Replace these placeholder URLs.
// Nancy's existing ProAgent search currently lives at the root nancyclarkerealtor.com,
// which the new site will replace at DNS swap. Before launch, decide one of:
//   (a) Have ProAgent move her search to a subdomain (e.g. listings.nancyclarkerealtor.com)
//   (b) Link directly to her ProAgent-hosted account URL
//   (c) Drop the link-out entirely and replace this section with a curated showcase
// Add the chosen URLs here and commit before DNS swap.
export const PROAGENT_SEARCH_URL = "PROAGENT_SEARCH_URL_TBD";
export const PROAGENT_PSL_URL = "PROAGENT_PSL_URL_TBD";
export const PROAGENT_FP_URL = "PROAGENT_FP_URL_TBD";
export const PROAGENT_VB_URL = "PROAGENT_VB_URL_TBD";

export const COMMUNITIES = [
  {
    slug: "port-st-lucie",
    name: "Port St. Lucie",
    tagline: "Waterstone Single Family & Villas",
    blurb:
      "Adams Homes' flagship Waterstone communities — single-family homes and villas with low-maintenance living, gated entry, and quick access to I-95.",
  },
  {
    slug: "fort-pierce",
    name: "Fort Pierce",
    tagline: "Coastal-adjacent new construction",
    blurb:
      "Brand-new Adams Homes inventory near the Treasure Coast's working waterfront, with floor plans built for Florida living.",
  },
  {
    slug: "vero-beach",
    name: "Vero Beach",
    tagline: "Established market, new homes",
    blurb:
      "New construction inside a market buyers already know — Vero's lifestyle with the warranty, finishes, and incentives of a brand-new build.",
  },
] as const;

export const MORTGAGE_PARTNERS = [
  {
    name: "The Stinson Team",
    company: "FBC Mortgage",
    title: "Mortgage Loan Origination",
    address: "[VERIFY: 132 W. Plant Street, Suite 210, Winter Garden FL 34787]",
    phone: "[VERIFY: (407) 377-0305]",
    nmls: "[VERIFY: 319684]",
    photoPlaceholder: true,
  },
  {
    name: "Gino Giandurco",
    company: "Bay Equity Home Loans",
    title: "Area Sales Manager",
    address: "[VERIFY: 1531 SE Port St. Lucie Blvd, Suite 106, Port St. Lucie FL 34952]",
    phone: "[VERIFY: (954) 423-5534]",
    nmls: "[VERIFY: 76988]",
    photoPlaceholder: true,
  },
] as const;

export const MORTGAGE_DISCLAIMER =
  "Rates, points and fees are subject to change and cannot be guaranteed. Many factors affect a loan's interest rate, such as property type, loan amount, and/or a borrower's credit-worthiness, and the information contained herein is not a credit-approval or an offer to extend credit, as defined by paragraph 226.24 of regulation Z. For more comprehensive and up-to-the-minute rate information please contact a licensed mortgage professional.";

export const NAV_LINKS = [
  { label: "Listings", to: "/listings" },
  { label: "Communities", to: "/communities" },
  { label: "For Realtors", to: "/realtors" },
  { label: "Buyers", to: "/buyers" },
  { label: "Sellers", to: "/sellers" },
  { label: "Home Loans", to: "/home-loans" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
