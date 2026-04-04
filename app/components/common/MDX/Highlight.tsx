import type { ReactNode } from "react";

// -----------------------------------------------------------------------------
// Highlight — inline emphasis component for MDX articles
//
// Variants follow a clear semantic axis. See DESIGN.md for usage guidance.
// Rules:
//   - Never use viz palette colours (teal, blue, pink) — those belong to charts
//   - Never use italic — prose italics are for titles and foreign terms
//   - Never override font-size or line-height — always inherit from parent
//   - Use sparingly: the more often a variant appears, the less it signals
// -----------------------------------------------------------------------------

export type HighlightVariant = "accent" | "strong" | "cite" | "mark";

const VARIANT_CLASSES: Record<HighlightVariant, string> = {
  // Key term or named concept being introduced.
  // Copper at medium weight. The default and most common variant.
  // Use for the first occurrence of a term, a named framework, or a
  // concept the article is building toward.
  accent: "text-accent font-medium",

  // Critical phrase or thesis fragment — the sentence the article
  // lives or dies on. Copper at semibold.
  // Use at most 2–3 times per article. Loses impact if overused.
  strong: "text-accent font-semibold",

  // Secondary reference or supporting phrase that needs a signal
  // without competing with accent/strong instances.
  // Primary text colour, copper underline via text-decoration
  // (not border-b — avoids baseline disruption in flowing prose).
  cite: "text-text-primary underline decoration-[#FFB77D] underline-offset-[3px] decoration-[1.5px]",

  // Editorial callout — a phrase that must be findable on re-read.
  // Warm amber fill at 12% opacity, copper text, slight horizontal padding.
  // The only variant with spatial presence. Use when colour alone is
  // competing with other accent instances on the page.
  mark: "text-accent bg-[rgba(255,183,125,0.15)] rounded-none",
};

type HighlightProps = {
  children?: ReactNode;
  variant?: HighlightVariant;
};

export function Highlight({ children, variant = "accent" }: HighlightProps) {
  return <span className={VARIANT_CLASSES[variant]}>{children}</span>;
}
