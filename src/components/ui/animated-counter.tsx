"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
} from "framer-motion";

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000
      ? Math.round(v).toLocaleString("vi-VN")
      : Math.round(v).toString(),
  );
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return ctrl.stop;
  }, [inView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
