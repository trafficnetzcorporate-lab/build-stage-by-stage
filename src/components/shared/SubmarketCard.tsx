import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

type CityFilterValue = "all" | "Port St. Lucie" | "Fort Pierce" | "Okeechobee County";

/**
 * Submarket / city card with the gold underline animation. Shared by the
 * homepage Featured Communities row and the /buyers communities snapshot.
 *
 * Always deep-links into the inventory grid pre-filtered to this city so the
 * user lands directly on homes — no extra hero in between.
 */
export function SubmarketCard({
  name,
  blurb,
}: {
  name: string;
  /** Legacy prop, ignored — kept so existing call sites compile. */
  to?: string;
  blurb?: string;
}) {
  const city: CityFilterValue =
    name === "Port St. Lucie" || name === "Fort Pierce" || name === "Okeechobee County"
      ? name
      : "all";
  return (
    <Link
      to="/communities/inventory"
      search={{ city }}
      className="group block h-full rounded-2xl bg-navy/60 p-7 ring-1 ring-cream/10 transition-all duration-300 hover:bg-navy/80 hover:ring-gold/40"
    >
      <div className="font-display text-2xl font-medium text-cream">{name}</div>
      {blurb ? (
        <p className="mt-3 text-sm leading-relaxed text-cream/75">{blurb}</p>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
        <span className="relative">
          View available homes
          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
        </span>
        <ArrowUpRight size={14} />
      </span>
    </Link>
  );
}
