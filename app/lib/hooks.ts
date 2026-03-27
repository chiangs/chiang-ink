// hooks.ts
// Reusable React hooks shared across the site.

import { useEffect, useRef, useState } from "react";
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

// Animates a number counting DOWN from ~multiplier× the target to the target.
// Returns the current display string, or null if value is null.
// Re-animates whenever animationKey increments.
// Integer values display as integers; non-integer values display to 1dp.
export function useCountDown(
  value: number | null,
  animationKey: number,
  options: { multiplier?: number; duration?: number } = {},
): string | null {
  const { multiplier = 3, duration = 1.5 } = options;
  const isInt = value !== null && Number.isInteger(value);
  const finalDisplay =
    value === null ? null : isInt ? String(value) : value.toFixed(1);
  const [display, setDisplay] = useState(finalDisplay);
  const tweenRef = useRef<{ kill(): void } | null>(null);

  useEffect(() => {
    if (value === null) return;
    let isMounted = true;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (!isMounted) return;
      const startValue = Math.ceil(value * multiplier);
      const counter = { value: startValue };
      setDisplay(isInt ? String(startValue) : startValue.toFixed(1));
      tweenRef.current = gsap.to(counter, {
        value,
        duration,
        ease: "power2.out",
        onUpdate() {
          if (!isMounted) return;
          setDisplay(
            isInt
              ? String(Math.round(counter.value))
              : counter.value.toFixed(1),
          );
        },
        onComplete() {
          if (!isMounted) return;
          setDisplay(finalDisplay);
        },
      });
    };
    run();
    return () => {
      isMounted = false;
      tweenRef.current?.kill();
    };
  }, [value, animationKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return display;
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
