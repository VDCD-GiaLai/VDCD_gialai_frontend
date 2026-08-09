"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDatabase,
  FiTrendingUp,
  FiZap,
  FiGlobe,
  FiArrowUpRight,
} from "react-icons/fi";

interface OrientationItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}

export function DevelopmentOrientation() {
  const items: OrientationItem[] = [
    {
      id: "01",
      title: "Hạ tầng dữ liệu và công nghệ dùng chung",
      desc: "Phát triển nền tảng tích hợp, lưu trữ và khai thác dữ liệu phục vụ quản lý và ứng dụng công nghệ.",
      icon: FiDatabase,
    },
    {
      id: "02",
      title: "Ứng dụng công nghệ trong các ngành kinh tế chủ lực",
      desc: "Đưa các giải pháp số vào thực tiễn nhằm nâng cao hiệu quả quản lý, sản xuất và vận hành.",
      icon: FiTrendingUp,
    },
    {
      id: "03",
      title: "Hỗ trợ startup và doanh nghiệp đổi mới",
      desc: "Đồng hành trong tư vấn, đào tạo, thử nghiệm công nghệ và phát triển mô hình hoạt động.",
      icon: FiZap,
    },
    {
      id: "04",
      title: "Mở rộng mạng lưới kết nối",
      desc: "Kết nối Gia Lai với chuyên gia, doanh nghiệp, trường đại học, công nghệ và nguồn lực đầu tư trong nước.",
      icon: FiGlobe,
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* 35% – 65% Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: ~35% (lg:col-span-5) */}
        <motion.div
          className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header text */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
              ĐỊNH HƯỚNG PHÁT TRIỂN
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
              Kết Nối Nguồn Lực &ndash; Kiến Tạo Giá Trị Bền Vững
            </h2>
          </div>

          <p className="text-zinc-650 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-sans transition-colors duration-300">
            Trung tâm hướng đến xây dựng nền tảng đổi mới sáng tạo gắn với nhu
            cầu thực tiễn, tạo động lực thúc đẩy chuyển đổi số và phát triển
            kinh tế địa phương.
          </p>

          {/* Aerial drone map view image of Gia Lai with subtle data lines */}
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 group shadow-md aspect-[16/10]">
            <Image
              src="/images/home/farm_area_drone_view.webp"
              alt="Gia Lai từ trên cao - Nền tảng dữ liệu số"
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Tech grid & HUD Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none z-10" />
          </div>
        </motion.div>

        {/* Right Column: ~65% (lg:col-span-7) — 4 vertical rows */}
        <div className="lg:col-span-7 space-y-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between sm:justify-start gap-4 shrink-0">
                    <span className="font-mono text-2xl font-black text-accent-red opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.id}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-accent-red group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white font-heading leading-snug group-hover:text-accent-red transition-colors duration-300">
                        {item.title}
                      </h3>
                      <FiArrowUpRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
