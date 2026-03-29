import { useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type GradientStop = { year: number; opacity: number };

export type CareerViewMode = "vertical" | "horizontal";

type ChartRow = {
  label: string;
  color: string;
  start: number;
  end: number;
  stops: GradientStop[];
};

type Era = {
  label: string;
  shortLabel: string;
  start: number;
  end: number;
  color: string;
  bgColor: string;
  labelOffsetY: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const CHART_START = 2002;
const CHART_END = 2026;
const CHART_SPAN = CHART_END - CHART_START;
const CHART_H = 560; // vertical — column track height px
const H_BAR_H = 10; // horizontal — bar height px
const H_LABEL_W = 180; // horizontal — label column width px

const P = 0.88;
const S = 0.45;
const T = 0.14;

const H_AXIS_YEARS = [2002, 2006, 2010, 2014, 2015, 2018, 2022, 2026];

const LEGEND_OPACITY_ITEMS = [
  { label: "Primary", op: P },
  { label: "Secondary", op: S },
  { label: "Substrate", op: T },
] as const;

// ─── Eras ─────────────────────────────────────────────────────────────────────

const ERAS: Era[] = [
  {
    label: "Defence",
    shortLabel: "Defence",
    start: 2002,
    end: 2014,
    color: "#FFB77D",
    bgColor: "rgba(255,183,125,0.05)",
    labelOffsetY: "0px",
  },
  {
    label: "Schindler",
    shortLabel: "Schin.",
    start: 2014,
    end: 2015,
    color: "#737371",
    bgColor: "rgba(115,115,113,0.08)",
    labelOffsetY: "16px",
  },
  {
    label: "Iskilde",
    shortLabel: "Iskilde",
    start: 2015,
    end: 2018,
    color: "#737371",
    bgColor: "rgba(115,115,113,0.08)",
    labelOffsetY: "0px",
  },
  {
    label: "Consulting",
    shortLabel: "Consulting",
    start: 2018,
    end: 2026,
    color: "#4DA6FF",
    bgColor: "rgba(77,166,255,0.05)",
    labelOffsetY: "0px",
  },
];

const ERA_DIVIDERS = [2014, 2015, 2018];

// ─── Capability rows ──────────────────────────────────────────────────────────

const ROWS: ChartRow[] = [
  {
    label: "Leadership & Strategy",
    color: "#FFB77D",
    start: 2002,
    end: 2026,
    stops: [
      { year: 2002, opacity: T },
      { year: 2004.5, opacity: T },
      { year: 2006, opacity: S },
      { year: 2008, opacity: P },
      { year: 2026, opacity: P },
    ],
  },
  {
    label: "Ops & Org Design",
    color: "#FF9A3C",
    start: 2002,
    end: 2026,
    stops: [
      { year: 2002, opacity: P },
      { year: 2003, opacity: P },
      { year: 2004, opacity: S },
      { year: 2005, opacity: P },
      { year: 2008, opacity: P },
      { year: 2009.5, opacity: S },
      { year: 2010.5, opacity: P },
      { year: 2014, opacity: P },
      { year: 2015, opacity: S },
      { year: 2016, opacity: P },
      { year: 2026, opacity: P },
    ],
  },
  {
    label: "Design & Development",
    color: "#FF9A3C",
    start: 2013,
    end: 2026,
    stops: [
      { year: 2013.5, opacity: T },
      { year: 2015, opacity: S },
      { year: 2017, opacity: P },
      { year: 2026, opacity: P },
    ],
  },
  {
    label: "Joint & Diplomatic",
    color: "#E5E2E1",
    start: 2011,
    end: 2014,
    stops: [
      { year: 2011, opacity: T },
      { year: 2013, opacity: S },
    ],
  },
  {
    label: "Transport & Logistics",
    color: "#4DA6FF",
    start: 2002,
    end: 2026,
    stops: [
      { year: 2002, opacity: P },
      { year: 2014, opacity: P },
      { year: 2015.5, opacity: S },
      { year: 2017, opacity: P },
      { year: 2019, opacity: P },
      { year: 2021, opacity: T },
      { year: 2026, opacity: T },
    ],
  },
  {
    label: "Market Dev & Sales",
    color: "#34D399",
    start: 2002,
    end: 2026,
    stops: [
      { year: 2002, opacity: T },
      { year: 2011, opacity: T },
      { year: 2013, opacity: S },
      { year: 2014, opacity: S },
      { year: 2015, opacity: P },
      { year: 2018, opacity: P },
      { year: 2019.5, opacity: S },
      { year: 2026, opacity: S },
    ],
  },
  {
    label: "Oil & Gas",
    color: "#00E5C7",
    start: 2018,
    end: 2026,
    stops: [
      { year: 2018, opacity: T },
      { year: 2019, opacity: P },
      { year: 2020, opacity: P },
      { year: 2021, opacity: T },
      { year: 2021.5, opacity: P },
      { year: 2022, opacity: P },
      { year: 2023, opacity: T },
      { year: 2026, opacity: T },
    ],
  },
  {
    label: "Consumer Products",
    color: "#F472B6",
    start: 2018,
    end: 2026,
    stops: [
      { year: 2018, opacity: T },
      { year: 2019.5, opacity: T },
      { year: 2020.5, opacity: P },
      { year: 2021, opacity: P },
      { year: 2022, opacity: T },
      { year: 2026, opacity: T },
    ],
  },
  {
    label: "Maritime",
    color: "#FF7A3C",
    start: 2018,
    end: 2026,
    stops: [
      { year: 2018, opacity: T },
      { year: 2019.5, opacity: T },
      { year: 2020.5, opacity: P },
      { year: 2022, opacity: P },
      { year: 2023, opacity: T },
      { year: 2024, opacity: P },
      { year: 2026, opacity: P },
    ],
  },
  {
    label: "Construction",
    color: "#A78BFA",
    start: 2018,
    end: 2026,
    stops: [
      { year: 2018, opacity: T },
      { year: 2022.5, opacity: T },
      { year: 2023.2, opacity: P },
      { year: 2024, opacity: P },
      { year: 2025, opacity: T },
      { year: 2026, opacity: T },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const yearToPct = (y: number) =>
  (((y - CHART_START) / CHART_SPAN) * 100).toFixed(3) + "%";

const widthPct = (s: number, e: number) =>
  (((e - s) / CHART_SPAN) * 100).toFixed(3) + "%";

const yearToPxV = (y: number) => ((CHART_END - y) / CHART_SPAN) * CHART_H;

const heightPxV = (s: number, e: number) => ((e - s) / CHART_SPAN) * CHART_H;

function parseHex(color: string): [number, number, number] {
  const hex = color.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

function makeGradientH(
  color: string,
  stops: GradientStop[],
  rs: number,
  re: number,
): string {
  const [r, g, b] = parseHex(color);
  const rgba = (op: number) => `rgba(${r},${g},${b},${op.toFixed(3)})`;
  const span = re - rs;
  return `linear-gradient(90deg,${stops
    .map(
      (s) => `${rgba(s.opacity)} ${(((s.year - rs) / span) * 100).toFixed(2)}%`,
    )
    .join(",")})`;
}

function makeGradientV(
  color: string,
  stops: GradientStop[],
  rs: number,
  re: number,
): string {
  const [r, g, b] = parseHex(color);
  const rgba = (op: number) => `rgba(${r},${g},${b},${op.toFixed(3)})`;
  const span = re - rs;
  const sorted = [...stops].sort((a, b) => b.year - a.year);
  return `linear-gradient(to bottom,${sorted
    .map(
      (s) => `${rgba(s.opacity)} ${(((re - s.year) / span) * 100).toFixed(2)}%`,
    )
    .join(",")})`;
}

// ─── Module-level styles ──────────────────────────────────────────────────────

const legendFont: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "9px",
  fontWeight: 500,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  whiteSpace: "nowrap",
};

// Horizontal era label — color and top are added per-item at render time
const eraLabelBaseH: React.CSSProperties = {
  position: "absolute",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  opacity: 0.8,
  whiteSpace: "nowrap",
};

// Schindler era straddles two entries so a tick mark sits at its divider
const eraTickH: React.CSSProperties = {
  position: "absolute",
  left: yearToPct(2014),
  top: "5px",
  width: "1px",
  height: "9px",
  background: "var(--color-text-muted)",
  opacity: 0.35,
};

// Horizontal row label — color is added per-item at render time
const rowLabelBaseH: React.CSSProperties = {
  width: H_LABEL_W,
  flexShrink: 0,
  textAlign: "right",
  paddingRight: "14px",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  opacity: 0.85,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

// Horizontal bar track — same for every row
const barTrackH: React.CSSProperties = {
  flex: 1,
  position: "relative",
  height: `${H_BAR_H}px`,
};

// Horizontal era divider — left is added per-item at render time
// Note: #333331 is intentionally lighter than --color-border (#222220); no token yet.
const eraDividerBaseH: React.CSSProperties = {
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "1px",
  background: "#333331",
  opacity: 0.8,
  zIndex: 2,
};

const xAxisLabelStyle: React.CSSProperties = {
  position: "absolute",
  transform: "translateX(-50%)",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  // #9B9997 is intentionally lighter than --color-text-muted (#737371); no token yet.
  color: "#9B9997",
  letterSpacing: "0.05em",
};

// Vertical era label — color and top are added per-item at render time
const eraLabelBaseV: React.CSSProperties = {
  position: "absolute",
  right: "8px",
  fontFamily: "var(--font-body)",
  fontSize: "9px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  opacity: 0.55,
  whiteSpace: "nowrap",
  textAlign: "right",
};

// Vertical era tick mark — top and transform are added per-item at render time
const eraTickBaseV: React.CSSProperties = {
  position: "absolute",
  right: 0,
  width: "4px",
  height: "1px",
  opacity: 0.35,
};

// Vertical era divider — top is added per-item at render time
// Note: same #333331 intentional exception as H divider above.
const eraDividerBaseV: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  height: "1px",
  background: "#333331",
  opacity: 0.8,
  zIndex: 3,
};

// ─── Pre-computed render data ─────────────────────────────────────────────────
// All derived from module-level constants — computed once at module load,
// never on every render.

const H_GRADIENTS: string[] = ROWS.map((row) =>
  makeGradientH(row.color, row.stops, row.start, row.end),
);
const V_GRADIENTS: string[] = ROWS.map((row) =>
  makeGradientV(row.color, row.stops, row.start, row.end),
);
const H_BAR_WIDTHS: string[] = ROWS.map((row) => widthPct(row.start, row.end));
const H_BAR_LEFTS: string[] = ROWS.map((row) => yearToPct(row.start));
const V_BAR_HEIGHTS: number[] = ROWS.map((row) =>
  heightPxV(row.start, row.end),
);
const V_BAR_TOPS: number[] = ROWS.map((row) => yearToPxV(row.end));

const ERA_BAND_STYLES_H: React.CSSProperties[] = ERAS.map((era) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: yearToPct(era.start),
  width: widthPct(era.start, era.end),
  background: era.bgColor,
  zIndex: 0,
}));

const ERA_BAND_STYLES_V: React.CSSProperties[] = ERAS.map((era) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: yearToPxV(era.end),
  height: heightPxV(era.start, era.end),
  background: era.bgColor,
  zIndex: 0,
}));

const ERA_DIVIDER_STYLES_H: React.CSSProperties[] = ERA_DIVIDERS.map((y) => ({
  ...eraDividerBaseH,
  left: yearToPct(y),
}));

const ERA_DIVIDER_STYLES_V: React.CSSProperties[] = ERA_DIVIDERS.map((y) => ({
  ...eraDividerBaseV,
  top: yearToPxV(y),
}));

// ─── Legend ───────────────────────────────────────────────────────────────────
// Rendered by VerticalChart only.

function Legend() {
  const legend = LEGEND_OPACITY_ITEMS.map((item) => (
    <div key={item.label} className="flex items-center gap-1.5">
      <span
        className="block w-2.5 h-2.5 shrink-0"
        style={{
          background: `rgba(255,183,125,${item.op})`,
        }}
      />
      <span style={legendFont}>{item.label}</span>
    </div>
  ));

  const content = ROWS.map((row) => (
    <div key={row.label} className="flex items-center gap-1.5">
      <span
        className="block w-2.5 h-2.5 shrink-0"
        style={{
          background: row.color,
        }}
      />
      <span style={legendFont}>{row.label}</span>
    </div>
  ));

  return (
    <div className="mt-4">
      {/* Opacity register key */}
      <div className="flex flex-col gap-1 mb-2">{legend}</div>

      {/* Divider */}
      <div className="h-px bg-border my-1.5" />

      {/* Capability colour key */}
      <div className="flex flex-col gap-1">{content}</div>
    </div>
  );
}

// ─── Horizontal chart ─────────────────────────────────────────────────────────

function HorizontalChart({
  animKey,
  compact = false,
}: {
  animKey: number;
  compact?: boolean;
}) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelMargin = compact ? 0 : H_LABEL_W;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let isMounted = true;
    const tweens: { kill(): void }[] = [];

    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.width = "0%";
        tweens.push(
          gsap.to(el, {
            width: H_BAR_WIDTHS[i],
            duration: 0.55,
            ease: "power2.out",
            delay: 0.06 + i * 0.04,
          }),
        );
      });
    };

    init();
    return () => {
      isMounted = false;
      tweens.forEach((t) => t.kill());
    };
  }, [animKey]);

  const compactLegend = compact ? (
    <div className="mb-5">
      <Legend />
    </div>
  ) : null;

  const eraLabels = ERAS.map((era) => (
    <span
      key={era.label}
      style={{
        ...eraLabelBaseH,
        left: yearToPct(era.start),
        top: era.labelOffsetY,
        color: era.color,
      }}
    >
      {era.label}
    </span>
  ));

  const bars = ROWS.map((row, i) => (
    <div key={row.label} className="flex items-center mb-1.25">
      {!compact && (
        <div style={{ ...rowLabelBaseH, color: row.color }}>{row.label}</div>
      )}
      <div style={barTrackH}>
        {ERAS.map((era, j) => (
          <div key={era.label} style={ERA_BAND_STYLES_H[j]} />
        ))}
        {ERA_DIVIDERS.map((y, j) => (
          <div key={y} style={ERA_DIVIDER_STYLES_H[j]} />
        ))}
        <div
          ref={(el) => {
            barRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            top: 0,
            left: H_BAR_LEFTS[i],
            height: `${H_BAR_H}px`,
            width: "0%",
            backgroundImage: H_GRADIENTS[i],
            zIndex: 1,
          }}
        />
      </div>
    </div>
  ));

  const years = H_AXIS_YEARS.map((y) => (
    <span key={y} style={{ ...xAxisLabelStyle, left: yearToPct(y) }}>
      {y}
    </span>
  ));

  return (
    <div>
      {/* Legend above chart — compact (mobile) only */}
      {compactLegend}

      {/* Era labels */}
      <div
        className="mb-6 relative h-8"
        style={{
          marginLeft: labelMargin,
        }}
      >
        <span style={eraTickH} />
        {eraLabels}
      </div>

      {/* Bars */}
      {bars}

      {/* X axis */}
      <div
        style={{
          marginLeft: labelMargin,
          position: "relative",
          height: "20px",
          marginTop: "6px",
        }}
      >
        {years}
      </div>
    </div>
  );
}

// ─── Vertical chart ───────────────────────────────────────────────────────────

function VerticalChart({ animKey }: { animKey: number }) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let isMounted = true;
    const tweens: { kill(): void }[] = [];

    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.height = "0px";
        tweens.push(
          gsap.to(el, {
            height: V_BAR_HEIGHTS[i],
            duration: 0.55,
            ease: "power2.out",
            delay: 0.06 + i * 0.04,
          }),
        );
      });
    };

    init();
    return () => {
      isMounted = false;
      tweens.forEach((t) => t.kill());
    };
  }, [animKey]);

  const eras = ERAS.map((era) => {
    const midY = yearToPxV(era.end) + heightPxV(era.start, era.end) / 2;
    return (
      <div key={era.label}>
        <span
          style={{
            ...eraLabelBaseV,
            top: midY,
            transform: "translateY(-50%)",
            color: era.color,
          }}
        >
          {era.shortLabel}
        </span>
        <span
          style={{
            ...eraTickBaseV,
            top: midY,
            transform: "translateY(-50%)",
            background: era.color,
          }}
        />
      </div>
    );
  });

  const eraBands = ERAS.map((era, j) => (
    <div key={era.label} style={ERA_BAND_STYLES_V[j]} />
  ));

  const eraDividers = ERA_DIVIDERS.map((y, j) => (
    <div key={y} style={ERA_DIVIDER_STYLES_V[j]} />
  ));

  const rows = ROWS.map((row, i) => (
    <div
      key={row.label}
      title={row.label}
      style={{
        flex: 1,
        minWidth: 0,
        position: "relative",
        height: CHART_H,
        zIndex: 1,
      }}
    >
      <div
        ref={(el) => {
          barRefs.current[i] = el;
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          // top anchors to the year this capability ends (2026 = top of chart)
          top: V_BAR_TOPS[i],
          height: 0, // animated by GSAP to V_BAR_HEIGHTS[i]
          backgroundImage: V_GRADIENTS[i],
          zIndex: 1,
        }}
      />
    </div>
  ));

  return (
    // Outer wrapper: flex column so legend sits below the chart
    <div className="flex flex-col">
      {/* Chart area: era label axis + columns */}
      <div className="flex gap-0">
        {/* Era label axis — fixed 72px, labels centred within each era band */}
        <div
          style={{
            width: "72px",
            flexShrink: 0,
            position: "relative",
            height: CHART_H,
          }}
        >
          {eras}
        </div>

        {/*
         * Columns wrapper — fills all remaining width.
         * height is explicit so GSAP can animate from 0 → heightPxV correctly.
         * Each column is flex: 1 so they share the available width equally.
         */}
        <div
          style={{
            flex: 1,
            position: "relative",
            display: "flex",
            gap: "2px",
            height: CHART_H,
          }}
        >
          {/* Era background bands */}
          {eraBands}

          {/* Era divider lines */}
          {eraDividers}

          {/* Capability columns — each fills its flex portion */}
          {rows}
        </div>
      </div>

      {/* Legend — below the chart, single instance */}
      <Legend />
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export type CareerIntensityChartProps = {
  viewMode: CareerViewMode;
  animKey: number;
  compact?: boolean;
};

export function CareerIntensityChart({
  viewMode,
  animKey,
  compact = false,
}: CareerIntensityChartProps) {
  return viewMode === "vertical" ? (
    <VerticalChart animKey={animKey} />
  ) : (
    <HorizontalChart animKey={animKey} compact={compact} />
  );
}
