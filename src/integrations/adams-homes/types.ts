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
};

export type InventoryResult = {
  properties: AdamsHomeProperty[];
  lastFetched: string | null;
  stale: boolean;
  error: string | null;
};

/** Filter pill values matched against normalized `city` */
export type CityFilter = "all" | "Port St. Lucie" | "Fort Pierce" | "Okeechobee County";
