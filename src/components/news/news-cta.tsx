"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const NewsCta = () => {
  return (
    <section
      className="pt-8 pb-12 md:pt-12 md:pb-16"
      aria-labelledby="news-cta-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <hr className="news-divider mb-10" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-lg">
              <span className="font-mono-label text-[11px] font-bold text-accent-red tracking-widest uppercase block mb-3">
                Liên hệ hợp tác
              </span>
              <h2
                id="news-cta-heading"
                className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white font-heading mb-3"
              >
                Bạn có câu chuyện muốn chia sẻ?
              </h2>
              <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                Liên hệ với chúng tôi để hợp tác truyền thông, chia sẻ dự án
                hoặc gửi thông tin sự kiện.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black font-mono-label text-[11px] font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300"
                aria-label="Liên hệ với VDCD"
              >
                Liên hệ ngay
                <ArrowUpRight weight="thin" className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-300 dark:border-zinc-700 text-black dark:text-white font-mono-label text-[11px] font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
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
