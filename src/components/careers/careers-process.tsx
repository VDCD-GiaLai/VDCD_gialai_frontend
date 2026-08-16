"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { RECRUITMENT_STEPS } from "@/data/careers.data";

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
  visible: { transition: { staggerChildren: 0.1 } },
};

export function CareersProcess() {
  return (
    <section
      className="py-8 md:py-12 bg-zinc-50/50 dark:bg-zinc-900/20"
      aria-labelledby="process-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Quy trình tuyển dụng
          </span>
          <h2
            id="process-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Hành trình gia nhập VDCD
          </h2>
        </motion.div>

        <motion.div
          className="careers-timeline"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {RECRUITMENT_STEPS.map((step) => (
            <motion.div
              key={step.step}
              className="careers-timeline-step"
              variants={fadeInUp}
            >
              <div className="careers-timeline-dot" aria-hidden="true">
                {step.step.toString().padStart(2, "0")}
              </div>
              <div className="mt-4 md:mt-5">
                <h3 className="text-sm md:text-base font-bold text-black dark:text-white font-heading mb-1">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-secondary dark:text-zinc-400 leading-relaxed max-w-[160px] mx-auto md:mx-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
