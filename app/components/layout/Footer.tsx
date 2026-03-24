// Footer.tsx
// Minimal footer matching design system
// Shows easter egg hint on every page
// Shows style guide link after it has been unlocked

import { useEffect, useState } from "react";
import { isStyleGuideUnlocked } from "./StyleGuideDrawer";
import {
  STYLEGUIDE_UNLOCK_KEY,
  SITE_OWNER,
  LINKEDIN_URL,
} from "~/lib/constants";

interface FooterProps {
  onOpenStyleGuide?: () => void;
}

export function Footer({ onOpenStyleGuide }: FooterProps) {
  const [unlocked, setUnlocked] = useState(false);

  // Check unlock state client-side only
  useEffect(() => {
    setUnlocked(isStyleGuideUnlocked());
  }, []);

  // Listen for unlock event from StyleGuideDrawer
  useEffect(() => {
    const handleUnlock = () => setUnlocked(true);
    window.addEventListener(STYLEGUIDE_UNLOCK_KEY, handleUnlock);
    return () =>
      window.removeEventListener(STYLEGUIDE_UNLOCK_KEY, handleUnlock);
  }, []);

  return (
    <footer
      style={{
        borderTop: "1px solid #222220",
        padding: "24px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        background: "#0c0c0c",
      }}
    >
      {/* Left — name + year */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#5a5a58",
          margin: 0,
        }}
      >
        {SITE_OWNER}{" "}
        <span style={{ color: "#333330" }}>{new Date().getFullYear()}</span>
      </p>

      {/* Center — easter egg hint */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          letterSpacing: "0.1em",
          color: "#333330",
          margin: 0,
          textAlign: "center",
          cursor: "default",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#5a5a58")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#333330")}
      >
        This site has secrets. Explore to find them.
      </p>

      {/* Right — social links + optional style guide link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {unlocked && onOpenStyleGuide && (
          <button
            onClick={onOpenStyleGuide}
            style={{
              background: "none",
              border: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f5a020",
              cursor: "pointer",
              padding: 0,
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Style Guide ↗
          </button>
        )}

        <FooterLink href={LINKEDIN_URL} label="LinkedIn" />
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#5a5a58",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a020")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#5a5a58")}
    >
      {label}
    </a>
  );
}
