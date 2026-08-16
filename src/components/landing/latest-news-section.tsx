"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  ArrowRight,
  Clock,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { fetchFeaturedArticlesFromApi } from "@/services/article.service";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { Article } from "@/types";

/* ── helpers ── */
function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function categoryLabel(c?: string) {
  return c?.toUpperCase() ?? "TIN TỨC";
}

/* ────────────────────────────────────────────────────────
   Sun Group Responsive News Section
   - hotNews: 2-column on desktop, stacked on mobile/tablet
   - otherNews:
     * Desktop: Red cardNews on left + horizontal news slider on right + controls
     * Tablet/Mobile: Responsive header bar + horizontal draggable news slider
   - Full drag-to-scroll, wheel scroll & touch support
   - Primary Brand Color: #e80002
   ──────────────────────────────────────────────────────── */

export function LatestNewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag physics state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchFeaturedArticlesFromApi(8).then(setArticles);
  }, []);

  const containerRef = useScrollReveal({
    targets: ".news-reveal",
    options: { y: 24, blur: 4, duration: 0.8, ease: "power3.out" },
  });

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const itemWidth = el.firstElementChild?.clientWidth || 320;
    const gap = 16;
    const currentIdx = Math.round(el.scrollLeft / (itemWidth + gap));
    setActiveIndex(currentIdx);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [articles, checkScroll]);

  // Window drag handlers to keep dragging even when cursor moves outside container
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const el = sliderRef.current;
      if (!el) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      if (Math.abs(walk) > 5) {
        hasMovedRef.current = true;
      }
      el.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDragging(false);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  const getScrollStep = () => {
    const el = sliderRef.current;
    if (!el || !el.firstElementChild) return 360;
    const item = el.firstElementChild as HTMLElement;
    return item.offsetWidth + 16;
  };

  const scrollPrev = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: getScrollStep(), behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    setIsDragging(true);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const el = sliderRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
      el.scrollLeft += e.deltaY;
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (articles.length === 0) return null;

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section
      id="latest-news"
      className="border-0 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden select-none"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-14 lg:py-16"
      >
        {/* ── 1. hotNews ── */}
        <div className="hotNews news-reveal grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-10 pb-8 sm:pb-10 md:pb-14 items-center">
          {/* --img --link img_hover */}
          <div className="--img --link img_hover lg:col-span-7">
            <Link
              href={`/news/${featured.slug}`}
              className="group block relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-none bg-zinc-100 dark:bg-zinc-900 border-0 shadow-sm"
            >
              <OptimizedImage
                src={featured.thumbnail || "/images/placeholder.webp"}
                alt={featured.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 58vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                transformation={[{ width: 900, quality: 80, format: "auto" }]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* --txt */}
          <div className="--txt lg:col-span-5 flex flex-col justify-center">
            <Link href={`/news/${featured.slug}`} className="group block">
              <h5 className="mb-2 sm:mb-3 text-lg sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px] font-bold font-heading text-black dark:text-white leading-snug group-hover:text-[#e80002] transition-colors duration-300 line-clamp-2 sm:line-clamp-3">
                {featured.title}
              </h5>
            </Link>

            {/* noteNews */}
            <div className="noteNews flex items-center gap-3 sm:gap-4 mb-2.5 sm:mb-3.5">
              <div className="--cate">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#e80002] font-mono-label uppercase tracking-widest px-2 sm:px-2.5 py-0.5 rounded-md bg-[#e80002]/10 inline-block">
                  {categoryLabel(featured.category)}
                </span>
              </div>
              <div className="--time flex items-center gap-1.5 text-xs text-secondary dark:text-zinc-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-secondary dark:text-zinc-500 shrink-0" />
                <span>{fmtDate(featured.publishedAt)}</span>
              </div>
            </div>

            {/* article */}
            {featured.metaDescription && (
              <article className="text-xs sm:text-sm md:text-base text-secondary dark:text-zinc-400 leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                {featured.metaDescription}
              </article>
            )}
          </div>
        </div>

        {/* ── 2. otherNews ── */}
        <div className="otherNews news-reveal flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 lg:gap-6 relative">
          {/* cardNews */}
          <div
            className="cardNews group/card w-full lg:w-[250px] xl:w-[280px] lg:h-[220px] shrink-0 p-4 sm:p-5 lg:p-6 rounded-none
           bg-gradient-to-br from-[#e80002] to-[#b80002] text-white border-0 shadow-md flex flex-row lg:flex-col justify-between items-center lg:items-start relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:brightness-105"
          >
            {/* partent watermark background */}
            <div className="partent absolute -bottom-6 -right-6 pointer-events-none select-none opacity-20 group-hover/card:opacity-30 group-hover/card:rotate-6 transition-all duration-700">
              <svg
                className="w-32 sm:w-36 lg:w-40 h-32 sm:h-36 lg:h-40 text-white"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="15"
                  fill="currentColor"
                  fillOpacity="0.15"
                />
                <path
                  d="M50 5v90M5 50h90M18 18l64 64M18 82l64-64"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 2"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="subTitle text-[9px] sm:text-[10px] lg:text-[11px] font-bold font-mono-label tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/80 mb-0.5 sm:mb-1">
                VDCD GIA LAI
              </div>
              <p className="segTitle text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-white tracking-tight leading-tight">
                Tin tức
              </p>
            </div>

            <div className="relative z-10 lg:mt-4 lg:pt-3">
              <Link
                href="/news"
                className="--link group/viewall inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold font-mono-label uppercase tracking-widest text-white hover:text-white/90 transition-opacity duration-300"
              >
                <div className="arrow_1 --viewall --link flex items-center gap-2 sm:gap-2.5">
                  <span>Xem tất cả</span>
                  <span className="w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-white text-[#e80002] group-hover/viewall:bg-white/90 group-hover/viewall:scale-110 flex items-center justify-center transition-all duration-300 border-0 shadow-sm">
                    <ArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#e80002] transition-transform duration-300 group-hover/viewall:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* list_homeNews Carousel Track */}
          <div className="flex-1 min-w-0 flex flex-col justify-center overflow-hidden">
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onWheel={handleWheel}
              className={`list_homeNews newsall w-full flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar touch-pan-x ${
                isDragging
                  ? "cursor-grabbing select-none"
                  : "cursor-grab scroll-smooth snap-x snap-mandatory"
              }`}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {rest.map((a, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <Link
                    key={a.id}
                    href={`/news/${a.slug}`}
                    onClick={handleCardClick}
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                    className={`--item group snap-start shrink-0 w-[280px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[460px] h-[135px] sm:h-[170px] lg:h-[220px] p-2.5 sm:p-3 lg:p-3.5 rounded-none bg-canvas-white dark:bg-zinc-900/50 border-none hover:bg-zinc-100/90 dark:hover:bg-zinc-900/90 hover:shadow-md transition-all duration-300 flex flex-row gap-2.5 sm:gap-3.5 lg:gap-4 select-none ${
                      isSelected
                        ? "is-selected shadow-sm bg-white/90 dark:bg-zinc-900/90"
                        : "opacity-95 hover:opacity-100"
                    }`}
                  >
                    {/* --img */}
                    <div className="--img img_hover w-[100px] sm:w-[130px] md:w-[150px] lg:w-[170px] h-full shrink-0 relative overflow-hidden rounded-none bg-zinc-100 dark:bg-zinc-800 border-none pointer-events-none">
                      <OptimizedImage
                        src={a.thumbnail || "/images/placeholder.webp"}
                        alt={a.title}
                        fill
                        sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 200px"
                        className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out pointer-events-none"
                        transformation={[
                          { width: 360, quality: 75, format: "auto" },
                        ]}
                      />
                    </div>

                    {/* --txt */}
                    <div className="--txt flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="--top">
                        <h6 className="--link text-xs sm:text-sm font-bold font-heading text-black dark:text-white group-hover:text-[#e80002] transition-colors duration-300 leading-snug line-clamp-2 mb-1">
                          {a.title}
                        </h6>
                        {a.metaDescription && (
                          <article className="hidden sm:block text-[11px] sm:text-xs text-secondary dark:text-zinc-400 line-clamp-2 lg:line-clamp-3 leading-relaxed">
                            {a.metaDescription}
                          </article>
                        )}
                      </div>

                      {/* noteNews */}
                      <div className="noteNews flex items-center justify-between pt-1 sm:pt-2 border-0 text-[10px] sm:text-[11px]">
                        <div className="--cate text-[9px] sm:text-[10px] font-bold text-[#e80002] font-mono-label uppercase tracking-wider">
                          {categoryLabel(a.category)}
                        </div>
                        <div className="--time flex items-center gap-1 text-secondary dark:text-zinc-500">
                          <Clock className="w-3 h-3 text-secondary dark:text-zinc-500 shrink-0" />
                          <span>{fmtDate(a.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* arrow_homeNews Navigation Controls */}
          <div className="arrow_homeNews arrow flex lg:flex-col items-center justify-end lg:justify-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              aria-label="Tin trước"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              className="--icon prevarrow w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-black dark:text-white flex items-center justify-center hover:bg-[#e80002] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-zinc-100 disabled:hover:text-black disabled:cursor-not-allowed transition-all duration-200 cursor-pointer border-0 shadow-xs"
            >
              <CaretLeft className="w-3.5 sm:w-4 h-3.5 sm:h-4" weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Tin tiếp theo"
              onClick={scrollNext}
              disabled={!canScrollRight}
              className="--icon nextarrow w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-zinc-100 dark:bg-zinc-800/90 text-black dark:text-white flex items-center justify-center hover:bg-[#e80002] hover:text-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-zinc-100 disabled:hover:text-black disabled:cursor-not-allowed transition-all duration-200 cursor-pointer border-0 shadow-xs"
            >
              <CaretRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
