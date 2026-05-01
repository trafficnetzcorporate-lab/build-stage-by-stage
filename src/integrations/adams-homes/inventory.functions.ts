import { createServerFn } from "@tanstack/react-start";
import { getCachedInventory } from "./cache.server";
import type { InventoryResult } from "./types";

/**
 * Single source of truth for the homepage carousel, /communities carousel,
 * and /communities/inventory grid. Always resolves — errors come back as
 * `error: string` with `properties: []` rather than throwing.
 */
export const getAdamsInventory = createServerFn({ method: "GET" }).handler(
  async (): Promise<InventoryResult> => {
    const result = await getCachedInventory();
    return {
      properties: result.properties,
      lastFetched: result.lastFetched,
      stale: result.stale,
      error: result.error,
    };
  },
);
