import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type WeekCategory = {
  label: string;
  hours: number;
  color: string;
  pattern?: "dots";
};

// ─── Constants ────────────────────────────────────────────────────────────────

const LABEL_WEEKLY_HOURS = "A typical week in hours";
const LABEL_FOOTER = "Categories overlap — parenting doesn't clock off.";

// Cross-hatch via two overlapping repeating-linear-gradients at ±45°.
// #3a3a38 has no token equivalent; kept as-is.
const SLEEP_PATTERN = [
  "repeating-linear-gradient(45deg, var(--color-border) 0, var(--color-border) 1px, transparent 1px, transparent 50%)",
  "repeating-linear-gradient(-45deg, var(--color-border) 0, var(--color-border) 1px, transparent 1px, transparent 50%)",
].join(", ");
const SLEEP_PATTERN_SIZE = "6px 6px";

export const WEEKLY_DATA: WeekCategory[] = [
  { label: "Parenting", hours: 93, color: "var(--color-viz-pink)" },
  { label: "Deep work", hours: 45, color: "var(--color-viz-blue)" },
  {
    label: "Sleep",
    hours: 38.5,
    color: "var(--color-border)",
    pattern: "dots",
  },
  { label: "Training", hours: 5, color: "var(--color-viz-teal)" },
  { label: "Reading", hours: 4, color: "var(--color-viz-orange)" },
  { label: "Building", hours: 4, color: "var(--color-viz-green)" },
];

const TOTAL = WEEKLY_DATA.reduce((sum, d) => sum + d.hours, 0);

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatHours = (h: number) => (h % 1 === 0 ? `${h}h` : `${h.toFixed(1)}h`);

const dotStyle: React.CSSProperties = {
  backgroundImage: SLEEP_PATTERN,
  backgroundSize: SLEEP_PATTERN_SIZE,
  backgroundColor: "#3a3a38",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function WeeklyProportionBar() {
  const [animated, setAnimated] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1e1e1e",
        padding: "20px 24px",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        filter: hovered
          ? "drop-shadow(0 6px 20px rgba(0,0,0,0.6))"
          : "drop-shadow(0 0 0 rgba(0,0,0,0))",
        transition:
          "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: "var(--font-body, Manrope, sans-serif)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#737371",
          margin: "0 0 14px",
        }}
      >
        {LABEL_WEEKLY_HOURS}
      </p>

      {/* Proportion bar */}
      <div
        role="img"
        aria-label="Weekly hours by category"
        style={{
          display: "flex",
          height: "20px",
          gap: "2px",
          marginBottom: "16px",
        }}
      >
        {WEEKLY_DATA.map((d, i) => (
          <div
            key={d.label}
            title={`${d.label}: ${formatHours(d.hours)}`}
            style={{
              height: "100%",
              borderRadius: 0,
              flexShrink: 0,
              width: animated ? `${(d.hours / TOTAL) * 100}%` : "0%",
              transition: animated
                ? `width 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 50}ms`
                : "none",
              ...(d.pattern === "dots" ? dotStyle : { background: d.color }),
            }}
          />
        ))}
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 20px",
          marginBottom: "12px",
        }}
      >
        {WEEKLY_DATA.map((d) => (
          <div
            key={d.label}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <span
              style={{
                display: "block",
                width: "8px",
                height: "8px",
                flexShrink: 0,
                borderRadius: 0,
                ...(d.pattern === "dots" ? dotStyle : { background: d.color }),
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body, Manrope, sans-serif)",
                fontSize: "11px",
                fontWeight: 500,
                color: "#737371",
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              {d.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p
        style={{
          fontFamily: "var(--font-body, Manrope, sans-serif)",
          fontSize: "11px",
          fontStyle: "italic",
          color: "#737371",
          opacity: 0.6,
          margin: 0,
        }}
      >
        {LABEL_FOOTER}
      </p>
    </div>
  );
}
