import * as React from "react";
import { Sparkles } from "lucide-react";
import { InventoryCard } from "@/components/inventory/InventoryCard";
import { getAdamsInventory } from "@/integrations/adams-homes/inventory.functions";
import { isHighDemand } from "@/integrations/adams-homes/demand";
import type { AdamsHomeProperty, CityFilter } from "@/integrations/adams-homes/types";

function matches(home: AdamsHomeProperty, filter: CityFilter): boolean {
  if (filter === "all") return true;
  return home.city === filter;
}


export function InventoryGrid({
  initialFilter = "all",
  initialDemand = false,
}: { initialFilter?: CityFilter; initialDemand?: boolean } = {}) {
  const [filter, setFilter] = React.useState<CityFilter>(initialFilter);
  const [inDemandOnly, setInDemandOnly] = React.useState<boolean>(initialDemand);
  const [state, setState] = React.useState<{
    properties: AdamsHomeProperty[];
    loading: boolean;
    error: string | null;
    lastFetched: string | null;
  }>({ properties: [], loading: true, error: null, lastFetched: null });

  React.useEffect(() => {
    let mounted = true;
    getAdamsInventory()
      .then((r) => mounted && setState({ properties: r.properties, loading: false, error: r.error, lastFetched: r.lastFetched }))
      .catch((e: unknown) => mounted && setState({ properties: [], loading: false, error: e instanceof Error ? e.message : String(e), lastFetched: null }));
    return () => { mounted = false; };
  }, []);

  const filtered = React.useMemo(
    () =>
      state.properties.filter(
        (h) => matches(h, filter) && (!inDemandOnly || isHighDemand(h)),
      ),
    [state.properties, filter, inDemandOnly],
  );

  const visiblePills = React.useMemo<{ label: string; value: CityFilter }[]>(() => {
    const cities = new Set<string>();
    for (const h of state.properties) if (h.city) cities.add(h.city);
    const sorted = Array.from(cities).sort((a, b) => a.localeCompare(b));
    return [
      { label: "All", value: "all" as CityFilter },
      ...sorted.map((c) => ({ label: c, value: c as CityFilter })),
    ];
  }, [state.properties]);

  React.useEffect(() => {
    if (state.loading) return;
    if (!visiblePills.some((p) => p.value === filter)) setFilter("all");
  }, [visiblePills, filter, state.loading]);

  const demandCount = React.useMemo(
    () => state.properties.filter(isHighDemand).length,
    [state.properties],
  );


  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setInDemandOnly((v) => !v)}
          aria-pressed={inDemandOnly}
          className={
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors " +
            (inDemandOnly
              ? "bg-gold text-navy"
              : "border border-gold/40 bg-white text-navy hover:border-gold")
          }
        >
          <Sparkles size={14} aria-hidden />
          Most In Demand
          {demandCount > 0 ? (
            <span className="ml-1 text-xs opacity-70">({demandCount})</span>
          ) : null}
        </button>
        {visiblePills.map((p) => {
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
          {inDemandOnly
            ? "No high-demand matches in the current Adams inventory. Try All, or call Nancy at (772) 899-7333."
            : "No homes match this filter right now. Try All, or call Nancy directly at (772) 899-7333."}
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

      {import.meta.env.DEV ? (
        <div className="mt-4 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-center text-[11px] font-mono text-amber-900">
          inventory: total={state.properties.length} filtered={filtered.length}{" "}
          last={state.lastFetched ?? "—"} {state.error ? `err=${state.error}` : ""}
        </div>
      ) : null}
    </div>
  );
}
