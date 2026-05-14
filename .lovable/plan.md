## Goal

Fire a Meta Pixel `Lead` event on the client whenever the contact form successfully submits. Pure frontend change — no backend, no schema, no Pixel base-code edits (that's already in `__root.tsx`).

## Scope

One file edited, one tiny types file added.

### 1. `src/routes/contact.tsx`

In the submit handler (around line 171), right after `await submit({ data: parsed.data })` succeeds and before `setSubmitted(true)`, add a guarded, try/catch-wrapped Pixel call so any Pixel error (blocked by ad-blocker, fbq missing, etc.) cannot break the success state:

```ts
try {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead");
  }
} catch (pixelErr) {
  // Never let Pixel issues block the success UI
  console.warn("Meta Pixel Lead event failed:", pixelErr);
}
```

This guarantees the event only fires after Supabase persistence succeeds, and a Pixel failure still lets `setSubmitted(true)` run.

### 2. `src/types/fbq.d.ts` (new)

Ambient type so TS doesn't complain about `window.fbq`:

```ts
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
export {};
```

## Explicitly out of scope

- CAPI / server-side Conversions API (week 2-3, separate task)
- Meta Event Setup Tool wiring
- Domain verification meta tag
- Aggregated Event Measurement priority config
- Any change to the existing Pixel base script in `src/routes/__root.tsx`
- Any change to `submitContactFn` or `contact.server.ts` (server fn stays untouched; Lead is a browser-only signal for now)

## Verification after implementation

1. Publish to live site.
2. Load `nancyclarkerealtor.com/contact` with Meta Pixel Helper extension → confirm PageView fires.
3. Submit the form with a test payload → confirm a second event labelled `Lead` appears in Pixel Helper and in Events Manager → Test Events.
4. With an ad-blocker enabled, submit again → confirm the success state still renders and a warning is logged in the console.
