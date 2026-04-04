// about.tsx
// About Me page — personal and professional deep-dive
// Layout: sticky sidebar nav (24%) + scrollable content (76%) on desktop
// Mobile: horizontal pill nav sticky below main nav

import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "react-router";
import {
  SITE_OWNER,
  SITE_LOCATION,
  SITE_URL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "~/lib/constants";
import { storage } from "~/lib/storage";
import { ContactStrip } from "~/components/common";
import {
  Timeline,
  Industries,
  Skills,
  LanguageList,
  ImageGrid,
} from "~/components/about";
import {
  CareerIntensityChart,
  type CareerViewMode,
} from "~/components/common/Viz";

// ── Meta ─────────────────────────────────────────────────────────

const META_TITLE = "About — Stephen Chiang";
const META_DESC =
  "Senior technology and product leader at the intersection of design, engineering, and data. 20+ years. 9 industries. 6 countries. Based in Stavanger, Norway.";
const META_URL = `${SITE_URL}/about`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = "Stephen Chiang — Design Technologist & Technology Leader";

export const meta: MetaFunction = () => [
  { title: META_TITLE },
  { name: "description", content: META_DESC },
  { name: "author", content: "Stephen Chiang" },
  { name: "robots", content: "index, follow" },
  { tagName: "link", rel: "canonical", href: META_URL },
  { property: "og:type", content: "profile" },
  { property: "og:url", content: META_URL },
  { property: "og:title", content: META_TITLE },
  { property: "og:description", content: META_DESC },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: OG_IMAGE_ALT },
  { property: "og:site_name", content: "Stephen Chiang" },
  { property: "og:locale", content: "en_US" },
  { property: "profile:first_name", content: "Stephen" },
  { property: "profile:last_name", content: "Chiang" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: META_TITLE },
  { name: "twitter:description", content: META_DESC },
  { name: "twitter:image", content: OG_IMAGE },
  { name: "twitter:image:alt", content: OG_IMAGE_ALT },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Stephen Chiang",
      jobTitle: "Design Technologist / Product & Technology Leader",
      description:
        "Senior technology and product leader with 20+ years spanning frontend engineering, design systems, human-machine interfaces, and AI integration. Former US Army Special Operations officer — 10 years of leadership across high-stakes, multifunctional environments. Has delivered across 9 industries and 8 countries.",
      url: META_URL,
      sameAs: [LINKEDIN_URL, GITHUB_URL],
      nationality: "American",
      homeLocation: { "@type": "Place", name: "Stavanger, Norway" },
      workLocation: { "@type": "Place", name: "Stavanger, Norway" },
      alumniOf: {
        "@type": "Organization",
        name: "United States Army Special Operations Command",
      },
      hasOccupation: {
        "@type": "Occupation",
        name: "Design Technologist",
        description:
          "Integrates design, data, and technology as a single practice — leading teams, shaping product strategy, and building enterprise software across global engagements.",
      },
    },
  },
];

// ── Constants ─────────────────────────────────────────────────────

const OWNER_NAME = SITE_OWNER;
const OWNER_LOCATION = SITE_LOCATION;
const CAREER_VIEW_KEY = "sc-career-view";

const SECTIONS = [
  { id: "bio", label: "BIO" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "industries", label: "INDUSTRIES" },
  { id: "skills", label: "SKILLS" },
  { id: "languages", label: "LANGUAGES" },
  { id: "images", label: "IMAGES" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// ── Copy ──────────────────────────────────────────────────────────

const PAGE_LABEL = "ABOUT";
const HEADLINE_1 = "Stephen";
const HEADLINE_2 = "Chiang.";

const BIO_STATS = [
  { num: "20+", label: "Projects delivered" },
  { num: "9", label: "Industries" },
  { num: "8", label: "Countries" },
  { num: "20+", label: "Years experience" },
] as const;

const BIO_P1_PRE =
  "I'm a senior technology and product leader operating at the intersection of design, engineering, and business strategy. Currently, I lead a national practice at a global design agency — building the capability that brings design, data, and technology together as a ";
const BIO_P1_HL = "single integrated discipline";
const BIO_P1_POST = ", not three separate teams talking past each other.";
const BIO_P2 =
  "My background spans the full product development stack: frontend engineering, design systems, human-machine interfaces, AI and ML integration, enterprise software, and data platforms. I've held the titles of Tech Lead, Product Owner, Scrum Master, and Design Technologist — not because I couldn't specialise, but because the problems I'm hired to solve don't respect those boundaries.";
const BIO_P3_PRE =
  "What differentiates my practice is the layer that sits around the craft. I bring 10+ years of US Army / Special Operations leadership into every engagement — the systems thinking, the deliberate process, the ability to lead multifunctional teams through ambiguity and deliver under pressure. That discipline ";
const BIO_P3_HL = "doesn't show up on a Figma file";
const BIO_P3_POST =
  ". It shows up in how I structure a programme, how I align stakeholders, and how I make consequential technology decisions when the stakes are high.";
const BIO_P4 =
  "I've worked across the USA, Denmark, Norway, Laos, Sri Lanka, the Maldives, Iraq, and Korea — for enterprises, agencies, and governments. I don't fill roles. I raise the ceiling of what those roles can deliver.";
const BIO_P5 = "Based in Stavanger, Norway. Operating globally.";

const EXP_LABEL = "EXPERIENCE";
const EXP_TITLE = "Career Timeline";
const IND_LABEL = "INDUSTRIES & SECTORS";
const IND_TITLE = "Where I've Delivered";
const SKILLS_LABEL = "SOLUTION TYPES";
const SKILLS_TITLE = "What I Build";
const LANG_LABEL = "LANGUAGES";
const LANG_TITLE = "How I Communicate";
const IMG_LABEL = "BEYOND THE BRIEF";
const IMG_TITLE = "The Full Picture";

const PORTRAIT_SRC = "/images/portrait/stephen-chiang-color.webp";
const PORTRAIT_ALT = SITE_OWNER;

// ── Module-level style objects ────────────────────────────────────

const mobileNavStyle: React.CSSProperties = {
  bottom: 0,
  overflowX: "auto",
  scrollbarWidth: "none",
  paddingBottom: "env(safe-area-inset-bottom)",
};

const pillButtonStaticStyle = { letterSpacing: "0.12em" } as const;

const sidebarStyle: React.CSSProperties = {
  width: "24%",
  position: "sticky",
  top: "120px",
  alignSelf: "flex-start",
  height: "calc(100vh - 160px)",
  paddingRight: "48px",
  paddingTop: "120px",
  paddingBottom: "40px",
};

const navButtonStaticStyle = { letterSpacing: "0.15em" } as const;

const portraitDropShadowStyle: React.CSSProperties = {
  filter:
    "drop-shadow(0 1px 2px rgba(0,0,0,1)) drop-shadow(0 2px 4px rgba(0,0,0,0.9)) drop-shadow(0 3px 6px rgba(0,0,0,0.8)) drop-shadow(0 4px 8px rgba(0,0,0,0.6)) drop-shadow(0 5px 10px rgba(0,0,0,0.4))",
};

const portraitDropShadowMobStyle: React.CSSProperties = {
  filter:
    "drop-shadow(0 1px 2px rgba(0,0,0,1)) drop-shadow(0 2px 3px rgba(0,0,0,0.8)) drop-shadow(0 3px 5px rgba(0,0,0,0.5))",
};

const portraitCircleImgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center 30%",
  display: "block",
};

const portraitGrainStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  opacity: 0.03,
  pointerEvents: "none",
};

const iconBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  lineHeight: 0,
  transition: "opacity 0.2s ease",
};

// ── Toggle icons ──────────────────────────────────────────────────
// Horizontal icon: three stacked bars of decreasing width
// Vertical icon: four columns of increasing height

function IconHorizontal({
  active,
  hovered,
}: {
  active: boolean;
  hovered: boolean;
}) {
  const c = active ? "#FFB77D" : hovered ? "#FFB77D" : "#737371";
  const t = "fill 0.2s ease";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="4"
        width="16"
        height="3"
        style={{ fill: c, opacity: active ? 0.9 : 0.5, transition: t }}
      />
      <rect
        x="2"
        y="9"
        width="11"
        height="3"
        style={{ fill: c, opacity: active ? 0.65 : 0.35, transition: t }}
      />
      <rect
        x="2"
        y="14"
        width="7"
        height="3"
        style={{ fill: c, opacity: active ? 0.35 : 0.2, transition: t }}
      />
    </svg>
  );
}

function IconVertical({
  active,
  hovered,
}: {
  active: boolean;
  hovered: boolean;
}) {
  const c = active ? "#FFB77D" : hovered ? "#FFB77D" : "#737371";
  const t = "fill 0.2s ease";
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="4"
        width="3"
        height="13"
        style={{ fill: c, opacity: active ? 0.9 : 0.5, transition: t }}
      />
      <rect
        x="7"
        y="7"
        width="3"
        height="10"
        style={{ fill: c, opacity: active ? 0.65 : 0.35, transition: t }}
      />
      <rect
        x="12"
        y="10"
        width="3"
        height="7"
        style={{ fill: c, opacity: active ? 0.5 : 0.25, transition: t }}
      />
      <rect
        x="17"
        y="12"
        width="3"
        height="5"
        style={{ fill: c, opacity: active ? 0.35 : 0.2, transition: t }}
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────

export default function About() {
  const [activeSection, setActiveSection] = useState<SectionId>("bio");

  // Career chart view state — persisted in localStorage via ~/lib/storage
  const [careerView, setCareerView] = useState<CareerViewMode>("vertical");
  const [careerAnimKey, setCareerAnimKey] = useState(0);
  const [careerVisible, setCareerVisible] = useState(false);
  const [careerTransitioning, setCareerTransitioning] = useState(false);
  const [hoveredToggle, setHoveredToggle] = useState<CareerViewMode | null>(
    null,
  );
  const chartRef = useRef<HTMLDivElement>(null);

  // Load persisted view preference after mount (SSR-safe)
  useEffect(() => {
    const saved = storage.get(CAREER_VIEW_KEY);
    if (saved === "horizontal") setCareerView("horizontal");
  }, []);

  // Scroll active pill into view on mobile
  useEffect(() => {
    const btn = document.querySelector<HTMLElement>(
      `[data-pill="${activeSection}"]`,
    );
    btn?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeSection]);

  // Scroll spy
  useEffect(() => {
    let rafId: number;
    const update = () => {
      const threshold = window.innerHeight * 0.4;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          setActiveSection(SECTIONS[i].id);
          return;
        }
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP animations — page-level
  useEffect(() => {
    let isMounted = true;
    const tweens: { kill(): void }[] = [];

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (!isMounted) return;
      gsap.registerPlugin(ScrollTrigger);

      // Page headline stagger
      const headlineTl = gsap.timeline();
      headlineTl
        .fromTo(
          "[data-anim='about-label']",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0,
        )
        .fromTo(
          "[data-anim='about-h1']",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
          0.15,
        )
        .fromTo(
          "[data-anim='about-h2']",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.35,
        )
        .fromTo(
          "[data-anim='bio-stat']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 },
          0.65,
        );
      tweens.push(headlineTl);

      // Bio text
      tweens.push(
        gsap.fromTo(
          "[data-anim='bio-text']",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "[data-anim='bio-text']",
              start: "top 85%",
              once: true,
            },
          },
        ),
      );

      // Section content fade-ins
      // Note: CareerIntensityChart is outside [data-anim='section-content'] —
      // it manages its own ScrollTrigger via chartRef below.
      (
        ["experience", "industries", "skills", "languages", "images"] as const
      ).forEach((id) => {
        tweens.push(
          gsap.fromTo(
            `#${id} [data-anim='section-content']`,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: `#${id}`,
                start: "top 80%",
                once: true,
              },
            },
          ),
        );
      });

      // Timeline entries stagger
      tweens.push(
        gsap.fromTo(
          "[data-anim='timeline-entry']",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.18,
            scrollTrigger: {
              trigger: "#experience",
              start: "top 75%",
              once: true,
            },
          },
        ),
      );

      // Language rows stagger
      tweens.push(
        gsap.fromTo(
          "[data-anim='language-row']",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: "#languages",
              start: "top 80%",
              once: true,
            },
          },
        ),
      );

      // Portrait B&W → colour on scroll
      const toColor = () =>
        gsap.to(".portrait-circle-img", {
          filter: "grayscale(0)",
          duration: 1.8,
          ease: "power2.inOut",
        });
      const toBw = () =>
        gsap.to(".portrait-circle-img", {
          filter: "grayscale(1)",
          duration: 0.6,
          ease: "power2.in",
        });
      tweens.push(
        ScrollTrigger.create({
          trigger: "#bio",
          start: "top 80%",
          end: "top top",
          onEnter: toColor,
          onLeave: toBw,
          onEnterBack: toColor,
          onLeaveBack: toBw,
        }) as unknown as { kill(): void },
      );

      // Career chart ScrollTrigger — fires animation when chart enters viewport
      if (chartRef.current) {
        tweens.push(
          ScrollTrigger.create({
            trigger: chartRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              if (!isMounted) return;
              setCareerVisible(true);
              setCareerAnimKey((k) => k + 1);
            },
          }) as unknown as { kill(): void },
        );
      }
    };

    init();
    return () => {
      isMounted = false;
      tweens.forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, offset), behavior: "smooth" });
  };

  const handleCareerViewToggle = (next: CareerViewMode) => {
    if (next === careerView || careerTransitioning) return;
    setCareerTransitioning(true);
    setTimeout(() => {
      setCareerView(next);
      storage.set(CAREER_VIEW_KEY, next);
      setCareerAnimKey((k) => k + 1);
      setCareerTransitioning(false);
    }, 200);
  };

  return (
    <>
      {/* ── Mobile pill nav ── */}
      <nav
        className="md:hidden fixed z-90 left-0 right-0 bg-bg border-t border-border"
        style={mobileNavStyle}
      >
        <div
          className="flex gap-2 px-4 py-3"
          style={{ minWidth: "max-content" }}
        >
          {SECTIONS.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                data-pill={id}
                onClick={() => scrollToSection(id)}
                className="shrink-0 font-body text-sm font-medium uppercase border-0 cursor-pointer transition-colors duration-200 px-3.5 py-1.5"
                style={{
                  ...pillButtonStaticStyle,
                  background: isActive
                    ? "var(--color-accent)"
                    : "var(--color-surface)",
                  color: isActive
                    ? "var(--color-invert-text)"
                    : "var(--color-text-muted)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="max-w-container mx-auto px-margin-mob md:px-margin pb-20 md:pb-0">
        <div className="flex items-start">
          {/* ── Desktop sidebar ── */}
          <aside
            className="hidden md:flex flex-col flex-none"
            style={sidebarStyle}
          >
            <div>
              <p className="font-display font-bold text-base text-text-primary">
                {OWNER_NAME}
              </p>
              <p className="font-body text-sm text-text-muted mt-1">
                {OWNER_LOCATION}
              </p>
              <nav className="mt-10 flex flex-col gap-4">
                {SECTIONS.map(({ id, label }) => {
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={`text-left font-body text-sm font-medium uppercase bg-transparent border-0 cursor-pointer pl-3 transition-[color,border-color] duration-200 ${isActive ? "text-accent" : "text-text-muted hover:text-accent-deep"}`}
                      style={{
                        ...navButtonStaticStyle,
                        borderLeft: isActive
                          ? "4px solid var(--color-accent)"
                          : "4px solid transparent",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Scrollable content ── */}
          <div className="w-full md:w-[76%] pt-section-mob md:pt-section pb-0">
            {/* ── BIO ── */}
            <section id="bio">
              <p
                data-anim="about-label"
                className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3"
              >
                {PAGE_LABEL}
              </p>

              <div className="flex items-center gap-12 mb-16">
                <div className="min-w-0">
                  <h1 className="font-display leading-[0.9]">
                    <span
                      data-anim="about-h1"
                      className="block font-light text-text-primary"
                      style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
                    >
                      {HEADLINE_1}
                    </span>
                    <span
                      data-anim="about-h2"
                      className="block font-bold text-accent"
                      style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
                    >
                      {HEADLINE_2}
                    </span>
                  </h1>
                </div>
                <div
                  className="shrink-0 hidden md:block"
                  style={portraitDropShadowStyle}
                >
                  <div
                    className="portrait-circle-wrap relative overflow-hidden w-14 h-14 md:w-52.75 md:h-52.75"
                    style={{ clipPath: "circle(50%)" }}
                  >
                    <img
                      src={PORTRAIT_SRC}
                      alt={PORTRAIT_ALT}
                      className="portrait-circle-img"
                      style={portraitCircleImgStyle}
                    />
                    <svg style={portraitGrainStyle} aria-hidden="true">
                      <filter id="portrait-grain">
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.65"
                          numOctaves="3"
                          stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                      </filter>
                      <rect
                        width="100%"
                        height="100%"
                        filter="url(#portrait-grain)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                {BIO_STATS.map((stat) => (
                  <div key={stat.label} data-anim="bio-stat">
                    <p className="font-display font-bold text-accent text-[40px] leading-none">
                      {stat.num}
                    </p>
                    <p className="font-body text-sm text-text-muted mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="md:hidden mb-6 flex justify-center"
                style={portraitDropShadowMobStyle}
              >
                <div
                  className="portrait-circle-wrap relative overflow-hidden w-24 h-24"
                  style={{ clipPath: "circle(50%)" }}
                >
                  <img
                    src={PORTRAIT_SRC}
                    alt={PORTRAIT_ALT}
                    className="portrait-circle-img"
                    style={portraitCircleImgStyle}
                  />
                  <svg style={portraitGrainStyle} aria-hidden="true">
                    <filter id="portrait-grain-mob">
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                      />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect
                      width="100%"
                      height="100%"
                      filter="url(#portrait-grain-mob)"
                    />
                  </svg>
                </div>
              </div>

              <div data-anim="bio-text" className="max-w-170">
                <p className="font-body text-lg text-text-primary leading-[1.8]">
                  {BIO_P1_PRE}
                  <span className="text-accent-deep">{BIO_P1_HL}</span>
                  {BIO_P1_POST}
                </p>
                <p className="font-body text-lg text-text-primary mt-7 leading-[1.8]">
                  {BIO_P2}
                </p>
                <p className="font-body text-lg text-text-primary mt-7 leading-[1.8]">
                  {BIO_P3_PRE}
                  <span className="text-accent-deep">{BIO_P3_HL}</span>
                  {BIO_P3_POST}
                </p>
                <p className="font-body text-lg text-text-primary mt-7 leading-[1.8]">
                  {BIO_P4}
                </p>
                <p className="font-body text-lg text-text-primary mt-7 leading-[1.8]">
                  {BIO_P5}
                </p>
              </div>
            </section>

            {/* ── EXPERIENCE ── */}
            <section id="experience" className="mt-16 md:mt-32">
              {/* Section header row: label + title + view toggle */}
              <div className="flex items-start justify-between mb-15">
                <div>
                  <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3">
                    {EXP_LABEL}
                  </p>
                  <h2 className="font-display font-bold text-[32px] text-text-primary leading-[1.1]">
                    {EXP_TITLE}
                  </h2>
                </div>

                {/* View toggle — icon buttons, desktop only */}
                <div className="hidden md:flex items-center gap-1 pt-1">
                  <button
                    onClick={() => handleCareerViewToggle("vertical")}
                    onMouseEnter={() => setHoveredToggle("vertical")}
                    onMouseLeave={() => setHoveredToggle(null)}
                    style={{
                      ...iconBtnStyle,
                      opacity: careerView === "vertical" ? 1 : 0.45,
                    }}
                    aria-label="Vertical chart view"
                    aria-pressed={careerView === "vertical"}
                    title="Vertical view"
                  >
                    <IconVertical
                      active={careerView === "vertical"}
                      hovered={hoveredToggle === "vertical"}
                    />
                  </button>
                  <button
                    onClick={() => handleCareerViewToggle("horizontal")}
                    onMouseEnter={() => setHoveredToggle("horizontal")}
                    onMouseLeave={() => setHoveredToggle(null)}
                    style={{
                      ...iconBtnStyle,
                      opacity: careerView === "horizontal" ? 1 : 0.45,
                    }}
                    aria-label="Horizontal chart view"
                    aria-pressed={careerView === "horizontal"}
                    title="Horizontal view"
                  >
                    <IconHorizontal
                      active={careerView === "horizontal"}
                      hovered={hoveredToggle === "horizontal"}
                    />
                  </button>
                </div>
              </div>

              {/*
               * Two-column layout for vertical view (desktop):
               *   Left  — Timeline entries
               *   Right — CareerIntensityChart (sticky)
               *
               * Single column for horizontal view:
               *   CareerIntensityChart full width above Timeline
               *
               * CareerIntensityChart sits outside [data-anim='section-content']
               * and manages its own animation via ScrollTrigger on chartRef.
               */}
              {careerView === "vertical" ? (
                <div
                  className="hidden md:grid gap-x-12"
                  style={{ gridTemplateColumns: "1fr 200px" }}
                >
                  {/* Left: timeline */}
                  <div data-anim="section-content">
                    <Timeline />
                  </div>
                  {/* Right: capability chart — sticky so it stays in view while scrolling timeline */}
                  <div
                    ref={chartRef}
                    style={{
                      position: "sticky",
                      top: "120px",
                      alignSelf: "flex-start",
                      opacity: careerVisible && !careerTransitioning ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <p
                      className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-4"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      Capability
                    </p>
                    <CareerIntensityChart
                      viewMode="vertical"
                      animKey={careerAnimKey}
                    />
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  {/* Horizontal: chart full width above timeline */}
                  <div
                    ref={chartRef}
                    className="mb-12"
                    style={{
                      opacity: careerVisible && !careerTransitioning ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    <CareerIntensityChart
                      viewMode="horizontal"
                      animKey={careerAnimKey}
                    />
                  </div>
                  <div data-anim="section-content">
                    <Timeline
                      layout={
                        careerView === "horizontal" ? "horizontal" : "vertical"
                      }
                    />
                  </div>
                </div>
              )}

              {/* Mobile: always shows horizontal chart above timeline, no toggle */}
              <div className="md:hidden">
                <div
                  ref={careerView === "vertical" ? undefined : undefined}
                  className="mb-12"
                  style={{
                    opacity: careerVisible && !careerTransitioning ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <CareerIntensityChart
                    viewMode="horizontal"
                    animKey={careerAnimKey}
                    compact
                  />
                </div>
                <div data-anim="section-content">
                  <Timeline />
                </div>
              </div>
            </section>

            {/* ── INDUSTRIES ── */}
            <section id="industries" className="mt-16 md:mt-32">
              <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3">
                {IND_LABEL}
              </p>
              <h2 className="font-display font-bold text-[32px] text-text-primary mb-15 leading-[1.1]">
                {IND_TITLE}
              </h2>
              <div data-anim="section-content">
                <Industries />
              </div>
            </section>

            {/* ── SKILLS ── */}
            <section id="skills" className="mt-16 md:mt-32">
              <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3">
                {SKILLS_LABEL}
              </p>
              <h2 className="font-display font-bold text-[32px] text-text-primary mb-15 leading-[1.1]">
                {SKILLS_TITLE}
              </h2>
              <div data-anim="section-content">
                <Skills />
              </div>
            </section>

            {/* ── LANGUAGES ── */}
            <section id="languages" className="mt-16 md:mt-32">
              <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3">
                {LANG_LABEL}
              </p>
              <h2 className="font-display font-bold text-[32px] text-text-primary mb-15 leading-[1.1]">
                {LANG_TITLE}
              </h2>
              <div data-anim="section-content">
                <LanguageList />
              </div>
            </section>

            {/* ── IMAGES ── */}
            <section
              id="images"
              className="mt-16 md:mt-32 pb-section-mob md:pb-section"
            >
              <p className="font-body font-medium text-sm uppercase tracking-[0.15em] text-accent block mb-3">
                {IMG_LABEL}
              </p>
              <h2 className="font-display font-bold text-[32px] text-text-primary mb-15 leading-[1.1]">
                {IMG_TITLE}
              </h2>
              <div data-anim="section-content">
                <ImageGrid />
              </div>
            </section>
          </div>
        </div>
      </div>

      <ContactStrip />
    </>
  );
}
