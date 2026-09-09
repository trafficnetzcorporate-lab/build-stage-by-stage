/**
 * Normalized Adams Homes property record. Decoupled from the upstream
 * `cloudData.homes[builderId].data[]` shape so consumers don't accidentally
 * couple to vendor field names.
 */
export type AdamsHomeProperty = {
  id: string;
  /** Display address line, e.g. "4222 SW Port St Lucie Boulevard" */
  address: string;
  /** Display city, normalized: "Port St. Lucie" | "Fort Pierce" | "Okeechobee" */
  city: string;
  /** Normalized county: "St. Lucie" | "Okeechobee" */
  county: string;
  beds: number | string | null;
  baths: number | string | null;
  sqft: number | null;
  price: number | null;
  /** "move-in" if listing is complete and ready, "under-construction" otherwise. */
  status: "move-in" | "under-construction";
  imageUrl: string | null;
  /** Community name resolved from containedIn → cloudData.communities */
  communityName: string;
  /** Short marketing line from upstream `headline` */
  headline: string;
  /** ISO timestamp the scrape occurred */
  fetchedAt: string;

  /**
   * Detail fields. All are sourced verbatim from the Adams Homes feed and are
   * nullable/empty when Adams does not publish them for a given home. Never
   * synthesize a value here — an absent field must render as absent.
   */
  description: string;
  /** Full photo gallery (first entry is the same as `imageUrl`). */
  photos: string[];
  floorplanPhotos: string[];
  garages: number | null;
  stories: number | null;
  bathsFull: number | null;
  bathsHalf: number | null;
  masterBedLocation: string;
  mls: string;
  postalCode: string;
  /** Adams' schema.org type, e.g. "SingleFamilyResidence" */
  propertyType: string;
  /** Floor plan name (Adams uses the plan's square footage as the name). */
  planName: string;
  /** Plan-level feature list from Adams. */
  planFeatures: string[];
  /** Community-level banner, e.g. "PRICE REDUCED!" */
  banner: string;
  openHouses: { date: string; startTime: string; endTime: string }[];
};

export type InventoryResult = {
  properties: AdamsHomeProperty[];
  lastFetched: string | null;
  stale: boolean;
  error: string | null;
};

/**
 * Filter pill value. Either the literal "all" or any city string returned
 * by the scraper. Pills are derived from live scraped inventory — no
 * hardcoded city allowlist.
 */
export type CityFilter = "all" | (string & {});

