/**
 * Returns true when a config value is still a placeholder that must not ship
 * to a live site. Two conventions are supported:
 *   - `*_TBD` suffix (used for ProAgent URLs awaiting resolution)
 *   - `[VERIFY: ...]` prefix (used for unverified third-party data)
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return false;
  return value.endsWith("_TBD") || value.startsWith("[VERIFY:");
}

/** Strips `[VERIFY: x]` -> `x` for display. Returns input unchanged otherwise. */
export function stripVerifyMarker(value: string): string {
  const match = value.match(/^\[VERIFY:\s*(.*)\]$/);
  return match ? match[1] : value;
}
