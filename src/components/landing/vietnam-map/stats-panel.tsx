"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  FiMapPin,
  FiHome,
  FiBriefcase,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import { TOTAL_STATS, REGION_STATS } from "@/data/vietnam-provinces";

// ─── Animated Counter ───
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({
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
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return ctrl.stop;
  }, [inView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums font-sans">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ─── Stats Panel ───
export function StatsPanel() {
  const statItems = [
    {
      value: TOTAL_STATS.provinces,
      label: "Tỉnh thành",
      icon: <FiMapPin />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.centers,
      label: "Trung tâm",
      icon: <FiHome />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.projects,
      label: "Dự án",
      icon: <FiBriefcase />,
      suffix: "",
    },
    {
      value: TOTAL_STATS.students,
      label: "Người dùng",
      icon: <FiUsers />,
      suffix: "+",
    },
  ];

  return (
    <div className="space-y-3">
      {statItems.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="group"
        >
          <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-accent-red/25 hover:shadow-md transition-all duration-300">
            <div className="w-11 h-11 rounded-xl bg-accent-red/5 flex items-center justify-center text-accent-red text-lg group-hover:bg-accent-red/10 transition-colors shrink-0">
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-none font-sans">
                <AnimatedCounter
                  target={s.value}
                  suffix={s.suffix}
                  duration={2 + i * 0.25}
                />
              </div>
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono mt-0.5">
                {s.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Regional breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3"
      >
        <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
          Phân bổ vùng
        </p>
        {[
          {
            label: "Miền Bắc",
            key: "Bắc" as const,
            gradient: "from-sky-400 to-blue-500",
          },
          {
            label: "Miền Trung",
            key: "Trung" as const,
            gradient: "from-amber-400 to-orange-500",
          },
          {
            label: "Miền Nam",
            key: "Nam" as const,
            gradient: "from-emerald-400 to-teal-500",
          },
        ].map((r) => {
          const count = REGION_STATS[r.key].length;
          const pct = Math.round((count / TOTAL_STATS.provinces) * 100);
          return (
            <div key={r.key}>
              <div className="flex items-center justify-between text-xs mb-1.5 font-sans">
                <span className="flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-300">
                  <FiAward className="text-accent-red w-3 h-3" />
                  {r.label}
                </span>
                <span className="font-bold text-zinc-900 dark:text-white text-[11px]">
                  {count} tỉnh
                </span>
              </div>
              <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${r.gradient}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
