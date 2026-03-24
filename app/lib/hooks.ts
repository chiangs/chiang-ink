// hooks.ts
// Reusable React hooks shared across the site.

import { useEffect, useState } from "react";
import { TIMEZONE_STAVANGER } from "./constants";

// Returns the current Stavanger time as "HH:MM TZ" (e.g. "10:49 CET").
// Updates every second.
export function useStavTime(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const hhmm = new Date().toLocaleTimeString("en-GB", {
        timeZone: TIMEZONE_STAVANGER,
        hour: "2-digit",
        minute: "2-digit",
      });
      const tz = new Date()
        .toLocaleTimeString("en-GB", {
          timeZone: TIMEZONE_STAVANGER,
          timeZoneName: "short",
        })
        .split(" ")
        .pop();
      setTime(`${hhmm} ${tz}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// Returns true when the page has been scrolled past `threshold` pixels.
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
