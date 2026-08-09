"use client";

import * as React from "react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react";
import { GSAP_HERO_SLIDES, type GsapHeroSlide } from "@/data/gsap-hero.data";
import { fetchHeroSlidesFromApi } from "@/services/hero.service";
import { useGsapHero } from "@/hooks/use-gsap-hero";
import "./gsap-hero.css";

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slides, setSlides] = React.useState<GsapHeroSlide[]>(GSAP_HERO_SLIDES);

  React.useEffect(() => {
    fetchHeroSlidesFromApi().then((apiSlides) => {
      if (apiSlides && apiSlides.length > 0) {
        const mapped: GsapHeroSlide[] = apiSlides.map((s) => {
          const parts = s.title.split(" ");
          const mid = Math.ceil(parts.length / 2);
          return {
            title: parts.slice(0, mid).join(" "),
            title2: parts.slice(mid).join(" ") || "Dự án VDCD",
            desc:
              s.description ||
              "Tập đoàn VDCD - Giám sát công trình & Chuyển đổi số",
            image: s.image || (s as any).imageUrl || "",
            place: s.subtitle || s.location || "VIỆT NAM",
          };
        });
        setSlides(mapped);
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
            />
          </div>
          {/* Card Content Overlay */}
          <div className="card-content" id={`card-content-${idx}`}>
            <div className="content-start bg-accent-red mb-1.5" />
            <div className="content-place text-zinc-300 font-mono text-[9px] font-bold tracking-widest">
              {slide.place}
            </div>
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
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-7xl font-heading">
              <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-7xl font-heading">
              <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a
                href="#about"
                aria-label="Tìm hiểu thêm về VDCD Gia Lai"
                className="discover pointer-events-auto"
              >
                Tìm hiểu thêm{" "}
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
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-7xl font-heading">
              <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl xl:text-7xl font-heading">
              <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a
                href="#about"
                aria-label="Tìm hiểu thêm về VDCD Gia Lai (Chi tiết)"
                className="discover pointer-events-auto"
              >
                Tìm hiểu thêm{" "}
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
