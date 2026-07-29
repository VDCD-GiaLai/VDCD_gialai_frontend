"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FiTrendingUp,
  FiMonitor,
  FiBookOpen,
  FiAward,
  FiGlobe,
  FiHeart,
} from "react-icons/fi";
import { BENEFITS } from "@/data/careers.data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FiTrendingUp,
  FiMonitor,
  FiBookOpen,
  FiAward,
  FiGlobe,
  FiHeart,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function CareersBenefits() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="benefits-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Phúc lợi & Đãi ngộ
          </span>
          <h2
            id="benefits-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Tại sao chọn VDCD Gia Lai?
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = ICON_MAP[benefit.icon] || FiGlobe;

            return (
              <motion.div
                key={idx}
                className="group double-bezel-outer transition-all duration-500 hover:scale-[1.01]"
                variants={fadeInUp}
              >
                <div className="double-bezel-inner p-6 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-accent-red/5 dark:bg-accent-red/10 flex items-center justify-center mb-5 group-hover:bg-accent-red/10 dark:group-hover:bg-accent-red/20 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 text-accent-red" />
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white font-heading mb-2 group-hover:text-accent-red transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
