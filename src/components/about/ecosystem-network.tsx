"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface EcosystemNetworkProps {
  stats?: {
    staff?: number;
    experts?: number;
    centers?: number;
    provinces?: number;
  };
}

export function EcosystemNetwork({ stats }: EcosystemNetworkProps) {
  const metrics = [
    {
      value: stats?.staff || 1500,
      suffix: "+",
      label: "Cán bộ, nhân sự",
      desc: "Đội ngũ chuyên môn cao, đáp ứng triển khai dự án quy mô lớn",
    },
    {
      value: stats?.experts || 250,
      suffix: "+",
      label: "Chuyên gia đa lĩnh vực",
      desc: "Năng lực R&D phần cứng, GIS, AI và chuyển đổi số",
    },
    {
      value: stats?.centers || 12,
      suffix: "",
      label: "Trung tâm nghiên cứu chuyên sâu",
      desc: "Đơn vị nghiên cứu & làm chủ các công nghệ lõi tiên tiến",
    },
    {
      value: stats?.provinces || 34,
      suffix: "",
      label: "Tỉnh, thành hiện diện",
      desc: "Mạng lưới phục vụ thực địa rộng khắp các tỉnh thành toàn quốc",
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
          NĂNG LỰC & MẠNG LƯỚI HỆ SINH THÁI
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
          Năng Lực Quy Mô & Mạng Lưới Toàn Quốc
        </h2>
      </div>

      {/* Connected Layout Container */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300">
        {/* Horizontal 4-Column Stats Grid joined with 1px divider lines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-white dark:bg-zinc-950 p-6 md:p-8 flex flex-col justify-between text-center group hover:bg-zinc-50 dark:hover:bg-zinc-900/80 transition-colors duration-300 min-h-[180px]"
            >
              <div className="text-3xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tighter font-heading leading-none group-hover:text-accent-red transition-colors duration-300">
                <AnimatedCounter target={item.value} suffix={item.suffix} />
              </div>
              <div className="space-y-1.5 mt-4">
                <h4 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-heading leading-snug">
                  {item.label}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[24ch] mx-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
