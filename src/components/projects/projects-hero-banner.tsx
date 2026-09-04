"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "@phosphor-icons/react";
import {
  fetchProjectHeroSlidesFromApi,
  type ProjectHeroSlide,
} from "@/services/project.service";
import "@/components/careers/careers-hero-slider.css";

const HERO_PROJECT_SLIDES: ProjectHeroSlide[] = [
  {
    id: "le-dieu-binh-ky-niem-80-nam-quoc-khanh-viet-nam",
    title: "Lễ quốc khánh đầu tiên",
    location: "Hà Nội",
    image: "https://vdcd.vn/wp-content/uploads/2024/03/Anh-40-1.jpg",
    href: "/projects/le-dieu-binh-ky-niem-80-nam-quoc-khanh-viet-nam",
  },
  {
    id: "cao-oc-thuong-mai-hai-phong",
    title: "Cao ốc thương mại",
    location: "Hải Phòng",
    image:
      "https://vdcd.vn/wp-content/uploads/2025/10/bandem02_dd69a81dbb584714a217e6e18854faf2_master-1-1.jpg",
    href: "/projects/cao-oc-thuong-mai-hai-phong",
  },
  {
    id: "san-bay-quoc-te-phu-quoc",
    title: "Sân bay Quốc tế Phú Quốc",
    location: "Kiên Giang",
    image:
      "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62.jpg",
    href: "/projects/san-bay-quoc-te-phu-quoc",
  },
];

const SLIDE_DURATION = 6000; // ms

export function ProjectsHeroBanner() {
  const [slides, setSlides] = useState<ProjectHeroSlide[]>(HERO_PROJECT_SLIDES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringKey, setRingKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetchProjectHeroSlidesFromApi().then((data) => {
      if (data && data.length > 0) {
        setSlides(data);
      }
    });
  }, []);

  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const totalSlides = slides.length;
  const currentSlide =
    slides[activeIndex] || slides[0] || HERO_PROJECT_SLIDES[0];

  const advanceSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setRingKey((k) => k + 1);
  }, [totalSlides]);

  // Auto-advance timer
  useEffect(() => {
    if (reducedMotion) return;

    timerRef.current = setTimeout(advanceSlide, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, advanceSlide, reducedMotion]);

  const handleManualAdvance = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (timerRef.current) clearTimeout(timerRef.current);
    advanceSlide();
  };

  return (
    <div className="relative w-full h-[55vh] min-h-[460px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-6 md:p-12 select-none group">
      {/* ── 1. Background Slider with Crossfade & Click to View ── */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`careers-hero-slide ${
            index === activeIndex ? "careers-hero-slide--active" : ""
          }`}
          aria-hidden={index !== activeIndex}
        >
          <Link
            href={slide.href}
            className="careers-hero-slide__image cursor-pointer block"
            aria-label={`Xem dự án ${slide.title}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
              style={{ willChange: "transform" }}
              unoptimized={true}
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 z-[2]" />
          </Link>
        </div>
      ))}

      {/* ── 2. Top Header Content (Breadcrumbs) ── */}
      <div className="relative z-30">
        <nav className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-accent-red transition-colors focus-visible:ring-1 focus-visible:ring-accent-red focus-visible:outline-none"
          >
            Trang chủ
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200">Dự án</span>
        </nav>
      </div>

      {/* ── 3. Bottom Headline, Line, Active Slide Info & Next Navigation ── */}
      <div className="relative z-30 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        {/* Left: DỰ ÁN + Active Slide Title & Line */}
        <div className="flex-1 max-w-3xl">
          <Link
            href={currentSlide.href}
            className="group/title inline-flex flex-wrap items-center gap-3 sm:gap-4 mb-3 cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono bg-black/50 backdrop-blur-md px-2.5 py-1 border border-white/10 shrink-0">
              <MapPin
                weight="fill"
                className="text-accent-red w-3.5 h-3.5 shrink-0"
              />
              <span>{currentSlide.location}</span>
            </div>

            <h2 className="text-xl sm:text-xl md:text-5xl font-extrabold text-white uppercase tracking-tight font-heading group-hover/title:text-accent-red transition-colors">
              {currentSlide.title}
            </h2>

            <span className="inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-accent-red/80 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)] group-hover/title:border-accent-red group-hover/title:shadow-[0_0_20px_rgba(232,0,2,0.35)]">
              <span className="text-zinc-100 group-hover/title:text-white transition-colors">
                Tìm hiểu thêm
              </span>
              <span className="w-5 h-5 rounded-full bg-accent-red text-white flex items-center justify-center transition-all duration-300 transform group-hover/title:scale-110 group-hover/title:translate-x-0.5 shadow-sm">
                <ArrowUpRight weight="bold" className="w-3 h-3" />
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-4 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none font-heading shrink-0"></h1>
          </div>
        </div>

        {/* Right: Signature VDCD Slide Navigation Block (Octagon HUD) */}
        <nav
          className="careers-hero-nav !relative !inset-auto !bottom-0 !right-0 shrink-0"
          aria-label="Điều khiển slider dự án"
        >
          <div
            className="careers-hero-nav__block"
            onClick={handleManualAdvance}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${activeIndex + 1} / ${totalSlides}. Nhấn để chuyển slide tiếp`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleManualAdvance();
              }
            }}
          >
            {/* SVG Octagon Border & Glowing Red Line */}
            <svg
              className="careers-hero-nav__octagon-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points="14,0 86,0 100,14 100,86 86,100 14,100 0,86 0,14"
                className="careers-hero-nav__octagon-border"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="0"
                y1="14"
                x2="0"
                y2="86"
                className="careers-hero-nav__octagon-red-line"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Counter */}
            <div className="careers-hero-nav__counter">
              <span className="careers-hero-nav__current">
                {activeIndex + 1}
              </span>
              <span className="careers-hero-nav__separator">/</span>
              <span className="careers-hero-nav__total">{totalSlides}</span>
            </div>

            {/* Red Arrow */}
            <button
              className="careers-hero-nav__arrow"
              onClick={handleManualAdvance}
              aria-label="Slide tiếp theo"
              type="button"
            >
              <ArrowRight weight="thin" aria-hidden="true" />
            </button>
          </div>

          {/* Progress Bar Track */}
          <div className="careers-hero-nav__progress-track">
            <div
              key={ringKey}
              className={`careers-hero-nav__progress-fill ${
                !reducedMotion ? "careers-hero-nav__progress-fill--animate" : ""
              }`}
              style={
                {
                  "--slide-duration": `${SLIDE_DURATION}ms`,
                } as React.CSSProperties
              }
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
