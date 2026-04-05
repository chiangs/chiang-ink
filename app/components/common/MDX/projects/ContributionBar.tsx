import { useEffect, useRef } from "react";

const ROLES_LABEL = "MY ROLES";

export function ContributionBar({ roles }: { roles: string[] }) {
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !pillsRef.current) return;
    let tl: { kill(): void } | null = null;
    let isMounted = true;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted || !pillsRef.current) return;
      const pills = pillsRef.current.querySelectorAll("[data-role-pill]");
      const timeline = gsap.timeline({ delay: 0.7 });
      tl = timeline;
      timeline.fromTo(
        pills,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.07,
        },
      );
    };

    init();
    return () => {
      isMounted = false;
      tl?.kill();
    };
  }, []);

  return (
    <div className="bg-surface-low">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin py-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted shrink-0">
          {ROLES_LABEL}
        </span>
        <span className="text-text-muted shrink-0 hidden md:inline">—</span>
        <div ref={pillsRef} className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <span
              key={role}
              data-role-pill
              className="font-body font-medium text-xs uppercase tracking-[0.1em] text-accent border border-accent px-3 py-1 opacity-0"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
