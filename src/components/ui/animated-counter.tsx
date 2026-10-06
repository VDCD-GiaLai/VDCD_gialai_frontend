"use client";

import * as React from "react";

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2.5,
}: AnimatedCounterProps) {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = React.useRef(false);

  React.useEffect(() => {
    const el = containerRef.current;
    const textEl = spanRef.current;
    if (!el || !textEl || hasAnimatedRef.current) return;

    const formatNumber = (val: number) =>
      val >= 1000 ? val.toLocaleString("vi-VN") : val.toString();

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      textEl.textContent = formatNumber(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const durationMs = duration * 1000;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out cubic [0.25, 1, 0.5, 1] equivalent
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * ease);
            textEl.textContent = formatNumber(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { rootMargin: "-50px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={containerRef} className="tabular-nums">
      <span ref={spanRef}>0</span>
      {suffix}
    </span>
  );
}
