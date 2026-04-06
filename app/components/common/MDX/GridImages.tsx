/**
 * ImageGrid
 * ─────────────────────────────────────────────────────────────────────────────
 * Fixed-ratio image grid for MDX pages.
 * Max 4 images. Layout adapts by count:
 *
 *   1 → full width
 *   2 → 50 / 50
 *   3 → 50/50 top row, full width bottom (Option A)
 *   4 → 2 × 2
 *
 * Lightbox: click any image to open full-screen viewer.
 * Keyboard: ← → to navigate, Escape to close.
 * Focus trapped inside lightbox while open.
 *
 * raw prop per image: skips duotone filter (for colour mockups).
 * Full-bleed: negative margins pull the grid to container edges.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GridImage = {
  src: string;
  alt: string;
  caption?: string;
  raw?: boolean;
};

type ImageGridProps = {
  images: GridImage[];
  float?: "left" | "right";
};

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_IMAGES = 4;
const DUOTONE_FILTER = "grayscale(100%) contrast(1.25) brightness(0.75)";
const CAPTION_STYLE: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.12em",
};
const GAP = "2px";

// ─── Main Component ───────────────────────────────────────────────────────────

export function GridImages({ images, float }: ImageGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clamped = images.slice(0, MAX_IMAGES);
  const count = clamped.length;

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % clamped.length));
  }, [clamped.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + clamped.length) % clamped.length,
    );
  }, [clamped.length]);

  if (count === 0) return null;

  const floatStyle: React.CSSProperties | undefined = float
    ? {
        float,
        width: "50%",
        marginRight: float === "left" ? "2rem" : undefined,
        marginLeft: float === "right" ? "2rem" : undefined,
        marginBottom: "1.5rem",
        marginTop: "2rem",
        padding: "10px",
        boxShadow: "0 0 0 1px rgba(255,183,125,0.10), 0 2px 8px rgba(0,0,0,0.5), 0 4px 16px rgba(255,183,125,0.10), 0 8px 28px rgba(255,183,125,0.06)",
      }
    : undefined;

  const wrapperClass = float
    ? "mb-0"
    : "mb-12 md:mb-16 -mx-margin-mob md:-mx-margin";

  return (
    <>
      {/* ── Grid ── */}
      <div className={wrapperClass} style={floatStyle}>
        <GridLayout
          images={clamped}
          count={count}
          onImageClick={openLightbox}
        />
      </div>

      {/* ── Lightbox (portal) ── */}
      {mounted &&
        lightboxIndex !== null &&
        createPortal(
          <Lightbox
            images={clamped}
            index={lightboxIndex}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />,
          document.body,
        )}
    </>
  );
}

// ─── Grid Layout ──────────────────────────────────────────────────────────────

function GridLayout({
  images,
  count,
  onImageClick,
}: {
  images: GridImage[];
  count: number;
  onImageClick: (index: number) => void;
}) {
  if (count === 1) {
    return (
      <GridCell
        image={images[0]}
        index={0}
        onClick={onImageClick}
        ratio="56.25%"
      />
    );
  }

  if (count === 2) {
    return (
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: GAP }}
      >
        <GridCell
          image={images[0]}
          index={0}
          onClick={onImageClick}
          ratio="66.67%"
        />
        <GridCell
          image={images[1]}
          index={1}
          onClick={onImageClick}
          ratio="66.67%"
        />
      </div>
    );
  }

  if (count === 3) {
    return (
      <div style={{ display: "grid", gap: GAP }}>
        {/* Top row — 50/50 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: GAP }}
        >
          <GridCell
            image={images[0]}
            index={0}
            onClick={onImageClick}
            ratio="66.67%"
          />
          <GridCell
            image={images[1]}
            index={1}
            onClick={onImageClick}
            ratio="66.67%"
          />
        </div>
        {/* Bottom — full width */}
        <GridCell
          image={images[2]}
          index={2}
          onClick={onImageClick}
          ratio="40%"
        />
      </div>
    );
  }

  // count === 4 → 2×2
  return (
    <div style={{ display: "grid", gap: GAP }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: GAP }}
      >
        <GridCell
          image={images[0]}
          index={0}
          onClick={onImageClick}
          ratio="66.67%"
        />
        <GridCell
          image={images[1]}
          index={1}
          onClick={onImageClick}
          ratio="66.67%"
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: GAP }}
      >
        <GridCell
          image={images[2]}
          index={2}
          onClick={onImageClick}
          ratio="66.67%"
        />
        <GridCell
          image={images[3]}
          index={3}
          onClick={onImageClick}
          ratio="66.67%"
        />
      </div>
    </div>
  );
}

// ─── Grid Cell ────────────────────────────────────────────────────────────────

const cellBaseStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: "#1a1a1a",
};

const cellOverlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(255,183,125,0)",
  transition: "background 0.2s ease",
  pointerEvents: "none",
  zIndex: 1,
};

const expandIconStyle: React.CSSProperties = {
  position: "absolute",
  top: "12px",
  right: "12px",
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.2s ease",
  pointerEvents: "none",
};

function GridCell({
  image,
  index,
  onClick,
  ratio,
}: {
  image: GridImage;
  index: number;
  onClick: (index: number) => void;
  ratio: string; // padding-bottom percentage for aspect ratio
}) {
  const [hovered, setHovered] = useState(false);

  const wrapperStyle: React.CSSProperties = {
    ...cellBaseStyle,
    paddingBottom: ratio,
  };

  const imgStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: image.raw ? undefined : DUOTONE_FILTER,
    transition: "transform 0.4s ease",
    transform: hovered ? "scale(1.03)" : "scale(1)",
  };

  const overlayStyle: React.CSSProperties = {
    ...cellOverlayStyle,
    background: hovered ? "rgba(255,183,125,0.06)" : "rgba(255,183,125,0)",
  };

  const iconStyle: React.CSSProperties = {
    ...expandIconStyle,
    opacity: hovered ? 1 : 0,
  };

  return (
    <button
      type="button"
      style={wrapperStyle}
      onClick={() => onClick(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View image: ${image.alt}`}
    >
      <img src={image.src} alt={image.alt} style={imgStyle} />

      {/* Hover overlay */}
      <div style={overlayStyle} />

      {/* Expand icon */}
      <div style={iconStyle}>
        <ExpandIcon />
      </div>

      {/* Caption */}
      {image.caption && (
        <figcaption
          className="absolute bottom-3 right-4 font-body font-medium uppercase text-accent pointer-events-none"
          style={{ ...CAPTION_STYLE, zIndex: 2 }}
        >
          {image.caption}
        </figcaption>
      )}
    </button>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const lightboxBackdropStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "rgba(19,19,19,0.96)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const lightboxImgWrapStyle: React.CSSProperties = {
  position: "relative",
  maxWidth: "90vw",
  maxHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const lightboxImgStyle: React.CSSProperties = {
  maxWidth: "90vw",
  maxHeight: "80vh",
  objectFit: "contain",
  display: "block",
};

const lightboxCaptionStyle: React.CSSProperties = {
  marginTop: "16px",
  fontSize: "10px",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
};

function Lightbox({
  images,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: GridImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const image = images[index];
  const hasMultiple = images.length > 1;

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Focus close button on open
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  return (
    <div
      style={lightboxBackdropStyle}
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={image.alt}
    >
      {/* Close */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted hover:text-accent"
        style={{ transition: "color var(--transition-fast)", zIndex: 201 }}
        aria-label="Close lightbox"
      >
        ESC ✕
      </button>

      {/* Counter */}
      {hasMultiple && (
        <div
          className="absolute top-6 left-6 font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted"
          style={{ zIndex: 201 }}
        >
          {index + 1} / {images.length}
        </div>
      )}

      {/* Image */}
      <div style={lightboxImgWrapStyle} onClick={(e) => e.stopPropagation()}>
        <img
          src={image.src}
          alt={image.alt}
          style={{
            ...lightboxImgStyle,
            filter: image.raw ? undefined : DUOTONE_FILTER,
          }}
        />
      </div>

      {/* Caption */}
      {image.caption && (
        <p
          className="font-body font-medium text-accent uppercase"
          style={lightboxCaptionStyle}
        >
          {image.caption}
        </p>
      )}

      {/* Prev / Next */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-6 font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted hover:text-accent"
            style={{
              transition: "color var(--transition-fast)",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            aria-label="Previous image"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-6 font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted hover:text-accent"
            style={{
              transition: "color var(--transition-fast)",
              top: "50%",
              transform: "translateY(-50%)",
            }}
            aria-label="Next image"
          >
            Next →
          </button>
        </>
      )}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ExpandIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 2h4v4M6 14H2v-4M14 2l-5 5M2 14l5-5"
        stroke="#FFB77D"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
