## Order of operations (each is an independent commit)

### 1. Fix county filter (Bug #1) — unblocks ~60 properties

`src/integrations/adams-homes/scraper.server.ts`
- Add `normalizeCounty(raw)` helper: `/^(saint|st\.?)\s+lucie$/i` → `"St. Lucie"`, `/^okeechobee$/i` → `"Okeechobee"`.
- Rewrite `inTerritory()` to compare against the normalized value.
- In `fetchAdamsInventory()`, set `county: normalizeCounty(h.addressCounty)` on the pushed record.
- Broaden `isAvailable`: accept `status === "Active"` OR `"For Sale"` (case-insensitive); keep the in-process date sweep.

`src/integrations/adams-homes/types.ts`
- Update `county` JSDoc to `"St. Lucie" | "Okeechobee"` (normalized).

Verify: `rg -n "Saint Lucie" src/integrations/adams-homes/` → 0 hits.

### 2. Auto-hide empty filter pills

`InventoryCarousel.tsx` and `InventoryGrid.tsx`:
- `useMemo` an `availableCities` Set from `data.properties`.
- Filter `PILLS` to render `"all"` plus pills whose city exists in the set (`"Okeechobee County"` maps to `"Okeechobee"`).
- Effect: if the active filter pill becomes hidden after a dataset reload, reset to `"all"`.

### 3. Centralize email helpers (prep for #4)

- New `src/integrations/email/config.ts` exports `EMAIL_FROM = "JMS Web Studio <onboarding@resend.dev>"`.
- New `src/lib/email-utils.ts` exports `escapeHtml(s)` (pure, no server deps).
- Update `agreement.server.ts` and `intake.server.ts` to import `EMAIL_FROM` and `escapeHtml` from the shared modules and remove their local copies.

When the Resend domain is later verified, the swap is a one-line edit in `email/config.ts`.

### 4. Build the real `/contact` form (Bug #2)

`src/integrations/contact/contact.server.ts` (new)
- Imports `EMAIL_FROM` and `escapeHtml` from the shared modules above.
- Resend wiring mirrors `intake.server.ts` (`RESEND_API_KEY`, `NOTIFY_EMAIL_J`).
- Exports `submitContactForm` helper validated by Zod: discriminated union on `audience: "realtor" | "buyer"` with the spec'd fields, plus shared `firstName`, `lastName`, `email`, `phone`, optional `message`, required `consent: true`, optional `property` + `community`.
- Subject: `New contact: {first} {last} ({audience}) — {community || "general"}`. HTML body lists all fields plus property/community context.

`src/integrations/contact/contact.functions.ts` (new)
- Wraps the helper in `createServerFn({ method: "POST" })` with the same Zod validator.

`src/routes/contact.tsx` (rewrite — keep existing `validateSearch` schema and the TODO comment)
- Two-column grid (stacks on mobile). Form left, direct-contact right.
- When `property || community`, show the cream-deep / gold-left-border banner above the toggle.
- Audience toggle pill: **always defaults to `"realtor"`** regardless of search params. Active state: success-green for realtor, gold for buyer. User picks deliberately.
- Render shared fields, then audience-specific dropdowns per spec.
- **Pre-fill the textarea when search params are present** using the exact template in the brief — independent of the toggle.
- Required compliance checkbox using the verbatim Adams Homes consent string from `site.ts` (locate the existing constant).
- Submit button: success-green, full-width on mobile, "Send Securely →". On success, replace the form with green check + "Got it. I'll be in touch shortly. — Nancy".
- Right column: Fraunces 36px tel: link, mailto: link, trust card with Nancy's promise copy.
- Submit handler uses `useServerFn(submitContactForm)`. Plain `useState` + Zod `safeParse` for validation (no `react-hook-form` dependency for a one-screen form).

### 5. Outstanding-item sweep

- **Item 3 (InventoryGateway header):** already has the EMERGENCY REVERT comment — confirmed, no change.
- **Item 4 (status pill states):** extend `getIntakeDraftFn` selection to include `submitted_at`, then in `routes/onboarding.index.tsx` render:
  - In-progress: `Started · {current_section_index + 1} of {N} sections` (N from `intake-schema.ts` section count).
  - Submitted: `Completed on {locale date}` from `submitted_at`.
- **Item 6 (Vimeo):** `rg -n vimeo src/` already only hits `VideoShowcase.tsx` — confirmed, no change.
- **Dev banner parity:** add the same `import.meta.env.DEV` banner block from `InventoryCarousel.tsx` to `InventoryGrid.tsx`.

### 6. Skipped this pass

- **Resend domain verification:** flag in final response and ask which path Nancy prefers. No code change beyond the centralization in step 3.
- **Mortgage VERIFY cleanup:** Nancy hasn't confirmed yet — leave markers, flag in final response.
- **Improvements 1-4** (image fallback, skeleton delay, pluralization, sort dropdown): defer per "nice-to-haves at end".

## Verification checklist

1. `rg -n "Saint Lucie" src/integrations/adams-homes/` → 0 hits.
2. Carousel renders 30+ properties.
3. Okeechobee pill shows real homes or auto-hides.
4. Empty filter pills auto-hide; active hidden pill resets to All.
5. Inventory card CTA lands on the real contact form.
6. Context banner + pre-filled message appear when arriving from a card; toggle still defaults to Realtor.
7. Form submission emails `NOTIFY_EMAIL_J` via Resend.
8. `EMAIL_FROM` and `escapeHtml` only declared once each, imported by all three server functions.
9. Onboarding intake card shows "Started · X of N sections" and "Completed on {date}".
10. Dev banner present in both carousel and grid.
