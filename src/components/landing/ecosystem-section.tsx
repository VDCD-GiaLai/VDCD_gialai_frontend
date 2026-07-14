"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { SOLUTIONS } from "@/data/solutions";

/** ────────────────────────────────────────────────────────────
 *  Ecosystem Section — FR-HOME-05
 *  Displays VDCD Group member units in a hub-spoke visual +
 *  interactive grid. Designed to sit below Featured Projects.
 *  ──────────────────────────────────────────────────────────── */

/* ── Animation variants ─────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Accent colors for each card (rotated) ──────────────────── */
const ACCENT_COLORS = [
  { ring: "ring-rose-500/20", dot: "bg-rose-500", glow: "shadow-rose-500/10" },
  {
    ring: "ring-amber-500/20",
    dot: "bg-amber-500",
    glow: "shadow-amber-500/10",
  },
  {
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-500/10",
  },
  { ring: "ring-sky-500/20", dot: "bg-sky-500", glow: "shadow-sky-500/10" },
  {
    ring: "ring-violet-500/20",
    dot: "bg-violet-500",
    glow: "shadow-violet-500/10",
  },
  {
    ring: "ring-orange-500/20",
    dot: "bg-orange-500",
    glow: "shadow-orange-500/10",
  },
];

/* ── Single ecosystem card ──────────────────────────────────── */
function EcosystemCard({
  item,
  index,
}: {
  item: (typeof SOLUTIONS)[number];
  index: number;
}) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariant}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 transition-all duration-500 hover:border-accent-red/30 dark:hover:border-accent-red/40 hover:shadow-xl ${accent.glow} ring-1 ${accent.ring}`}
    >
      {/* Image */}
      <div className="relative h-40 md:h-44 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Index badge */}
        <span
          className={`absolute top-3 left-3 w-7 h-7 rounded-full ${accent.dot} flex items-center justify-center text-[10px] font-bold text-white shadow-md`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Arrow */}
        <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <FiArrowUpRight className="w-3.5 h-3.5 text-white" />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <h3 className="text-sm md:text-[15px] font-bold text-black dark:text-white mb-2 leading-snug font-heading group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-secondary dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        {/* Bottom connector line */}
        <div className="mt-4 pt-3 border-t border-zinc-50 dark:border-zinc-800/40 flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`}
          />
          <span className="text-[10px] font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-widest">
            VDCD Ecosystem
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/* ── Hub visual (center of the ecosystem) ───────────────────── */
function HubVisual() {
  return (
    <div className="relative flex items-center justify-center py-8 md:py-0">
      {/* Outer pulsing ring */}
      <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-dashed border-accent-red/15 animate-spin [animation-duration:60s]" />
      <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full border border-accent-red/10 animate-spin [animation-duration:30s] [animation-direction:reverse]" />

      {/* Center logo area */}
      <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-accent-red/20 flex flex-col items-center justify-center shadow-xl shadow-accent-red/5">
        <span className="text-accent-red font-heading font-black text-lg md:text-xl tracking-tight">
          VDCD
        </span>
        <span className="text-[8px] md:text-[9px] font-mono-label text-secondary dark:text-zinc-400 uppercase tracking-[0.15em] mt-0.5">
          Group
        </span>
        <span className="absolute -inset-1.5 rounded-2xl border border-accent-red/10 animate-pulse [animation-duration:3s]" />
      </div>

      {/* Orbiting dots (decorative) */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="absolute w-2 h-2 rounded-full bg-accent-red/30"
          style={{
            transform: `rotate(${deg}deg) translateX(72px) rotate(-${deg}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,0,2,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,0,2,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
        {/* ── Header + Hub ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-20">
          {/* Text */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="inline-block font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase mb-4">
              Hệ sinh thái VDCD Group
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tighter text-black dark:text-white mb-5 leading-[1.15] font-heading">
              12 đơn vị chuyên biệt,
              <br className="hidden md:block" />
              một hệ sinh thái đồng bộ
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
              Mỗi trung tâm và viện nghiên cứu trong hệ sinh thái đều đảm nhận
              một mắt xích chiến lược — từ khảo sát bản đồ số, thiết kế BIM,
              giám sát IoT, đến phát triển AI và sản xuất nội dung số — tạo
              thành chuỗi giá trị công nghệ khép kín.
            </p>
          </motion.div>

          {/* Hub visual */}
          <motion.div
            className="hidden lg:flex lg:col-span-5 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <HubVisual />
          </motion.div>
        </div>

        {/* ── Ecosystem Grid ────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {SOLUTIONS.map((sol, i) => (
            <EcosystemCard key={sol.title} item={sol} index={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA ────────────────────────────── */}
        <motion.div
          className="mt-14 md:mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <a
            href="/solution"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-accent-red/20 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all duration-300 group"
          >
            Khám phá tất cả Giải pháp
            <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
