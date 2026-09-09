// petri.ts
// "Link into Petri" logic — every entry point into the Petri design sandbox
// (https://experiments.chiang.ink/) must route through here so the ?return=
// param that powers Petri's "Back to chiang.ink" link always rides the URL.

import { SITE_URL } from "~/lib/constants";

const PETRI_URL = "https://experiments.chiang.ink/";

/**
 * Build the Petri entry URL, appending a validated ?return= param that points
 * back to `rawPath` (expected: window.location.pathname + search + hash).
 * Petri only accepts a single root-relative path resolving against SITE_URL;
 * anything else falls back to "/" so Petri's back link lands on the site root.
 */
export function buildPetriUrl(rawPath: string): string {
  let returnPath = "/";
  try {
    const resolved = new URL(rawPath, SITE_URL);
    const isSingleRootRelative =
      rawPath.startsWith("/") && !rawPath.startsWith("//");
    if (isSingleRootRelative && resolved.origin === SITE_URL) {
      returnPath = resolved.pathname + resolved.search + resolved.hash;
    }
  } catch {
    /* keep fallback */
  }
  return `${PETRI_URL}?return=${encodeURIComponent(returnPath)}`;
}
