I found two separate issues that line up with what you’re seeing:

1. The native preview is returning 404 for `/hero/hero-01.jpg`, even though the files exist. In this TanStack/Lovable dev server, `/public/hero/...` works, but the usual Vite root public path `/hero/...` is not being served correctly. That explains the broken image icon and why the hero/poster/gallery can look like it is “not loading” in the in-chat preview.
2. The horizontal full-bleed gallery is too aggressive. It uses `w-screen` plus `-mx-[50vw]` and huge card widths (`85vw` / `70vw`), which creates a confusing half-visible experience and page-level horizontal overflow. I agree this should be fixed rather than dismissed as a narrow-pane quirk.

Plan once approved:

1. Fix hero/community image URLs for Lovable preview reliability
   - Update `HERO_IMAGES` in `src/content/site.ts` from `/hero/hero-01.jpg` etc. to `/public/hero/hero-01.jpg` etc., because that path is confirmed to return 200 in the local preview.
   - Update `HeroVideo.tsx` poster URL to the same `/public/hero/hero-01.jpg` path.
   - Keep the existing 8 uploaded images and their order.

2. Remove page-level horizontal overflow
   - Add a global overflow guard to prevent the whole page from sliding sideways due to gallery/full-bleed math.
   - Prefer `overflow-x: clip` with a safe fallback to `hidden` if needed.

3. Redesign the “Inside the Communities” gallery so it is clear and not half-and-half
   - Replace the current full-bleed `w-screen -mx-[50vw]` strip with a contained, intentional carousel inside the normal page container.
   - Use cards that show one primary image cleanly at common desktop widths, with only a subtle next-card peek if appropriate.
   - On mobile, keep swipe behavior but size each card so it reads as a deliberate carousel, not a broken split layout.
   - Keep the “Swipe →” touch caption and “Scroll →” desktop caption, but make the section visually self-explanatory.

4. Keep Featured Communities restored
   - Preserve the two-video Featured Communities section as currently restored: Single Family Homes and Villas, side by side, with the original video-card feel.

5. Preview/HMR reliability checks
   - Inspect whether the CSS warning about Google font `@import` ordering can be cleaned up safely by moving the font import before Tailwind/custom statements or replacing it with a `<link>` in the document head.
   - This may help reduce in-chat preview quirks, though the immediate broken-image cause is the public asset path.

6. Verify after changes
   - Check `/public/hero/hero-01.jpg` and gallery images load with 200 responses.
   - Use the browser preview at the current approximate viewport to confirm no broken image icon in the hero and no page-level horizontal scrollbar.
   - Scroll to the gallery and confirm it no longer presents as a confusing half-and-half strip.
   - Run the requested sweeps: Vimeo/YouTube placement, emoji sweep, banned phrase sweep, and dev banner placeholder count still at 10.