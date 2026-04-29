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

/**
 * Hero slideshow images. File order = display order. hero-01 is the lead image.
 * Imported as ES modules so Vite emits content-hashed URLs in production
 * (e.g. /assets/hero-01-a1b2c3d4.jpg) and serves a fresh URL in dev whenever
 * the source bytes change — no stale-cache surprises in the preview iframe.
 */
import hero01 from "@/assets/hero/hero-01.jpg";
import hero02 from "@/assets/hero/hero-02.jpg";
import hero03 from "@/assets/hero/hero-03.jpg";
import hero04 from "@/assets/hero/hero-04.jpg";
import hero05 from "@/assets/hero/hero-05.jpg";
import hero06 from "@/assets/hero/hero-06.jpg";
import hero07 from "@/assets/hero/hero-07.jpg";
import hero08 from "@/assets/hero/hero-08.jpg";

export const HERO_IMAGES = [
  { src: hero01, alt: "Waterstone clubhouse exterior" },
  { src: hero02, alt: "Waterstone clubhouse interior lounge" },
  { src: hero03, alt: "Community fitness center" },
  { src: hero04, alt: "Community kids playroom" },
  { src: hero05, alt: "Resort-style community pool from above" },
  { src: hero06, alt: "Pickleball court at Waterstone" },
  { src: hero07, alt: "Community playground" },
  { src: hero08, alt: "Aerial view of Waterstone community" },
] as const;

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

/**
 * Verified buyer testimonials from Nancy's existing site.
 * Do not invent. Do not edit attributions. New testimonials require Nancy's written approval.
 */
export const TESTIMONIALS = [
  {
    quote:
      "Nancy is a 10! She was wonderful, a delight, impeccable at her job. The team was amazing!",
    attribution: "Velez Family",
    type: "Buyer",
  },
  {
    quote:
      "100% excellent help through the process. Nancy was very responsive and called back every message. She checked on me after closing and that was good. Kept me right on task and with updates through the process. It was nice and smooth for me — I have no complaints and everything was fast.",
    attribution: "C. Jackson Family",
    type: "Buyer",
  },
  {
    quote:
      "Nancy went above and beyond. After my bad experience with another agent, Nancy never abandoned me or anything I needed. I would rate her a 10! I was dealing with something crazy with work and she respected our schedule and religious needs.",
    attribution: "Mendes Family",
    type: "Buyer",
  },
  {
    quote:
      "Ms. Nancy was awesome! Everyone all together makes it happen, everyone was on top of their game with me and I could call and get answers and recommendations for my next steps any time.",
    attribution: "McClean Family",
    type: "Buyer",
  },
  {
    quote:
      "Nancy was available any time we had questions and she showed us several models. She would send photos frequently during the build and kept us up to date. Overall an excellent choice to go with Adams Homes.",
    attribution: "Carter Family",
    type: "Buyer",
  },
  {
    quote:
      "It was a good experience. It was my first home buying. I learned a lot of things. Adams Homes is a good company for someone to come and buy a house.",
    attribution: "Louissant Family",
    type: "Buyer",
  },
] as const;

/** Editable homepage copy. All authored copy lives here so Nancy can review in one place. */
export const HOMEPAGE = {
  hero: {
    eyebrow: "For realtors partnering with Adams Homes",
    // Three lines, intentional breaks. DO NOT paraphrase.
    headlineLines: [
      "Bring your buyer.",
      "Keep your full commission.",
      "I'll close the deal.",
    ] as const,
    subhead:
      "I'm Nancy Clarke — the #1 sales associate for Adams Homes in St. Lucie County. When you bring your buyer to one of my new construction properties, you keep 100% of your buyer-side commission, paid directly by the builder. No split. No competition. Just closings.",
    primaryCta: { label: "Partner With Me", to: "/realtors" },
    secondaryCta: { label: "I'm a buyer · Browse homes", to: "/buyers" },
    trustStrip: ["60+ closings in 2025", "#1 in territory", "Port St. Lucie · Fort Pierce · Vero Beach"],
  },
  partnership: {
    eyebrow: "Why realtors work with me",
    headlineA: "Most builder reps compete with you.",
    headlineB: "I work with you.",
    lead:
      "New construction is different from resale. When you bring your buyer to an Adams Homes property through me, the builder pays your full commission directly — and pays me separately. Your client gets a brand-new home with builder warranties, financing incentives, and a streamlined construction process. You get a closing, a happy client, and a reliable partner for every future buyer who's even thinking about new construction.",
    cards: [
      {
        icon: "DollarSign",
        title: "You Keep 100%",
        body:
          "Your buyer-side commission is paid in full by Adams Homes. There is no split between us, no reduction, no carve-out. You bring the relationship, you bring the buyer, you get paid.",
      },
      {
        icon: "HardHat",
        title: "I Handle the Build",
        body:
          "Floor plans, options, pricing, financing incentives, construction timelines, walk-throughs, closing coordination with the builder — that's my lane. You stay focused on your client. I handle the new-construction complexity.",
      },
      {
        icon: "Home",
        title: "Inventory You Can't Lose To",
        body:
          "Active Adams Homes inventory across three growing St. Lucie County communities. Brand new, builder-backed, with incentive packages that often beat resale. If your buyer wants new, you have the answer.",
      },
    ],
    cta: { label: "Start Sending Me Buyers", to: "/realtors" },
  },
  communities: {
    eyebrow: "Featured Communities",
    headline: "Adams Homes built where Florida actually lives.",
    subhead:
      "Three communities. Three submarkets. Move-in-ready inventory and to-be-built floor plans across St. Lucie County.",
    featured: [
      {
        slug: "waterstone-sfh",
        label: "Port St. Lucie",
        title: "Waterstone — Single Family Homes",
        body: "1,780 to 2,557 sqft floor plans. Gated community amenities.",
        youtubeId: "HZet4A8DAyc",
      },
      {
        slug: "waterstone-villas",
        label: "Port St. Lucie",
        title: "Waterstone — Villas",
        body:
          "Low-maintenance living. Attached single-story plans. Resort-style community pool.",
        youtubeId: "K6ay8m8pl1w",
      },
    ],
    gallery: {
      eyebrow: "Inside the Communities",
      headline: "What you're selling your buyer.",
      subhead:
        "A look inside Adams Homes new construction across St. Lucie County. Brand-new builds, designed for how Florida actually lives.",
    },
    submarkets: [
      { name: "Port St. Lucie", to: "/communities" },
      { name: "Fort Pierce", to: "/communities" },
      { name: "Vero Beach", to: "/communities" },
    ],
  },
  inventory: {
    eyebrow: "Live Inventory",
    headline: "Homes your buyers can move into now.",
    subhead:
      "Real-time availability across all three communities. Send the link, or call me to walk through what's a fit for your client.",
    cardEyebrow: "Property Search",
    cardTitle: "Browse all available listings",
    cardBody:
      "Updated in real time. Filter by community, price, beds, and move-in date.",
    quickLinks: [
      { label: "Port St. Lucie listings", url: PROAGENT_PSL_URL },
      { label: "Fort Pierce listings", url: PROAGENT_FP_URL },
      { label: "Vero Beach listings", url: PROAGENT_VB_URL },
    ],
  },
  meetNancy: {
    eyebrow: "Meet Nancy",
    caption: "Sales Associate · Adams Homes",
    headline:
      "60.5 closings last year. I'm not in this for volume — I'm in it for the right fit.",
    body:
      "I've been the top-performing sales associate for Adams Homes in St. Lucie County, and the way I got there is the same way I plan to keep going: by treating every realtor partnership and every buyer like a long game. I'd rather walk a buyer away from the wrong floor plan and earn your trust forever than push a quick close. New construction is a serious decision. The realtors who send me buyers know I'll never put a deal at risk to hit a number.",
    stats: [
      { value: "60.5", label: "Closings in 2025" },
      { value: "#1", label: "Adams Homes agent in territory" },
    ],
  },
  videoShowcase: {
    eyebrow: "Watch How I Work",
    headline: "See the homes, the process, and the partnerships.",
    featuredVimeo: { id: "295863068", hash: "0ffaa37beb" },
    thumbnails: ["3Yp2mgfI__Y", "1EAjd9FEnMM", "NHP1vwk77Rc"],
  },
  testimonials: {
    eyebrow: "What Families Say",
    headline: "Trusted to handle one of life's biggest decisions.",
    featuredAttribution: "C. Jackson Family",
  },
  dualCta: {
    realtor: {
      eyebrow: "For Realtors",
      headline: "Bring me your next buyer.",
      body:
        "Tell me about your buyer and I'll be in touch. Every realtor inquiry gets a personal response.",
      cta: { label: "Partner With Me", to: "/realtors" },
    },
    buyer: {
      eyebrow: "For Buyers",
      headline: "Find your new construction home.",
      body:
        "Tour Adams Homes properties in St. Lucie County. Move-in ready or build-to-order — I'll match you to the right floor plan.",
      cta: { label: "Browse Homes", to: "/buyers" },
    },
  },
} as const;
