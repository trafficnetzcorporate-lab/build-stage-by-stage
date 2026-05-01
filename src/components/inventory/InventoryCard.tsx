import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { AdamsHomeProperty } from "@/integrations/adams-homes/types";

/**
 * IMPORTANT — display invariant:
 *   The eyebrow uses `communityName` and the address line uses `city`, both
 *   straight from the property record. Never derive them from the URL slug.
 *   Adams Homes URL-slugs Fort Pierce inventory under `port-st-lucie`, so
 *   pulling from the slug would mislabel real Fort Pierce homes. Future edits
 *   must keep the city / community fields sourced from the record.
 */
export function InventoryCard({ home }: { home: AdamsHomeProperty }) {
  const priceStr =
    home.price != null
      ? `$${home.price.toLocaleString()}`
      : "Pricing on request";

  const sqftStr = home.sqft != null ? home.sqft.toLocaleString() : "—";
  const beds = home.beds ?? "—";
  const baths = home.baths ?? "—";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10 shadow-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-deep">
        {home.imageUrl ? (
          <img
            src={home.imageUrl}
            alt={`${home.communityName} — ${home.address}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-navy/40">
            Photo coming soon
          </div>
        )}
        <span
          className={
            "absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider " +
            (home.status === "move-in"
              ? "bg-gold text-navy-deep"
              : "bg-navy text-cream")
          }
        >
          {home.status === "move-in" ? "Move-in Ready" : "Under Construction"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-eyebrow text-gold">{home.communityName}</div>
        <h3 className="mt-2 font-display text-[20px] leading-snug text-navy">
          {home.address || "Address available on request"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{home.city}</p>

        <p className="mt-3 text-sm text-navy/80">
          {beds} bd · {baths} ba · {sqftStr} sqft
        </p>

        <p className="mt-3 font-display text-[24px] text-navy">{priceStr}</p>

        <div className="mt-5 flex-1" />

        <Link
          to="/contact"
          search={{ property: home.id, community: home.communityName }}
          className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-success px-5 text-sm font-semibold text-cream shadow shadow-success/20 transition-all duration-300 hover:-translate-y-0.5"
        >
          Contact Nancy about this home
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
