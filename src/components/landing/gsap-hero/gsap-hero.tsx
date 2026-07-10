"use client";

import * as React from "react";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { GSAP_HERO_SLIDES } from "@/data/gsap-hero.data";
import { useGsapHero } from "@/hooks/use-gsap-hero";
import "./gsap-hero.css";

export function GsapHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeIdx, nextSlide, prevSlide, selectSlide } = useGsapHero(
    containerRef,
    GSAP_HERO_SLIDES,
  );

  return (
    <div
      ref={containerRef}
      className="gsap-hero-container w-full min-h-[100dvh] relative bg-zinc-950 text-white select-none overflow-hidden"
    >
      {/* Slide Cards */}
      {GSAP_HERO_SLIDES.map((slide, idx) => (
        <React.Fragment key={idx}>
          <div
            className={`card cursor-pointer ${activeIdx === idx ? "active-bg" : ""}`}
            id={`card-${idx}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            onClick={() => {
              if (activeIdx !== idx) {
                selectSlide(idx);
              }
            }}
          />
          {/* Card Content Overlay */}
          <div className="card-content" id={`card-content-${idx}`}>
            <div className="content-start bg-accent-red mb-2" />
            <div className="content-place text-zinc-300 font-mono text-[9px] font-bold tracking-widest">
              {slide.place}
            </div>
            <div className="content-title-1 font-bold text-white text-[12px] font-heading">
              {slide.title}
            </div>
            <div className="content-title-2 font-bold text-white text-[12px] font-heading">
              {slide.title2}
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
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl lg:text-7xl font-heading">
              <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl lg:text-7xl font-heading">
              <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a href="#about" className="discover pointer-events-auto">
                Tìm hiểu thêm <FiArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="details" id="details-odd" style={{ opacity: 0 }}>
            <div className="place-box">
              <div className="text font-bold text-accent-red uppercase tracking-wider"></div>
            </div>
            <div className="title-box-1 text-2xl min-[380px]:text-3xl md:text-5xl lg:text-7xl font-heading">
              <div className="title-1 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="title-box-2 text-2xl min-[380px]:text-3xl md:text-5xl lg:text-7xl font-heading">
              <div className="title-2 font-bold tracking-tighter uppercase text-white font-heading whitespace-nowrap"></div>
            </div>
            <div className="desc text-zinc-300 max-w-lg mt-4 text-sm md:text-base leading-relaxed"></div>
            <div className="cta flex gap-4 mt-6">
              <a href="#about" className="discover pointer-events-auto">
                Tìm hiểu thêm <FiArrowRight className="w-4 h-4" />
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
