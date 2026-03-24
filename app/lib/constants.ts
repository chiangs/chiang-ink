// constants.ts
// Shared strings and configuration used across the site.
// Import from here rather than duplicating literals across components.

// Navigation
export const NAV_LINKS = [
  { label: "Work", to: "/work" },
  { label: "Writing", to: "/writing" },
  { label: "Contact", to: "/contact" },
] as const;

// Timezone
export const TIMEZONE_STAVANGER = "Europe/Oslo";

// Easter egg — style guide unlock
// Used as both the localStorage key and the DOM event name
export const STYLEGUIDE_UNLOCK_KEY = "sc-styleguide-unlocked";

// Identity
export const SITE_OWNER = "Stephen Chiang";
export const LINKEDIN_URL = "https://linkedin.com/in/chiangs";
