"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

/* ─────────────────────────────────────────────────────────────
 *  Animated counter — replaces useMotionValue + useTransform
 *
 *  Uses a GSAP tween on a plain object, updating the DOM
 *  directly via onUpdate for zero React re-renders.
 * ───────────────────────────────────────────────────────────── */

interface UseAnimatedCounterOptions {
  /** Target number to count up to */
  target: number;
  /** Suffix to append (e.g. "+", "%") */
  suffix?: string;
  /** Animation duration in seconds (default 2) */
  duration?: number;
  /** Format large numbers with locale separators? (default true) */
  formatLocale?: boolean;
  /** ScrollTrigger start margin (default "-50px") */
  triggerMargin?: string;
}

/**
 * Hook that animates a number from 0 → target when scrolled into view.
 * Returns a ref to attach to the <span> element that displays the number.
 *
 * @example
 * ```tsx
 * const ref = useAnimatedCounter({ target: 500, suffix: "+" });
 * return <span ref={ref} />;
 * ```
 */
export function useAnimatedCounter(options: UseAnimatedCounterOptions) {
  const {
    target,
    suffix = "",
    duration = 2,
    formatLocale = true,
    triggerMargin = "-50px",
  } = options;

  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
    const el = spanRef.current;

    // Set initial text
    el.textContent = `0${suffix}`;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Instant display for reduced motion
        const formatted = formatLocale
          ? target.toLocaleString("vi-VN")
          : target.toString();
        el.textContent = `${formatted}${suffix}`;
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { value: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: `top bottom${triggerMargin}`,
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              value: target,
              duration,
              ease: "power3.out",
              onUpdate: () => {
                const rounded = Math.round(obj.value);
                const formatted = formatLocale
                  ? rounded.toLocaleString("vi-VN")
                  : rounded.toString();
                el.textContent = `${formatted}${suffix}`;
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, [target, suffix, duration, formatLocale, triggerMargin]);

  return spanRef;
}
