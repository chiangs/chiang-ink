import type { CSSProperties } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ArticleImageSize = "default" | "wide" | "bleed";

type ArticleImageProps = {
  src: string;
  alt: string;
  caption?: string;
  size?: ArticleImageSize;
  raw?: boolean;
};

// ─── Size wrapper styles ──────────────────────────────────────────────────────
// default — stays within text column (max-w-180 = 720px)
// wide    — breaks out to 960px using the center-anchor trick
// bleed   — full viewport width using the same trick
const SIZE_WRAPPER_STYLES: Record<ArticleImageSize, CSSProperties> = {
  default: {},
  wide: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    width: "min(960px, 100vw)",
  },
  bleed: {
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100vw",
  },
};

// ─── Filter + overlay styles ──────────────────────────────────────────────────
const IMAGE_FILTER_STYLE: CSSProperties = {
  filter: "grayscale(100%) contrast(1.35) brightness(0.85)",
  display: "block",
  width: "100%",
};

const COPPER_OVERLAY_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "rgba(255, 183, 125, 0.65)",
  mixBlendMode: "multiply",
  pointerEvents: "none",
  zIndex: 1,
};

const GRAIN_OVERLAY_STYLE: CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.05'/%3E%3C/svg%3E\")",
  opacity: 0.05,
  mixBlendMode: "overlay",
  pointerEvents: "none",
  zIndex: 2,
};

const RAW_IMAGE_STYLE: CSSProperties = {
  display: "block",
  width: "100%",
};

// ─── Component ────────────────────────────────────────────────────────────────
export function ArticleImage({
  src,
  alt,
  caption,
  size = "default",
  raw = false,
}: ArticleImageProps) {
  const wrapperStyle = SIZE_WRAPPER_STYLES[size];

  const imageElement = raw ? (
    <img src={src} alt={alt} style={RAW_IMAGE_STYLE} />
  ) : (
    <div className="relative">
      <img src={src} alt={alt} style={IMAGE_FILTER_STYLE} />
      <div style={COPPER_OVERLAY_STYLE} aria-hidden="true" />
      <div style={GRAIN_OVERLAY_STYLE} aria-hidden="true" />
    </div>
  );

  const captionElement = caption ? (
    <figcaption className="font-body font-medium text-[10px] uppercase tracking-[0.15em] text-accent-muted text-right mt-3">
      {caption}
    </figcaption>
  ) : null;

  return (
    <figure className="my-12" style={wrapperStyle}>
      {imageElement}
      {captionElement}
    </figure>
  );
}
