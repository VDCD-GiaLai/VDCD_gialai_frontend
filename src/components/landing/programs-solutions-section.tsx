"use client";

import * as React from "react";
import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

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
  const [scrollProgress, setScrollProgress] = useState(0);

  /* refs for GSAP horizontal scroll */
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

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
  }, []);

  /* ── GSAP ScrollTrigger: horizontal scroll driven by vertical scroll ── */
  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current || !cardsWrapperRef.current)
      return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /* Reduced motion: just show everything, no scroll animation */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-card]", { autoAlpha: 1 });
      });

      /* Normal motion + desktop: horizontal scroll */
      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          /* We need to wait a tick for cards to render after category switch */
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-card]",
            cardsWrapperRef.current!,
          );
          if (cards.length === 0) return;

          /* Calculate how far we need to scroll horizontally */
          const calcScrollDistance = () => {
            const wrapper = cardsWrapperRef.current!;
            return wrapper.scrollWidth - wrapper.clientWidth;
          };

          const tween = gsap.to(cardsWrapperRef.current!, {
            x: () => -calcScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current!,
              start: "top top",
              end: () => `+=${calcScrollDistance() + window.innerHeight * 0.3}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setScrollProgress(self.progress);
              },
            },
          });

          /* Entry animation for cards */
          cards.forEach((card, i) => {
            gsap.from(card, {
              autoAlpha: 0,
              y: 30,
              scale: 0.97,
              duration: 0.6,
              ease: "power3.out",
              delay: i * 0.08,
              scrollTrigger: {
                trigger: sectionRef.current!,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          });

          return () => {
            tween.kill();
          };
        },
      );

      /* Mobile: no horizontal scroll, just a vertical stack with stagger reveal */
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-card]",
          cardsWrapperRef.current!,
        );
        cards.forEach((card, i) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 24,
            duration: 0.5,
            ease: "power3.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeId]); // Re-initialize when category changes

  return (
    <section
      ref={sectionRef}
      id="programs-solutions"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
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

        {/* ── Horizontal Scroll Track ── */}
        <div ref={trackRef} className="ps-reveal relative overflow-hidden">
          <div
            ref={cardsWrapperRef}
            className="flex gap-4 md:gap-6 px-4 md:px-8 will-change-transform"
            style={{
              /* On desktop: inline layout for horizontal scroll.
                 On mobile: we override to vertical via the className below. */
              paddingLeft: "max(1rem, calc((100vw - 1600px) / 2 + 2rem))",
              paddingRight: "max(1rem, calc((100vw - 1600px) / 2 + 2rem))",
            }}
          >
            {active.items.map((item, idx) => (
              <div
                key={`${activeId}-${idx}`}
                data-card
                className="group relative shrink-0 w-[280px] md:w-[320px] lg:w-[360px] aspect-[3/4] overflow-hidden cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="360px"
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
          </div>
        </div>

        {/* ── Progress Bar ── */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-8">
          <div className="ps-reveal">
            {/* Progress Bar */}
            <div className="h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-red transition-[width] duration-100 ease-out rounded-full"
                style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
              />
            </div>

            {/* Scroll hint */}
            <p className="hidden md:block text-center text-xs text-secondary dark:text-zinc-500 mt-4 font-mono-label uppercase tracking-widest">
              Cuộn để khám phá
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
