"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function BentoIntro() {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    fetchOrganizationInfoFromApi()
      .then(setOrgInfo)
      .catch(() => {});
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 pb-12 space-y-20">
      {/* Khối Bento 1 – Giới thiệu chung & Ảnh bên trái */}
      <section id="introduction" className="space-y-12 scroll-mt-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Ô 1: Ảnh đội ngũ VDCD (bên trái, to hơn, không bo góc) */}
          <motion.div
            className="lg:col-span-7 relative min-h-[400px] lg:min-h-[520px] overflow-hidden border border-slate-200 dark:border-zinc-800 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Image
              src="/about-us/3A5A2610.JPG"
              alt="Đội ngũ VDCD Group tại hiện trường"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>

          {/* Ô 2: Giới thiệu chung (bên phải, không bo góc) */}
          <motion.div
            className="lg:col-span-5 p-8 md:p-12 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col justify-between relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="space-y-6">
              <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block">
                VDCD Group
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                {orgInfo?.name || "Trung tâm Đổi mới Sáng tạo Gia Lai"}
              </h2>
              <p className="text-xs md:text-sm font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Giấy chứng nhận đăng ký kinh doanh số:{" "}
                {orgInfo?.businessLicenseNo || "4101443823"}
              </p>
              <div className="space-y-4 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                <p>
                  {orgInfo?.description ||
                    "Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do doanh nghiệp đầu tư và vận hành. Trung tâm được hình thành nhằm kết nối nguồn lực công nghệ, chuyên gia, doanh nghiệp và dữ liệu; thúc đẩy ứng dụng công nghệ, chuyển đổi số và phát triển hệ sinh thái khởi nghiệp sáng tạo tại địa phương."}
                </p>
                <p>
                  Với định hướng lấy nhu cầu thực tiễn làm trung tâm, Trung tâm
                  không chỉ là không gian kết nối mà còn trực tiếp đồng hành
                  trong quá trình tư vấn, thử nghiệm, đào tạo, chuyển giao và
                  triển khai công nghệ số tại khu vực Tây Nguyên.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Network & Statistics Section */}
      <section
        id="stats"
        className="border-t border-b border-zinc-200/50 dark:border-zinc-800/50 py-16 scroll-mt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Editorial intro */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block">
              Chỉ số phát triển
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Hệ sinh thái qua các con số
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Nền tảng năng lực thực chất của VDCD Group được xây dựng bền bỉ
              qua từng dự án thực tế trên toàn quốc.
            </p>
          </div>

          {/* Right: Scorecard Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative p-8 md:p-10 bg-white/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs backdrop-blur-xs flex flex-col justify-between min-h-[160px]">
              <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                <AnimatedCounter
                  target={orgInfo?.stats?.staff ?? 1500}
                  suffix="+"
                />
              </div>
              <div>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                  Cán bộ, Nhân sự
                </span>
                <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                  Đội ngũ nhân lực vững chuyên môn hoạt động trên toàn quốc.
                </p>
              </div>
            </div>

            <div className="relative p-8 md:p-10 bg-white/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs backdrop-blur-xs flex flex-col justify-between min-h-[160px]">
              <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                <AnimatedCounter
                  target={orgInfo?.stats?.centers ?? 12}
                  suffix=""
                />
              </div>
              <div>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                  Viện & Trung Tâm R&D
                </span>
                <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                  Hệ thống đơn vị nghiên cứu phát triển công nghệ chuyên sâu.
                </p>
              </div>
            </div>

            <div className="relative p-8 md:p-10 bg-white/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs backdrop-blur-xs flex flex-col justify-between min-h-[160px]">
              <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                <AnimatedCounter
                  target={orgInfo?.stats?.experts ?? 250}
                  suffix="+"
                />
              </div>
              <div>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                  Chuyên Gia & Kỹ Sư
                </span>
                <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                  Nhân lực chất lượng cao, các thạc sĩ, tiến sĩ R&D phần cứng và
                  phần mềm.
                </p>
              </div>
            </div>

            <div className="relative p-8 md:p-10 bg-white/70 dark:bg-zinc-900/70 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs backdrop-blur-xs flex flex-col justify-between min-h-[160px]">
              <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                <AnimatedCounter
                  target={orgInfo?.stats?.projects ?? 100}
                  suffix="+"
                />
              </div>
              <div>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                  Dự án triển khai
                </span>
                <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                  Hàng trăm dự án chuyển đổi số và công nghệ quy mô lớn trên
                  toàn quốc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
