# Add a "Most In Demand" filter

## Goal

Add a single high-signal pill — **Most In Demand** — that surfaces the Adams Homes inventory most likely to convert in Nancy's territory, based on the Perplexity market research:

- **Move-in ready** (not under construction) — the report repeatedly cites "quick move-in" and "convenience-seeking buyers" as the dominant lifestyle filter.
- **Priced at or below the local active median** — the strongest demand pool per submarket sits in the entry-to-mid band, not luxury.

Both criteria come from fields we already scrape (`status`, `price`, `city`). Nothing changes upstream.

## Per-city price ceilings (from the research)

| City | Ceiling | Source signal |
|---|---|---|
| Port St. Lucie | ≤ $450,000 | April 2026 median ~$410K, active band low-to-mid $400Ks |
| Fort Pierce | ≤ $425,000 | Avg ~$402K; value play in $350K–low-$400Ks |
| Okeechobee | ≤ $325,000 | Median ~$346K; "high $200s" affordability story |
| any other city Adams lists in Nancy's counties | ≤ $450,000 (default) | Conservative mid-market fallback |

These live in one small lookup map so the threshold can be tuned later without touching component logic.

## UX

- New pill labeled **"Most In Demand"** placed first (before "All"), styled identically to existing pills but with a subtle gold accent dot to telegraph it's the curated view.
- Works on both `InventoryGrid` (full page) and `InventoryCarousel` (homepage/communities).
- When active, the city pills remain visible so the user can stack: e.g. click "Most In Demand" then a city to narrow further. Implementation-wise this means the demand filter is a separate piece of state that ANDs with the city filter, rather than replacing it.
- Empty state copy when no homes match: "No high-demand matches in the current Adams inventory. Try All, or call Nancy at (772) 899-7333."

## Technical details

1. **`src/integrations/adams-homes/demand.ts`** (new) — exports:
   - `DEMAND_PRICE_CEILINGS: Record<string, number>` keyed by normalized city, with a default fallback.
   - `isHighDemand(home: AdamsHomeProperty): boolean` — returns `status === "move-in" && price != null && price <= ceiling`.

2. **`src/components/inventory/InventoryGrid.tsx`** — add `inDemandOnly` boolean state, "Most In Demand" pill, and AND it into the `filtered` memo alongside the existing city filter. Update dev debug line to include the demand count.

3. **`src/components/inventory/InventoryCarousel.tsx`** — same pattern.

4. **`src/routes/communities_.inventory.tsx`** — add `demand` search param (`fallback(z.boolean(), false).default(false)`) so the filter is deep-linkable and shareable in ads (e.g. `/communities/inventory?demand=true&city=Port%20St.%20Lucie`). Pass into `<InventoryGrid />` as `initialDemand`.

5. No type/schema changes to `AdamsHomeProperty` or the scraper — all derived.

## Out of scope (flagged for later if you want)

- A feature-specific pill (e.g. "4BR", "One-Story", "No HOA") — Adams' data doesn't currently expose HOA or single-story flags, and `beds` is already filterable downstream if we want it. Happy to add bed/bath quick-filters in a follow-up.
- Per-city price-ceiling overrides via an admin UI — for now the map is code-tuned.
