import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play, X } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE } from "@/content/site";

function VideoCard({
  label,
  title,
  body,
  youtubeId,
  onOpen,
}: {
  label: string;
  title: string;
  body: string;
  youtubeId: string;
  onOpen: (id: string) => void;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setMount(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMount(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "150px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const poster = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
  const embedSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&playsinline=1&rel=0`;

  return (
    <button
      ref={ref as unknown as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={() => onOpen(youtubeId)}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl bg-navy-deep text-left md:aspect-[21/9]"
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-70"
      />
      {mount ? (
        <iframe
          src={embedSrc}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            border: 0,
            width: "max(100%, calc(100% * 16 / 9))",
            height: "max(100%, calc(100% * 9 / 16))",
            minWidth: "100%",
            minHeight: "100%",
          }}
          allow="autoplay; encrypted-media"
        />
      ) : null}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/40 to-transparent md:bg-gradient-to-l md:from-navy-deep/95 md:via-navy-deep/50 md:to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
        <div className="md:ml-auto md:max-w-[520px] md:text-right">
          <span className="text-eyebrow text-gold">{label}</span>
          <h3 className="mt-3 font-display text-2xl font-medium leading-tight text-cream md:text-4xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/80 md:ml-auto md:max-w-md md:text-base">
            {body}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Tour <ArrowUpRight size={16} />
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
      >
        <Play size={22} fill="currentColor" />
      </span>
    </button>
  );
}

function VideoLightbox({
  videoId,
  onClose,
}: {
  videoId: string | null;
  onClose: () => void;
}) {
  React.useEffect(() => {
    if (!videoId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [videoId, onClose]);

  if (!videoId) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep/95 p-4 backdrop-blur-md"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
      >
        <X size={20} />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl"
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title="Community tour video"
          className="h-full w-full"
          style={{ border: 0 }}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function FeaturedCommunities() {
  const { eyebrow, headline, subhead, featured, submarkets } = HOMEPAGE.communities;
  const [open, setOpen] = React.useState<string | null>(null);

  return (
    <Section tone="navy" size="lg">
      <Container>
        <FadeInOnScroll>
          <Eyebrow tone="cream">{eyebrow}</Eyebrow>
          <h2 className="text-display-2 mt-6 max-w-3xl text-cream">{headline}</h2>
          <p className="mt-6 max-w-[580px] text-base leading-relaxed text-cream/80">
            {subhead}
          </p>
        </FadeInOnScroll>

        <div className="mt-14">
          {featured.map((c, i) => (
            <FadeInOnScroll key={c.slug} delay={i * 150}>
              <VideoCard
                label={c.label}
                title={c.title}
                body={c.body}
                youtubeId={c.youtubeId}
                onOpen={setOpen}
              />
            </FadeInOnScroll>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {submarkets.map((sm, i) => (
            <FadeInOnScroll key={sm.name} delay={i * 100}>
              <Link
                to={sm.to}
                className="group block rounded-2xl bg-navy/60 p-7 ring-1 ring-cream/10 transition-all duration-300 hover:bg-navy/80 hover:ring-gold/40"
              >
                <div className="font-display text-2xl font-medium text-cream">{sm.name}</div>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                  <span className="relative">
                    View available homes
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>

      <VideoLightbox videoId={open} onClose={() => setOpen(null)} />
    </Section>
  );
}
