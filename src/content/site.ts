/**
 * Single source of truth for content that may change frequently or that
 * requires verification before launch.
 */
import hero01 from "@/assets/hero/hero-01.jpg";
import hero02 from "@/assets/hero/hero-02.jpg";
import hero03 from "@/assets/hero/hero-03.jpg";
import hero04 from "@/assets/hero/hero-04.jpg";
import hero05 from "@/assets/hero/hero-05.jpg";
import hero06 from "@/assets/hero/hero-06.jpg";
import hero07 from "@/assets/hero/hero-07.jpg";
import hero08 from "@/assets/hero/hero-08.jpg";

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

/**
 * Compliance text shown next to the required consent checkbox on /contact.
 * Single source of truth — re-use anywhere consent is captured.
 */
export const CONTACT_CONSENT =
  "By submitting this form, I agree to be contacted by Nancy Clarke and Adams Homes of Northwest Florida by phone, text message, or email regarding my real estate inquiry. Message and data rates may apply. Consent is not a condition of purchase. I can opt out at any time.";

// ProAgent dependency retired in favor of Adams Homes integration. See src/integrations/adams-homes/.

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
    slug: "okeechobee-county",
    name: "Okeechobee County",
    tagline: "Rural-edge new construction",
    blurb:
      "Brand-new Adams Homes on the rural edge of the Treasure Coast — more land, quieter roads, and the same builder warranty and finishes as Nancy's other communities.",
  },
] as const;

export const MORTGAGE_PARTNERS = [
  {
    name: "The Stinson Team",
    company: "Acrisure Mortgage",
    title: "Mortgage Loan Origination",
    address: "[VERIFY: address for Acrisure Mortgage partner]",
    phone: "[VERIFY: phone for Acrisure Mortgage partner]",
    nmls: "[VERIFY: NMLS for Acrisure Mortgage partner]",
    logo: "/src/assets/acrisure-mortgage-logo.png",
    logoPlaceholder: true,
  },
  {
    name: "Gino Giandurco",
    company: "Guild Mortgage",
    title: "Area Sales Manager",
    address: "[VERIFY: address for Guild Mortgage partner]",
    phone: "[VERIFY: phone for Guild Mortgage partner]",
    nmls: "[VERIFY: NMLS for Guild Mortgage partner]",
    logo: "/src/assets/guild-mortgage-logo.png",
    logoPlaceholder: true,
  },
] as const;

export const MORTGAGE_DISCLAIMER =
  "Rates, points and fees are subject to change and cannot be guaranteed. Many factors affect a loan's interest rate, such as property type, loan amount, and/or a borrower's credit-worthiness, and the information contained herein is not a credit-approval or an offer to extend credit, as defined by paragraph 226.24 of regulation Z. For more comprehensive and up-to-the-minute rate information please contact a licensed mortgage professional.";

/**
 * Hero slideshow images. Imported at top of file for Vite content-hashing.
 */

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
    trustStrip: ["60+ closings in 2025", "#1 in territory", "Port St. Lucie · Fort Pierce · Okeechobee County"],
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
        label: "Fort Pierce",
        title: "Waterstone — Single Family Homes",
        body: "1,780 to 2,557 sqft floor plans. Gated community amenities.",
        youtubeId: "HZet4A8DAyc",
      },
      {
        slug: "waterstone-villas",
        label: "Fort Pierce",
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
      { name: "Okeechobee County", to: "/communities" },
    ],
  },
  inventory: {
    eyebrow: "Live Inventory",
    headline: "Homes your buyers can plan for or move into now.",
    subhead:
      "Real-time availability across all three communities. Send the link, or call me to walk through what's a fit for your client.",
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

/**
 * Inner content pages. Single source of truth for every word on /realtors,
 * /buyers, /communities, /about, /sellers. Closing band headlines are
 * intentionally distinct per page.
 */
export const PAGES = {
  realtors: {
    hero: {
      eyebrow: "For Realtors",
      headline: "Refer your buyer. Keep your full commission.",
      subhead:
        "When your buyer wants new construction in St. Lucie County, send them to me. Adams Homes pays your buyer-side commission in full, paid separately from mine. You keep your client. I handle the build.",
    },
    whyPartner: {
      eyebrow: "Why partner with Nancy",
      headline: "New construction is a different game. I play it for you.",
      lead:
        "You spent years building your buyer relationships. New construction shouldn't put any of that at risk. When you refer to me, your client gets a brand-new Adams Home, you get paid in full, and you stay the agent of record for everything that comes after.",
      cards: [
        {
          icon: "DollarSign",
          title: "100% of your buyer-side commission",
          body:
            "Paid directly by Adams Homes, in full, at closing. No split with me, no carve-out, no negotiation. Your commission agreement is honored as written.",
        },
        {
          icon: "HardHat",
          title: "I handle the build, you keep the client",
          body:
            "Floor plans, options, lender coordination, construction timelines, walk-throughs, closing — all on my desk. You stay focused on the buyer relationship and your next deal.",
        },
        {
          icon: "Home",
          title: "Inventory and to-be-built across three submarkets",
          body:
            "Active Adams Homes inventory in Port St. Lucie, Fort Pierce, and Okeechobee County. Move-in ready or build-to-order — there's almost always a fit.",
        },
      ],
    },
    process: {
      eyebrow: "How a referral works",
      headline: "Three steps. Then a closing.",
      steps: [
        {
          n: "01",
          title: "Send me a quick intro",
          body:
            "Email or text with your buyer's name, what they're looking for, and a budget range. I respond same-day.",
        },
        {
          n: "02",
          title: "I work with your buyer directly",
          body:
            "Tours, floor plan selection, financing intros, contract — I keep you copied on the milestones that matter.",
        },
        {
          n: "03",
          title: "You get paid at close",
          body:
            "Adams Homes pays your buyer-side commission directly. You sign nothing with me; the builder handles the disbursement.",
        },
      ],
    },
    faq: {
      eyebrow: "Realtor FAQ",
      headline: "What partner agents ask before sending the first buyer.",
      items: [
        {
          q: "Do I have to give up the client?",
          a: "No. The buyer is yours. I'm working the new-construction transaction with them, but you stay in the relationship for everything that comes next — resale, referrals, future moves.",
        },
        {
          q: "How much do I actually get paid?",
          a: "Your full buyer-side commission as published by Adams Homes for that community, paid by the builder at closing. There is no split with me and no reduction.",
        },
        {
          q: "What if my buyer needs to sell their current home first?",
          a: "I work both sides of those transactions. Send the referral and we'll talk through whether a contingent contract, a bridge timeline, or listing first makes the most sense.",
        },
        {
          q: "Do I need to do anything special to register my buyer?",
          a: "Be present for the first visit, or call or email me before they tour. That's it — that registers the referral.",
        },
        {
          q: "Which communities are eligible?",
          a: "All Adams Homes communities I represent in St. Lucie County, including Waterstone single-family and villas in Port St. Lucie, plus inventory in Fort Pierce and Okeechobee County.",
        },
      ],
    },
    closing: {
      headline: "Have a buyer headed to St. Lucie County? Send them to Nancy.",
      ctaLabel: "Refer a buyer",
      ctaTo: "/contact",
    },
  },

  buyers: {
    hero: {
      eyebrow: "For Buyers",
      headline: "Buying new construction, the simple way.",
      subhead:
        "A brand-new Adams Home in St. Lucie County — with a sales associate who's done this 60+ times in the last year alone. Move-in ready or build-to-order. I'll match you to the right floor plan.",
    },
    whyNew: {
      eyebrow: "Why a new build",
      headline: "What you get with new that you don't get with resale.",
      cards: [
        {
          title: "Builder warranty",
          body:
            "Structural, mechanical, and workmanship coverage backed by Adams Homes from day one. No surprise repairs in year two.",
        },
        {
          title: "Today's floor plans",
          body:
            "Open kitchens, larger primary suites, dedicated home offices, and the storage modern families actually use.",
        },
        {
          title: "Builder incentives",
          body:
            "Adams Homes regularly offers closing-cost help, rate buydowns, and design-center credits that resale sellers don't match.",
        },
      ],
    },
    process: {
      eyebrow: "What to expect",
      headline: "From first tour to keys in hand.",
      steps: [
        {
          n: "01",
          title: "Tour models and inventory",
          body:
            "Walk through the Waterstone models, see what's actually being built, and get a feel for the differences between communities.",
        },
        {
          n: "02",
          title: "Pick your floor plan and home",
          body:
            "Move-in ready, mid-build, or fresh-start build-to-order — we'll match the timeline to your move date.",
        },
        {
          n: "03",
          title: "Lender intro and contract",
          body:
            "Trusted lenders who know new construction. Pre-approval, contract, design-center selections.",
        },
        {
          n: "04",
          title: "Build, walk, and close",
          body:
            "Photo updates through construction, a thorough pre-closing walk-through, and a smooth handoff at closing.",
        },
      ],
    },
    snapshot: {
      eyebrow: "Communities snapshot",
      headline: "Three submarkets. Pick the one that fits your life.",
      subhead:
        "Port St. Lucie for amenities and gated convenience. Fort Pierce for new construction near the working waterfront. Okeechobee County for more land and quieter roads with the same brand-new build.",
    },
    closing: {
      headline: "Ready to find the right floor plan?",
      ctaLabel: "Browse communities",
      ctaTo: "/communities",
    },
  },

  communities: {
    hero: {
      eyebrow: "Communities",
      headline: "Adams Homes in St. Lucie County.",
      subhead:
        "Two flagship Waterstone communities in Fort Pierce, plus Adams Homes inventory across Port St. Lucie and Okeechobee County. Tour a model, then check what's available right now.",
    },
    waterstone: {
      eyebrow: "Featured · Fort Pierce",
      headline: "Waterstone — the flagship.",
      subhead:
        "Two product lines inside a single gated community: traditional single-family homes and low-maintenance villas. Resort-style pool, fitness center, playground, pickleball.",
    },
    submarkets: {
      eyebrow: "By submarket",
      headline: "Three places to land.",
      subhead:
        "Port St. Lucie, Fort Pierce, Okeechobee County — pick the one your life fits into.",
    },
    inventory: {
      eyebrow: "Live Inventory",
      headline: "Current Adams Homes inventory.",
      subhead:
        "Active homes from the Adams Homes feed, filtered to Nancy's territory. Sorted by price.",
    },
    closing: {
      headline: "The best way to choose is to walk through one in person.",
      ctaLabel: "Schedule a tour",
      ctaTo: "/contact",
    },
  },

  about: {
    hero: {
      eyebrow: "About Nancy",
      headline: "60.5 closings last year. The right fit, every time.",
      subhead:
        "Sales Associate, Adams Homes of Northwest Florida — and the #1 sales associate in St. Lucie County.",
    },
    bio: [
      "I've been the top-performing sales associate for Adams Homes in St. Lucie County, and the way I got there is the same way I plan to keep going: by treating every realtor partnership and every buyer like a long game.",
      "I'd rather walk a buyer away from the wrong floor plan and earn your trust forever than push a quick close. New construction is a serious decision — for the buyer, and for the agent who refers them.",
      "The realtors who send me buyers know I'll never put a deal at risk to hit a number. The families I close with stay in touch long after they get their keys. That's the standard.",
    ] as const,
    stats: [
      { value: "60.5", label: "Closings in 2025" },
      { value: "#1", label: "Adams Homes agent in St. Lucie County" },
    ] as const,
    values: {
      eyebrow: "How I work",
      headline: "Three things I won't compromise on.",
      cards: [
        {
          title: "Right fit over fast close",
          body:
            "If the floor plan, the budget, or the community isn't right, I'll say so. A bad fit costs everyone more in the end.",
        },
        {
          title: "Realtor relationships are sacred",
          body:
            "Your buyer is your buyer. I'm here to close the new-construction piece — never to take the relationship.",
        },
        {
          title: "Communication you don't have to chase",
          body:
            "Buyers and partner agents get updates without having to ask. If something changes, you hear it from me first.",
        },
      ],
    },
    testimonialsBlock: {
      eyebrow: "What families say",
      headline: "Trusted to handle one of life's biggest decisions.",
    },
    closing: {
      headline: "If we're a fit, let's get to work.",
      ctaLabel: "Start a conversation",
      ctaTo: "/contact",
    },
  },

  sellers: {
    hero: {
      eyebrow: "For Sellers",
      headline: "Selling so you can move into a new build.",
      subhead:
        "Most of my sellers are also my next new-construction buyers. I bridge both sides of the move so the timeline actually works.",
    },
    bridge: {
      eyebrow: "The bridge transaction",
      headline: "One agent for the home you're leaving and the one you're moving into.",
      lead:
        "Selling and buying at the same time is the hardest move in real estate. When the same agent is on both sides, the timing, the contingencies, and the closing dates can actually line up.",
      cards: [
        {
          title: "Aligned timelines",
          body:
            "Your sale closing and your new-build closing are coordinated together — not by two agents who've never spoken.",
        },
        {
          title: "Contingencies that actually work",
          body:
            "Adams Homes accepts contingent contracts in many cases. I'll tell you straight whether yours is a fit and how to structure it.",
        },
        {
          title: "One conversation, not three",
          body:
            "Pricing your current home, picking your floor plan, and lining up financing — handled together, not in parallel.",
        },
      ],
    },
    process: {
      eyebrow: "How a bridge sale works",
      headline: "Four steps from listed to keys in hand.",
      steps: [
        {
          n: "01",
          title: "Walk both sides with me",
          body:
            "We tour a few Adams Homes options and look at your current home together. You leave with a realistic price for your home and a realistic timeline for the new one.",
        },
        {
          n: "02",
          title: "List and reserve in parallel",
          body:
            "Your current home goes on the market while we reserve a build slot or hold an inventory home with the right contingency.",
        },
        {
          n: "03",
          title: "Coordinate the closings",
          body:
            "I work the dates with the builder and the buyer's agent so you don't end up between two homes — or paying two mortgages.",
        },
        {
          n: "04",
          title: "Move once",
          body:
            "Same-week closings when possible, a short rent-back when not. The goal is one move, not two.",
        },
      ],
    },
    closing: {
      headline: "One agent for the home you're leaving and the one you're moving into.",
      ctaLabel: "Talk to Nancy",
      ctaTo: "/contact",
    },
  },
} as const;
