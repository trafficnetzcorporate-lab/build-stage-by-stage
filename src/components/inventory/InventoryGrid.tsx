import * as React from "react";
import { InventoryCard } from "@/components/inventory/InventoryCard";
import { getAdamsInventory } from "@/integrations/adams-homes/inventory.functions";
import type { AdamsHomeProperty, CityFilter } from "@/integrations/adams-homes/types";

const PILLS: { label: string; value: CityFilter }[] = [
  { label: "All", value: "all" },
  { label: "Port St. Lucie", value: "Port St. Lucie" },
  { label: "Fort Pierce", value: "Fort Pierce" },
  { label: "Okeechobee County", value: "Okeechobee County" },
];

function matches(home: AdamsHomeProperty, filter: CityFilter): boolean {
  if (filter === "all") return true;
  if (filter === "Okeechobee County") return home.city === "Okeechobee";
  return home.city === filter;
}

export function InventoryGrid() {
  const [filter, setFilter] = React.useState<CityFilter>("all");
  const [state, setState] = React.useState<{
    properties: AdamsHomeProperty[];
    loading: boolean;
    error: string | null;
  }>({ properties: [], loading: true, error: null });

  React.useEffect(() => {
    let mounted = true;
    getAdamsInventory()
      .then((r) => mounted && setState({ properties: r.properties, loading: false, error: r.error }))
      .catch((e: unknown) => mounted && setState({ properties: [], loading: false, error: e instanceof Error ? e.message : String(e) }));
    return () => { mounted = false; };
  }, []);

  const filtered = state.properties.filter((h) => matches(h, filter));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {PILLS.map((p) => {
          const active = filter === p.value;
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => setFilter(p.value)}
              className={
                "rounded-full px-4 py-2 text-sm font-medium transition-colors " +
                (active ? "bg-navy text-cream" : "border border-navy/15 bg-white text-navy hover:border-gold")
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {state.loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-deep" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-base text-navy">
          No homes match this filter right now. Try All, or call Nancy directly at (772) 899-7333.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((home) => (
            <InventoryCard key={home.id} home={home} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Inventory sourced from adamshomes.com. Updated every 4 hours.
      </p>
    </div>
  );
}
