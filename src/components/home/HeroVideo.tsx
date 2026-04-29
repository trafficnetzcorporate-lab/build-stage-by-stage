import * as React from "react";

const YT_ID = "HZet4A8DAyc";
const START_SECONDS = 5;
// nocookie domain + disablekb + iv_load_policy=3 hides annotations; start= skips the title overlay window.
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&start=${START_SECONDS}`;
const VISIBILITY_DEBOUNCE_MS = 1500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

/**
 * Full-bleed hero background.
 * - Poster (hero-01.jpg) is always rendered underneath as the LCP target
 *   and as a permanent fallback if autoplay is blocked.
 * - YouTube iframe is layered ON TOP of the poster (no fade-out). If
 *   autoplay fails (iOS low-power, etc.), the poster shows through.
 * - IntersectionObserver with a 1.5s continuous-visibility threshold:
 *   bandwidth is saved on bounce visits.
 * - prefers-reduced-motion: iframe never mounts.
 */
export function HeroVideo() {
  const reduced = usePrefersReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [mountIframe, setMountIframe] = React.useState(false);

  React.useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setMountIframe(true);
      return;
    }

    let timer: number | null = null;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (timer == null) {
              timer = window.setTimeout(() => {
                setMountIframe(true);
                obs.disconnect();
              }, VISIBILITY_DEBOUNCE_MS);
            }
          } else if (timer != null) {
            window.clearTimeout(timer);
            timer = null;
          }
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => {
      if (timer != null) window.clearTimeout(timer);
      obs.disconnect();
    };
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-navy-deep">
      {/* Poster — LCP target, permanent fallback. */}
      <img
        src="/public/hero/hero-01.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Video layered above poster. Cover sizing guarantees no letterboxing
          at any aspect ratio (mobile portrait through 21:9 ultrawide). */}
      {mountIframe ? (
        <iframe
          src={EMBED_SRC}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            border: 0,
            width: "max(100vw, 177.78vh)",
            height: "max(100vh, 56.25vw)",
          }}
        />
      ) : null}
    </div>
  );
}
