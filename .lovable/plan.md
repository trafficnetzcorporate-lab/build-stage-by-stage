## Acknowledgement — pages to build

1. `src/routes/realtors.tsx`
2. `src/routes/buyers.tsx`
3. `src/routes/communities.tsx`
4. `src/routes/about.tsx`
5. `src/routes/sellers.tsx`

## Resolutions to your four review items

### 1. `/about` description — fabricated "60.5 years" claim removed

Adopting your suggested rewrite verbatim. The number `60.5` is Nancy's 2025 closings count from the source data, not years of experience; conflating the two would have shipped a fabricated bio claim.

- **`/about`** `description`: `"Meet Nancy Clarke: top-performing Adams Homes sales associate in St. Lucie County. Read her story, stats, and what families are saying about working with her."` (164 chars — will tighten to ≤155 during build by trimming `"and what families are saying about working with her"` → `"and client testimonials"` if needed; final string committed below in item 3.)

### 2. `/realtors` description — "unlicensed-for-new-construction" framing removed

There is no special new-construction license; that framing was invented and incorrectly narrows the audience. Pitch is to **all** realtors with buyers interested in new construction. Adopting your suggested rewrite verbatim.

- **`/realtors`** `description`: `"Refer your buyer to Nancy and keep 100% of your commission. The #1 Adams Homes sales associate in St. Lucie County, Florida."` (124 chars)

### 3. "Treasure Coast" → "St. Lucie County" sitewide consistency

Confirmed via `src/content/site.ts`: `SITE.territory` is `"St. Lucie County, Florida"`. Replacing "Treasure Coast" with "St. Lucie County" (or simply omitting it where the city already implies the county) across all five new meta descriptions, all five new `head.title`s, all five `closing` headlines, and any new body copy I write in `PAGES`.

One existing string — the Fort Pierce blurb in `COMMUNITIES` — currently says `"...near the Treasure Coast's working waterfront..."`. That's pre-existing copy outside this prompt's scope; flagging it for the user but **not** editing it as part of this work (changing existing verified copy without an explicit instruction would violate the no-invented-content rule).

### 4. `/communities` Section 3 — "live MLS feed" → "current inventory page"

Confirmed: the site links out to ProAgent's hosted search (`PROAGENT_*_URL` constants), not a direct MLS feed. "MLS feed" is technically misleading. Replacing both occurrences with `"current inventory page"`. Updated subhead committed in the differentiation block below.

### Verification step added (locked into Step 5)

Before declaring done, run a grep-driven fact check on every user-facing string in the new pages that contains a number or a proper noun: confirm each appears verbatim in the source (`SITE`, `COMMUNITIES`, `TESTIMONIALS`, transcript file, or the original verified bio). Specifically:
- Any digit sequence in new copy → must trace to an existing constant or the verified transcript.
- Any geographic / brand term → must match the term already used elsewhere on the site.
- No inferred claims (years of experience, license status, data source labels, etc.).

## Final committed meta strings (all five pages)

Each route's `head()` ships title + description + `og:title` (mirrors title) + `og:description` (mirrors description). All ≤155 chars. None reuse the homepage. No "Treasure Coast." No fabricated numbers. No invented license framing.

- **`/realtors`**
  - title: `"For Realtors — Refer to Nancy Clarke | Adams Homes"`
  - description: `"Refer your buyer to Nancy and keep 100% of your commission. The #1 Adams Homes sales associate in St. Lucie County, Florida."` (124)
- **`/buyers`**
  - title: `"Buying New Construction in St. Lucie County — Nancy Clarke"`
  - description: `"What to expect when buying a new Adams Homes home in St. Lucie County — pricing, process, floor plans, and the people who'll guide the move."` (143)
- **`/communities`**
  - title: `"Adams Homes Communities — St. Lucie County | Nancy Clarke"`
  - description: `"Tour Waterstone single-family homes and villas, plus current Adams Homes inventory across St. Lucie County."` (108)
- **`/about`**
  - title: `"About Nancy Clarke — #1 Adams Homes Realtor, St. Lucie County"`
  - description: `"Meet Nancy Clarke: top-performing Adams Homes sales associate in St. Lucie County. Read her story, stats, and client testimonials."` (133)
- **`/sellers`**
  - title: `"Selling Your Home in St. Lucie County — Nancy Clarke"`
  - description: `"Selling your current home so you can move into a new Adams Homes build? Nancy bridges the resale and new-construction sides of the move."` (138)

## ClosingBand — unique headline per page (locked, "Treasure Coast" removed)

Reading from `PAGES.{page}.closing`. Five distinct headlines:

- **`/realtors`** — `"Have a buyer headed to St. Lucie County? Send them to Nancy."` · CTA `"Refer a buyer →"` → `/contact?type=realtor`
- **`/buyers`** — `"Ready to find the right floor plan?"` · CTA `"Browse communities →"` → `/communities`
- **`/communities`** — `"The best way to choose is to walk through one in person."` · CTA `"Schedule a tour →"` → `/contact`
- **`/about`** — `"If we're a fit, let's get to work."` · CTA `"Start a conversation →"` → `/contact`
- **`/sellers`** — `"One agent for the home you're leaving and the one you're moving into."` · CTA `"Talk to Nancy →"` → `/contact`

## `/communities` Section 3 — corrected differentiation block

Wrapping `<Section>` differs from homepage `LiveInventory` on three axes (component itself is the single shared `<InventoryGateway />`):

- **Tone**: homepage `LiveInventory` = `tone="white"`; `/communities` Section 3 = `tone="cream-deep"`.
- **Eyebrow + headline**: homepage uses `"Live inventory"` / `"Move-in ready & under construction"`. `/communities` Section 3 uses `"Already toured? Check what's available."` / `"Current Adams Homes inventory"`.
- **Contextual subhead** (above the gateway card): `"After you've narrowed the community, jump straight to the current inventory page for available units, pricing, and move-in dates."` — replacing the prior "live MLS feed" wording.

## Other items (unchanged from prior plan, restated for completeness)

- **`/buyers` Section 3**: `COMMUNITIES.map((c) => <SubmarketCard community={c} />)` — city-level (Port St. Lucie / Fort Pierce / Vero Beach), same shared component as the homepage submarket row. Not Waterstone SFH/Villas (those are community-level and live only on `/communities` Section 1).
- **`/realtors` FAQ**: shadcn `Accordion type="single" collapsible` — single-open is deliberate.
- **Single-sourcing**: `VideoLightbox`, `InventoryGateway`, `SubmarketCard`, `GuardedExternalLink` are true moves to `src/components/shared/` (or `src/components/pages/` for ClosingBand/PageHero). Each gets exactly one `function|const X` definition; verified via `rg`.
- **Bio integrity**: `PAGES.about.bio` is a 3-paragraph tuple, single source of truth, rendered via `.map()`.
- **Testimonials**: `/about` reads existing `TESTIMONIALS` export; `.map()` in JSX, never retyped.

## Step list

1. Trim `NAV_LINKS` to 7 items in `src/content/site.ts`; delete `src/routes/listings.tsx`.
2. Add `PAGES` export to `src/content/site.ts` with each page's hero copy, body section copy, `closing` object, and per-section arrays. No meta strings here — meta lives in route `head()`.
3. Move shared components to `src/components/shared/` and `src/components/pages/`; update homepage components to import from new locations.
4. Add `tone="navy-deep"` and `tone="cream-deep"` (if not already present) to `Section`.
5. Build five route files, each = `<PageHero />` → body sections → `<ClosingBand {...PAGES.{page}.closing} />`, with the meta strings committed above in `head()`.
6. Run verification sweeps:
   - `rg -n "function VideoLightbox|const VideoLightbox" src` → 1 hit. Same for `InventoryGateway`, `SubmarketCard`, `GuardedExternalLink`.
   - `rg -n "Treasure Coast" src/routes src/components/pages` → 0 hits in new files.
   - `rg -n "MLS feed|live MLS" src` → 0 hits.
   - `rg -n "60\.5" src/routes src/components/pages` → 0 hits in meta/copy contexts (the number may legitimately appear in `/about` stats block, sourced from verified data).
   - 5 distinct `description` strings across new routes; 5 distinct closing headlines.
   - `/buyers` Section 3 renders from `COMMUNITIES`, not `WATERSTONE_*`.
   - `/communities` Section 3 wrapper differs from `LiveInventory` (different tone, eyebrow, headline, subhead present).
   - Banned-phrases / emoji / bio-duplication / route-existence sweeps as previously specified.
   - `NAV_LINKS.length === 7`; `src/routes/listings.tsx` gone; `rg "to=\"/listings\""` → 0.
   - **Numbers-and-claims fact check**: every digit and proper noun in new copy traces to a source (transcript, `site.ts`, `TESTIMONIALS`, verified bio).

## Decisions / divergences

- Meta strings live in each route's `head()`, not in `PAGES`, to colocate SEO copy with the route.
- "Treasure Coast" removed from all new copy in favor of "St. Lucie County" to match `SITE.territory`. The pre-existing `COMMUNITIES.fort-pierce.blurb` still contains "Treasure Coast" — flagged for user but left untouched in this prompt's scope.
- "MLS feed" replaced with "current inventory page" since the site links out to ProAgent, not a direct MLS feed.
- `/about` description reflects actual verified facts (top-performing Adams Homes sales associate in St. Lucie County) — no fabricated tenure number.
- `/realtors` description targets all realtors with buyers interested in new construction, not a narrowed "out-of-area / unlicensed" subset.
- All shared visual elements are true moves; one definition each.
- No invented content. Every number and proper noun traces to source data.

Standing by for Prompt 3B once these pages are merged.
