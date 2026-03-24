// StyleGuideDrawer.tsx
// Triggered by clicking SC monogram when already on homepage
// Slides in from right, reveals the full design system
// On first open: persists a footer link via localStorage

import { useEffect, useRef, useState } from "react";
import { STYLEGUIDE_UNLOCK_KEY } from "~/lib/constants";

interface StyleGuideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onFirstUnlock: () => void;
}

export function StyleGuideDrawer({
  isOpen,
  onClose,
  onFirstUnlock,
}: StyleGuideDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isFirstTime, setIsFirstTime] = useState(false);

  // Check if first time and trigger unlock
  useEffect(() => {
    if (isOpen) {
      const alreadyUnlocked = localStorage.getItem(STYLEGUIDE_UNLOCK_KEY);
      if (!alreadyUnlocked) {
        setIsFirstTime(true);
        localStorage.setItem(STYLEGUIDE_UNLOCK_KEY, "true");
        onFirstUnlock();
      }
    }
  }, [isOpen, onFirstUnlock]);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      setTimeout(
        () => document.addEventListener("mousedown", handleClick),
        100,
      );
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(12,12,12,0.8)",
          zIndex: 998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(600px, 92vw)",
          background: "#0f0f0f",
          borderLeft: "1px solid #f5a020",
          zIndex: 999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          overflowY: "auto",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "none",
            border: "none",
            color: "#5a5a58",
            fontSize: "11px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "4px 8px",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a020")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5a5a58")}
        >
          ESC ✕
        </button>

        {/* Unlock message — first time only */}
        {isFirstTime && (
          <div
            style={{
              background: "#1a1a1a",
              borderLeft: "4px solid #f5a020",
              padding: "24px",
              marginBottom: "-16px",
            }}
          >
            <p
              style={{
                fontFamily: "Clash Display, sans-serif",
                fontSize: "24px",
                fontWeight: 900,
                color: "#f5a020",
                margin: "0 0 8px",
              }}
            >
              You found it.
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "#5a5a58",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              The design system behind this site. A link has been added to the
              footer so you can return whenever you like.
            </p>
          </div>
        )}

        {/* Header */}
        <div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#f5a020",
              marginBottom: "8px",
            }}
          >
            Design System
          </p>
          <h2
            style={{
              fontFamily: "Clash Display, sans-serif",
              fontSize: "40px",
              fontWeight: 900,
              color: "#efefec",
              margin: "0 0 4px",
              lineHeight: 1.1,
            }}
          >
            Stephen Chiang
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              color: "#5a5a58",
              margin: 0,
            }}
          >
            Personal site — design tokens and principles
          </p>
        </div>

        {/* Color Palette */}
        <Section label="Color Palette">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {[
              {
                token: "--color-bg",
                hex: "#0c0c0c",
                name: "Background",
              },
              {
                token: "--color-surface",
                hex: "#141414",
                name: "Surface",
              },
              {
                token: "--color-card",
                hex: "#1a1a1a",
                name: "Card",
              },
              {
                token: "--color-accent",
                hex: "#f5a020",
                name: "Accent",
              },
              {
                token: "--color-text-primary",
                hex: "#efefec",
                name: "Text Primary",
              },
              {
                token: "--color-text-muted",
                hex: "#5a5a58",
                name: "Text Muted",
              },
              {
                token: "--color-border",
                hex: "#222220",
                name: "Border",
              },
              {
                token: "--color-invert-bg",
                hex: "#f5a020",
                name: "Invert Background",
              },
            ].map((color) => (
              <div
                key={color.token}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: color.hex,
                    border: "1px solid #222220",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#efefec",
                      margin: "0 0 2px",
                      fontWeight: 500,
                    }}
                  >
                    {color.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "#5a5a58",
                      margin: 0,
                    }}
                  >
                    {color.hex} · {color.token}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography Scale */}
        <Section label="Typography Scale">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {[
              {
                name: "Display",
                size: "64px",
                weight: 900,
                font: "Clash Display",
                sample: "Engineering",
              },
              {
                name: "Display Light",
                size: "48px",
                weight: 100,
                font: "Clash Display",
                sample: "Engineering",
              },
              {
                name: "H1",
                size: "40px",
                weight: 700,
                font: "Clash Display",
                sample: "Section Title",
              },
              {
                name: "H2",
                size: "32px",
                weight: 700,
                font: "Clash Display",
                sample: "Article Heading",
              },
              {
                name: "Body Large",
                size: "18px",
                weight: 400,
                font: "Inter",
                sample: "Body copy at reading size, comfortable for long-form",
              },
              {
                name: "Body",
                size: "16px",
                weight: 400,
                font: "Inter",
                sample: "Standard body text and UI copy",
              },
              {
                name: "Label",
                size: "11px",
                weight: 500,
                font: "Inter",
                sample: "UPPERCASE LABEL · LETTER SPACED",
                uppercase: true,
                letterSpacing: "0.15em",
              },
            ].map((type) => (
              <div
                key={type.name}
                style={{
                  borderBottom: "1px solid #1e1e1e",
                  paddingBottom: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: `${type.font}, sans-serif`,
                    fontSize: type.size,
                    fontWeight: type.weight,
                    color: "#efefec",
                    margin: "0 0 4px",
                    lineHeight: 1.1,
                    textTransform: type.uppercase ? "uppercase" : "none",
                    letterSpacing: type.letterSpacing ?? "normal",
                  }}
                >
                  {type.sample}
                </p>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "#5a5a58",
                    margin: 0,
                  }}
                >
                  {type.name} · {type.font} · {type.size} / {type.weight}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Spacing System */}
        <Section label="Spacing System">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {[
              { name: "Base unit", value: "8px" },
              { name: "Card padding", value: "40px" },
              { name: "Row padding", value: "32px" },
              { name: "Side margins", value: "80px desktop / 24px mobile" },
              { name: "Section padding", value: "120px desktop / 72px mobile" },
              { name: "Container max", value: "1280px" },
            ].map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderBottom: "1px solid #1e1e1e",
                  paddingBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#5a5a58",
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "#f5a020",
                  }}
                >
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Motion Principles */}
        <Section label="Motion Principles">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {[
              {
                name: "Load sequence",
                value: "Staggered fade + slide up, 0.6s ease-out",
              },
              {
                name: "Scroll reveals",
                value: "translateY(30px) → 0, opacity 0 → 1",
              },
              {
                name: "Hover transitions",
                value: "0.2s ease — color, background",
              },
              {
                name: "Drawer open",
                value: "0.45s cubic-bezier(0.16,1,0.3,1)",
              },
              {
                name: "Cursor follower",
                value: "8px dot, 60ms lag, expands on hover",
              },
              {
                name: "Portrait parallax",
                value: "0.6x scroll rate via GSAP ScrollTrigger",
              },
              {
                name: "About strip reveal",
                value: "Color wipe left → right, 0.6s",
              },
            ].map((m) => (
              <div
                key={m.name}
                style={{
                  borderLeft: "2px solid #222220",
                  paddingLeft: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#efefec",
                    margin: "0 0 4px",
                  }}
                >
                  {m.name}
                </p>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "#5a5a58",
                    margin: 0,
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            color: "#5a5a58",
            letterSpacing: "0.05em",
            lineHeight: 1.6,
            borderTop: "1px solid #222220",
            paddingTop: "24px",
            marginTop: "auto",
          }}
        >
          Built with React Router v7 · Tailwind CSS v4 · GSAP · Clash Display ·
          Inter · Deployed on Vercel
        </p>
      </div>
    </>
  );
}

// Helper: section wrapper
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#f5a020",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "#222220",
          }}
        />
      </div>
      {children}
    </div>
  );
}

// Utility: check if style guide has been unlocked
export function isStyleGuideUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(STYLEGUIDE_UNLOCK_KEY);
}
