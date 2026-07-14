"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/** ────────────────────────────────────────────────
 *  Partner / Client data crawled from vdcd.vn
 *  ──────────────────────────────────────────────── */
const PARTNERS = [
  { name: "VTV", logo: "https://vdcd.vn/wp-content/uploads/2025/11/1.png" },
  { name: "Lotte", logo: "https://vdcd.vn/wp-content/uploads/2025/11/3.png" },
  {
    name: "Sungroup",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/1-1.png",
  },
  {
    name: "Samsung",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/4.png",
  },
  {
    name: "Petrolimex",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/5.png",
  },
  {
    name: "VinGroup",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/6.png",
  },
  {
    name: "Hòa Phát",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/7.png",
  },
  { name: "FLC", logo: "https://vdcd.vn/wp-content/uploads/2025/11/8.png" },
  {
    name: "Đường sắt Việt Nam",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/9.png",
  },
  {
    name: "Phúc Lộc",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/2.png",
  },
  {
    name: "Silk Path",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/10.png",
  },
  {
    name: "Hòa Bình",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/12.png",
  },
  {
    name: "Six Senses",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/13.png",
  },
  {
    name: "DELTA",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/15.png",
  },
  { name: "GIZA", logo: "https://vdcd.vn/wp-content/uploads/2025/11/17.png" },
  {
    name: "Tân Á Đại Thành",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/18.png",
  },
  {
    name: "Hoàng Thịnh Đạt",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/19.png",
  },
  {
    name: "NOVA Land",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/20.png",
  },
  {
    name: "NOVASIA Energy",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/21.png",
  },
  {
    name: "Tuần Châu",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/22.png",
  },
  {
    name: "CIENCO8",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/3-1.png",
  },
  {
    name: "Flamingo",
    logo: "https://vdcd.vn/wp-content/uploads/2025/11/4-1.png",
  },
] as const;

/** ────────────────────────────────────────────────
 *  Single logo item rendered inside the marquee
 *  ──────────────────────────────────────────────── */
function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <span className="marquee-item group/logo" title={name}>
      <Image
        src={logo}
        alt={name}
        width={120}
        height={48}
        className="h-8 md:h-10 w-auto object-contain pointer-events-none select-none"
        loading="lazy"
      />
    </span>
  );
}

/** ────────────────────────────────────────────────
 *  Partners Section — inspired by qount.io
 *  integrations ticker design
 *  ──────────────────────────────────────────────── */
export function PartnersSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  /* Duplicate the list so the marquee loops seamlessly */
  const allLogos = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="partners"
      className="relative border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12 md:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Subtitle */}
          <span className="inline-block font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase mb-4">
            Khách hàng & Đối tác
          </span>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tighter text-black dark:text-white mb-5 leading-[1.15] font-heading">
            Đồng hành cùng những
            <br className="hidden md:block" /> thương hiệu hàng đầu
          </h2>

          {/* Description */}
          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
            VDCD tự hào là đối tác chiến lược của các tập đoàn, doanh nghiệp lớn
            trong nước và quốc tế, cùng xây dựng hạ tầng và giải pháp công nghệ
            tiên tiến.
          </p>
        </motion.div>

        {/* ── Marquee Ticker Row 1 (→ left) ──────────── */}
        <div className="marquee-container mb-4">
          <div
            className="marquee-track"
            style={{ ["--marquee-duration" as string]: "50s" }}
          >
            {allLogos.map((p, i) => (
              <PartnerLogo key={`row1-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>

        {/* ── Marquee Ticker Row 2 (→ right, reversed) ── */}
        <div className="marquee-container">
          <div
            className="marquee-track"
            style={{
              ["--marquee-duration" as string]: "55s",
              animationDirection: "reverse",
            }}
          >
            {[...allLogos].reverse().map((p, i) => (
              <PartnerLogo key={`row2-${i}`} name={p.name} logo={p.logo} />
            ))}
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────── */}
        <motion.div
          className="max-w-xl mx-auto text-center mt-12 md:mt-16 lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="text-secondary dark:text-zinc-500 text-xs md:text-sm leading-relaxed">
            Cùng hơn{" "}
            <span className="font-semibold text-black dark:text-white">
              500+ dự án
            </span>{" "}
            đã triển khai trên khắp Việt Nam, chúng tôi không ngừng mở rộng mạng
            lưới hợp tác chiến lược.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
