# Homepage Structural Updates (revised)

Plan as previously approved, with all 7 adjustments folded in.

---

## 1. Hero — YouTube video background

**New: `src/components/home/HeroVideo.tsx`** (replaces `HeroSlideshow` in Hero only; `HeroSlideshow` left in place, unused)

- Wrapper `absolute inset-0 overflow-hidden bg-navy-deep`
- **Poster always rendered underneath** as `<img src="/hero/hero-01.jpg">`, `fetchPriority="high"`, `object-cover` — this is the LCP target and the permanent fallback
- **Iframe layered ON TOP of poster** (no fade-out). If autoplay fails (iOS low-power, etc.), poster shows through permanently — clean failure mode
- **IntersectionObserver with 1500ms continuous-visibility debounce**: only mount iframe after hero has been ≥25% visible for 1.5s uninterrupted. Scroll past quickly → iframe never mounts → bandwidth saved
- iframe URL: `https://www.youtube.com/embed/HZet4A8DAyc?autoplay=1&mute=1&loop=1&playlist=HZet4A8DAyc&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0`
- Cover sizing (`pointer-events-none`, centered with translate):
  ```
  width:  max(100vw, 177.78vh);
  height: max(100vh, 56.25vw);
  ```
- `prefers-reduced-motion`: iframe never mounts; poster only

**Edit: `src/components/home/Hero.tsx`**

- Swap `<HeroSlideshow />` → `<HeroVideo />`
- Add top-down nav-legibility gradient: `absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-deep/40 to-transparent`
- Existing left-to-right gradient (slightly cooler tail: `to-navy-deep/35`) and bottom vignette remain
- All copy, CTAs, trust strip, breathing room unchanged

---

## 2. Section 3 — Single full-width Waterstone Villas card

**Edit: `src/components/home/FeaturedCommunities.tsx`**

- Replace `lg:grid-cols-2` grid with a single full-width card
- Aspect: `aspect-[4/5]` mobile, `md:aspect-[21/9]` desktop, `rounded-3xl`
- Lazy YouTube mount + lightbox behavior unchanged
- **Right-aligned content treatment** at `md:` and up: copy block uses `md:ml-auto md:text-right`, max-width ~520px, anchored bottom-right
- **Play button stays centered** on the card (per adjustment 3) — right-aligned text alone is sufficient differentiation
- 3-city pill row below unchanged

**Edit: `src/content/site.ts`**

- Trim `HOMEPAGE.communities.featured` to only the Villas entry (remove `waterstone-sfh` — now in hero)
- Slightly extend Villas `body` copy to fill the more cinematic frame
- Add `HOMEPAGE.communities.gallery` block with eyebrow / headline / subhead for Section 5.5 (below)

---

## 3. New "Communities Gallery" section (between MeetNancy and VideoShowcase)

**New: `src/components/home/CommunitiesGallery.tsx`**

- `<Section tone="cream" size="lg">`
- Inside `<Container>`: gold `Eyebrow` "Inside the Communities", `text-display-2` headline (no italic) "What you're selling your buyer.", 17px Inter subhead in `text-muted-foreground`, `max-w-[680px]`
- Below Container: full-bleed wrapper `w-screen relative left-1/2 right-1/2 -mx-[50vw]` containing horizontal-scroll strip:
  - `flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6`
  - Scrollbar hidden via `[scrollbar-width:none] [&::-webkit-scrollbar]:hidden`
  - **Leading + trailing spacers**: `shrink-0 w-6 md:w-[15vw]` (per adjustment 4 — 15vw eats too much on mobile)
- Each image: `flex-shrink-0 snap-center w-[85vw] md:w-[70vw] aspect-[16/10] rounded-2xl ring-1 ring-navy/10 overflow-hidden`
  - `<img>` with `loading="lazy"`, `object-cover`, full size of wrapper
  - **Hover under motion-safe** (per adjustment 6): `motion-safe:transition-transform motion-safe:duration-500 md:motion-safe:hover:scale-[1.02] md:hover:shadow-2xl md:hover:shadow-navy/20`
- No titles, no captions on individual images
- Below strip, centered Fraunces italic caption:
  - Mobile: `<span class="md:hidden">Swipe →</span>` (per adjustment 5)
  - Desktop: `<span class="hidden md:inline">Scroll →</span>`
- Source: `HERO_IMAGES` from `@/content/site`

**Edit: `src/routes/index.tsx`**

- Insert `<CommunitiesGallery />` between `<MeetNancy />` and `<VideoShowcase />`

---

## 4. Nancy's headshot

Already copied: `user-uploads://Nancy_headshot-2.jpg` → `src/assets/nancy-portrait.jpg`. Existing import in `MeetNancy.tsx` resolves automatically. No code changes.

---

## 5. Verification (post-build, per adjustment 7)

- `rg -in "vimeo|HZet4A8DAyc"` — confirm `HZet4A8DAyc` only in `HeroVideo.tsx`; Vimeo only in `VideoShowcase.tsx`
- `rg -in "60-minute|MLS-exclusive|8\+ years"` — must be 0 hits
- Emoji sweep — must be 0 hits
- Dev placeholder banner finding count unchanged (10)
- **Ultra-wide hero check**: `browser--set_viewport_size` to closest supported wide size (1920×1080, then ratio-stretch reasoning); confirm cover math gives no letterboxing — formula `max(100vw, 177.78vh)` × `max(100vh, 56.25vw)` guarantees both dimensions ≥ viewport at any aspect ratio
- Verify hero at mobile (375×812) and tablet (820×1180) for poster visibility, gradient legibility, CTA spacing

## Completion summary will list

- Hero swap (poster persistence, debounced IO, cover sizing, top gradient)
- Section 3 restructured (single Villas card, right-aligned text, centered play)
- Gallery section added (responsive spacers, motion-safe hover, mobile "Swipe →" caption)
- Headshot replaced
- All sweeps + ultra-wide test results

Standing by after — will not start Prompt 3.
