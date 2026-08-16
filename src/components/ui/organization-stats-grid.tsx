"use client";

import * as React from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { OrganizationStats } from "@/services/hero.service";

export interface StatMetricItem {
  key?: keyof OrganizationStats;
  value?: number;
  suffix?: string;
  label: string;
  desc?: string;
}

export const DEFAULT_ORG_METRICS: StatMetricItem[] = [
  {
    key: "staff",
    value: 1500,
    suffix: "+",
    label: "Cán bộ, nhân sự",
    desc: "Đội ngũ chuyên môn cao, đáp ứng triển khai dự án quy mô lớn",
  },
  {
    key: "experts",
    value: 250,
    suffix: "+",
    label: "Chuyên gia đa lĩnh vực",
    desc: "Năng lực R&D phần cứng, GIS, AI và chuyển đổi số",
  },
  {
    key: "projects",
    value: 100,
    suffix: "+",
    label: "Dự án trọng điểm",
    desc: "Tham gia trực tiếp triển khai các dự án quy mô toàn quốc",
  },
  {
    key: "provinces",
    value: 30,
    suffix: "",
    label: "Tỉnh, thành hiện diện",
    desc: "Mạng lưới phục vụ thực địa rộng khắp các tỉnh thành toàn quốc",
  },
];

export interface OrganizationStatsGridProps {
  stats?: OrganizationStats | null;
  items?: StatMetricItem[];
  showDescription?: boolean;
  itemBgClassName?: string;
  counterDuration?: number;
  className?: string;
}

export function OrganizationStatsGrid({
  stats,
  items = DEFAULT_ORG_METRICS,
  showDescription = true,
  itemBgClassName = "bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900/80",
  counterDuration = 3.2,
  className = "",
}: OrganizationStatsGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-800 ${className}`}
    >
      {items.map((item, idx) => {
        const val =
          (item.key && stats ? (stats as any)[item.key] : undefined) ??
          item.value ??
          0;

        return (
          <div
            key={idx}
            className={`py-6 md:py-8 px-4 md:px-6 flex flex-col items-center text-center group cursor-pointer transition-colors duration-300 ${itemBgClassName}`}
          >
            {/* Number with AnimatedCounter */}
            <div className="text-4xl md:text-5xl font-black text-black dark:text-white group-hover:text-accent-red tracking-tighter font-heading tabular-nums leading-none mb-3 transition-colors duration-300">
              <AnimatedCounter
                target={val}
                suffix={item.suffix}
                duration={counterDuration}
              />
            </div>

            {/* Metric Label */}
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white leading-snug block font-heading transition-colors duration-300">
              {item.label}
            </span>

            {/* Description */}
            {showDescription && item.desc && (
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[26ch] mx-auto mt-2 transition-colors duration-300">
                {item.desc}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
