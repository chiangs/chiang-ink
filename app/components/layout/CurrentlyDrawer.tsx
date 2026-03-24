// CurrentlyDrawer.tsx
// Triggered by clicking the live time display in the hero
// Slides in from the right as a personal "currently" snapshot

import { useEffect, useRef } from "react";

interface CurrentlyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurrentlyDrawer({ isOpen, onClose }: CurrentlyDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

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

  // Prevent body scroll when open
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
          background: "rgba(12,12,12,0.7)",
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
          width: "min(420px, 90vw)",
          background: "#141414",
          borderLeft: "1px solid #f5a020",
          zIndex: 999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          overflowY: "auto",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Close button */}
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
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a020")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#5a5a58")}
        >
          ESC ✕
        </button>

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
              marginBottom: "16px",
            }}
          >
            Currently
          </p>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#f5a020",
            }}
          />
        </div>

        {/* Training */}
        <CurrentlyBlock
          label="Training"
          content={
            <>
              Strength, Muay Thai, and hiking.
              <br />
              <br />
              Currently trying to get lost in as many Norwegian fjords as
              possible.
            </>
          }
        />

        {/* Reading */}
        <CurrentlyBlock
          label="Reading"
          content={
            <>
              <em
                style={{
                  fontStyle: "italic",
                  color: "#efefec",
                }}
              >
                The UX of AI
              </em>{" "}
              — Greg Nudelman.
              <br />
              <br />
              Mid-way through the chapter on Digital Twins. The overlap with my
              current project work is uncomfortably well-timed.
            </>
          }
        />

        {/* Life */}
        <CurrentlyBlock
          label="Life"
          content={
            <>
              Single father of three.
              <br />
              <br />
              Everything else fits around that.
            </>
          }
        />

        {/* On my mind */}
        <CurrentlyBlock
          label="On my mind"
          content={
            <>
              How AI changes the role of the designer — not whether it will, but
              how fast, and whether the discipline is ready for it.
            </>
          }
        />

        {/* Footer note */}
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
          Updated periodically. Last updated March 2026.
        </p>
      </div>
    </>
  );
}

// Reusable block inside the drawer
function CurrentlyBlock({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderLeft: "4px solid #f5a020",
        paddingLeft: "20px",
      }}
    >
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#5a5a58",
          marginBottom: "12px",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: 400,
          color: "#efefec",
          lineHeight: 1.75,
          margin: 0,
        }}
      >
        {content}
      </p>
    </div>
  );
}
