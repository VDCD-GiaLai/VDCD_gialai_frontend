"use client";

import React from "react";
import { ImageComparisonSlider } from "./image-comparison-slider";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { motion } from "framer-motion";

interface BentoIntroProps {
  orgInfo?: {
    name?: string;
    description?: string;
    businessLicenseNo?: string;
    stats?: {
      staff?: number;
      experts?: number;
      centers?: number;
      projects?: number;
    };
  } | null;
}

export function BentoIntro({ orgInfo }: BentoIntroProps) {
  const stats = [
    {
      value: 2006,
      label: "Năm thành lập",
      desc: "Bắt đầu từ đo đạc truyền thống tại Gia Lai",
      suffix: "",
    },
    {
      value: orgInfo?.stats?.centers || 12,
      label: "Viện & Trung tâm",
      desc: "Nghiên cứu & phát triển trên khắp Tây Nguyên",
      suffix: "+",
    },
    {
      value: orgInfo?.stats?.experts || 250,
      label: "Chuyên gia & Kỹ sư",
      desc: "Năng lực R&D phần cứng, phần mềm cao cấp",
      suffix: "+",
    },
    {
      value: orgInfo?.stats?.projects || 100,
      label: "Dự án quy mô",
      desc: "Số hóa quy hoạch, GIS & IOC toàn quốc",
      suffix: "+",
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* Editorial Section Header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
          TỔNG QUAN TẬP ĐOÀN
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
          Hành trình chuyển đổi từ thực địa đến không gian 3D số hóa
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Cell 1: Main Introduction Text */}
        <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-8 relative overflow-hidden group">
          {/* Subtle decoration grid background */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-zinc-100/50 dark:to-zinc-950/20 opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-red/5 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-block px-3 py-1 bg-accent-red/10 border border-accent-red/20 rounded-full text-[10px] font-mono font-semibold text-accent-red uppercase tracking-wider">
              Khởi tạo đổi mới
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight font-heading leading-snug">
              {orgInfo?.name || "Trung tâm Đổi mới Sáng tạo Gia Lai"}
            </h3>

            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              <p>
                {orgInfo?.description ||
                  "Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do doanh nghiệp đầu tư và vận hành. Chúng tôi đã trải qua gần 2 thập kỷ kiên trì phát triển, chuyển đổi mạnh mẽ từ các phương pháp khảo sát trắc địa truyền thống sang vị thế tiên phong trong chuyển đổi số toàn diện."}
              </p>
              <p>
                Tận dụng tối đa công nghệ tự động hóa UAV, kỹ thuật quét LiDAR
                không gian và GIS, trung tâm xây dựng nền tảng bản đồ số 3D (3DG
                Digital Twin) hỗ trợ quy hoạch đô thị thông minh và quản trị hạ
                tầng lâm nghiệp bền vững tại vùng đất Tây Nguyên hùng vĩ.
              </p>
            </div>
          </div>

          <div className="relative z-10 border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Mã số doanh nghiệp: {orgInfo?.businessLicenseNo || "4101443823"}
            </span>
            <span className="text-xs font-mono text-accent-red font-bold uppercase tracking-widest">
              VDCD GROUP · 2006 - 2026
            </span>
          </div>
        </div>

        {/* Cell 2: Image Comparison Slider */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <ImageComparisonSlider
            leftImage="/images/home/farm_area_view.jpg"
            rightImage="/images/home/hethongdothiso.jpg"
            leftAlt="Thực địa Vệ tinh (Satellite)"
            rightAlt="Số hóa 3D (Digital Twin)"
          />
        </div>

        {/* Cell 3: Glassmorphic Stats Grid */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: idx * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl flex flex-col justify-between gap-4 overflow-hidden shadow-xs hover:border-accent-red/30 transition-colors duration-300"
            >
              {/* Highlight Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-red/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 space-y-1">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-accent-red transition-colors duration-300">
                  {stat.label}
                </span>
                <p className="text-zinc-500 dark:text-zinc-500 text-[10px] leading-tight max-w-[20ch]">
                  {stat.desc}
                </p>
              </div>

              <div className="relative z-10 text-4xl md:text-5xl font-black text-zinc-900 dark:text-white font-heading tracking-tighter tabular-nums leading-none">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
