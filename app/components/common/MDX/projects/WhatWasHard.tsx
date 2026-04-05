import type { ReactNode } from "react";

const HARD_LABEL = "WHAT WAS HARD";

const calloutStyle = { fontSize: "clamp(24px, 3.5vw, 40px)", lineHeight: 1.15 };
const bodyStyle = {
  fontSize: "clamp(16px, 1.8vw, 18px)",
  lineHeight: 1.8,
  opacity: 0.85,
};

export function WhatWasHard({
  children,
  callout,
}: {
  children: ReactNode;
  callout?: string;
}) {
  return (
    <section className="mb-16 md:mb-20 -mx-margin-mob md:-mx-margin bg-accent py-14 md:py-16 px-margin-mob md:px-margin">
      <span className="block font-body font-medium text-sm uppercase tracking-[0.15em] text-invert-text opacity-60 mb-5">
        {HARD_LABEL}
      </span>
      {callout && (
        <p
          className="font-display font-bold text-invert-text mb-6"
          style={calloutStyle}
        >
          {callout}
        </p>
      )}
      <div className="font-body text-invert-text max-w-2xl" style={bodyStyle}>
        {children}
      </div>
    </section>
  );
}
