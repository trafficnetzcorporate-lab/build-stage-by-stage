# Post-Call Updates — Final Plan (5 changes, carousel as production default)

Five independent commits. Three uploaded assets land in `src/assets/` before any code that imports them.

---

## Change 1 — Vero Beach → Okeechobee County (sitewide)

Strict text replacement everywhere "Vero Beach" or `VB_URL` appears.

**`src/content/site.ts`** (10 hits):
- Rename constant `PROAGENT_VB_URL` → `PROAGENT_OKE_URL` (value `"PROAGENT_OKE_URL_TBD"`) — deleted entirely in Change 5
- `COMMUNITIES[2]`: slug `vero-beach` → `okeechobee-county`, name → "Okeechobee County", tagline → "Rural-edge new construction", blurb rewritten (no waterfront/beach references)
- `HOMEPAGE.hero.trustStrip[2]` → "Port St. Lucie · Fort Pierce · Okeechobee County"
- `HOMEPAGE.communities.submarkets[2].name` → "Okeechobee County"
- `HOMEPAGE.inventory.quickLinks[2]` → label + `PROAGENT_OKE_URL` *(removed in Change 5)*
- `PAGES.realtors.whyPartner.cards[2].body`, `PAGES.realtors.faq.items[4].a`, `PAGES.buyers.snapshot.subhead`, `PAGES.communities.hero.subhead`, `PAGES.communities.submarkets.subhead` — replace "Vero Beach" with "Okeechobee County" (rewriting buyers snapshot to drop "established market" framing that doesn't fit Okeechobee)

**`src/components/shared/InventoryGateway.tsx`** + **`src/components/DevPlaceholderBanner.tsx`**: rename references to `PROAGENT_OKE_URL`.

**Verification:** `rg -i "vero beach|vero|VB_URL" src/` → 0.

---

## Change 2 — Mortgage partner rebrand (with real logos)

**Scope clarification:** `/home-loans` already exists (verified). Change 2 updates `MORTGAGE_PARTNERS` data **and** wires the logos into the existing partner card on `/home-loans`. Visual verification happens in this commit, not deferred to Prompt 3B.

Copy uploaded files into `src/assets/`:
- `src/assets/acrisure-mortgage-logo.png`
- `src/assets/guild-mortgage-logo.png`

`src/content/site.ts` → `MORTGAGE_PARTNERS`:
- Partner 1 `company`: "FBC Mortgage" → "Acrisure Mortgage". Add `logo: acrisureLogo` (Vite-imported asset reference, not a string path).
- Partner 2 `company`: "Bay Equity Home Loans" → "Guild Mortgage". Add `logo: guildLogo`.
- All other fields (address, phone, NMLS) unchanged — those `[VERIFY:` markers stay.

**Logo rendering** in the partner card on `/home-loans`:
- `<img>` with `h-8 md:h-10 w-auto object-contain`
- Wrapped in a fixed-height container so both logos appear at visually similar sizes despite differing source aspect ratios
- `alt={\`${company} logo\`}`

**Dev-banner accounting:** real assets (not `[VERIFY:` placeholders) → count does not increase. Stays at 10.

**Verification:** `rg -i "FBC Mortgage|Bay Equity" src/` → 0; `/home-loans` renders both logos at consistent height.

---

## Change 3 — LiveInventory headline reword

`site.ts` → `HOMEPAGE.inventory.headline`:
"Homes your buyers can move into now." → **"Homes your buyers can plan for or move into now."**

---

## Change 4 — Real headshot replacement

Copy uploaded `Professional_Shot_-_Nancy_Clarke.JPEG` to **`src/assets/nancy-portrait.jpg`** (lowercase, `.jpg` extension). The `code--copy` step renames at write time, so the destination filename is normalized regardless of source casing — safe for case-sensitive Linux deploy targets. Existing AI placeholder is overwritten.

No code edits — `MeetNancy.tsx` and `about.tsx` already import that path. Confirm both pages render the new image with the existing 4:5 aspect ratio, gold offset frame, and Fraunces caption.

---

## Change 5 — Adams Homes Inventory Carousel (PRODUCTION DEFAULT)

Carousel ships live, no flag. `InventoryGateway.tsx` retained with documenting header comment as a one-line emergency revert option.

### Data source

Server-side HTML fetch from `https://www.adamshomes.com/homes/florida/port-st-lucie` + JSON state extraction via regex/`JSON.parse`. Pure `fetch()` + JS — Worker-safe. Adams Homes uses this URL as the master Florida feed regardless of slug; trust `addressCounty` over slug.

### Transparency layer

- **Custom User-Agent** on the server-side fetch: `"Mozilla/5.0 NancyClarkeRealtor/1.0 (+https://nancyclarkerealtor.com)"` so Adams Homes can identify the source in their logs
- **Attribution footer** rendered below both `<InventoryCarousel />` and `<InventoryGrid />`: small muted text "Inventory sourced from adamshomes.com. Updated every 4 hours."
- **Cache TTL** stays at 4 h fresh / 24 h stale-on-error — do not shorten

### Architecture

```text
src/integrations/adams-homes/
  types.ts                 AdamsHomeProperty interface
  scraper.server.ts        Fetch + state JSON extraction (custom User-Agent)
  filter.ts                Whitelist availability + territory filter
  cache.ts                 In-memory TTL cache (4h fresh, 24h stale-on-error)
  inventory.functions.ts   createServerFn → getAdamsInventory()
```

`AdamsHomeProperty`:
```ts
{ id, address, city, county, beds, baths, sqft, price,
  status: "move-in" | "under-construction",
  imageUrl, communityName, headline, fetchedAt }
```

Server fn returns `{ properties, lastFetched, stale, error }`. Errors never throw — UI renders empty state.

### Availability filter — whitelist

```ts
// WHITELIST. Adams Homes' status enum may grow without notice.
// Excluding by allowed value, not denying by known-bad values, means
// any new state defaults to "do not show" — matches Nancy's rule:
// "do not show something that's not available."
function isAvailable(p: RawAdamsHome): boolean {
  if (p.status !== "Active") return false;
  if (p.underContractDate) return false;
  if (p.pendingDate) return false;
  if (p.reservedDate) return false;
  if (p.holdDate) return false;
  if (p.contractDate) return false;
  if (p.soldDate) return false;
  for (const k of Object.keys(p)) {
    if (/^(under|in)?(contract|reserved|pending|hold)Date$/i.test(k)
        && (p as any)[k]) return false;
  }
  return true;
}
```

Territory filter: `addressCounty ∈ {"St. Lucie", "Okeechobee"}` AND city normalizer matches one of {Port St. Lucie, Fort Pierce, Okeechobee variants}. Trust `addressCounty` over URL slug.

### City display rule (slug ≠ city)

Card eyebrow and address always derive from the **`city` field on the property record**, never from any URL-slug fragment. Concretely:
- A Waterstone home with `city: "Fort Pierce"` displays "Fort Pierce" in the address even though Adams Homes URL-slugs that community under `port-st-lucie`
- The `communityName` shown in the eyebrow comes from the property's own `communityName` field — also not derived from the URL slug
- Filter pill "Fort Pierce" matches on the normalized `city` field, so Waterstone properties correctly appear under that pill

A short comment in `InventoryCard.tsx` notes this rule so future edits don't accidentally swap to a slug-derived value.

### Scale UX

- **Sort**: price ascending
- **Filter pills** (local React state, not URL state): `All · Port St. Lucie · Fort Pierce · Okeechobee County`
- **Carousel** renders the first 12 of the filtered+sorted list. If >12, append "View all N available homes →" routing to `/communities/inventory`. Hidden when ≤12.
- **`/communities/inventory`** (new route): same `getAdamsInventory()` server fn, same `InventoryCard` in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Same filter pills. No pagination.

### Components

`InventoryCard.tsx` (shared):
- `aspect-[4/5]`, `rounded-2xl`, `ring-1 ring-navy/10`
- Image (top 60%, `object-cover`); click → lightbox (reuses `VideoLightbox` shell)
- Status pill top-left: gold "Move-in Ready" or navy "Under Construction"
- Eyebrow: community name (gold uppercase tracked) — from `communityName` field
- Address (Fraunces 20px) — from `city` field, never URL slug
- Specs row (Inter 14): `{beds} bd · {baths} ba · {sqft.toLocaleString()} sqft`
- Price (Fraunces 24px) or "Pricing on request"
- Full-width success-green CTA: "Contact Nancy about this home →" → `<Link to="/contact" search={{ property: id, community: communityName }}>`
- Lightbox CTA also routes to `/contact`. **Zero external links.**

`InventoryCarousel.tsx`: reuses `CommunitiesGallery.tsx` snap-x + chevron + reduced-motion pattern.
`InventoryGrid.tsx`: thin grid wrapper around the same card.

States:
- Loading: 3 desktop / 1 mobile cream-deep skeletons; chevrons hidden
- Empty: single fallback card "Inventory updates frequently. Contact Nancy directly for what's available right now." + `tel:` CTA

### `/contact` search-param wiring

`src/routes/contact.tsx` adds `validateSearch: zodValidator(z.object({ property: fallback(z.string(), "").default(""), community: fallback(z.string(), "").default("") }))`. The current placeholder body displays an "Inquiring about: {community} — {property}" line above the existing copy when those params are present, so the deep-link contract is testable today.

**TODO comment** placed directly above the `validateSearch` block:

```ts
// TODO(prompt-3B): Preserve this validateSearch contract when building the
// real contact form. The InventoryCard CTA on the homepage carousel,
// /communities carousel, and /communities/inventory grid all deep-link
// here as <Link to="/contact" search={{ property, community }}>. The form
// must read these params and pre-fill the message field. Removing or
// renaming these fields breaks the inventory → contact integration silently.
```

### Cleanup (same commit)

- Remove `PROAGENT_SEARCH_URL`, `PROAGENT_PSL_URL`, `PROAGENT_FP_URL`, `PROAGENT_OKE_URL` from `site.ts`. Replace TODO block with: `// ProAgent dependency retired in favor of Adams Homes integration. See src/integrations/adams-homes/.`
- Remove the four PROAGENT entries from `DevPlaceholderBanner.tsx`
- Remove `HOMEPAGE.inventory.quickLinks` (orphaned)
- Remove `PAGES.communities.inventoryGateway.cardEyebrow / cardTitle / cardBody` (orphaned)
- Keep `src/components/shared/InventoryGateway.tsx` with header: `// EMERGENCY REVERT ONLY — production renders <InventoryCarousel />. See post-call change 5.`

### Failure mode

- Cache serves stale up to 24 h past TTL, then empty state
- `console.error` only when `import.meta.env.DEV`
- Dev-only banner inside the carousel section: fetch status + last-success timestamp + active filter + post-filter count

---

## Final dev-banner accounting

| Stage | Findings |
|------|---------|
| Start | 10 (4 PROAGENT + 6 mortgage VERIFY) |
| After Change 2 (logos are real assets) | 10 |
| After Change 5 (4 PROAGENT URLs removed) | **6** |

Remaining 6 = mortgage address / phone / NMLS markers (3 per partner) — still need real verification before launch.

---

## Verification before declaring done

- `rg -i "vero beach|VB_URL" src/` → 0
- `rg -i "FBC Mortgage|Bay Equity" src/` → 0
- `rg "PROAGENT_" src/` → 0
- `src/assets/nancy-portrait.jpg` (lowercase), `acrisure-mortgage-logo.png`, `guild-mortgage-logo.png` all present
- `/home-loans` renders both logos at consistent height
- Homepage section 4 renders `<InventoryCarousel />` with live Adams Homes data
- `/communities` Section 3 renders `<InventoryCarousel />`
- `/communities/inventory` renders `<InventoryGrid />`
- Card eyebrow/address derive from `communityName`/`city` fields, not URL slug (spot-check: Waterstone card shows "Fort Pierce")
- Attribution footer renders below carousel and grid
- Server-side fetch sends custom `User-Agent` header (verified by inspecting `scraper.server.ts`)
- All carousel/grid CTAs route to `/contact?property=...&community=...`, never to `adamshomes.com`
- `/contact` `validateSearch` block has the Prompt-3B TODO comment
- Filter pills work (All / PSL / Fort Pierce / Okeechobee)
- Default sort is price ascending
- Empty state renders if scraper fails (verifiable by temporarily breaking the URL)
- `InventoryGateway.tsx` retained with documenting header comment
- Dev banner shows **6** findings

---

## Completion summary will list

- 5 changes shipped
- Adams Homes data source: SSR HTML + embedded React state JSON
- Cache TTL: 4 h fresh / 24 h stale-on-error
- Transparency: custom User-Agent + attribution footer
- Sort: price ascending; filter pills: All / PSL / Fort Pierce / Okeechobee; first 12 in carousel, rest at `/communities/inventory`
- Carousel is production default on homepage and `/communities`
- ProAgent constants + gateway removed from production paths; gateway retained as emergency revert
- Real assets in place: headshot (lowercase normalized), Acrisure logo, Guild logo
- `/contact` deep-link contract scaffolded with Prompt-3B TODO
- Dev banner final findings: 6
- Standing by for next instruction
