## Filter fixes for Adams Homes inventory

### 1. `src/integrations/adams-homes/scraper.server.ts` — `isAvailable()`

Replace the status whitelist. Drop the `"for sale"` branch (never appears upstream) and accept `"active"` or `"under construction"`:

```ts
const s = String(p.status ?? "").trim().toLowerCase();
if (s !== "active" && s !== "under construction") return false;
```

Keep the date-rejection sweep (underContractDate, pendingDate, reservedDate, holdDate, contractDate, soldDate, plus the regex defensive scan) exactly as-is. Pending/Sold/etc. continue to be rejected.

### 2. `src/integrations/adams-homes/scraper.server.ts` — `normalizeCounty()`

Tighten both regexes:

- St. Lucie: `/^(saint|st\.?)\s+lucie(\s+county)?$/i`
- Okeechobee (catches the "Okechobee" typo on one record): `/^okee?chobee$/i`

Also update `normalizeCity()` Okeechobee check to the same `/^okee?chobee$/i` pattern so the typo doesn't drop on the city axis either.

### 3. Cache + logging

- `cache.server.ts` `FRESH_MS` is already `4 * 60 * 60 * 1000` — no change needed.
- No verbose distribution / HTML-sample logs were ever committed in the current scraper, so nothing to strip.
- Add a single DEV-only drop counter inside `fetchAdamsInventory()` that tallies `total`, `dropped_unavailable`, `dropped_off_territory`, and `kept`, then `console.info` once per fetch behind `if (import.meta.env.DEV)`. This is the permanent regression-detection hook.

### Expected outcome

Carousel total ~30–35. Okeechobee pill populates (≈8 raw, all under-construction). Fort Pierce ≈12+, Port St. Lucie ≈6+.

### Verification (after switch to build mode)

1. Hit `/`, read dev banner — confirm `total >= 30`.
2. Click each city pill, confirm counts above.
3. Check server logs for the one-line drop summary.
