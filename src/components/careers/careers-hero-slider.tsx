"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import "./careers-hero-slider.css";

/* ── Slide data ───────────────────────────────────────── */

interface HeroSlide {
  id: string;
  tag: string;
  headline: string;
  subtitle: string;
  image: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    tag: "Tuyển dụng",
    headline: "Kiến tạo tương lai\nchuyển đổi số",
    subtitle:
      "Gia nhập đội ngũ tiên phong công nghệ, cùng VDCD xây dựng hệ sinh thái số tại Gia Lai và khu vực Tây Nguyên.",
    image: "https://picsum.photos/id/180/1920/1080",
  },
  {
    id: "slide-2",
    tag: "Môi trường",
    headline: "Nơi sáng tạo\nkhông giới hạn",
    subtitle:
      "Văn phòng hiện đại, đội ngũ năng động, chế độ đãi ngộ cạnh tranh và cơ hội phát triển chuyên môn liên tục.",
    image: "https://picsum.photos/id/1015/1920/1080",
  },
  {
    id: "slide-3",
    tag: "Cơ hội",
    headline: "Phát triển cùng\nTây Nguyên",
    subtitle:
      "Đóng góp trực tiếp vào hệ sinh thái số cho vùng đất đầy tiềm năng — nơi công nghệ gặp gỡ phát triển bền vững.",
    image: "https://picsum.photos/id/366/1920/1080",
  },
];

const SLIDE_DURATION = 6000; // ms

/* ── Framer Motion variants ───────────────────────────── */

const textVariants = {
  enter: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const childVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

/* ── Component ────────────────────────────────────────── */

export function CareersHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringKey, setRingKey] = useState(0); // reset CSS animation
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const totalSlides = SLIDES.length;
  const currentSlide = SLIDES[activeIndex];

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

  const handleManualAdvance = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    advanceSlide();
  };

  return (
    <section
      className="careers-hero-slider"
      aria-label="Hero tuyển dụng VDCD"
      aria-roledescription="carousel"
    >
      {/* ── Background slides ──────────────────────────── */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`careers-hero-slide ${
            index === activeIndex ? "careers-hero-slide--active" : ""
          }`}
          aria-hidden={index !== activeIndex}
        >
          <div className="careers-hero-slide__image">
            <Image
              src={slide.image}
              alt={slide.tag}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      ))}

      {/* ── Text content (animated per slide) ──────────── */}
      <div className="careers-hero-slider__content" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.span
              className="careers-hero-slider__tag"
              variants={childVariants}
            >
              {currentSlide.tag}
            </motion.span>

            <motion.h1
              className="careers-hero-slider__headline"
              variants={childVariants}
            >
              {currentSlide.headline}
            </motion.h1>

            <motion.p
              className="careers-hero-slider__subtitle"
              variants={childVariants}
            >
              {currentSlide.subtitle}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── VDCD Slide Navigation Block ─────────────────── */}
      <nav className="careers-hero-nav" aria-label="Điều khiển slider">
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
          {/* SVG Viền Mỏng 1px Bát Giác & Line Đỏ Sáng Bên Trái */}
          <svg
            className="careers-hero-nav__octagon-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Viền mỏng 1px Bát Giác 8 cạnh bao quanh */}
            <polygon
              points="14,0 86,0 100,14 100,86 86,100 14,100 0,86 0,14"
              className="careers-hero-nav__octagon-border"
              vectorEffect="non-scaling-stroke"
            />
            {/* Line đỏ phát sáng ở cạnh bên trái */}
            <line
              x1="0"
              y1="14"
              x2="0"
              y2="86"
              className="careers-hero-nav__octagon-red-line"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Counter (Số đỏ, to & mỏng, không số 0: 1 / 3) */}
          <div className="careers-hero-nav__counter">
            <span className="careers-hero-nav__current">{activeIndex + 1}</span>
            <span className="careers-hero-nav__separator">/</span>
            <span className="careers-hero-nav__total">{totalSlides}</span>
          </div>

          {/* Red Arrow (Mũi tên đỏ - Bỏ Box) */}
          <button
            className="careers-hero-nav__arrow"
            onClick={(e) => {
              e.stopPropagation();
              handleManualAdvance();
            }}
            aria-label="Slide tiếp theo"
            type="button"
          >
            <FiArrowRight />
          </button>
        </div>

        {/* Horizontal progress bar */}
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
    </section>
  );
}
