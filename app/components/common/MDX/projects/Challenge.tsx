import type { ReactNode } from "react";

const challengeStyle = { fontSize: "clamp(18px, 2.5vw, 26px)", lineHeight: 1.5 };

export function Challenge({ children }: { children: ReactNode }) {
  return (
    <div className="my-10 md:my-12 border-l-4 border-accent pl-6 py-2">
      <div className="font-display font-light text-accent" style={challengeStyle}>
        {children}
      </div>
    </div>
  );
}
