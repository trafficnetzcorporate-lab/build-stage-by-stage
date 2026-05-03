import type { AdamsHomeProperty } from "./types";

const SOURCE_URL = "https://www.adamshomes.com/homes/florida/port-st-lucie";
const USER_AGENT =
  "Mozilla/5.0 NancyClarkeRealtor/1.0 (+https://nancyclarkerealtor.com)";

/** Adams Homes uses this single builder id across the whole feed. */
const BUILDER_ID = "570fe546f4109550cf674463";

type RawHome = {
  _id?: string;
  status?: string;
  addressCounty?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
  };
  beds?: number | string;
  baths?: number | string;
  bathsFull?: number;
  sqft?: number | null;
  price?: number | null;
  photos?: Array<{ contentUrl?: string }>;
  containedIn?: string;
  headline?: string;
  uniqueName?: string;
  /**
   * Date markers that, if present, mean the home is no longer truly available.
   * Whitelist filter rejects anything carrying any of these. We fail closed:
   * if Adams adds a new gating date field, listings drop out by default.
   */
  underContractDate?: string;
  pendingDate?: string;
  reservedDate?: string;
  holdDate?: string;
  contractDate?: string;
  soldDate?: string;
  [k: string]: unknown;
};

type RawCommunity = { _id?: string; name?: string };

/**
 * Extract the JSON literal that follows `window.__PRELOADED_STATE__ = `.
 * Walks the string with a brace-balancer that respects string literals + escapes.
 */
function extractPreloadedState(html: string): unknown {
  const marker = "window.__PRELOADED_STATE__";
  const eq = html.indexOf("=", html.indexOf(marker));
  if (eq < 0) throw new Error("PRELOADED_STATE marker not found");

  // Find the first non-whitespace char after `=`
  let start = eq + 1;
  while (start < html.length && /\s/.test(html[start]!)) start++;
  if (html[start] !== "{") throw new Error("PRELOADED_STATE not an object");

  let depth = 0;
  let inStr = false;
  let esc = false;
  let i = start;
  for (; i < html.length; i++) {
    const c = html[i]!;
    if (inStr) {
      if (esc) {
        esc = false;
      } else if (c === "\\") {
        esc = true;
      } else if (c === '"') {
        inStr = false;
      }
      continue;
    }
    if (c === '"') {
      inStr = true;
    } else if (c === "{") {
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return JSON.parse(html.slice(start, i));
}

/** WHITELIST availability check. See types.ts comment + plan. */
function isAvailable(p: RawHome): boolean {
  const status = (p.status ?? "").trim().toLowerCase();
  if (status !== "active" && status !== "for sale") return false;
  if (p.underContractDate) return false;
  if (p.pendingDate) return false;
  if (p.reservedDate) return false;
  if (p.holdDate) return false;
  if (p.contractDate) return false;
  if (p.soldDate) return false;
  // Defensive sweep: any future-named date field that smells like in-process.
  for (const k of Object.keys(p)) {
    if (
      /^(under|in)?(contract|reserved|pending|hold)Date$/i.test(k) &&
      (p as Record<string, unknown>)[k]
    ) {
      return false;
    }
  }
  return true;
}

/** Adams stores "Port Saint Lucie"; we display "Port St. Lucie". */
function normalizeCity(raw: string | undefined): string {
  if (!raw) return "";
  const t = raw.trim();
  if (/^port\s+saint\s+lucie$/i.test(t)) return "Port St. Lucie";
  if (/^port\s+st\.?\s+lucie$/i.test(t)) return "Port St. Lucie";
  if (/^fort\s+pierce$/i.test(t)) return "Fort Pierce";
  if (/^okeechobee$/i.test(t)) return "Okeechobee";
  return t;
}

/**
 * Adams Homes' upstream data uses a few different spellings for St. Lucie
 * County (e.g. "St. Lucie", "St Lucie", "Saint Lucie"). Normalize before
 * comparing so we don't silently drop the entire territory on a string
 * mismatch.
 */
function normalizeCounty(raw: string | undefined): string {
  if (!raw) return "";
  const t = raw.trim().toLowerCase();
  if (/^(saint|st\.?)\s+lucie$/i.test(t)) return "St. Lucie";
  if (/^okeechobee$/i.test(t)) return "Okeechobee";
  return raw.trim();
}

function inTerritory(county: string | undefined, city: string): boolean {
  const normalized = normalizeCounty(county);
  if (normalized !== "St. Lucie" && normalized !== "Okeechobee") return false;
  return (
    city === "Port St. Lucie" ||
    city === "Fort Pierce" ||
    city === "Okeechobee"
  );
}

function classifyStatus(headline: string | undefined): "move-in" | "under-construction" {
  if (!headline) return "move-in";
  return /under\s*construction/i.test(headline) ? "under-construction" : "move-in";
}

/**
 * Fetch + parse + filter. Throws on network or parse failure — the cache
 * layer above translates failures into stale-or-empty results so the UI
 * never blows up.
 */
export async function fetchAdamsInventory(): Promise<AdamsHomeProperty[]> {
  const fetchStartedAt = new Date().toISOString();
  console.log(`[Adams scraper] === FETCH STARTED at ${fetchStartedAt} ===`);

  const res = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });
  console.log(`[Adams scraper] HTTP status: ${res.status} ${res.statusText}`);
  console.log(`[Adams scraper] content-length header: ${res.headers.get("content-length") ?? "(none)"}`);
  if (!res.ok) {
    throw new Error(`Adams Homes fetch failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();
  console.log(`[Adams scraper] HTML body length: ${html.length}`);

  const markerIdx = html.indexOf("window.__PRELOADED_STATE__");
  console.log(`[Adams scraper] PRELOADED_STATE marker index: ${markerIdx}`);
  if (markerIdx < 0) {
    const scriptIdx = html.indexOf("<script");
    console.log(`[Adams scraper] First <script tag at: ${scriptIdx}`);
    console.log(`[Adams scraper] HTML sample: ${html.slice(scriptIdx, scriptIdx + 500)}`);
  }

  const state = extractPreloadedState(html) as {
    cloudData?: {
      homes?: Record<string, { data?: RawHome[] }>;
      communities?: Record<string, { data?: RawCommunity[] }>;
    };
  };

  const cloudDataKeys = state.cloudData ? Object.keys(state.cloudData) : [];
  console.log(`[Adams scraper] state.cloudData keys: ${JSON.stringify(cloudDataKeys)}`);

  const homesByBuilder = state.cloudData?.homes ?? {};
  const homesBuilderIds = Object.keys(homesByBuilder);
  console.log(`[Adams scraper] homes builder IDs: ${JSON.stringify(homesBuilderIds)}`);
  for (const builderId of homesBuilderIds) {
    const count = homesByBuilder[builderId]?.data?.length ?? 0;
    const isExpected = builderId === BUILDER_ID;
    console.log(`[Adams scraper] homes[${builderId}].data.length = ${count}${isExpected ? " (EXPECTED)" : ""}`);
  }

  const homes = state.cloudData?.homes?.[BUILDER_ID]?.data ?? [];
  console.log(`[Adams scraper] RAW HOMES for BUILDER_ID: ${homes.length}`);

  const statusCounts: Record<string, number> = {};
  const countyCounts: Record<string, number> = {};
  const cityCounts: Record<string, number> = {};
  for (const h of homes) {
    const s = String(h.status ?? "(undefined)");
    const c = String(h.addressCounty ?? "(undefined)");
    const ci = String(h.address?.addressLocality ?? "(undefined)");
    statusCounts[s] = (statusCounts[s] ?? 0) + 1;
    countyCounts[c] = (countyCounts[c] ?? 0) + 1;
    cityCounts[ci] = (cityCounts[ci] ?? 0) + 1;
  }
  console.log(`[Adams scraper] status distribution: ${JSON.stringify(statusCounts)}`);
  console.log(`[Adams scraper] county distribution: ${JSON.stringify(countyCounts)}`);
  console.log(`[Adams scraper] city distribution: ${JSON.stringify(cityCounts)}`);

  const communities = state.cloudData?.communities?.[BUILDER_ID]?.data ?? [];
  const communityNameById = new Map<string, string>();
  for (const c of communities) {
    if (c._id && c.name) communityNameById.set(c._id, c.name);
  }

  const drops = { availability: 0, territory: 0, territory_county_failed: 0, territory_city_failed: 0 };

  const fetchedAt = new Date().toISOString();
  const out: AdamsHomeProperty[] = [];
  for (const h of homes) {
    if (!isAvailable(h)) { drops.availability++; continue; }
    const city = normalizeCity(h.address?.addressLocality);
    const county = normalizeCounty(h.addressCounty);
    const inT = (county === "St. Lucie" || county === "Okeechobee") &&
                (city === "Port St. Lucie" || city === "Fort Pierce" || city === "Okeechobee");
    if (!inT) {
      drops.territory++;
      if (county !== "St. Lucie" && county !== "Okeechobee") drops.territory_county_failed++;
      else drops.territory_city_failed++;
      continue;
    }

    const id = h._id ?? h.uniqueName ?? `${h.address?.streetAddress ?? "unknown"}-${out.length}`;
    out.push({
      id,
      address: h.address?.streetAddress ?? "",
      city,
      county: normalizeCounty(h.addressCounty),
      beds: h.beds ?? null,
      baths: h.baths ?? h.bathsFull ?? null,
      sqft: typeof h.sqft === "number" ? h.sqft : null,
      price: typeof h.price === "number" ? h.price : null,
      status: classifyStatus(h.headline),
      imageUrl: h.photos?.[0]?.contentUrl ?? null,
      communityName: communityNameById.get(h.containedIn ?? "") ?? "Adams Homes",
      headline: h.headline ?? "",
      fetchedAt,
    });
  }

  console.log(`[Adams scraper] === RESULT === raw=${homes.length} kept=${out.length} drops=${JSON.stringify(drops)}`);

  // Default sort: price ascending. Nulls sink to the bottom.
  out.sort((a, b) => {
    if (a.price == null && b.price == null) return 0;
    if (a.price == null) return 1;
    if (b.price == null) return -1;
    return a.price - b.price;
  });

  return out;
}
