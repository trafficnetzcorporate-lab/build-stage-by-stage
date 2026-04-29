import * as React from "react";
import { HERO_IMAGES } from "@/content/site";

const ROTATION_MS = 10000;
const FADE_MS = 1500;

// Per-image Ken Burns pan targets (translate at end of zoom). Varied per index.
const PANS = [
  { x: -2, y: -1 },
  { x: 1.5, y: -1.5 },
  { x: -1.8, y: 1 },
  { x: 2, y: 1.2 },
  { x: -1.2, y: -1.8 },
  { x: 1.8, y: 0.8 },
  { x: -2, y: 0.5 },
  { x: 1, y: -2 },
];

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

export function HeroSlideshow() {
  const reduced = usePrefersReducedMotion();
  const images = HERO_IMAGES;
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Visibility pause
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => setPaused(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Rotation
  React.useEffect(() => {
    if (reduced || images.length <= 1 || paused) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, [reduced, images.length, paused]);

  // Preload next
  React.useEffect(() => {
    if (reduced || images.length <= 1) return;
    const next = images[(active + 1) % images.length];
    const img = new Image();
    img.src = next.src;
  }, [active, reduced, images]);

  // Reduced motion: render only the lead image, static.
  if (reduced) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={images[0].src}
          alt={images[0].alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => {
        const isActive = i === active;
        const pan = PANS[i % PANS.length];
        return (
          <div
            key={img.src}
            aria-hidden={!isActive}
            className="absolute inset-0 transition-opacity ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
          >
            <img
              src={img.src}
              alt={isActive ? img.alt : ""}
              fetchPriority={i === 0 ? "high" : "low"}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
              style={{
                transform: isActive
                  ? `scale(1.08) translate(${pan.x}%, ${pan.y}%)`
                  : "scale(1.0) translate(0%, 0%)",
                transition: isActive
                  ? `transform ${ROTATION_MS}ms linear`
                  : `transform ${FADE_MS}ms ease-out`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
