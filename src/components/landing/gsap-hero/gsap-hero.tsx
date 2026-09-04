"use client";

import * as React from "react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { GSAP_HERO_SLIDES, type GsapHeroSlide } from "@/data/gsap-hero.data";
import {
  fetchHeroSlidesFromApi,
  getCachedHeroSlides,
} from "@/services/hero.service";
import { useGsapHero } from "@/hooks/use-gsap-hero";
import "./gsap-hero.css";

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitTitle = (raw: string): [string, string] => {
    if (raw.includes("\n")) {
      const [line1, ...rest] = raw.split("\n");
      return [line1, rest.join(" ")];
    }
    const parts = raw.split(" ");
    const mid = Math.ceil(parts.length / 2);
    return [
      parts.slice(0, mid).join(" "),
      parts.slice(mid).join(" ") || "Dự án VDCD",
    ];
  };

  const mapSlide = (s: {
    id?: string;
    title: string;
    description?: string;
    subtitle?: string;
    location?: string;
    image?: string;
    imageUrl?: string;
    ctaText?: string;
    ctaUrl?: string;
  }): GsapHeroSlide => {
    const [title, title2] = splitTitle(s.title);
    return {
      id: s.id,
      title,
      title2,
      desc:
        s.description || "Tập đoàn VDCD - Giám sát công trình & Chuyển đổi số",
      image: s.image || s.imageUrl || "",
      place: s.subtitle || s.location || "",
      ctaText: s.ctaText || "Tìm hiểu thêm",
      ctaUrl: s.ctaUrl || "/#",
    };
  };

  const [slides, setSlides] = React.useState<GsapHeroSlide[]>(() => {
    const cached = getCachedHeroSlides();
    if (cached && cached.length > 0) {
      return cached.map(mapSlide);
    }
    return GSAP_HERO_SLIDES;
  });

  React.useEffect(() => {
    fetchHeroSlidesFromApi().then((apiSlides) => {
      if (apiSlides && apiSlides.length > 0) {
        setSlides(apiSlides.map(mapSlide));
      }
    });
  }, []);

  const { activeIdx, nextSlide, prevSlide, selectSlide } = useGsapHero(
    containerRef,
    slides,
  );

  return (
    <div
      ref={containerRef}
      className="gsap-hero-container w-full min-h-[100dvh] relative bg-zinc-950 text-white select-none overflow-hidden"
    >
      {/* Slide Cards */}
      {slides.map((slide, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`card cursor-pointer ${activeIdx === idx ? "active-bg" : ""}`}
            id={`card-${idx}`}
            onClick={() => {
              if (activeIdx !== idx) {
                selectSlide(idx);
              }
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title + " " + slide.title2}
              fill
              sizes="100vw"
              className="object-cover"
              priority={idx === 0}
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
              quality={idx === 0 ? 85 : 75}
              unoptimized={true}
            />
          </div>
          {/* Card Content Overlay */}
          <div className="card-content" id={`card-content-${idx}`}>
            <div className="content-start bg-accent-red mb-1.5" />
            <div className="content-title-wrapper">
              <span className="content-title-1">{slide.title}</span>{" "}
              <span className="content-title-2">{slide.title2}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
      {/* Details Box - Twin Buffers for text animations, wrapped in layout container */}
      <div className="absolute inset-0 z-22 pointer-events-none flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 relative h-full">
          <div className="details" id="details-even">
            <div className="place-box">
              <div className="text font-bold text-accent-red uppercase tracking-wider"></div>
            </div>
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-6xl font-heading">
              <div className="title-1 font-bold tracking-tighter leading-none uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-6xl font-heading">
              <div className="title-2 font-bold tracking-tighter leading-none uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a
                href={slides[0]?.ctaUrl || "/#"}
                aria-label={slides[0]?.ctaText || "Tìm hiểu thêm"}
                className="discover pointer-events-auto"
              >
                {slides[0]?.ctaText || "Tìm hiểu thêm"}{" "}
                <ArrowRight
                  className="w-4 h-4"
                  weight="thin"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="details" id="details-odd" style={{ opacity: 0 }}>
            <div className="place-box">
              <div className="text font-bold text-accent-red uppercase tracking-wider"></div>
            </div>
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-6xl font-heading">
              <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-6xl font-heading">
              <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a
                href={slides[0]?.ctaUrl || "/#"}
                aria-label={slides[0]?.ctaText || "Tìm hiểu thêm (Chi tiết)"}
                className="discover pointer-events-auto"
              >
                {slides[0]?.ctaText || "Tìm hiểu thêm"}{" "}
                <ArrowRight
                  className="w-4 h-4"
                  weight="thin"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination" id="pagination">
        <div
          className="arrow arrow-left"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div
          className="arrow arrow-right ml-4"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      {/* Cover Screen for page intro slide-wipe */}
      <div className="cover" />
    </div>
  );
}
