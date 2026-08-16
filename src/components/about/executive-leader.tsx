"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";

export function ExecutiveLeader() {
  return (
    <motion.section
      className="select-none"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Top Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />

      {/* Content */}
      <div className="py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        {/* Photo */}
        <div className="w-20 h-20 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about-us/sep-cao-quan-vu.webp"
            alt="Ông Cao Quân Vũ"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Block */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-accent-red font-bold block">
            LÃNH ĐẠO ĐIỀU HÀNH
          </span>
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-heading leading-tight">
            Ông Cao Quân Vũ
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-tight">
            Phó Chủ tịch HĐQT kiêm Tổng Giám đốc
          </p>
          <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-400 italic leading-relaxed pt-1 max-w-xl">
            &ldquo;Kết nối công nghệ và nguồn lực, kiến tạo nền tảng đổi mới
            sáng tạo cho Gia Lai và khu vực Tây Nguyên.&rdquo;
          </p>
        </div>

        {/* Action Link */}
        <Link
          href="/leadership"
          className="inline-flex items-center gap-1.5 text-accent-red hover:text-accent-red/80 text-xs sm:text-sm font-semibold transition-colors duration-300 shrink-0 cursor-pointer group"
        >
          <span className="group-hover:underline underline-offset-2">
            Xem thông tin lãnh đạo
          </span>
          <ArrowRight
            size={13}
            weight="bold"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {/* Bottom Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
    </motion.section>
  );
}
