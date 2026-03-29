import { useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    years: "2002 — 2014",
    company: "US Department of Defense",
    title: "VARIOUS LEADERSHIP ROLES",
    description:
      "Led multifunctional teams across multiple global deployments in high-stakes, complex operating environments.",
  },
  {
    years: "2014 — 2015",
    company: "Schindler Elevator Corporation",
    title: "MARKET DEVELOPMENT MANAGER",
    description:
      "Built strategic partnerships and grew market presence across DC, Maryland, and Virginia — delivering tailored solutions for complex enterprise property management clients.",
  },
  {
    years: "2015 — 2018",
    company: "Iskilde",
    title: "MANAGER OF OPERATIONS",
    description:
      "Led operational transformation through Lean methodology — eliminating waste, building elite partnerships, and developing future capacity across the supply chain.",
  },
  {
    years: "2018 — 2019",
    company: "Bouvet",
    title: "DEVELOPER CONSULTANT",
    description:
      "Developing and maintaining web solutions using modern technologies and engineering best practices.",
  },
  {
    years: "2019 — 2022",
    company: "Webstep",
    title: "SENIOR DEVELOPER CONSULTANT",
    description:
      "Consulting, designing and developing web solutions using the latest technologies and best practices across a range of client engagements.",
  },
  {
    years: "2022 — PRESENT",
    company: "frog, part of Capgemini Invent",
    title: "LEAD DESIGN TECHNOLOGIST · MANAGER",
    description:
      "Leading cross-functional teams across digital transformation programmes. Built and leads the frog Norway Customer Data & Technology capability. Solution Architect, Team Lead, and craft mentor across design, engineering, and AI integration.",
  },
] as const;

type Entry = (typeof EXPERIENCE)[number];

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimelineLayout = "vertical" | "horizontal";

type TooltipState = {
  entry: Entry;
  left: number; // px — clamped tooltip left
  top: number; // px — clamped tooltip top
} | null;

// ─── Constants ────────────────────────────────────────────────────────────────

const SPINE_Y = 48; // px from top of the horizontal track — dot sits here
const STEM_H = 20; // px — vertical line below dot to label
const LABEL_ANGLE = 40; // degrees
const TOOLTIP_W = 240; // px
const TOOLTIP_GAP = 16; // px offset from cursor
const N = EXPERIENCE.length;
const TRACK_H = SPINE_Y + 160; // room for diagonal labels below spine

// ─── Module-level styles ──────────────────────────────────────────────────────

// VerticalTimeline grid
const gridColsStyle = { gridTemplateColumns: "80px 32px 1fr" } as const;

// Horizontal spine line
const spineStyle: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  top: SPINE_Y,
  height: "1px",
  background: "var(--color-border)",
};

// Dot — borderRadius omitted; use className="circle" to override global border-radius: 0
const dotBaseStyle: React.CSSProperties = {
  position: "absolute",
  top: SPINE_Y - 3,
  width: "7px",
  height: "7px",
  background: "var(--color-accent)",
  transform: "translateX(-50%)",
  zIndex: 2,
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

const stemStyle: React.CSSProperties = {
  position: "absolute",
  top: SPINE_Y + 4,
  width: "1px",
  background: "var(--color-surface-highest)",
  height: STEM_H,
  transform: "translateX(-50%)",
};

const labelContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: SPINE_Y + STEM_H + 4,
  transformOrigin: "0 0",
  transform: `rotate(${LABEL_ANGLE}deg)`,
  whiteSpace: "nowrap",
  cursor: "pointer",
  userSelect: "none",
};

// Diagonal label — years (always accent, no hover variant needed)
const diagYearsStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-accent)",
  marginBottom: "2px",
  transition: "color 0.15s ease",
};

// Diagonal label — company base (color added per-entry at render time)
const diagCompanyBase: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-display)",
  fontSize: "11px",
  fontWeight: 700,
  marginBottom: "1px",
  transition: "color 0.15s ease",
};

// Diagonal label — title base (color added per-entry at render time)
const diagTitleBase: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  transition: "color 0.15s ease",
};

// Pre-computed entry position styles — pct values derived from constants, never change
const ENTRY_POSITION_STYLES: React.CSSProperties[] = EXPERIENCE.map((_, i) => ({
  position: "absolute",
  left: `${(i / (N - 1)) * 100}%`,
}));

// Pre-computed dot styles — only transform differs between states
const dotStyle: React.CSSProperties = {
  ...dotBaseStyle,
  transform: "translateX(-50%)",
};
const dotHoverStyle: React.CSSProperties = {
  ...dotBaseStyle,
  transform: "translateX(-50%) scale(1.6)",
};

// Pre-computed diagonal label styles — only color differs between hover states
const diagCompanyStyle: React.CSSProperties = {
  ...diagCompanyBase,
  color: "var(--color-text-primary)",
};
const diagCompanyHoverStyle: React.CSSProperties = {
  ...diagCompanyBase,
  color: "#ffffff",
};
const diagTitleStyle: React.CSSProperties = {
  ...diagTitleBase,
  color: "var(--color-text-muted)",
};
const diagTitleHoverStyle: React.CSSProperties = {
  ...diagTitleBase,
  color: "var(--color-accent)",
};

// Tooltip — static properties (left and top added at render time)
const tooltipBaseStyle: React.CSSProperties = {
  position: "absolute",
  width: TOOLTIP_W,
  background: "var(--color-hover-surface)",
  borderTop: "2px solid var(--color-accent)",
  padding: "12px 16px",
  pointerEvents: "none",
  zIndex: 20,
};

const tooltipYearsStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-accent)",
  marginBottom: "4px",
};

const tooltipCompanyStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "14px",
  fontWeight: 700,
  color: "var(--color-text-primary)",
  marginBottom: "3px",
};

const tooltipTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  // #9B9997 is intentionally lighter than --color-text-muted; no token yet
  color: "#9B9997",
  marginBottom: "8px",
};

const tooltipDescStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "12px",
  fontWeight: 400,
  // #B8B5B3 is intentionally lighter than --color-text-primary; no token yet
  color: "#B8B5B3",
  lineHeight: 1.65,
};

// ─── Vertical layout ──────────────────────────────────────────────────────────

function TimelineContent({ entry }: { entry: Entry }) {
  return (
    <div>
      <p className="font-display font-bold text-xl text-text-primary leading-[1.2]">
        {entry.company}
      </p>
      <p className="font-body font-medium text-sm text-accent uppercase mt-1 tracking-widest">
        {entry.title}
      </p>
      <p className="font-body text-base text-text-muted leading-[1.7] max-w-130 mt-2.5">
        {entry.description}
      </p>
    </div>
  );
}

function VerticalTimeline() {
  const experience = [...EXPERIENCE].reverse().map((entry) => (
    <div key={entry.company} data-anim="timeline-entry">
      <div className="hidden md:grid" style={gridColsStyle}>
        <div className="text-right pr-4 pt-0.5">
          {entry.years.split(" — ").map((y, j) => (
            <span
              key={j}
              className="block font-display font-bold text-sm text-accent uppercase tracking-[0.02em] leading-[1.4]"
            >
              {y}
            </span>
          ))}
        </div>
        <div className="flex justify-center pt-1">
          <div className="circle bg-accent w-2 h-2 shrink-0 relative z-1" />
        </div>
        <TimelineContent entry={entry} />
      </div>
      <div className="md:hidden pl-6">
        <p className="font-display font-bold text-sm text-accent uppercase tracking-[0.02em] mb-1.5">
          {entry.years}
        </p>
        <TimelineContent entry={entry} />
      </div>
    </div>
  ));

  return (
    <div className="relative">
      <div className="absolute hidden md:block bg-border left-22 top-0 bottom-0 w-px" />
      <div className="absolute md:hidden bg-border left-0 top-0 bottom-0 w-px" />
      <div className="flex flex-col gap-12">{experience}</div>
    </div>
  );
}

// ─── Horizontal layout ────────────────────────────────────────────────────────

function HorizontalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const clampTooltip = (
    clientX: number,
    clientY: number,
    rect: DOMRect,
  ): { left: number; top: number } => {
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const left = Math.min(x + TOOLTIP_GAP, rect.width - TOOLTIP_W - 8);
    const top = Math.max(0, y - 120);
    return { left, top };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || tooltip === null) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { left, top } = clampTooltip(e.clientX, e.clientY, rect);
    setTooltip((prev) => (prev ? { ...prev, left, top } : null));
  };

  const handleEntryEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    entry: Entry,
    idx: number,
  ) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const { left, top } = clampTooltip(e.clientX, e.clientY, rect);
    setTooltip({ entry, left, top });
    setHoveredIdx(idx);
  };

  const handleEntryLeave = () => {
    setTooltip(null);
    setHoveredIdx(null);
  };

  const tooltipEl = tooltip && (
    <div style={{ ...tooltipBaseStyle, left: tooltip.left, top: tooltip.top }}>
      <p style={tooltipYearsStyle}>{tooltip.entry.years}</p>
      <p style={tooltipCompanyStyle}>{tooltip.entry.company}</p>
      <p style={tooltipTitleStyle}>{tooltip.entry.title}</p>
      <p style={tooltipDescStyle}>{tooltip.entry.description}</p>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: TRACK_H }}
      onMouseMove={handleMouseMove}
    >
      {/* Spine */}
      <div style={spineStyle} />

      {/* Entries */}
      {EXPERIENCE.map((entry, i) => {
        const isHovered = hoveredIdx === i;

        return (
          <div
            key={entry.company}
            style={ENTRY_POSITION_STYLES[i]}
            onMouseEnter={(e) => handleEntryEnter(e, entry, i)}
            onMouseLeave={handleEntryLeave}
          >
            {/* Dot — circle class overrides global border-radius: 0 */}
            <div
              className="circle"
              style={isHovered ? dotHoverStyle : dotStyle}
            />

            {/* Stem */}
            <div style={stemStyle} />

            {/* Diagonal label */}
            <div style={labelContainerStyle}>
              <span style={diagYearsStyle}>{entry.years}</span>
              <span
                style={isHovered ? diagCompanyHoverStyle : diagCompanyStyle}
              >
                {entry.company}
              </span>
              <span style={isHovered ? diagTitleHoverStyle : diagTitleStyle}>
                {entry.title}
              </span>
            </div>
          </div>
        );
      })}

      {/* Cursor-following tooltip */}
      {tooltipEl}
    </div>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────

export type TimelineProps = {
  layout?: TimelineLayout;
};

export function Timeline({ layout = "vertical" }: TimelineProps) {
  return layout === "horizontal" ? (
    <HorizontalTimeline />
  ) : (
    <VerticalTimeline />
  );
}
