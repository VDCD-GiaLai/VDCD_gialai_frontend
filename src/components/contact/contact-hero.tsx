"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ContactHero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      aria-labelledby="contact-hero-heading"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas-white via-canvas-white to-zinc-50/80 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900/50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-red/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
          >
            Trở lại Trang chủ
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-4 tracking-widest uppercase block">
              Liên hệ
            </span>
            <h1
              id="contact-hero-heading"
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white mb-6 leading-none font-heading uppercase"
            >
              Kết nối cùng
              <br />
              VDCD Group
            </h1>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl mb-8">
              Hãy liên hệ với chúng tôi để được tư vấn về các giải pháp chuyển
              đổi số, hợp tác dự án, hoặc bất kỳ thông tin nào bạn cần. Đội ngũ
              VDCD luôn sẵn sàng hỗ trợ.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300"
                aria-label="Gửi tin nhắn cho chúng tôi"
              >
                Gửi tin nhắn
              </a>
              <a
                href="tel:02693000000"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
                aria-label="Gọi hotline VDCD"
              >
                Gọi ngay
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 hidden lg:flex flex-col items-end gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-zinc-800/40">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono-label text-[11px] font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest">
                Sẵn sàng hỗ trợ
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
