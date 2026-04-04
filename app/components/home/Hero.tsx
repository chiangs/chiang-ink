// Hero.tsx
// Homepage hero — split layout (desktop) / stacked layout (mobile)
// Portrait CSS treatment lives in app.css (.portrait, .portrait-mobile, etc.)

import { useEffect } from "react";
import { heroLoadSequence } from "~/lib/motion";
import { SITE_OWNER } from "~/lib/constants";

const gradientTextStyle = {
  fontSize: "clamp(72px, 11vw, 120px)",
  background: "var(--gradient-accent)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  paddingBottom: "0.1em",
};

const mobileGradientTextStyle = {
  fontSize: "clamp(48px, 11vw, 72px)",
  lineHeight: 1.0,
  background: "var(--gradient-accent)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
  paddingBottom: "0.1em",
};

// Desktop copy
const EYEBROW = "STEPHEN CHIANG // PORTFOLIO 2026";
const HEADLINE_1 = "Engineering";
const HEADLINE_2 = "design.";
const SUBHEAD = "Leading product delivery.";
const DESCRIPTOR = "DESIGN TECHNOLOGIST · PRODUCT LEAD · UX ENGINEER";
const SCROLL_CTA = "SCROLL TO EXPLORE";
const SCROLL_ARROW = "↓";
const PORTRAIT_SRC = "/images/portrait/stephen-chiang.webp";
const PORTRAIT_ALT = SITE_OWNER;
const CAPTION_REF = "REF_016 // PORTRAIT";
const CAPTION_ISO = "ISO 400 // 85MM";
const VERTICAL_TEXT = "STEPHEN CHIANG © 2026";

const DESCRIPTOR_MOB_1 = "DESIGN TECHNOLOGIST";
const DESCRIPTOR_MOB_2 = "PRODUCT LEAD";
const DESCRIPTOR_MOB_3 = "UX ENGINEER";
const SCROLL_LABEL_MOBILE = "SCROLL";

export function Hero() {
  useEffect(() => {
    let tl: { kill(): void } | null = null;
    let scrollTween: { kill(): void } | null = null;
    let isMounted = true;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!isMounted) return;
      gsap.registerPlugin(ScrollTrigger);
      tl = heroLoadSequence(gsap);

      // Fade the entire hero out as user scrolls away
      scrollTween = gsap.to("[data-anim='hero-section']", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-anim='hero-section']",
          start: "top top",
          end: "bottom 20%",
          scrub: true,
        },
      });
    };

    init();

    return () => {
      isMounted = false;
      tl?.kill();
      scrollTween?.kill();
    };
  }, []);

  return (
    <section
      data-anim="hero-section"
      className="relative border-b border-border md:h-screen md:overflow-hidden"
    >
      {/* ── DESKTOP: Portrait — positioning wrapper ── */}
      <div
        data-anim="portrait"
        className="hidden md:block absolute top-0 right-0 bottom-0 left-[40%] h-screen z-0"
      >
        <div className="portrait h-full relative">
          <img
            src={PORTRAIT_SRC}
            alt={PORTRAIT_ALT}
            style={{ objectPosition: "70% 15%" }}
          />
          <div className="portrait-fade" />
        </div>
      </div>

      {/* ── DESKTOP: Dark gradient — left readability ── */}
      <div
        className="hidden md:block absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--color-bg) 40%, rgba(19,19,19,0.7) 55%, rgba(19,19,19,0.15) 72%, transparent 88%)",
        }}
      />

      {/* ── DESKTOP: Text content ── */}
      <div className="hidden md:flex flex-col justify-between h-full w-[55%] py-section px-margin relative z-2">
        <p
          data-anim="eyebrow"
          className="font-body text-sm font-medium uppercase tracking-[0.15em] text-accent"
        >
          {EYEBROW}
        </p>

        <div>
          <h1 className="font-display leading-[0.88]">
            <span
              data-anim="headline-1"
              className="block font-light text-text-primary tracking-[0.02em]"
              style={{ fontSize: "clamp(72px, 11vw, 120px)" }}
            >
              {HEADLINE_1}
            </span>
            <span
              data-anim="headline-2"
              className="block font-bold tracking-[0.02em]"
              style={gradientTextStyle}
            >
              {HEADLINE_2}
            </span>
          </h1>
          <p
            data-anim="hero-sub"
            className="font-body text-xl font-normal text-text-muted mt-6"
          >
            {SUBHEAD}
          </p>
        </div>

        <div className="flex items-end justify-between gap-8">
          <p className="font-body text-sm font-medium uppercase tracking-[0.15em] text-text-muted w-full">
            {DESCRIPTOR}
          </p>
          <p className="font-body text-sm font-medium uppercase tracking-[0.15em] text-accent whitespace-nowrap flex items-center gap-1">
            {SCROLL_CTA} <span className="arrow-pulse">{SCROLL_ARROW}</span>
          </p>
        </div>
      </div>

      {/* ── DESKTOP: Technical caption — overlaid on portrait ── */}
      <div className="absolute hidden md:block z-3 bottom-20 right-6">
        <p
          className="font-body text-sm font-medium uppercase tracking-[0.15em] text-text-primary"
          style={{ opacity: 0.5 }}
        >
          {CAPTION_REF}
        </p>
        <p
          className="font-body text-sm font-medium uppercase tracking-[0.15em] text-text-primary mt-1"
          style={{ opacity: 0.5 }}
        >
          {CAPTION_ISO}
        </p>
      </div>

      {/* ── DESKTOP: Vertical text — right edge ── */}
      <div className="absolute hidden md:block z-3 font-body text-sm font-medium uppercase tracking-[0.2em] text-text-muted right-4 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap">
        {VERTICAL_TEXT}
      </div>

      {/* ── MOBILE: Stacked layout ── */}
      <div
        className="md:hidden flex flex-col"
        style={{ backgroundColor: "var(--color-bg-portrait)" }}
      >
        {/* Section 1: Text content */}
        <div className="bg-bg pt-25 px-margin-mob pb-6 relative z-[1]">
          <p
            data-anim="eyebrow"
            className="font-body text-sm font-medium uppercase tracking-[0.15em] text-accent mb-6"
          >
            {EYEBROW}
          </p>
          <h1 className="font-display leading-none">
            <span
              data-anim="headline-1"
              className="block font-light text-text-primary tracking-[0.02em] leading-none"
              style={{ fontSize: "clamp(48px, 11vw, 72px)" }}
            >
              {HEADLINE_1}
            </span>
            <span
              data-anim="headline-2"
              className="block font-bold tracking-[0.02em]"
              style={mobileGradientTextStyle}
            >
              {HEADLINE_2}
            </span>
          </h1>
          <p
            data-anim="hero-sub"
            className="font-body text-lg font-normal text-text-muted mt-5"
          >
            {SUBHEAD}
          </p>
          <div className="font-body text-sm font-medium uppercase tracking-[0.15em] text-text-muted flex flex-col gap-1 mt-6">
            <span>{DESCRIPTOR_MOB_1}</span>
            <span>{DESCRIPTOR_MOB_2}</span>
            <span>{DESCRIPTOR_MOB_3}</span>
          </div>
        </div>

        {/* Section 2: Portrait — full bleed, pulled up to overlap descriptor */}
        <div className="portrait-mobile -mt-12">
          <img src={PORTRAIT_SRC} alt={PORTRAIT_ALT} />
          <div className="portrait-grain-mobile" />
          <div className="portrait-top-fade-mobile" />
          <div className="portrait-bottom-fade-mobile" />
          <p className="scroll-label-mobile">{SCROLL_LABEL_MOBILE}</p>
          <p className="portrait-caption-mobile">
            {CAPTION_REF}
            <br />
            {CAPTION_ISO}
          </p>
        </div>
      </div>
    </section>
  );
}
