import type { AdamsHomeProperty } from "./types";
import { fetchAdamsInventory } from "./scraper.server";

// const FRESH_MS = 4 * 60 * 60 * 1000; // 4 hours — restore after diagnostic
const FRESH_MS = 0; // DIAGNOSTIC: force fresh fetch every request
const STALE_MS = 24 * 60 * 60 * 1000; // 24 hours absolute

type CacheEntry = {
  properties: AdamsHomeProperty[];
  fetchedAt: number; // epoch ms of the successful fetch
};

let memo: CacheEntry | null = null;
let inflight: Promise<CacheEntry> | null = null;

async function refresh(): Promise<CacheEntry> {
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const properties = await fetchAdamsInventory();
      memo = { properties, fetchedAt: Date.now() };
      return memo;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

export type CachedInventory = {
  properties: AdamsHomeProperty[];
  lastFetched: string | null;
  stale: boolean;
  error: string | null;
};

/**
 * Cache strategy:
 *   - Fresh (< 4h): serve from memo, no network.
 *   - Stale (4–24h): try refresh; on success update memo, on failure return memo flagged stale.
 *   - Cold or > 24h: refresh; on failure return empty.
 */
export async function getCachedInventory(): Promise<CachedInventory> {
  const now = Date.now();
  const cacheState = memo
    ? `memo exists, age=${Math.round((now - memo.fetchedAt) / 1000)}s, properties=${memo.properties.length}`
    : "memo is null (cold)";
  console.log(`[Adams cache] getCachedInventory() called. Cache state: ${cacheState}`);

  if (memo && now - memo.fetchedAt < FRESH_MS) {
    return {
      properties: memo.properties,
      lastFetched: new Date(memo.fetchedAt).toISOString(),
      stale: false,
      error: null,
    };
  }

  if (memo && now - memo.fetchedAt < STALE_MS) {
    try {
      const next = await refresh();
      return {
        properties: next.properties,
        lastFetched: new Date(next.fetchedAt).toISOString(),
        stale: false,
        error: null,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error("Adams inventory refresh failed, serving stale:", msg);
      }
      return {
        properties: memo.properties,
        lastFetched: new Date(memo.fetchedAt).toISOString(),
        stale: true,
        error: msg,
      };
    }
  }

  try {
    const next = await refresh();
    return {
      properties: next.properties,
      lastFetched: new Date(next.fetchedAt).toISOString(),
      stale: false,
      error: null,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error("Adams inventory cold fetch failed:", msg);
    }
    return { properties: [], lastFetched: null, stale: false, error: msg };
  }
}
