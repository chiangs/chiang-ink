// CursorFollower.tsx
// Renders the #cursor-dot element and drives it with a RAF loop.
// No-ops on touch devices and on the server.
// Expands with "VIEW →" label on [data-cursor-expand] elements.

import { useEffect, useState } from "react";

const CURSOR_LABEL = "VIEW →";
const RIPPLE_DURATION_MS = 500;

type Ripple = { id: number; x: number; y: number };

export function CursorFollower() {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Step 1 — detect environment; skip touch devices
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);
  }, []);

  // Step 2 — start RAF loop and attach listeners once dot is in the DOM
  useEffect(() => {
    if (!mounted) return;

    const dot = document.getElementById("cursor-dot");
    if (!dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      rafId = requestAnimationFrame(animate);
    };

    // Use event delegation — works for elements added after mount
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-cursor-expand]")) {
        dot.classList.add("expanded");
        setExpanded(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-cursor-expand]")) {
        dot.classList.remove("expanded");
        setExpanded(false);
      }
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, RIPPLE_DURATION_MS);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("click", onClick);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div id="cursor-dot">{expanded ? CURSOR_LABEL : null}</div>
      {ripples.map((r) => (
        <div
          key={r.id}
          className="cursor-ripple"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
}
