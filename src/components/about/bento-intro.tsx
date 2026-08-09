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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image (50% width: lg:col-span-6) */}
        <div className="lg:col-span-6 relative group">
          <div className="relative aspect-[3/2] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-lg transition-transform duration-700 hover:scale-[1.01]">
            <img
              src="/about-us/3A5A2610.webp"
              alt="Trung tâm Đổi mới Sáng tạo Gia Lai"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dark gradient overlay for bottom label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
          </div>
        </div>

        {/* Right Column: Content (50% width: lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
              TRUNG TÂM ĐỔI MỚI SÁNG TẠO
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tighter text-accent-red font-heading leading-tight uppercase transition-colors duration-300">
              GIA LAI
            </h1>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500 pt-1.5">
              Mã số doanh nghiệp: {orgInfo?.businessLicenseNo || "4101443823"}
            </p>
          </div>

          <div className="space-y-6 text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed transition-colors duration-300">
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
        </div>
      </div>
    </section>
  );
}
