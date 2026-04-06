import type { ReactNode } from "react";

const BUILT_LABEL = "WHAT WAS BUILT";

const bodyStyle = { fontSize: "clamp(16px, 1.8vw, 18px)", lineHeight: 1.8 };

export function WhatWasBuilt({ children }: { children: ReactNode }) {
  return (
    <section className="mb-16 md:mb-20">
      <span className="block font-body font-medium text-sm uppercase tracking-[0.15em] text-accent mb-5">
        {BUILT_LABEL}
      </span>
      <div className="font-body text-text-primary max-w-2xl" style={bodyStyle}>
        {children}
      </div>
    </section>
  );
}
