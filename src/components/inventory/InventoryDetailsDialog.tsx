import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { AdamsHomeProperty } from "@/integrations/adams-homes/types";

/**
 * IMPORTANT — data invariant:
 *   Every value rendered here comes verbatim from the Adams Homes feed via
 *   `AdamsHomeProperty`. Absent fields render as absent — never substitute a
 *   placeholder, estimate, or marketing filler. New homes automatically carry
 *   their own detail set on the next scrape.
 */
function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-cream-deep/60 px-4 py-3">
      <div className="text-[11px] uppercase tracking-wide text-navy/50">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-navy">{value}</div>
    </div>
  );
}

export function InventoryDetailsDialog({
  home,
  open,
  onOpenChange,
}: {
  home: AdamsHomeProperty;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [index, setIndex] = React.useState(0);
  const gallery = home.photos.length > 0 ? home.photos : home.imageUrl ? [home.imageUrl] : [];

  React.useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const priceStr =
    home.price != null ? `$${home.price.toLocaleString()}` : "Pricing on request";

  const specs: { label: string; value: string }[] = [];
  if (home.beds != null) specs.push({ label: "Bedrooms", value: String(home.beds) });
  if (home.bathsFull != null || home.baths != null) {
    const full = home.bathsFull ?? home.baths;
    const half = home.bathsHalf;
    specs.push({
      label: "Bathrooms",
      value: half ? `${full} full · ${half} half` : String(full),
    });
  }
  if (home.sqft != null) specs.push({ label: "Square feet", value: home.sqft.toLocaleString() });
  if (home.garages != null) specs.push({ label: "Garage", value: `${home.garages}-car` });
  if (home.stories != null) specs.push({ label: "Stories", value: String(home.stories) });
  if (home.planName) specs.push({ label: "Floor plan", value: home.planName });
  if (home.masterBedLocation)
    specs.push({ label: "Primary bedroom", value: home.masterBedLocation });
  if (home.mls) specs.push({ label: "MLS #", value: home.mls });
  if (home.postalCode) specs.push({ label: "ZIP", value: home.postalCode });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto p-0 sm:max-w-3xl">
        {/* Top half — photos */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-cream-deep">
          {gallery.length > 0 ? (
            <img
              src={gallery[index]}
              alt={`${home.communityName} — ${home.address}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-navy/40">
              Photo coming soon
            </div>
          )}

          {gallery.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => setIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-navy shadow ring-1 ring-navy/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setIndex((i) => (i + 1) % gallery.length)}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-navy shadow ring-1 ring-navy/10"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-navy/70 px-3 py-1 text-xs font-medium text-cream">
                {index + 1} / {gallery.length}
              </div>
            </>
          ) : null}
        </div>

        {/* Bottom half — details */}
        <div className="p-6">
          <DialogHeader className="space-y-1 text-left">
            <div className="text-eyebrow text-gold">{home.communityName}</div>
            <DialogTitle className="font-display text-[24px] leading-snug text-navy">
              {home.address || "Address available on request"}
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {[home.city, home.postalCode].filter(Boolean).join(" ")}
              {home.county ? ` · ${home.county} County` : ""}
            </DialogDescription>
          </DialogHeader>

          <p className="mt-4 font-display text-[28px] text-navy">{priceStr}</p>
          {home.banner ? (
            <p className="mt-1 text-sm font-semibold text-gold">{home.banner}</p>
          ) : null}

          {specs.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {specs.map((s) => (
                <Spec key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          ) : null}

          {home.description ? (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-navy">About this home</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-navy/80">
                {home.description}
              </p>
            </div>
          ) : null}

          {home.planFeatures.length > 0 ? (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-navy">Floor plan features</h4>
              <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                {home.planFeatures.map((f) => (
                  <li key={f} className="text-sm capitalize text-navy/80">
                    · {f}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {home.openHouses.length > 0 ? (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-navy">Open house</h4>
              <ul className="mt-2 space-y-1">
                {home.openHouses.map((o) => (
                  <li key={`${o.date}-${o.startTime}`} className="text-sm text-navy/80">
                    {o.date}
                    {o.startTime && o.endTime ? ` · ${o.startTime}–${o.endTime}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {home.floorplanPhotos.length > 0 ? (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-navy">Floor plan</h4>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {home.floorplanPhotos.map((src) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Floor plan for ${home.address}`}
                    loading="lazy"
                    className="w-full rounded-xl bg-white object-contain ring-1 ring-navy/10"
                  />
                ))}
              </div>
            </div>
          ) : null}

          <Link
            to="/contact"
            search={{ property: home.id, community: home.communityName }}
            className="group mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-success px-5 text-sm font-semibold text-cream shadow shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Nancy about this home
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <p className="mt-4 text-xs text-muted-foreground">
            Details and photos published by Adams Homes and refreshed every 4 hours. Photos may
            be of a similar model. Confirm current pricing and availability with Nancy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
