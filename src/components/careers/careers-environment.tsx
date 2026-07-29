"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { EMPLOYEE_STORIES } from "@/data/careers.data";

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

const GALLERY_LABELS = [
  "Văn phòng làm việc",
  "Họp nhóm dự án",
  "Hoạt động đào tạo",
  "Teambuilding",
  "Nghiên cứu thực địa",
];

export function CareersEnvironment() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="environment-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Gallery Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Môi trường làm việc
          </span>
          <h2
            id="environment-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Cuộc sống tại VDCD
          </h2>
        </motion.div>

        {/* Gallery Grid with placeholders */}
        <motion.div
          className="careers-gallery-grid mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {GALLERY_LABELS.map((label, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 group rounded-lg"
              variants={fadeInUp}
            >
              {/* Placeholder gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-200/60 via-zinc-100/30 to-zinc-200/40 dark:from-zinc-800/60 dark:via-zinc-900/30 dark:to-zinc-800/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest text-center px-4">
                  {label}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Employee Stories */}
        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Câu chuyện nhân viên
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading">
            Tiếng nói từ đội ngũ
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {EMPLOYEE_STORIES.map((story) => (
            <motion.div
              key={story.id}
              className="testimonial-card rounded-xl p-6 flex flex-col"
              variants={fadeInUp}
            >
              {/* Quote */}
              <div className="flex-1 mb-6">
                <span
                  className="text-4xl font-heading font-bold text-accent-red/20 leading-none block mb-2"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed italic">
                  {story.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                  <FiUser className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black dark:text-white font-heading">
                    {story.name}
                  </p>
                  <p className="text-[11px] font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-wider">
                    {story.department}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
