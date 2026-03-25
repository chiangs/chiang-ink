// utils.ts
// Pure utility functions shared across the site.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** Formats an ISO date string to "Mon YYYY" (e.g. "Mar 2025"). Uses UTC to avoid timezone drift. */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
