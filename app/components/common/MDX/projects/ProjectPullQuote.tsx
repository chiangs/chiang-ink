import type { ReactNode } from "react";

const quoteStyle = { fontSize: "clamp(20px, 2.8vw, 32px)", lineHeight: 1.4 };

export function ProjectPullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 md:my-12 pl-6 border-l-4 border-accent bg-surface py-6 pr-6">
      <div className="font-display font-light text-text-primary" style={quoteStyle}>
        {children}
      </div>
    </blockquote>
  );
}
