import { useEffect, useRef, useState } from "react";
import type { ProjectMetric } from "~/types/content";

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Splits a value string into its numeric portion and trailing suffix.
// "100+" → { num: 100, suffix: "+" }
// "5"    → { num: 5,   suffix: "" }
// "AI-ready" → null (non-numeric)
function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
}

// ─── Style constants ──────────────────────────────────────────────────────────

const valueStyle = { fontSize: "clamp(28px, 3.5vw, 48px)", lineHeight: 1.1 };
const labelStyle = { fontSize: "11px" };

// ─── MetricCell ───────────────────────────────────────────────────────────────

function MetricCell({
  metric,
  triggered,
  index,
}: {
  metric: ProjectMetric;
  triggered: boolean;
  index: number;
}) {
  const parsed = parseNumeric(metric.value);
  // Default: count if parseable, fade if not
  const mode = metric.animate ?? (parsed ? "count" : "fade");

  const [displayValue, setDisplayValue] = useState(
    mode === "count" && parsed ? `0${parsed.suffix}` : metric.value,
  );
  const valueRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<{ kill(): void } | null>(null);

  useEffect(() => {
    if (!triggered) return;
    let isMounted = true;
    const delay = index * 0.1;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;

      if (mode === "count" && parsed) {
        const counter = { value: 0 };
        tweenRef.current = gsap.to(counter, {
          value: parsed.num,
          duration: 1.4,
          delay,
          ease: "power2.out",
          onUpdate() {
            if (!isMounted) return;
            const rounded = Number.isInteger(parsed.num)
              ? Math.round(counter.value)
              : counter.value.toFixed(1);
            setDisplayValue(`${rounded}${parsed.suffix}`);
          },
          onComplete() {
            if (!isMounted) return;
            setDisplayValue(metric.value);
          },
        });
      } else {
        // Fade mode — animate the value element opacity
        if (!valueRef.current) return;
        tweenRef.current = gsap.fromTo(
          valueRef.current,
          { opacity: 0, y: 6 },
          { opacity: 1, y: 0, duration: 0.7, delay, ease: "power2.out" },
        );
      }
    };

    run();
    return () => {
      isMounted = false;
      tweenRef.current?.kill();
    };
  }, [triggered]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div
        ref={valueRef}
        className="font-display font-bold text-accent"
        style={valueStyle}
      >
        {displayValue}
      </div>
      <div
        className="font-body text-text-muted mt-1.5 uppercase tracking-[0.12em]"
        style={labelStyle}
      >
        {metric.label}
      </div>
    </div>
  );
}

// ─── MetricsStrip ─────────────────────────────────────────────────────────────
// Renders only when metrics array is non-empty.
// Triggers animations when the strip scrolls into view.

export function MetricsStrip({ metrics }: { metrics: ProjectMetric[] }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!stripRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, []);

  const colCount = Math.min(metrics.length, 5);
  const desktopGridStyle = {
    gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
  };

  return (
    <div ref={stripRef} className="bg-surface border-t border-b border-border">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin py-10 md:py-12">
        {/* Mobile: 2-col grid */}
        <div className="grid grid-cols-2 gap-8 md:hidden">
          {metrics.map((m, i) => (
            <MetricCell key={m.label} metric={m} triggered={triggered} index={i} />
          ))}
        </div>

        {/* Desktop: dynamic columns separated by tonal dividers */}
        <div
          className="hidden md:grid divide-x divide-border"
          style={desktopGridStyle}
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="px-8 first:pl-0 last:pr-0">
              <MetricCell metric={m} triggered={triggered} index={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
