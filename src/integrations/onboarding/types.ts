/**
 * Shared onboarding types — safe for both client and server.
 */

export type ClientSlug = "nancy-clarke";

export interface ClientConfig {
  slug: ClientSlug;
  name: string;
  email?: string;
  /** Display label for the index page */
  displayLabel: string;
}

export const CLIENTS: Record<ClientSlug, ClientConfig> = {
  "nancy-clarke": {
    slug: "nancy-clarke",
    name: "Nancy Clarke",
    email: "nancy.clarke@adamshomes.com",
    displayLabel: "Nancy Clarke",
  },
};

export function getClient(slug: string): ClientConfig | null {
  return (CLIENTS as Record<string, ClientConfig>)[slug] ?? null;
}

export interface AgreementStatusResponse {
  signed: boolean;
  signedAt?: string;
  clientName?: string;
  pdfStoragePath?: string | null;
}

export interface IntakeStatusResponse {
  exists: boolean;
  isComplete: boolean;
  currentSectionIndex: number;
  formData: Record<string, unknown>;
  updatedAt?: string;
}
