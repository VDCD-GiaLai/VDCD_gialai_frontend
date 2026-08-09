"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/* ────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────── */

interface SolutionCard {
  title: string;
  image: string;
  description: string;
}

interface Category {
  id: string;
  label: string;
  items: SolutionCard[];
}

const CATEGORIES: Category[] = [
  {
    id: "programs",
    label: "Chương trình",
    items: [
      {
        title: "Ươm tạo khởi nghiệp sáng tạo",
        image: "/images/home/sol_startup.webp",
        description:
          "Hỗ trợ ý tưởng từ giai đoạn hình thành đến thương mại hóa.",
      },
      {
        title: "Đào tạo và phát triển nhân lực",
        image: "/images/home/sol_training.webp",
        description:
          "Nâng cao kỹ năng số, quản trị dữ liệu cho cán bộ địa phương.",
      },
      {
        title: "Kết nối chuyên gia – doanh nghiệp – nhà đầu tư",
        image: "/images/home/sol_networking.webp",
        description:
          "Xây dựng mạng lưới liên kết đa bên, chuyển giao công nghệ.",
      },
      {
        title: "Tư vấn chuyển đổi số",
        image: "/images/home/sol_digital_transform.webp",
        description:
          "Đánh giá hiện trạng, lộ trình và triển khai giải pháp số.",
      },
    ],
  },
  {
    id: "solutions",
    label: "Giải pháp công nghệ",
    items: [
      {
        title: "UAV",
        image: "/images/home/sol_uav.webp",
        description:
          "Khảo sát, lập bản đồ và giám sát hiện trường bằng thiết bị bay.",
      },
      {
        title: "AI",
        image: "/images/home/sol_ai.webp",
        description:
          "Phân tích dữ liệu thông minh, nhận diện và hỗ trợ ra quyết định.",
      },
      {
        title: "Autotimelapse",
        image: "/images/home/sol_timelapse.webp",
        description: "Giám sát tiến độ công trình theo thời gian thực tự động.",
      },
      {
        title: "SmartScale",
        image: "/images/home/sol_smartscale.webp",
        description: "Hệ thống cân đo thông minh kết nối IoT, đồng bộ dữ liệu.",
      },
      {
        title: "VR360",
        image: "/images/home/sol_vr360.webp",
        description:
          "Tái hiện không gian thực tế ảo 360° phục vụ du lịch, BĐS.",
      },
      {
        title: "Data Center",
        image: "/images/home/sol_datacenter.webp",
        description: "Hạ tầng lưu trữ và xử lý dữ liệu chuẩn quốc tế.",
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────── */

export function ProgramsSolutionsSection() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  const containerRef = useScrollReveal({
    targets: ".ps-reveal",
    options: {
      y: 24,
      blur: 4,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  const handleSwitch = useCallback((id: string) => {
    setActiveId(id);
    setActiveCardIndex(0);
  }, []);

  return (
    <section
      id="programs-solutions"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
    >
      <div ref={containerRef} className="py-10 md:py-14">
        {/* ── Section Header ── */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-8 md:mb-10">
          <div className="ps-reveal text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Chương trình và giải pháp
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Kiến tạo hệ sinh thái đổi mới sáng tạo và chuyển giao công nghệ
              tiên phong cho Gia Lai &amp; Tây Nguyên.
            </p>
          </div>

          {/* ── Category Tabs ── */}
          <div className="ps-reveal flex justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSwitch(cat.id)}
                  className={`
                    px-6 py-3 font-mono-label text-xs font-bold uppercase tracking-widest
                    transition-all duration-300 cursor-pointer border
                    ${
                      isActive
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "bg-transparent text-secondary dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:text-black dark:hover:text-white hover:border-zinc-500"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Horizontal Accordion Cards (hover to expand, like Kim chỉ nam) ── */}
        <div className="ps-reveal max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-3 w-full min-h-[380px] md:min-h-[420px] items-stretch">
            {active.items.map((item, idx) => {
              const isOpen = activeCardIndex === idx;

              return (
                <div
                  key={`${activeId}-${idx}`}
                  onClick={() => setActiveCardIndex(idx)}
                  onMouseEnter={() => setActiveCardIndex(idx)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out flex flex-col justify-between p-6 md:p-8 text-white ${
                    isOpen
                      ? "flex-[3.5] shadow-md"
                      : "flex-1 opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center scale-105"
                      transformation={[
                        { width: 600, quality: 80, format: "auto" },
                      ]}
                    />
                  </div>

                  {/* Dark Overlay */}
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      isOpen ? "bg-black/40" : "bg-black/20"
                    }`}
                  />

                  {/* Bottom: Text Content */}
                  <div className="space-y-3 relative z-10 mt-8">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight font-heading leading-snug uppercase">
                      {item.title}
                    </h3>

                    {/* Smooth collapse container — shown on active/hover */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isOpen
                          ? "max-h-[200px] opacity-100 mt-2"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Corner accent line */}
                  <span
                    className={`absolute top-0 right-0 h-1 bg-accent-red transition-all duration-500 ${
                      isOpen ? "w-1/3" : "w-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
