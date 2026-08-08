"use client";

import React from "react";
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
      provinces?: number;
    };
  } | null;
}

export function BentoIntro({ orgInfo }: BentoIntroProps) {
  const stats = [
    {
      value: orgInfo?.stats?.staff || 100,
      label: "Nhân sự",
      desc: "Đội ngũ nhân sự chuyên nghiệp, tận tâm",
      suffix: "+",
    },
    {
      value: orgInfo?.stats?.experts || 250,
      label: "Chuyên gia",
      desc: "Năng lực R&D phần cứng, phần mềm cao cấp",
      suffix: "+",
    },
    {
      value: orgInfo?.stats?.provinces || 10,
      label: "Tỉnh thành",
      desc: "Đo đạc, số hóa quy hoạch & GIS trên cả nước",
      suffix: "+",
    },
    {
      value: orgInfo?.stats?.projects || 120,
      label: "Dự án",
      desc: "Số hóa quy hoạch, GIS & IOC toàn quốc",
      suffix: "+",
    },
  ];

  return (
    <section className="space-y-16 select-none">
      {/* 2-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Authentic Photography (Larger Column, No Rounded Corners) */}
        <div className="lg:col-span-7 relative group">
          <div className="relative aspect-[3/2] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-lg transition-transform duration-700 hover:scale-[1.01]">
            <img
              src="/about-us/3A5A2610.JPG"
              alt="Trung tâm Đổi mới Sáng tạo Gia Lai"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dark gradient overlay for bottom label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
          </div>
        </div>

        {/* Right Column: Editorial Corporate Content (Smaller Column) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
              TỔNG QUAN TẬP ĐOÀN
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
              Hành trình chuyển đổi từ thực địa đến không gian 3D số hóa
            </h2>
          </div>

          <div className="space-y-6 text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed transition-colors duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight font-heading leading-snug transition-colors duration-300">
              {orgInfo?.name || "Trung tâm Đổi mới Sáng tạo Gia Lai"}
            </h3>

            {orgInfo?.description ? (
              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: orgInfo.description }}
              />
            ) : (
              <>
                <p>
                  Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do
                  doanh nghiệp đầu tư và vận hành. Chúng tôi đã trải qua gần 2
                  thập kỷ kiên trì phát triển, chuyển đổi mạnh mẽ từ các phương
                  pháp khảo sát trắc địa truyền thống sang vị thế tiên phong
                  trong chuyển đổi số toàn diện.
                </p>
                <p>
                  Tận dụng tối đa công nghệ tự động hóa UAV, kỹ thuật quét LiDAR
                  không gian và GIS, trung tâm xây dựng nền tảng bản đồ số 3D
                  (3DG Digital Twin) hỗ trợ quy hoạch đô thị thông minh và quản
                  trị hạ tầng lâm nghiệp bền vững tại vùng đất Tây Nguyên hùng
                  vĩ.
                </p>
              </>
            )}
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-zinc-400 transition-colors duration-300">
            <span>
              Mã số doanh nghiệp: {orgInfo?.businessLicenseNo || "4101443823"}
            </span>
            <span className="text-accent-red font-bold uppercase tracking-widest">
              VDCD GROUP · 2006 - 2026
            </span>
          </div>
        </div>
      </div>

      {/* Row of Metrics (Swiss Design / Clean tabular layout) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: idx * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-2 group text-center flex flex-col items-center"
          >
            <div className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tighter leading-none group-hover:text-accent-red transition-colors duration-300">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] md:text-xs font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider transition-colors duration-300">
                {stat.label}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed max-w-[20ch] transition-colors duration-300">
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
