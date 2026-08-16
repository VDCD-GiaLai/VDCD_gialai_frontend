"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Envelope } from "@phosphor-icons/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CareersCta() {
  return (
    <section className="py-8 md:py-12" aria-label="Kêu gọi ứng tuyển">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="p-8 md:p-16 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/80 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-4 tracking-widest uppercase block">
            Sẵn sàng chưa?
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white font-heading tracking-tight mb-4">
            Cùng kiến tạo tương lai số
            <br className="hidden md:block" />
            cho Gia Lai
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Gia nhập đội ngũ VDCD Group, nơi bạn không chỉ phát triển sự nghiệp
            mà còn trực tiếp đóng góp vào sự phát triển bền vững của cộng đồng
            và quê hương.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#positions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300"
              aria-label="Xem các vị trí đang tuyển"
            >
              Xem vị trí tuyển dụng
              <ArrowDown weight="thin" className="w-4 h-4" />
            </a>
            <a
              href="mailto:hr@vdcdgroup.vn"
              className="inline-flex items-center gap-2 px-8 py-4 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
              aria-label="Gửi email ứng tuyển"
            >
              Gửi hồ sơ qua email
              <Envelope weight="thin" className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
