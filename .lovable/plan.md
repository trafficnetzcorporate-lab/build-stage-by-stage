## Runtime diagnostic plan: instrument scraper to find why inventory caps at ~10

Goal: produce one block of server logs that pinpoints which assumption is wrong (raw count, status filter, county/city filter, builder id, or cache staleness). No fixes — only instrumentation + report.

### Changes

**1. `src/integrations/adams-homes/scraper.server.ts`**

Replace `fetchAdamsInventory` with an instrumented version that logs at every pipeline stage using plain `console.log` (not gated on DEV) so logs show up in worker logs:

- HTTP status + content-length header
- HTML body length
- `__PRELOADED_STATE__` marker index (with a 500-char sample if missing)
- `state.cloudData` keys
- All builder IDs in `state.cloudData.homes` and the count under each (flag the expected `BUILDER_ID`)
- Raw `homes.length` for our builder ID
- Distribution maps for `status`, `addressCounty`, `addressLocality` across all raw homes
- Drop counters during the filter loop:
  - `availability`
  - `territory` (subdivided into `territory_county_failed` vs `territory_city_failed`)
- Final kept count

Logic itself unchanged — only logging added and the inline filter rewritten to track drop reasons. After report, drop counters stay behind `import.meta.env.DEV` as a permanent aid; the verbose distribution logs get removed.

**2. `src/integrations/adams-homes/cache.server.ts`**

Temporarily force fresh fetches:
```ts
// const FRESH_MS = 4 * 60 * 60 * 1000; // 4 hours — restore after diagnostic
const FRESH_MS = 0; // DIAGNOSTIC: force fresh fetch every request
```

Add a `console.log` at the top of `getCachedInventory()` reporting whether `memo` exists, its age in seconds, and current property count.

### Procedure

1. Apply the two file edits.
2. Wait for the preview to redeploy, then hit `/` once with a hard refresh to trigger a fresh fetch through the inventory server function.
3. Pull the latest `[Adams scraper]` and `[Adams cache]` lines from worker logs via `stack_modern--server-function-logs` (preview deployment).
4. Paste the full log block verbatim into the response and answer Q1–Q6 from the prompt against those numbers.
5. Stop. No fix proposed in this turn — the next turn targets whichever assumption broke.

### Cleanup (follow-up turn, after diagnostic)

- Restore `FRESH_MS = 4 * 60 * 60 * 1000`.
- Remove the verbose distribution + HTML-sample logs.
- Keep drop-counter logging gated behind `import.meta.env.DEV`.