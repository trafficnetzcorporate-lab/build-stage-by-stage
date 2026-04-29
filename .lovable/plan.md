## Goal

Make every change you publish appear in the native Lovable preview iframe immediately — no reopening the preview, no hard-refresh — without slowing down the production site for real visitors.

## What's actually causing the staleness

Three suspects, ranked by likelihood:

1. **A service worker registered by a previous build** is intercepting requests inside the preview iframe and serving cached responses. This is the #1 cause of "I have to reopen the preview." Once registered, it persists across reloads.
2. **The browser cache reuses `/public/hero/*.jpg`** because the URLs never change, even after the file bytes change.
3. **The dev HTML shell** can get cached by an intermediate proxy, so the iframe gets the old document.

## Fix (no production downsides)

### 1. Service-worker exorcism (dev + prod, runs once on mount)

In `src/routes/__root.tsx`, add a tiny effect inside `RootComponent` that, on first paint, asks the browser for any registered service workers and unregisters them, then clears the Cache Storage API entries. Wrapped in a `try/catch` and a one-shot `sessionStorage` flag so it runs at most once per tab. Safe in production because the site has no service worker — this only ever runs if a stale one is found.

### 2. Asset versioning via Vite's `?url` import (best-of-both)

Instead of a manual version constant, switch `src/content/site.ts` `HERO_IMAGES` and `HeroVideo.tsx`'s poster from raw string paths (`/public/hero/hero-01.jpg`) to actual ES imports:

```ts
import hero01 from "/public/hero/hero-01.jpg?url";
```

Vite/Rollup automatically appends a content hash to the emitted filename in production AND serves a fresh module URL in dev whenever the source bytes change. This is the "per-file content hash" option, but free — no build script needed, no manual bumping, no timestamp churning unrelated assets. It's the canonical Vite pattern and what the rest of the ecosystem expects.

### 3. Dev-only `no-store` on the HTML document

Add a `<meta http-equiv="Cache-Control" content="no-store">` tag to `head` only when `import.meta.env.DEV` is true. Production keeps normal caching (so Cloudflare/edge caching still works for repeat visitors).

### 4. (Skipped) Vite dev-server header tweaks

Cannot modify — `vite.config.ts` is locked behind `@lovable.dev/vite-tanstack-config`. Items 1–3 are sufficient and don't need it.

## What this does NOT touch

- `FeaturedCommunities.tsx` — unchanged
- `CommunitiesGallery.tsx` — unchanged
- The Vimeo/YouTube embeds, the design tokens, the routing, the dev placeholder banner — all unchanged
- Production Cache-Control headers on assets — still hashed-and-immutable, so real visitors still get fast repeat loads

## Files to edit

```text
src/routes/__root.tsx           +SW unregister effect, +dev-only no-store meta
src/content/site.ts             HERO_IMAGES → ES imports w/ ?url
src/components/home/HeroVideo.tsx   poster src → ES import w/ ?url
```

## Verification (will run after implementing)

1. Confirm dev-server response headers in the preview show `Cache-Control: no-store` for the HTML document only (not for `/assets/*`).
2. Confirm `HERO_IMAGES[0]` resolves to a hashed URL like `/assets/hero-01-a1b2c3d4.jpg` in a production build, and to a `?t=` versioned dev URL in dev.
3. Confirm `navigator.serviceWorker.getRegistrations()` returns `[]` after first paint.
4. Re-run the existing sweeps: 0 emojis, 0 banned phrases, all 8 hero images return 200.
5. Visual smoke check: gallery contained, hero video unchanged (still starts at 5s on the nocookie embed), Featured Communities still side-by-side.

## Why this beats the alternatives

- **Timestamp `?v=Date.now()`**: would change every single build for every asset, defeating browser caching entirely on production for repeat visitors. The Vite `?url` import only changes the URL when the file actually changes.
- **Manual version constant**: easy to forget, and every "I forgot to bump it" turns into another support cycle.
- **Aggressive `no-store` everywhere in prod**: would slow down real visitors with no benefit, since they aren't the ones experiencing the staleness.

The Vite `?url` import is the standard, boring, correct answer — it's what the framework is designed for.
