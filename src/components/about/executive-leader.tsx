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

      {/* Content (2-Column Editorial: Left Photo | Right Info + Quote + Link) */}
      <div className="max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 md:gap-10">
          {/* Column 1 (Left): Photo Alone (256x256) */}
          <div className="w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] md:w-[240px] md:h-[240px] lg:w-[256px] lg:h-[256px] shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-us/sep-cao-quan-vu.webp"
              alt="Ông Cao Quân Vũ"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Column 2 (Right): Name/Role (Top) + Dialogue Quote (Bottom) + Link */}
          <div className="flex-1 min-w-0 flex flex-col justify-between space-y-4 self-stretch">
            {/* Top: Leader Info */}
            <div className="space-y-1 sm:space-y-1.5">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-accent-red font-bold block">
                LÃNH ĐẠO ĐIỀU HÀNH
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white font-heading leading-tight">
                Ông Cao Quân Vũ
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-snug">
                Phó Chủ tịch HĐQT kiêm Tổng Giám đốc
              </p>
            </div>

            {/* Bottom: Dialogue Quote Box */}
            <div className="relative p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/50 border-l-2 border-accent-red transition-colors duration-300">
              <div className="flex items-start gap-2.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-accent-red select-none leading-none shrink-0 -mt-0.5">
                  “
                </span>
                <p className="text-xs sm:text-[13.5px] md:text-sm text-zinc-850 dark:text-zinc-200 italic font-sans leading-relaxed flex-1">
                  Chúng tôi không bắt đầu từ những điều quá cao siêu. Chúng tôi
                  bắt đầu từ những khó khăn thực tế của người dân, cơ quan quản
                  lý và doanh nghiệp, để đưa công nghệ vào giải quyết những vấn
                  đề thiết thực và góp phần nâng cao chất lượng cuộc sống.
                  <span className="absolute text-2xl sm:text-3xl font-heading font-black text-accent-red select-none leading-none inline-block ml-1.5 align-baseline">
                    ”
                  </span>
                </p>
              </div>
            </div>

            {/* Action Link */}
            <div className="flex justify-end pt-0.5 hidden">
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
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
    </motion.section>
  );
}
