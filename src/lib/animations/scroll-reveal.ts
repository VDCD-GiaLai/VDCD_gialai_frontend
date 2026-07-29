"use client";

import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

/* ─────────────────────────────────────────────────────────────
 *  Scroll-reveal animation utilities
 *
 *  Replaces all Framer Motion `whileInView` patterns with
 *  GSAP ScrollTrigger. Supports single elements, batched lists,
 *  and staggered grids.
 * ───────────────────────────────────────────────────────────── */

export interface ScrollRevealOptions {
  /** Y offset in px (default 28) */
  y?: number;
  /** Initial blur in px (default 4) */
  blur?: number;
  /** Animation duration in seconds (default 0.7) */
  duration?: number;
  /** Easing (default "power3.out") */
  ease?: string;
  /** ScrollTrigger start position (default "top 85%") */
  start?: string;
  /** Fire only once? (default true) */
  once?: boolean;
  /** Delay in seconds (default 0) */
  delay?: number;
}

const DEFAULTS: Required<ScrollRevealOptions> = {
  y: 28,
  blur: 4,
  duration: 0.7,
  ease: "power3.out",
  start: "top 85%",
  once: true,
  delay: 0,
};

/**
 * Apply a scroll-triggered fade-in-up reveal to a single element.
 * Must be called inside a gsap.context() scope for proper cleanup.
 */
export function revealElement(
  el: Element | string,
  options: ScrollRevealOptions = {},
) {
  const o = { ...DEFAULTS, ...options };

  gsap.set(el, { autoAlpha: 0, y: o.y, filter: `blur(${o.blur}px)` });

  gsap.to(el, {
    autoAlpha: 1,
    y: 0,
    filter: "blur(0px)",
    duration: o.duration,
    ease: o.ease,
    delay: o.delay,
    scrollTrigger: {
      trigger: el as Element,
      start: o.start,
      toggleActions: o.once ? "play none none none" : "play none none reverse",
    },
  });
}

export interface BatchRevealOptions extends ScrollRevealOptions {
  /** Stagger delay between elements (default 0.06) */
  stagger?: number;
}

/**
 * Apply a batched scroll-triggered stagger reveal to a set of elements.
 * More performant than individual ScrollTriggers — uses ScrollTrigger.batch().
 * Must be called inside a gsap.context() scope for proper cleanup.
 */
export function revealBatch(
  selector: string,
  options: BatchRevealOptions = {},
) {
  const o = { ...DEFAULTS, stagger: 0.06, ...options };

  gsap.set(selector, { autoAlpha: 0, y: o.y, filter: `blur(${o.blur}px)` });

  ScrollTrigger.batch(selector, {
    start: o.start,
    once: o.once,
    onEnter: (elements) =>
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: o.duration,
        ease: o.ease,
        stagger: o.stagger,
      }),
    ...(!o.once && {
      onLeaveBack: (elements) =>
        gsap.to(elements, {
          autoAlpha: 0,
          y: o.y,
          filter: `blur(${o.blur}px)`,
          duration: o.duration * 0.6,
          ease: o.ease,
          stagger: o.stagger,
        }),
    }),
  });
}

/**
 * Apply a staggered reveal on mount (no scroll trigger).
 * Used for page-load animations like solution listing page.
 * Must be called inside a gsap.context() scope for proper cleanup.
 */
export function revealStaggerOnMount(
  selector: string,
  options: BatchRevealOptions = {},
) {
  const o = { ...DEFAULTS, stagger: 0.05, ...options };

  gsap.from(selector, {
    autoAlpha: 0,
    y: o.y,
    filter: `blur(${o.blur}px)`,
    duration: o.duration,
    ease: o.ease,
    stagger: o.stagger,
    delay: o.delay,
  });
}
