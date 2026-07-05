/**
 * RiskMatrix
 * ─────────────────────────────────────────────────────────────────────────────
 * Generic risk matrix / heat table for MDX embeds.
 *
 * Props:
 *   columnAxisLabel  — top-left corner label (e.g. "Stopped at")
 *   columns          — column header strings
 *   rows             — row data: heading, optional subheading, cells[]
 *   legend           — optional legend items (colour swatch + label)
 *   caption          — optional footnote below the legend
 *
 * Animation: GSAP stagger fade+scale on cells, triggered by
 * IntersectionObserver (fires once, same pattern as MetricsStrip).
 *
 * Mobile: horizontally scrollable; row labels sticky-left.
 */

import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RiskLevel =
  | "eliminated"
  | "low"
  | "medium"
  | "high"
  | "very-high";

export type RiskCell = {
  level: RiskLevel;
  label: string;
  note?: string;
};

export type RiskRow = {
  heading: string;
  subheading?: string;
  cells: RiskCell[];
};

export type LegendItem = {
  level: RiskLevel | RiskLevel[];
  label: string;
};

export type RiskMatrixProps = {
  columnAxisLabel?: string;
  columns: string[];
  rows: RiskRow[];
  legend?: LegendItem[];
  caption?: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const LEVEL_BG: Record<RiskLevel, string> = {
  "very-high": "var(--color-risk-very-high-bg)",
  high: "var(--color-risk-high-bg)",
  medium: "var(--color-risk-medium-bg)",
  low: "var(--color-risk-low-bg)",
  eliminated: "var(--color-risk-eliminated-bg)",
};

const LEVEL_BORDER: Record<RiskLevel, string> = {
  "very-high": "var(--color-risk-very-high-border)",
  high: "var(--color-risk-high-border)",
  medium: "var(--color-risk-medium-border)",
  low: "var(--color-risk-low-border)",
  eliminated: "var(--color-risk-eliminated-border)",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export function RiskMatrix({
  columnAxisLabel,
  columns,
  rows,
  legend,
  caption,
}: RiskMatrixProps) {
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cells = cellsRef.current.filter(Boolean);
    if (cells.length === 0) return;

    let isMounted = true;
    let observer: IntersectionObserver | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;

      gsap.set(cells, { opacity: 0, scale: 0.92 });

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer?.disconnect();
          gsap.to(cells, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            stagger: {
              each: 0.04,
              from: "start",
              grid: [rows.length, columns.length],
            },
          });
        },
        { threshold: 0.15 },
      );

      if (containerRef.current) observer.observe(containerRef.current);
    };

    init();

    return () => {
      isMounted = false;
      observer?.disconnect();
    };
  }, [rows.length, columns.length]);

  const setCellRef = (el: HTMLDivElement | null, index: number) => {
    if (el) cellsRef.current[index] = el;
  };

  return (
    <div ref={containerRef} className="hidden md:block my-10 md:my-14">
      {/* Scroll wrapper — mobile horizontal scroll */}
      <div className="overflow-x-auto">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(140px, 180px) repeat(${columns.length}, minmax(100px, 1fr))`,
            gap: "2px",
            minWidth: `${180 + columns.length * 110}px`,
          }}
        >
          {/* ── Header row ── */}
          <div className="flex items-end pb-2 pr-3">
            {columnAxisLabel && (
              <span className="font-body font-medium text-xs uppercase tracking-[0.15em] text-text-muted">
                {columnAxisLabel}
              </span>
            )}
          </div>

          {columns.map((col) => (
            <div
              key={col}
              className="bg-surface-high px-3 py-2.5 flex items-center justify-center"
              style={{ border: "1px solid var(--color-ghost-border)" }}
            >
              <span className="font-body font-medium text-xs uppercase tracking-[0.12em] text-text-primary text-center leading-snug">
                {col}
              </span>
            </div>
          ))}

          {/* ── Data rows ── */}
          {rows.map((row, rowIdx) =>
            [
              // Row label cell
              <div
                key={`label-${rowIdx}`}
                className="flex flex-col justify-center pr-3 py-2"
              >
                <span className="font-body font-medium text-sm text-text-primary leading-snug">
                  {row.heading}
                </span>
                {row.subheading && (
                  <span className="font-body text-xs text-text-muted mt-0.5 leading-snug">
                    {row.subheading}
                  </span>
                )}
              </div>,
              // Data cells
              ...row.cells.map((cell, colIdx) => {
                const cellIndex = rowIdx * columns.length + colIdx;
                return (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    ref={(el) => setCellRef(el, cellIndex)}
                    className="flex flex-col items-center justify-center px-2 py-3 text-center"
                    style={{
                      backgroundColor: LEVEL_BG[cell.level],
                      border: `1px solid ${LEVEL_BORDER[cell.level]}`,
                      minHeight: "64px",
                    }}
                  >
                    <span className="font-body font-600 text-sm text-text-primary leading-tight">
                      {cell.label}
                    </span>
                    {cell.note && (
                      <span
                        className="font-body text-text-primary mt-0.5 leading-snug opacity-70"
                        style={{ fontSize: "11px" }}
                      >
                        {cell.note}
                      </span>
                    )}
                  </div>
                );
              }),
            ]
          )}
        </div>
      </div>

      {/* ── Legend ── */}
      {legend && legend.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
          {legend.map((item) => {
            const level = Array.isArray(item.level) ? item.level[0] : item.level;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 shrink-0"
                  style={{
                    backgroundColor: LEVEL_BG[level],
                    border: `1px solid ${LEVEL_BORDER[level]}`,
                  }}
                />
                <span className="font-body text-xs text-text-muted">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Caption ── */}
      {caption && (
        <p className="font-body text-sm text-text-muted mt-3 leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
}
