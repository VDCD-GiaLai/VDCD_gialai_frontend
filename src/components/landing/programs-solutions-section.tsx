"use client";

import * as React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
        image: "/images/home/sol_startup.jpg",
        description:
          "Hỗ trợ ý tưởng từ giai đoạn hình thành đến thương mại hóa.",
      },
      {
        title: "Đào tạo và phát triển nhân lực",
        image: "/images/home/sol_training.jpg",
        description:
          "Nâng cao kỹ năng số, quản trị dữ liệu cho cán bộ địa phương.",
      },
      {
        title: "Kết nối chuyên gia – doanh nghiệp – nhà đầu tư",
        image: "/images/home/sol_networking.jpg",
        description:
          "Xây dựng mạng lưới liên kết đa bên, chuyển giao công nghệ.",
      },
      {
        title: "Tư vấn chuyển đổi số",
        image: "/images/home/sol_digital_transform.jpg",
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
        image: "/images/home/sol_uav.jpg",
        description:
          "Khảo sát, lập bản đồ và giám sát hiện trường bằng thiết bị bay.",
      },
      {
        title: "AI",
        image: "/images/home/sol_ai.jpg",
        description:
          "Phân tích dữ liệu thông minh, nhận diện và hỗ trợ ra quyết định.",
      },
      {
        title: "Autotimelapse",
        image: "/images/home/sol_timelapse.jpg",
        description: "Giám sát tiến độ công trình theo thời gian thực tự động.",
      },
      {
        title: "SmartScale",
        image: "/images/home/sol_smartscale.jpg",
        description: "Hệ thống cân đo thông minh kết nối IoT, đồng bộ dữ liệu.",
      },
      {
        title: "VR360",
        image: "/images/home/sol_vr360.jpg",
        description:
          "Tái hiện không gian thực tế ảo 360° phục vụ du lịch, BĐS.",
      },
      {
        title: "Data Center",
        image: "/images/home/sol_datacenter.jpg",
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setScrollProgress(el.scrollLeft / maxScroll);
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    updateScrollState();
  }, [activeId, updateScrollState]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 320;
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  const handleSwitch = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="programs-solutions"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      <div ref={containerRef} className="py-16 md:py-24">
        {/* ── Section Header ── */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-10 md:mb-14">
          <div className="ps-reveal text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Chương trình và giải pháp
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Kiến tạo hệ sinh thái đổi mới sáng tạo và chuyển giao công nghệ
              tiên phong cho Gia Lai & Tây Nguyên.
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

        {/* ── Carousel ── */}
        <div className="ps-reveal relative">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth px-4 md:px-8 pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Left spacer for centering on large screens */}
            <div className="shrink-0 w-0 lg:w-[calc((100vw-1600px)/2+16px)]" />

            {active.items.map((item, idx) => (
              <div
                key={`${activeId}-${idx}`}
                data-card
                className="group relative shrink-0 w-[280px] md:w-[320px] lg:w-[340px] aspect-[3/4] overflow-hidden snap-start cursor-pointer"
                style={{
                  animation: `cardFadeIn 0.5s ease-out ${idx * 0.08}s both`,
                }}
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="340px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Description - revealed on hover */}
                  <p className="text-zinc-300 text-xs leading-relaxed mb-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {item.description}
                  </p>

                  {/* Title */}
                  <h3 className="text-white text-base md:text-lg font-bold font-heading leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Index Badge */}
                <div className="absolute top-5 left-6">
                  <span className="font-mono text-[11px] font-bold text-white/50 tabular-nums">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}

            {/* Right spacer */}
            <div className="shrink-0 w-4 lg:w-[calc((100vw-1600px)/2+16px)]" />
          </div>

          {/* ── Navigation ── */}
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-8 flex items-center gap-6">
            {/* Progress Bar */}
            <div className="flex-1 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-red transition-all duration-200 ease-out rounded-full"
                style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
              />
            </div>

            {/* Arrow Buttons + Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer ${
                  canScrollLeft
                    ? "border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                }`}
                aria-label="Scroll left"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-10 h-10 flex items-center justify-center border transition-colors cursor-pointer ${
                  canScrollRight
                    ? "border-zinc-300 dark:border-zinc-600 text-black dark:text-white hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10"
                    : "border-zinc-200 dark:border-zinc-800 text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
                }`}
                aria-label="Scroll right"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe */}
      <style jsx>{`
        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
