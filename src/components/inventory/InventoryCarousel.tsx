import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { FadeInOnScroll } from "@/components/layout/FadeInOnScroll";
import { InventoryCard } from "@/components/inventory/InventoryCard";
import { getAdamsInventory } from "@/integrations/adams-homes/inventory.functions";
import { isHighDemand } from "@/integrations/adams-homes/demand";
import type { AdamsHomeProperty, CityFilter } from "@/integrations/adams-homes/types";

function matchesCity(home: AdamsHomeProperty, filter: CityFilter): boolean {
  if (filter === "all") return true;
  return home.city === filter;
}


export function InventoryCarousel() {
  const [filter, setFilter] = React.useState<CityFilter>("all");
  const [inDemandOnly, setInDemandOnly] = React.useState<boolean>(false);
  const [data, setData] = React.useState<{
    properties: AdamsHomeProperty[];
    loading: boolean;
    error: string | null;
    lastFetched: string | null;
  }>({ properties: [], loading: true, error: null, lastFetched: null });

  const scrollerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let mounted = true;
    getAdamsInventory()
      .then((result) => {
        if (!mounted) return;
        setData({
          properties: result.properties,
          loading: false,
          error: result.error,
          lastFetched: result.lastFetched,
        });
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setData({
          properties: [],
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
          lastFetched: null,
        });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = React.useMemo(
    () =>
      data.properties.filter(
        (h) => matchesCity(h, filter) && (!inDemandOnly || isHighDemand(h)),
      ),
    [data.properties, filter, inDemandOnly],
  );
  const visible = filtered.slice(0, 12);
  const hasMore = filtered.length > 12;

  const visiblePills = React.useMemo<{ label: string; value: CityFilter }[]>(() => {
    const cities = new Set<string>();
    for (const h of data.properties) if (h.city) cities.add(h.city);
    const sorted = Array.from(cities).sort((a, b) => a.localeCompare(b));
    return [
      { label: "All", value: "all" as CityFilter },
      ...sorted.map((c) => ({ label: c, value: c as CityFilter })),
    ];
  }, [data.properties]);

  React.useEffect(() => {
    if (data.loading) return;
    if (!visiblePills.some((p) => p.value === filter)) {
      setFilter("all");
    }
  }, [visiblePills, filter, data.loading]);

  const demandCount = React.useMemo(
    () => data.properties.filter(isHighDemand).length,
    [data.properties],
  );


  const scrollByCard = (dir: 1 | -1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("[data-inv-card]");
    const delta = card ? card.offsetWidth + 24 : node.clientWidth * 0.85;
    node.scrollBy({ left: delta * dir, behavior: "smooth" });
  };

  return (
    <div>
      {/* Filter pills */}
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
                (active
                  ? "bg-navy text-cream"
                  : "border border-navy/15 bg-white text-navy hover:border-gold")
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>


      {/* Carousel / states */}
      {data.loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] animate-pulse rounded-2xl bg-cream-deep"
            />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <FadeInOnScroll>
          <div className="mx-auto max-w-xl rounded-2xl border border-navy/10 bg-white p-8 text-center">
            <p className="text-base text-navy">
              Inventory updates frequently. Contact Nancy directly for what's
              available right now.
            </p>
            <a
              href="tel:+17728997333"
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-success px-6 text-sm font-semibold text-cream"
            >
              Call Nancy: (772) 899-7333
            </a>
          </div>
        </FadeInOnScroll>
      ) : (
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Available Adams Homes inventory"
          >
            {visible.map((home) => (
              <div
                key={home.id}
                data-inv-card
                className="shrink-0 snap-start"
                style={{ width: "min(100%, 360px)" }}
              >
                <InventoryCard home={home} />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between md:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous home"
              className="pointer-events-auto -ml-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-navy shadow-lg ring-1 ring-navy/10 backdrop-blur transition hover:bg-cream"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next home"
              className="pointer-events-auto -mr-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream/95 text-navy shadow-lg ring-1 ring-navy/10 backdrop-blur transition hover:bg-cream"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {hasMore && !data.loading ? (
        <div className="mt-8 text-center">
          <Link
            to="/communities/inventory"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-gold"
          >
            View all {filtered.length} available homes
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : null}

      {/* Attribution footer — transparency for Adams Homes */}
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Inventory sourced from adamshomes.com. Updated every 4 hours.
      </p>

      {import.meta.env.DEV ? (
        <div className="mt-4 rounded border border-amber-300 bg-amber-50 px-3 py-2 text-center text-[11px] font-mono text-amber-900">
          inventory: total={data.properties.length} filtered={filtered.length} shown={visible.length}{" "}
          last={data.lastFetched ?? "—"} {data.error ? `err=${data.error}` : ""}
        </div>
      ) : null}
    </div>
  );
}
