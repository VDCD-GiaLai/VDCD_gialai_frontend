"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/animations/register-gsap";
import {
  revealElement,
  revealBatch,
  revealStaggerOnMount,
  type ScrollRevealOptions,
  type BatchRevealOptions,
} from "@/lib/animations/scroll-reveal";

/* ─────────────────────────────────────────────────────────────
 *  useScrollReveal — React hook for GSAP scroll-reveal animations
 *
 *  Wraps the scroll-reveal utility functions in gsap.context()
 *  for automatic cleanup on unmount. Supports reduced-motion.
 * ───────────────────────────────────────────────────────────── */

interface UseScrollRevealConfig {
  /** CSS selector for elements to reveal (scoped to container ref) */
  targets: string;
  /** Use batch mode for multiple elements? (default false) */
  batch?: boolean;
  /** Trigger on mount instead of scroll? (default false) */
  onMount?: boolean;
  /** Animation options */
  options?: ScrollRevealOptions & BatchRevealOptions;
  /** Dependencies array for re-running (default []) */
  deps?: unknown[];
}

/**
 * Hook for declarative scroll-reveal animations.
 * Returns a ref to attach to the container element.
 *
 * @example
 * ```tsx
 * const ref = useScrollReveal({
 *   targets: ".reveal-item",
 *   batch: true,
 *   options: { stagger: 0.08 },
 * });
 *
 * return <div ref={ref}>...</div>;
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  config: UseScrollRevealConfig,
): RefObject<T | null> {
  const containerRef = useRef<T>(null);
  const {
    targets,
    batch = false,
    onMount = false,
    options = {},
    deps = [],
  } = config;

  useEffect(() => {
    let ctx: gsap.Context | null = null;
    const rafId = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        /* ── Reduced motion: instant visibility ─── */
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set(targets, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        });

        /* ── Full motion ─── */
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          if (onMount) {
            revealStaggerOnMount(targets, options as BatchRevealOptions);
          } else if (batch) {
            revealBatch(targets, options as BatchRevealOptions);
          } else {
            // Apply to each element matching the selector
            const elements = gsap.utils.toArray<Element>(targets);
            elements.forEach((el, i) => {
              revealElement(el, {
                ...options,
                delay: (options.delay ?? 0) + i * 0.06,
              });
            });
          }
        });
      }, containerRef);
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}
