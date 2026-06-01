import type { AdamsHomeProperty } from "./types";

/**
 * Per-city price ceilings for the "Most In Demand" filter.
 * Sourced from market research (April 2026): the strongest buyer pool in
 * each Treasure Coast submarket sits at or below the local active median.
 * Tune here without touching component logic.
 */
export const DEMAND_PRICE_CEILINGS: Record<string, number> = {
  "Port St. Lucie": 450_000,
  "Fort Pierce": 425_000,
  "Okeechobee": 325_000,
};

const DEFAULT_CEILING = 450_000;

/**
 * A home is "in demand" if it's move-in ready (not under construction)
 * AND priced at or below its city's demand ceiling.
 */
export function isHighDemand(home: AdamsHomeProperty): boolean {
  if (home.status !== "move-in") return false;
  if (home.price == null) return false;
  const ceiling = DEMAND_PRICE_CEILINGS[home.city] ?? DEFAULT_CEILING;
  return home.price <= ceiling;
}
