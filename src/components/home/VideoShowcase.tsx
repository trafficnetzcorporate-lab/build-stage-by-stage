import * as React from "react";
import { Play, X } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { HOMEPAGE } from "@/content/site";

type Modal =
  | { kind: "vimeo"; id: string; hash: string }
  | { kind: "youtube"; id: string }
  | null;

function Lightbox({ modal, onClose }: { modal: Modal; onClose: () => void }) {
  React.useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modal, onClose]);

  if (!modal) return null;
  const src =
    modal.kind === "vimeo"
      ? `https://player.vimeo.com/video/${modal.id}?h=${modal.hash}&autoplay=1`
      : `https://www.youtube.com/embed/${modal.id}?autoplay=1&rel=0&modestbranding=1`;

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
          src={src}
          title="Showcase video"
          className="h-full w-full"
          style={{ border: 0 }}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export function VideoShowcase() {
  const { eyebrow, headline, featuredVimeo, thumbnails } = HOMEPAGE.videoShowcase;
  const [modal, setModal] = React.useState<Modal>(null);
  const featuredPoster = `https://vumbnail.com/${featuredVimeo.id}.jpg`;

  return (
    <Section tone="cream-deep" size="lg">
      <Container>
        <FadeInOnScroll>
          <div className="text-center">
            <div className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <h2 className="text-display-2 mx-auto mt-6 max-w-3xl text-navy">
              {headline}
            </h2>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={150}>
          <button
            type="button"
            onClick={() =>
              setModal({ kind: "vimeo", id: featuredVimeo.id, hash: featuredVimeo.hash })
            }
            className="group relative mt-14 block aspect-video w-full overflow-hidden rounded-2xl bg-navy-deep shadow-2xl shadow-navy/20"
            aria-label="Play featured video"
          >
            <img
              src={featuredPoster}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-90"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-navy/20"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 inline-flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy-deep shadow-2xl ring-0 ring-gold/40 transition-all duration-300 group-hover:ring-8 md:h-24 md:w-24"
            >
              <Play size={28} fill="currentColor" />
            </span>
          </button>
        </FadeInOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {thumbnails.map((id, i) => (
            <FadeInOnScroll key={id} delay={i * 120}>
              <button
                type="button"
                onClick={() => setModal({ kind: "youtube", id })}
                className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-navy-deep"
                aria-label="Play video"
              >
                <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy-deep/30 transition-colors duration-300 group-hover:bg-navy-deep/10"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg"
                >
                  <Play size={16} fill="currentColor" />
                </span>
              </button>
            </FadeInOnScroll>
          ))}
        </div>
      </Container>

      <Lightbox modal={modal} onClose={() => setModal(null)} />
    </Section>
  );
}
