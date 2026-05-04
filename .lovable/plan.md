## Root cause

Every page header and most page sections are wrapped in `<FadeInOnScroll>`, which starts at `opacity-0` and only reveals on IntersectionObserver firing. In the in-app preview iframe (and sometimes after client-side navigation), IO doesn't fire reliably for content that is already visible at mount, so heroes and sections stay invisible forever. The inventory grid renders because it's not wrapped.

The carousel + hero render only because they're either not wrapped or get an IO event from the initial scroll.

The slow page-transitions + late contact rendering are symptoms of the same wrapper plus loaders/components that gate render on data without an immediate fallback.

## Fix

**1. `src/components/layout/FadeInOnScroll.tsx` — make the wrapper safe**

- On mount, measure the element's bounding rect. If it intersects the viewport already, set `visible=true` immediately (no IO wait).
- Lower IO threshold from 0.12 → 0.05 and rootMargin from `-60px` → `-40px` so off-screen-but-near content reveals sooner.
- Add a 1200ms safety `setTimeout` fallback that forces `visible=true` no matter what — content will never be permanently hidden.
- Keep cleanup for both observer and timeout.

**2. Verify after the fix**

- Navigate via in-app preview to `/about`, `/buyers`, `/sellers`, `/realtors`, `/home-loans`, `/contact`, `/communities`, `/communities/inventory`.
- Confirm hero + below-the-fold sections render immediately (not blank).
- Confirm `/contact` paints instantly.

**3. Page-transition slowness — separate diagnosis**

Once visibility is fixed, re-test navigation speed. If pages still feel slow, the cause is most likely:
- `getAdamsInventory()` server fn being called on routes that don't need it, or
- large image assets without preloading.

I'll profile with `browser--performance_profile` and report findings before making further changes.

## Out of scope this pass

- "Pages are incomplete" — needs a separate pass per page once they're actually visible. Right now we can't tell what's incomplete vs. just hidden.
