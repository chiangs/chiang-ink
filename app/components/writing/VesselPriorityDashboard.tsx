import type { CSSProperties } from "react";
import { useState } from "react";

// ─── Page-level string constants ──────────────────────────────────────────────
const LABEL_HEADER = "FLEET OPERATIONS · LIVE PRIORITY";
const TITLE = "Which vessel needs attention first?";
const SUBTITLE =
  "Urgency score — weighted composite of days to hire expiry, open off-hire items, and utilisation delta against fleet average. Click a row to see the breakdown.";
const LABEL_SCORE_COMPOSITION = "SCORE COMPOSITION";
const LABEL_URGENCY = "URGENCY";
const FORMULA_PREFIX = "Score = ";
const FORMULA_TERM_1 = "(hire expiry proximity × 0.4)";
const FORMULA_TERM_2 = "(utilisation delta × 0.35)";
const FORMULA_TERM_3 = "(open off-hire items × 0.25)";
const FORMULA_SUFFIX = " — normalised 0–100";
const FOOTNOTE =
  "* Vessel names, IMO numbers, and all data are fictional and used for illustrative purposes only.";
const MOBILE_IMG_SRC = "/images/content/vessel-priority-dashboard.png";
const MOBILE_IMG_ALT =
  "Fleet operations vessel priority dashboard — three vessels ranked by urgency score with action buttons";

// ─── Color constants ───────────────────────────────────────────────────────────
const COLOR_RED = "#E24B4A";
const COLOR_AMBER = "#FFB77D";
const COLOR_MUTED = "#737371";

// ─── Types ────────────────────────────────────────────────────────────────────
type Factor = {
  label: string;
  displayValue: string;
  weight: string;
  barWidth: number;
  barColor: string;
};

type Vessel = {
  id: string;
  rank: number;
  name: string;
  type: string;
  imo: string;
  hireExpiry: string;
  score: number;
  scoreColor: string;
  action: string;
  factors: Factor[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const VESSELS: Vessel[] = [
  {
    id: "haldane-spirit",
    rank: 1,
    name: "MV Haldane Spirit",
    type: "Bulk Carrier",
    imo: "IMO 9312847",
    hireExpiry: "HIRE EXPIRY IN 3 DAYS",
    score: 87,
    scoreColor: COLOR_RED,
    action: "FIX →",
    factors: [
      {
        label: "Days to hire expiry",
        displayValue: "3 days",
        weight: "×0.4",
        barWidth: 90,
        barColor: COLOR_RED,
      },
      {
        label: "Utilisation delta",
        displayValue: "−31%",
        weight: "×0.35",
        barWidth: 78,
        barColor: COLOR_AMBER,
      },
      {
        label: "Open off-hire items",
        displayValue: "3 items",
        weight: "×0.25",
        barWidth: 30,
        barColor: COLOR_MUTED,
      },
    ],
  },
  {
    id: "greyfjord-venture",
    rank: 2,
    name: "MV Greyfjord Venture",
    type: "General Cargo",
    imo: "IMO 9476103",
    hireExpiry: "HIRE EXPIRY IN 11 DAYS",
    score: 61,
    scoreColor: COLOR_AMBER,
    action: "REVIEW →",
    factors: [
      {
        label: "Days to hire expiry",
        displayValue: "11 days",
        weight: "×0.4",
        barWidth: 63,
        barColor: COLOR_AMBER,
      },
      {
        label: "Utilisation delta",
        displayValue: "−18%",
        weight: "×0.35",
        barWidth: 45,
        barColor: COLOR_AMBER,
      },
      {
        label: "Open off-hire items",
        displayValue: "7 items",
        weight: "×0.25",
        barWidth: 70,
        barColor: COLOR_RED,
      },
    ],
  },
  {
    id: "calloway-passage",
    rank: 3,
    name: "MV Calloway Passage",
    type: "Tanker",
    imo: "IMO 9558264",
    hireExpiry: "HIRE EXPIRY IN 28 DAYS",
    score: 29,
    scoreColor: COLOR_MUTED,
    action: "WATCH →",
    factors: [
      {
        label: "Days to hire expiry",
        displayValue: "28 days",
        weight: "×0.4",
        barWidth: 7,
        barColor: COLOR_MUTED,
      },
      {
        label: "Utilisation delta",
        displayValue: "−8%",
        weight: "×0.35",
        barWidth: 20,
        barColor: COLOR_AMBER,
      },
      {
        label: "Open off-hire items",
        displayValue: "1 item",
        weight: "×0.25",
        barWidth: 10,
        barColor: COLOR_MUTED,
      },
    ],
  },
];

// ─── Style constants (module-level per CLAUDE.md) ─────────────────────────────
const scoreValueStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: 1,
};

const actionButtonBaseStyle: CSSProperties = {
  width: "110px",
  flexShrink: 0,
  background: "transparent",
};

const footnoteStyle: CSSProperties = {
  fontSize: "11px",
  fontStyle: "italic",
};

const activeBorderStyle: CSSProperties = {
  borderLeft: "3px solid var(--color-accent)",
};

const inactiveBorderStyle: CSSProperties = {
  borderLeft: "3px solid transparent",
};

const dashboardTitleStyle: CSSProperties = {
  fontSize: "clamp(22px, 3vw, 30px)",
};

const formulaTermStyle: CSSProperties = {
  color: COLOR_AMBER,
};

// ─── Component ────────────────────────────────────────────────────────────────
export function VesselPriorityDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(id);
    }
  };

  const rows = VESSELS.map((vessel) => {
    const isExpanded = expandedId === vessel.id;
    const rowBorderStyle = isExpanded ? activeBorderStyle : inactiveBorderStyle;
    const scoreStyle: CSSProperties = {
      ...scoreValueStyle,
      color: vessel.scoreColor,
    };
    const isButtonHovered = hoveredButtonId === vessel.id;
    const actionStyle: CSSProperties = {
      ...actionButtonBaseStyle,
      border: `1px solid ${isButtonHovered ? COLOR_AMBER : COLOR_MUTED}`,
      color: isButtonHovered ? COLOR_AMBER : COLOR_MUTED,
      transition:
        "border-color var(--transition-fast), color var(--transition-fast)",
    };

    const factorRows = vessel.factors.map((factor) => {
      const barFillStyle: CSSProperties = {
        width: `${factor.barWidth}%`,
        backgroundColor: factor.barColor,
      };
      return (
        <div key={factor.label} className="flex items-center gap-3">
          <span className="font-body text-sm text-text-muted w-36 flex-shrink-0">
            {factor.label}
          </span>
          <div className="flex-1 bg-surface-highest h-1.5">
            <div className="h-full" style={barFillStyle} />
          </div>
          <span className="font-body font-medium text-sm text-text-primary w-14 text-right flex-shrink-0">
            {factor.displayValue}
          </span>
          <span className="font-body font-medium text-xs text-text-muted w-8 flex-shrink-0">
            {factor.weight}
          </span>
        </div>
      );
    });

    const breakdown = isExpanded ? (
      <div className="px-5 pb-5">
        <div className="flex gap-4">
          {/* Spacer matching rank column width */}
          <div className="w-8 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-body font-medium text-xs uppercase tracking-[0.15em] text-text-muted mb-4">
              {LABEL_SCORE_COMPOSITION}
            </p>
            <div className="flex flex-col gap-3">{factorRows}</div>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div
        key={vessel.id}
        className={`bg-surface cursor-pointer transition-colors duration-200${isExpanded ? "" : " hover:bg-surface-high"}`}
        style={rowBorderStyle}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onClick={() => handleRowClick(vessel.id)}
        onKeyDown={(e) => handleKeyDown(e, vessel.id)}
      >
        <div className="flex items-center gap-4 p-5">
          {/* Rank */}
          <div className="w-8 flex-shrink-0">
            <span className="font-display font-bold text-lg text-text-muted">
              {vessel.rank}
            </span>
          </div>

          {/* Vessel info */}
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-lg text-text-primary mb-1">
              {vessel.name}
            </p>
            <p className="font-body font-medium text-xs uppercase tracking-[0.1em] text-text-muted">
              {vessel.type} · {vessel.imo}
            </p>
            <p className="font-body font-medium text-xs uppercase tracking-[0.1em] text-text-muted mt-0.5">
              {vessel.hireExpiry}
            </p>
          </div>

          {/* Score + action */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 text-right">
              <div style={scoreStyle}>{vessel.score}</div>
              <div className="font-body font-medium text-xs uppercase tracking-[0.12em] text-text-muted mt-1">
                {LABEL_URGENCY}
              </div>
            </div>
            <button
              className="font-body font-medium text-sm uppercase tracking-[0.1em] px-4 py-3 flex-shrink-0 whitespace-nowrap"
              style={actionStyle}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredButtonId(vessel.id)}
              onMouseLeave={() => setHoveredButtonId(null)}
              tabIndex={-1}
            >
              {vessel.action}
            </button>
          </div>
        </div>

        {breakdown}
      </div>
    );
  });

  return (
    <>
      {/* Mobile: static image fallback */}
      <div className="block md:hidden my-12">
        <img src={MOBILE_IMG_SRC} alt={MOBILE_IMG_ALT} className="w-full" />
      </div>

      {/* Desktop: interactive widget */}
      <div className="hidden md:block bg-bg my-12 p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent mb-3">
            {LABEL_HEADER}
          </p>
          <p
            className="font-display font-bold text-text-primary leading-tight mb-3"
            style={dashboardTitleStyle}
          >
            {TITLE}
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            {SUBTITLE}
          </p>
        </div>

        {/* Vessel rows */}
        <div className="flex flex-col gap-2 mb-3">{rows}</div>

        {/* Formula */}
        <div className="bg-surface py-4 px-5 mb-3">
          <p className="font-body text-xs text-text-muted leading-relaxed">
            {FORMULA_PREFIX}
            <span style={formulaTermStyle}>{FORMULA_TERM_1}</span>
            {" + "}
            <span style={formulaTermStyle}>{FORMULA_TERM_2}</span>
            {" + "}
            <span style={formulaTermStyle}>{FORMULA_TERM_3}</span>
            {FORMULA_SUFFIX}
          </p>
        </div>

        {/* Footnote */}
        <p className="font-body text-text-muted" style={footnoteStyle}>
          {FOOTNOTE}
        </p>
      </div>
    </>
  );
}
