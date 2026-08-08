"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowRight,
  FiActivity,
  FiLayers,
  FiCpu,
  FiCheckCircle,
  FiShield,
  FiGlobe,
} from "react-icons/fi";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const PILLARS = [
  {
    icon: <FiGlobe className="w-4 h-4 text-accent-red" />,
    title: "Thu thập dữ liệu hiện trường",
    description:
      "Khảo sát drone, số hóa bản đồ GIS & kết nối cảm biến IoT hiện trường tức thì.",
  },
  {
    icon: <FiCpu className="w-4 h-4 text-accent-red" />,
    title: "Phân tích & Quản lý tập trung",
    description:
      "Tự động xử lý dữ liệu lớn, tối ưu quy trình và hỗ trợ kiểm soát thời gian thực.",
  },
  {
    icon: <FiShield className="w-4 h-4 text-accent-red" />,
    title: "Hỗ trợ ra quyết định số",
    description:
      "Đồng hành cùng chính quyền & doanh nghiệp nâng cao hiệu quả vận hành thực tế.",
  },
];

export function DigitalPioneerSection() {
  const containerRef = useScrollReveal({
    targets: ".pioneer-reveal",
    options: {
      y: 24,
      blur: 4,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  return (
    <section
      id="digital-pioneer"
      className="relative border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 py-16 md:py-24 transition-colors duration-300 overflow-hidden"
    >
      {/* Background Subtle Tech Pattern Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10"
      >
        {/* Section Tag */}
        <div className="pioneer-reveal mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span className="font-mono-label text-xs font-bold text-accent-red uppercase tracking-widest block">
            Tiên phong đổi mới sáng tạo
          </span>
        </div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Heading & Comprehensive Narrative (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="pioneer-reveal space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                Tiên phong công nghệ số &mdash; Làm chủ hiện trường trong tầm
                tay
              </h2>

              <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed font-sans">
                Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia
                và nguồn lực từ hệ sinh thái VDCD Group nhằm đưa các giải pháp
                số vào thực tiễn. Từ thu thập dữ liệu hiện trường, phân tích,
                quản lý đến hỗ trợ ra quyết định, Trung tâm đồng hành cùng cơ
                quan quản lý và doanh nghiệp trong quá trình đổi mới, chuyển đổi
                số và nâng cao hiệu quả hoạt động.
              </p>

              {/* 3 Core Value Pillars */}
              <div className="pt-4 space-y-4">
                {PILLARS.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/50 hover:border-accent-red/40 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 shadow-xs"
                  >
                    <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-accent-red/10 transition-colors">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black dark:text-white mb-0.5 font-heading">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-secondary dark:text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pioneer-reveal pt-8">
              <Link
                href="/solution"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 shadow-sm hover:translate-x-1"
              >
                Khám phá giải pháp công nghệ
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="pioneer-reveal h-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Primary Feature Visual (Col 7) */}
              <div className="md:col-span-7 relative group min-h-[380px] md:min-h-[480px] rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src="/images/home/pioneer_field_tech.webp"
                  alt="Khảo sát dữ liệu hiện trường"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent-red font-bold block mb-1">
                    Công nghệ số hóa
                  </span>
                  <h3 className="text-lg md:text-xl font-bold font-heading leading-snug">
                    Làm chủ thiết bị & hạ tầng thu thập thông tin địa lý
                  </h3>
                </div>
              </div>

              {/* Secondary Feature Visual + Metrics (Col 5) */}
              <div className="md:col-span-5 flex flex-col gap-6">
                {/* Secondary Image */}
                <div className="relative group h-56 md:h-64 rounded-none border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/images/home/digital_command_center.webp"
                    alt="Trung tâm phân tích & điều hành"
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-accent-red font-bold block">
                      Trung tâm điều hành
                    </span>
                    <p className="text-xs font-bold font-heading truncate">
                      Phân tích &amp; hỗ trợ quyết định
                    </p>
                  </div>
                </div>

                {/* Double Bezel Stats Box */}
                <div className="flex-1 double-bezel-outer bg-zinc-50 dark:bg-zinc-900/60 p-1 flex flex-col justify-center">
                  <div className="double-bezel-inner p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-[10px] font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
                        Khả năng tích hợp
                      </span>
                      <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1 text-black dark:text-white">
                          <span>GIS &amp; Bản đồ 3D</span>
                          <span className="text-accent-red">100%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-red w-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1 text-black dark:text-white">
                          <span>Cảm biến IoT hiện trường</span>
                          <span className="text-accent-red">100%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-accent-red w-full" />
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-secondary dark:text-zinc-400 leading-tight pt-1">
                      Sẵn sàng đồng hành cùng 63 tỉnh thành trong tiến trình đổi
                      mới sáng tạo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
