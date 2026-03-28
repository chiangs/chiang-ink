import { PatternCircles, PatternLines } from "~/lib/visx";

// ─── Types ────────────────────────────────────────────────────────────────────
export type HeroPatternVariant = "diagonal" | "dots" | "horizontal";

// ─── Read-time → variant helper ───────────────────────────────────────────────
// readTime format: "8 min" — parse leading integer
export function getReadTimeVariant(readTime: string): HeroPatternVariant {
  const minutes = parseInt(readTime, 10);
  if (isNaN(minutes) || minutes <= 5) return "diagonal";
  if (minutes <= 10) return "dots";
  return "horizontal";
}

// ─── Pattern IDs (unique per page to avoid SVG defs collisions) ───────────────
const PATTERN_DIAGONAL_ID = "hero-diagonal-lines";
const PATTERN_DOTS_ID = "hero-dot-grid";
const PATTERN_HORIZONTAL_ID = "hero-horizontal-lines";

// ─── Component ────────────────────────────────────────────────────────────────
export function HeroPattern({ variant }: { variant: HeroPatternVariant }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {variant === "diagonal" && (
          <PatternLines
            id={PATTERN_DIAGONAL_ID}
            height={20}
            width={20}
            stroke="var(--color-invert-bg)"
            strokeWidth={0.5}
            orientation={["diagonal"]}
          />
        )}
        {variant === "dots" && (
          <PatternCircles
            id={PATTERN_DOTS_ID}
            height={22}
            width={22}
            radius={1.7}
            fill="var(--color-invert-bg)"
          />
        )}
        {variant === "horizontal" && (
          <PatternLines
            id={PATTERN_HORIZONTAL_ID}
            height={5}
            width={5}
            stroke="var(--color-invert-bg)"
            strokeWidth={0.2}
            orientation={["horizontal"]}
          />
        )}
      </defs>
      {variant === "diagonal" && (
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_DIAGONAL_ID})`}
        />
      )}
      {variant === "dots" && (
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_DOTS_ID})`}
        />
      )}
      {variant === "horizontal" && (
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${PATTERN_HORIZONTAL_ID})`}
        />
      )}
    </svg>
  );
}
