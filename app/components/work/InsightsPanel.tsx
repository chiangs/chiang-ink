import { useEffect, useMemo, useRef, useState } from "react";
import { scaleLinear, scalePoint } from "~/lib/visx";
import type { ProjectFrontmatter } from "~/types/content";

// ─── Copy ─────────────────────────────────────────────────────────────────────

const LABEL_WORK_INSIGHTS = "WORK INSIGHTS";
const LABEL_HIDE = "Hide ↑";
const LABEL_SHOW = "Show ↓";
const LABEL_INDUSTRY_PROPORTION = "INDUSTRY PROPORTION";
const LABEL_PROJECTS_BY_INDUSTRY = "PROJECTS BY INDUSTRY";
const LABEL_ACTIVITY_BY_YEAR = "ACTIVITY BY YEAR";
const LABEL_ROLES = "ROLES";
const LABEL_SOLUTION_TYPES = "SOLUTION TYPES";
const LABEL_TECH_STACK = "TECH STACK";
const LABEL_AVG_MVP = "AVG. TIME TO MVP";
const LABEL_MONTHS_TO_MVP = "months to MVP";
const LABEL_MVP_SUB = "Derived from projects with defined delivery timelines.";
const LABEL_FRAMEWORKS = "FRAMEWORKS";
const LABEL_LANGUAGES = "LANGUAGES";
const LABEL_PLATFORMS = "PLATFORMS";

// ─── Industry colour map ──────────────────────────────────────────────────────

const INDUSTRY_COLORS: Record<string, string> = {
  "Maritime":                           "var(--color-accent)",
  "Oil & Gas / Energy":                 "var(--color-accent-deep)",
  "Defence / Military":                 "var(--color-text-muted)",
  "Government / Public Sector":         "var(--color-text-primary)",
  "Consulting & Professional Services": "var(--color-surface-highest)",
  "Healthcare":                         "#3a3a38",
  "Technology / SaaS":                  "#4a4a48",
};
const INDUSTRY_COLOR_FALLBACK = "var(--color-border)";

// ─── Chart config ─────────────────────────────────────────────────────────────

const WAFFLE_COLS = 10;
const WAFFLE_ROWS = 10;
const WAFFLE_CELL = 18;
const WAFFLE_GAP = 2;
const WAFFLE_TOTAL = WAFFLE_COLS * WAFFLE_ROWS;
const WAFFLE_SVG = WAFFLE_COLS * (WAFFLE_CELL + WAFFLE_GAP) - WAFFLE_GAP;

const LINE_W = 240;
const LINE_H = 120;
const LINE_M = { top: 10, right: 10, bottom: 28, left: 24 };
const LINE_IW = LINE_W - LINE_M.left - LINE_M.right;
const LINE_IH = LINE_H - LINE_M.top - LINE_M.bottom;

// ─── Style objects ────────────────────────────────────────────────────────────

const panelStyle = { padding: "32px" };
const legendGridStyle = { gridTemplateColumns: "1fr 1fr" };
const avgValueStyle = { fontSize: "56px", lineHeight: 1 };
const industryNameStyle = { width: 140 };
const countColStyle = { width: 16 };
const roleRowStyle = { borderColor: "#1e1e1e" };

// ─── Types ────────────────────────────────────────────────────────────────────

type InsightData = {
  industryCounts: [string, number][];
  topTags: [string, number][];
  yearData: { year: string; count: number }[];
  roles: [string, number][];
  stack: {
    frameworks: [string, number][];
    languages: [string, number][];
    platforms: [string, number][];
  };
  avgMVP: number | null;
  uniqueIndustries: number;
};

// ─── Pure data computation ────────────────────────────────────────────────────

function computeInsights(projects: ProjectFrontmatter[]): InsightData {
  const rawIndustry: Record<string, number> = {};
  const rawTags: Record<string, number> = {};
  const rawYears: Record<string, number> = {};
  const rawRoles: Record<string, number> = {};
  const rawFrameworks: Record<string, number> = {};
  const rawLanguages: Record<string, number> = {};
  const rawPlatforms: Record<string, number> = {};
  const mvpTimes: number[] = [];

  for (const p of projects) {
    for (const ind of p.industries ?? p.industry ?? []) {
      rawIndustry[ind] = (rawIndustry[ind] ?? 0) + 1;
    }
    for (const tag of p.tags) {
      rawTags[tag] = (rawTags[tag] ?? 0) + 1;
    }
    rawYears[p.year] = (rawYears[p.year] ?? 0) + 1;
    for (const role of p.roles) {
      rawRoles[role] = (rawRoles[role] ?? 0) + 1;
    }
    if (p.stack) {
      for (const f of p.stack.frameworks) rawFrameworks[f] = (rawFrameworks[f] ?? 0) + 1;
      for (const l of p.stack.languages) rawLanguages[l] = (rawLanguages[l] ?? 0) + 1;
      for (const pl of p.stack.platforms) rawPlatforms[pl] = (rawPlatforms[pl] ?? 0) + 1;
    }
    for (const m of p.metrics) {
      if (/month|mvp/i.test(m.label)) {
        const n = parseFloat(m.value);
        if (!isNaN(n)) mvpTimes.push(n);
      }
    }
  }

  const avgMVP =
    mvpTimes.length > 0
      ? mvpTimes.reduce((a, b) => a + b, 0) / mvpTimes.length
      : null;

  return {
    industryCounts: Object.entries(rawIndustry).sort((a, b) => b[1] - a[1]),
    topTags: Object.entries(rawTags).sort((a, b) => b[1] - a[1]).slice(0, 6),
    yearData: Object.entries(rawYears)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([year, count]) => ({ year, count })),
    roles: Object.entries(rawRoles).sort((a, b) => b[1] - a[1]),
    stack: {
      frameworks: Object.entries(rawFrameworks).sort((a, b) => b[1] - a[1]),
      languages: Object.entries(rawLanguages).sort((a, b) => b[1] - a[1]),
      platforms: Object.entries(rawPlatforms).sort((a, b) => b[1] - a[1]),
    },
    avgMVP,
    uniqueIndustries: Object.keys(rawIndustry).length,
  };
}

// ─── InsightsPanel ────────────────────────────────────────────────────────────

export function InsightsPanel({ projects }: { projects: ProjectFrontmatter[] }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const insights = useMemo(() => computeInsights(projects), [projects]);

  const maxIndustryCount = Math.max(...insights.industryCounts.map(([, c]) => c), 1);
  const maxTagCount = Math.max(...insights.topTags.map(([, c]) => c), 1);
  const subLabel = `Derived from ${projects.length} project${projects.length !== 1 ? "s" : ""} across ${insights.uniqueIndustries} ${insights.uniqueIndustries !== 1 ? "industries" : "industry"}.`;

  // Mobile: collapse by default after mount
  useEffect(() => {
    if (window.innerWidth < 768 && contentRef.current) {
      setIsExpanded(false);
      contentRef.current.style.height = "0px";
      contentRef.current.style.overflow = "hidden";
    }
  }, []);

  const handleToggle = async () => {
    const { default: gsap } = await import("gsap");
    const el = contentRef.current;
    if (!el) return;

    if (isExpanded) {
      gsap.set(el, { height: el.scrollHeight, overflow: "hidden" });
      gsap.to(el, { height: 0, duration: 0.4, ease: "power2.inOut" });
    } else {
      el.style.overflow = "hidden";
      gsap.to(el, {
        height: "auto",
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          el.style.overflow = "";
        },
      });
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="bg-surface border-b border-border" style={panelStyle}>
      {/* Toggle header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between"
        aria-expanded={isExpanded}
      >
        <span className="font-body font-medium text-[11px] text-accent uppercase tracking-[0.15em]">
          {LABEL_WORK_INSIGHTS}
        </span>
        <span className="font-body font-medium text-[11px] text-text-muted">
          {isExpanded ? LABEL_HIDE : LABEL_SHOW}
        </span>
      </button>

      {/* Collapsible body */}
      <div ref={contentRef}>
        <p className="font-body font-normal text-[12px] text-text-muted mt-3">
          {subLabel}
        </p>

        {/* 2-column asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* LEFT: waffle chart — spans 2 rows on desktop */}
          <div className="md:row-span-2">
            <WaffleChart industryCounts={insights.industryCounts} total={projects.length} />
          </div>

          {/* RIGHT TOP: industry distribution bars */}
          <div>
            <IndustryBars
              industryCounts={insights.industryCounts}
              maxCount={maxIndustryCount}
              isExpanded={isExpanded}
            />
          </div>

          {/* RIGHT BOTTOM: year activity + roles */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <YearLineChart yearData={insights.yearData} isExpanded={isExpanded} />
            </div>
            <div className="flex-1">
              <RolesList roles={insights.roles} />
            </div>
          </div>
        </div>

        {/* Full-width bottom row — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <TagBars topTags={insights.topTags} maxCount={maxTagCount} isExpanded={isExpanded} />
          <TechStack stack={insights.stack} />
          <AvgMVPStat avgMVP={insights.avgMVP} />
        </div>
      </div>
    </div>
  );
}

// ─── WaffleChart ──────────────────────────────────────────────────────────────

type WaffleChartProps = {
  industryCounts: [string, number][];
  total: number;
};

function WaffleChart({ industryCounts, total }: WaffleChartProps) {
  const [hoveredInfo, setHoveredInfo] = useState<{ industry: string; pct: number } | null>(null);

  const { cells, cellInfo } = useMemo(() => {
    const filledCells = new Array<string>(WAFFLE_TOTAL).fill(INDUSTRY_COLOR_FALLBACK);
    const info = new Array<{ industry: string; pct: number }>(WAFFLE_TOTAL).fill({
      industry: "",
      pct: 0,
    });
    let idx = 0;
    for (const [industry, count] of industryCounts) {
      const ratio = count / Math.max(total, 1);
      const numCells = Math.round(ratio * WAFFLE_TOTAL);
      const color = INDUSTRY_COLORS[industry] ?? INDUSTRY_COLOR_FALLBACK;
      const pct = Math.round(ratio * 100);
      for (let i = 0; i < numCells && idx < WAFFLE_TOTAL; i++) {
        filledCells[idx] = color;
        info[idx] = { industry, pct };
        idx++;
      }
    }
    return { cells: filledCells, cellInfo: info };
  }, [industryCounts, total]);

  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_INDUSTRY_PROPORTION}
      </p>
      <div className="relative mt-3 overflow-x-auto">
        <svg
          viewBox={`0 0 ${WAFFLE_SVG} ${WAFFLE_SVG}`}
          width={WAFFLE_SVG}
          height={WAFFLE_SVG}
          className="max-w-full h-auto"
          aria-label="Industry proportion waffle chart"
        >
          {cells.map((color, i) => {
            const col = i % WAFFLE_COLS;
            const row = Math.floor(i / WAFFLE_ROWS);
            const x = col * (WAFFLE_CELL + WAFFLE_GAP);
            const y = row * (WAFFLE_CELL + WAFFLE_GAP);
            const isHovered = hoveredInfo !== null && cellInfo[i].industry !== "";
            const isDimmed =
              isHovered && hoveredInfo?.industry !== cellInfo[i].industry;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={WAFFLE_CELL}
                height={WAFFLE_CELL}
                fill={color}
                opacity={isDimmed ? 0.25 : 1}
                style={{ cursor: "default", transition: "opacity 0.15s" }}
                onMouseEnter={() => {
                  if (cellInfo[i].industry) setHoveredInfo(cellInfo[i]);
                }}
                onMouseLeave={() => setHoveredInfo(null)}
              />
            );
          })}
        </svg>
        {hoveredInfo && (
          <div
            className="absolute top-0 left-0 pointer-events-none bg-surface-highest border border-border font-body text-[11px] text-text-primary px-2 py-1"
            style={{ transform: "translateY(-110%)", whiteSpace: "nowrap" }}
          >
            {hoveredInfo.industry} — {hoveredInfo.pct}%
          </div>
        )}
      </div>
      {/* Legend */}
      <div className="grid gap-x-4 gap-y-1 mt-3" style={legendGridStyle}>
        {industryCounts.map(([industry, count]) => {
          const pct = Math.round((count / Math.max(total, 1)) * 100);
          const color = INDUSTRY_COLORS[industry] ?? INDUSTRY_COLOR_FALLBACK;
          return (
            <div key={industry} className="flex items-center gap-1.5 min-w-0">
              <span
                className="shrink-0 inline-block"
                style={{ width: 12, height: 12, background: color }}
              />
              <span className="font-body font-normal text-[11px] text-text-muted truncate">
                {industry} {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── IndustryBars ─────────────────────────────────────────────────────────────

type IndustryBarsProps = {
  industryCounts: [string, number][];
  maxCount: number;
  isExpanded: boolean;
};

function IndustryBars({ industryCounts, maxCount, isExpanded }: IndustryBarsProps) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isExpanded) return;
    let isMounted = true;
    let ctx: { revert(): void } | null = null;
    const timer = setTimeout(async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      ctx = gsap.context(() => {
        barRefs.current.forEach((bar, i) => {
          if (!bar) return;
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: bar.dataset.targetWidth ?? "0%",
              duration: 0.6,
              delay: i * 0.08,
              ease: "power2.out",
            }
          );
        });
      });
    }, 350);
    return () => {
      clearTimeout(timer);
      isMounted = false;
      ctx?.revert();
    };
  }, [isExpanded]);

  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_PROJECTS_BY_INDUSTRY}
      </p>
      <div className="flex flex-col gap-2 mt-3">
        {industryCounts.map(([industry, count], i) => {
          const widthPct = `${(count / maxCount) * 100}%`;
          return (
            <div key={industry} className="flex items-center gap-3">
              <span
                className="font-body font-normal text-[12px] text-text-primary shrink-0 truncate"
                style={industryNameStyle}
              >
                {industry}
              </span>
              <div className="flex-1 relative" style={{ height: 8 }}>
                <div className="absolute inset-0 bg-border" />
                <div
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  data-target-width={widthPct}
                  className="absolute top-0 left-0 h-full bg-accent"
                  style={{ width: "0%" }}
                />
              </div>
              <span
                className="font-body font-medium text-[12px] text-accent shrink-0 text-right"
                style={countColStyle}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── YearLineChart ────────────────────────────────────────────────────────────

type YearLineChartProps = {
  yearData: { year: string; count: number }[];
  isExpanded: boolean;
};

function YearLineChart({ yearData, isExpanded }: YearLineChartProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [hoveredYear, setHoveredYear] = useState<string | null>(null);

  const maxCount = Math.max(...yearData.map((d) => d.count), 1);

  const xScale = useMemo(
    () =>
      scalePoint<string>({
        domain: yearData.map((d) => d.year),
        range: [0, LINE_IW],
        padding: 0.5,
      }),
    [yearData]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [0, maxCount],
        range: [LINE_IH, 0],
        nice: true,
      }),
    [maxCount]
  );

  const pathD = yearData
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d.year) ?? 0} ${yScale(d.count)}`)
    .join(" ");

  // Animate line on expand
  useEffect(() => {
    if (!isExpanded || !pathRef.current) return;
    let tween: { kill(): void } | null = null;
    let isMounted = true;
    const timer = setTimeout(async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted || !pathRef.current) return;
      const length = pathRef.current.getTotalLength();
      if (length > 0) {
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        tween = gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, 450);
    return () => {
      clearTimeout(timer);
      isMounted = false;
      tween?.kill();
    };
  }, [isExpanded]);

  const hoveredPoint = yearData.find((d) => d.year === hoveredYear) ?? null;

  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_ACTIVITY_BY_YEAR}
      </p>
      <svg
        width={LINE_W}
        height={LINE_H}
        className="mt-3 max-w-full"
        overflow="visible"
      >
        <g transform={`translate(${LINE_M.left}, ${LINE_M.top})`}>
          <path
            ref={pathRef}
            d={pathD}
            stroke="var(--color-accent)"
            strokeWidth={1}
            fill="none"
          />
          {yearData.map((d) => (
            <circle
              key={d.year}
              cx={xScale(d.year) ?? 0}
              cy={yScale(d.count)}
              r={hoveredYear === d.year ? 8 : 5}
              fill="var(--color-accent)"
              style={{ cursor: "default" }}
              onMouseEnter={() => setHoveredYear(d.year)}
              onMouseLeave={() => setHoveredYear(null)}
            />
          ))}
          {hoveredPoint && (
            <text
              x={xScale(hoveredPoint.year) ?? 0}
              y={yScale(hoveredPoint.count) - 12}
              textAnchor="middle"
              fontSize={10}
              fontFamily="var(--font-body)"
              fill="var(--color-accent)"
            >
              {hoveredPoint.year}: {hoveredPoint.count}
            </text>
          )}
          {yearData.map((d) => (
            <text
              key={`x-${d.year}`}
              x={xScale(d.year) ?? 0}
              y={LINE_IH + 20}
              textAnchor="middle"
              fontSize={10}
              fontFamily="var(--font-body)"
              fill="var(--color-text-muted)"
            >
              {d.year}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}

// ─── RolesList ────────────────────────────────────────────────────────────────

function RolesList({ roles }: { roles: [string, number][] }) {
  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_ROLES}
      </p>
      <div className="mt-3">
        {roles.map(([role, count]) => (
          <div
            key={role}
            className="flex items-center justify-between border-b py-[6px]"
            style={roleRowStyle}
          >
            <span className="font-body font-normal text-[12px] text-text-primary">
              {role}
            </span>
            <span className="font-display font-bold text-[20px] text-accent">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TagBars ──────────────────────────────────────────────────────────────────

type TagBarsProps = {
  topTags: [string, number][];
  maxCount: number;
  isExpanded: boolean;
};

function TagBars({ topTags, maxCount, isExpanded }: TagBarsProps) {
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!isExpanded) return;
    let isMounted = true;
    let ctx: { revert(): void } | null = null;
    const timer = setTimeout(async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      ctx = gsap.context(() => {
        barRefs.current.forEach((bar, i) => {
          if (!bar) return;
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: bar.dataset.targetWidth ?? "0%",
              duration: 0.6,
              delay: i * 0.08,
              ease: "power2.out",
            }
          );
        });
      });
    }, 350);
    return () => {
      clearTimeout(timer);
      isMounted = false;
      ctx?.revert();
    };
  }, [isExpanded]);

  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_SOLUTION_TYPES}
      </p>
      <div className="flex flex-col gap-2 mt-3">
        {topTags.map(([tag, count], i) => {
          const widthPct = `${(count / maxCount) * 100}%`;
          return (
            <div key={tag} className="flex items-center gap-3">
              <span
                className="font-body font-normal text-[12px] text-text-primary shrink-0 truncate"
                style={{ width: 120 }}
              >
                {tag}
              </span>
              <div className="flex-1 relative" style={{ height: 8 }}>
                <div className="absolute inset-0 bg-border" />
                <div
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  data-target-width={widthPct}
                  className="absolute top-0 left-0 h-full bg-accent"
                  style={{ width: "0%" }}
                />
              </div>
              <span
                className="font-body font-medium text-[12px] text-accent shrink-0 text-right"
                style={countColStyle}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TechStack ────────────────────────────────────────────────────────────────

type TechStackProps = {
  stack: {
    frameworks: [string, number][];
    languages: [string, number][];
    platforms: [string, number][];
  };
};

const STACK_GROUPS = [
  { key: "frameworks" as const, label: LABEL_FRAMEWORKS },
  { key: "languages" as const, label: LABEL_LANGUAGES },
  { key: "platforms" as const, label: LABEL_PLATFORMS },
];

function TechStack({ stack }: TechStackProps) {
  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_TECH_STACK}
      </p>
      <div className="flex gap-4 mt-3">
        {STACK_GROUPS.map(({ key, label }) => (
          <div key={key} className="flex-1 min-w-0">
            <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em] mb-2">
              {label}
            </p>
            <div className="flex flex-col gap-1">
              {stack[key].map(([item, count]) => {
                const itemColor =
                  count >= 2 ? "var(--color-accent)" : "var(--color-text-muted)";
                return (
                  <span
                    key={item}
                    className="font-body font-medium text-[11px] bg-surface-highest px-[10px] py-1 block truncate"
                    style={{ color: itemColor }}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── AvgMVPStat ───────────────────────────────────────────────────────────────

function AvgMVPStat({ avgMVP }: { avgMVP: number | null }) {
  const displayValue =
    avgMVP === null
      ? "—"
      : Number.isInteger(avgMVP)
        ? String(avgMVP)
        : avgMVP.toFixed(1);

  return (
    <div>
      <p className="font-body font-medium text-[10px] text-text-muted uppercase tracking-[0.1em]">
        {LABEL_AVG_MVP}
      </p>
      <div className="mt-3">
        <span
          className="font-display font-bold text-accent block"
          style={avgValueStyle}
        >
          {displayValue}
        </span>
        <span className="font-body font-normal text-[14px] text-text-muted block mt-1">
          {LABEL_MONTHS_TO_MVP}
        </span>
        <p
          className="font-body font-normal text-[11px] mt-2"
          style={{ color: "var(--color-surface-highest)" }}
        >
          {LABEL_MVP_SUB}
        </p>
      </div>
    </div>
  );
}
