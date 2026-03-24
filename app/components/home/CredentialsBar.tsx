// CredentialsBar.tsx
// Identity + credentials strip — sits directly below Hero.
// Five panels: identity title | 3 stat columns | current status.

import { useEffect } from "react";
import { scrollReveal } from "~/lib/motion";

// Copy
const IDENTITY_LINE_1 = "Leader";
const IDENTITY_LINE_2 = "Mentor";
const IDENTITY_LINE_3 = "Builder";
const STAT_1_NUM = "10";
const STAT_1_LABEL = "YEARS IN TECH";
const STAT_2_NUM = "14";
const STAT_2_LABEL = "YEARS IN US DEPT. OF DEFENSE";
const STAT_3_NUM = "9";
const STAT_3_LABEL = "INDUSTRIES";
const STAT_4_NUM = "6";
const STAT_4_LABEL = "COUNTRIES";
const STAT_5_NUM = "5+";
const STAT_5_LABEL = "ORGANISATION TYPES";
const STAT_6_NUM = "20+";
const STAT_6_LABEL = "PRODUCTS";
const STATUS_LABEL = "CURRENT_STATUS";
const STATUS_BODY_1_A = "Leading a national practice integrating design, data, technology & AI to build exceptional ";
const STATUS_BODY_1_HL1 = "human experiences";
const STATUS_BODY_1_B = " and drive ";
const STATUS_BODY_1_HL2 = "business value";
const STATUS_BODY_1_C = ".";
const STATUS_BODY_2 =
  "Available for senior technology and product leadership roles.";

function TerminalIcon() {
  return (
    <svg
      width="42"
      height="30"
      viewBox="0 0 42 30"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.5"
        y="0.5"
        width="41"
        height="29"
        stroke="#FFB77D"
        strokeOpacity="0.35"
      />
      <text
        x="8"
        y="21"
        fontFamily="monospace"
        fontSize="13"
        fill="#FFB77D"
        fillOpacity="0.85"
      >
        &gt;_
      </text>
    </svg>
  );
}

export function CredentialsBar() {
  useEffect(() => {
    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      scrollReveal(gsap, ScrollTrigger, "[data-anim='cred-col']", {
        stagger: 0.1,
      });

      gsap.fromTo(
        "[data-anim='identity-line']",
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "back.out(1.8)",
          stagger: 0.13,
          scrollTrigger: {
            trigger: "[data-anim='identity-line']",
            start: "top 85%",
            once: true,
          },
        },
      );
    };
    init();
  }, []);

  const statNumStyle = {
    fontSize: "clamp(44px, 4.5vw, 64px)",
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    lineHeight: 1,
    background: "linear-gradient(135deg, #FFB77D 0%, #D97707 50%)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  };

  return (
    <section className="pt-15 pb-5">
      <div className="flex flex-col md:flex-row mx-16">
        {/* ── Col 1 — Identity ── */}
        <div
          data-anim="cred-col"
          className="bg-surface flex flex-col justify-between p-card md:w-[15%] flex-none min-h-65"
        >
          <TerminalIcon />
          <h2
            className="font-display font-bold text-text-primary leading-[1.15] mt-10"
            style={{ fontSize: "clamp(24px, 2.2vw, 34px)" }}
          >
            <span data-anim="identity-line" className="block">
              {IDENTITY_LINE_1}
            </span>
            <span data-anim="identity-line" className="block">
              {IDENTITY_LINE_2}
            </span>
            <span data-anim="identity-line" className="block">
              {IDENTITY_LINE_3}
            </span>
          </h2>
        </div>

        {/* ── Cols 2–7 — Stats band ── */}
        <div className="flex flex-col md:flex-row flex-1">
          {/* Stat 1 — step 1 */}
          <div
            data-anim="cred-col"
            className="bg-hover-surface flex-1 px-5 pb-8 flex flex-col justify-start gap-3 border-b md:border-b-0 md:border-r border-border"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_1_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_1_LABEL}
            </span>
          </div>

          {/* Stat 2 — step 1 */}
          <div
            data-anim="cred-col"
            className="bg-hover-surface flex-1 px-5 pb-8 flex flex-col justify-start gap-3 border-b md:border-b-0 md:border-r border-border"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_2_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_2_LABEL}
            </span>
          </div>

          {/* Stat 3 — step 2 */}
          <div
            data-anim="cred-col"
            className="bg-surface-high flex-1 px-5 pb-8 flex flex-col justify-start gap-3 border-b md:border-b-0 md:border-r border-border"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_3_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_3_LABEL}
            </span>
          </div>

          {/* Stat 4 — step 2 */}
          <div
            data-anim="cred-col"
            className="bg-surface-high flex-1 px-5 pb-8 flex flex-col justify-start gap-3 border-b md:border-b-0 md:border-r border-border"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_4_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_4_LABEL}
            </span>
          </div>

          {/* Stat 5 — step 3 */}
          <div
            data-anim="cred-col"
            className="bg-surface-highest flex-1 px-5 pb-8 flex flex-col justify-start gap-3 border-b md:border-b-0 md:border-r border-border"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_5_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_5_LABEL}
            </span>
          </div>

          {/* Stat 6 — step 3 */}
          <div
            data-anim="cred-col"
            className="bg-surface-highest flex-1 px-5 pb-8 flex flex-col justify-start gap-3"
            style={{ paddingTop: "80px" }}
          >
            <span style={statNumStyle}>{STAT_6_NUM}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STAT_6_LABEL}
            </span>
          </div>
        </div>

        {/* ── Col 5 — Current status ── */}
        <div
          data-anim="cred-col"
          className="bg-surface-low flex flex-col justify-between p-card md:w-[20%] flex-none"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
              {STATUS_LABEL}
            </span>
            {/* Accent status indicator */}
            <span className="block w-2.5 h-2.5 bg-accent" aria-hidden="true" />
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <p className="font-body text-[15px] text-text-primary leading-[1.7]">
              {STATUS_BODY_1_A}
              <span className="text-accent-deep">{STATUS_BODY_1_HL1}</span>
              {STATUS_BODY_1_B}
              <span className="text-accent-deep">{STATUS_BODY_1_HL2}</span>
              {STATUS_BODY_1_C}
            </p>
            <p className="font-body text-[13px] text-text-muted leading-[1.6]">
              {STATUS_BODY_2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
