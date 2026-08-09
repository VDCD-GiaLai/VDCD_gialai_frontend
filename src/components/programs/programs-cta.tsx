"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ProgramsCta = () => {
  return (
    <section className="py-16 md:py-24" aria-labelledby="programs-cta-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-black via-zinc-900 to-zinc-800 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-8 md:p-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-red/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="font-mono-label text-xs font-bold text-accent-red mb-4 tracking-widest uppercase block">
                Hợp tác cùng VDCD
              </span>
              <h2
                id="programs-cta-heading"
                className="text-2xl md:text-4xl font-bold tracking-tight text-white font-heading mb-4"
              >
                Bạn quan tâm đến
                <br />
                chương trình của chúng tôi?
              </h2>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
                Liên hệ để tìm hiểu thêm về các chương trình đổi mới sáng tạo,
                đăng ký tham gia hoặc đề xuất hợp tác. VDCD luôn sẵn sàng đồng
                hành.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all duration-300"
                aria-label="Liên hệ với VDCD"
              >
                Liên hệ ngay
                <ArrowUpRight weight="thin" className="w-4 h-4" />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-600 text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
                aria-label="Tìm hiểu về VDCD"
              >
                Về chúng tôi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
