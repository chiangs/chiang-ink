import type { ReactNode } from "react";

const SITUATION_LABEL = "THE SITUATION";

export function Situation({ children }: { children: ReactNode }) {
  return (
    <section className="mb-16 md:mb-20">
      <span className="block font-body font-medium text-sm uppercase tracking-[0.15em] text-accent mb-5">
        {SITUATION_LABEL}
      </span>
      <div
        className="font-body text-text-primary max-w-2xl"
        style={{ fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.8 }}
      >
        {children}
      </div>
    </section>
  );
}
