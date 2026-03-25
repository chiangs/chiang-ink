// GSAP animation configurations
// Import gsap in components that use these configs
// All animations are client-side only

import type { default as GSAPType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type GSAP = typeof GSAPType;
type ST = typeof ScrollTriggerType;

// Hero load sequence
// Call from Hero.tsx useEffect after mount
export const heroLoadSequence = (gsap: GSAP) => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

  tl.fromTo(
    "[data-anim='nav']",
    { opacity: 0 },
    { opacity: 1, duration: 0.4 },
    0,
  )
    .fromTo(
      "[data-anim='eyebrow']",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.2,
    )
    .fromTo(
      "[data-anim='headline-1']",
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7 },
      0.35,
    )
    .fromTo(
      "[data-anim='headline-2']",
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      0.55,
    )
    .fromTo(
      "[data-anim='hero-sub']",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.2,
    )
    .fromTo(
      "[data-anim='portrait']",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0.9,
    )
    .fromTo(
      "[data-anim='nav-link']",
      { opacity: 0 },
      { opacity: 1, duration: 0.4, stagger: 0.04 },
      1.1,
    );

  return tl;
};

// Scroll reveal — attach to any element
// Usage: scrollReveal(gsap, ScrollTrigger, ".my-element")
// Returns the tween so callers can kill it on unmount
export const scrollReveal = (
  gsap: GSAP,
  _ScrollTrigger: ST,
  selector: string,
  options?: {
    stagger?: number;
    delay?: number;
  },
) => {
  return gsap.fromTo(
    selector,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: options?.stagger ?? 0.2,
      delay: options?.delay ?? 0,
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        once: true,
      },
    },
  );
};

// About section color wipe
export const aboutWipe = (gsap: GSAP, _ScrollTrigger: ST, element: string) => {
  gsap.fromTo(
    element,
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      },
    },
  );
};

// Portrait parallax
export const portraitParallax = (
  gsap: GSAP,
  _ScrollTrigger: ST,
  element: string,
) => {
  gsap.to(element, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};
