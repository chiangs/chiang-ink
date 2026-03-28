import type { ReactNode } from "react";

export type HighlightVariant = "emphasis" | "strong" | "subtle" | "flashy";

const VARIANT_CLASSES: Record<HighlightVariant, string> = {
  flashy: "text-viz-teal font-bold italic",
  emphasis: "text-accent-deep italic",
  strong: "text-accent font-medium",
  subtle: "text-text-primary border-b border-accent pb-[1px]",
};

type HighlightProps = {
  children?: ReactNode;
  variant?: HighlightVariant;
};

export function Highlight({ children, variant = "emphasis" }: HighlightProps) {
  return <span className={VARIANT_CLASSES[variant]}>{children}</span>;
}
