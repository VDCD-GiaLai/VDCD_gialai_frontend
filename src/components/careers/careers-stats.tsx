"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CAREERS_STATS } from "@/data/careers.data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CareersStats() {
  return (
    <section className="py-16 md:py-20" aria-label="Thống kê nhân sự VDCD">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/80 px-8 py-12 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center lg:text-left divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            {CAREERS_STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-2 pt-6 md:pt-0 md:px-6 first:pt-0 first:border-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white font-heading tracking-tight">
                  <AnimatedCounter
                    target={stat.numericValue}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
