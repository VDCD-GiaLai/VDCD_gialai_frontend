"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";

export interface ProjectGalleryImageItem {
  id?: string;
  src?: string;
  url?: string;
  caption?: string | null;
  size?: "small" | "large";
  order?: number;
}

export interface ProjectDetailGalleryProps {
  galleryImages?: ProjectGalleryImageItem[];
  className?: string;
}

export function ProjectDetailGallery({
  galleryImages = [],
  className = "",
}: ProjectDetailGalleryProps) {
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // Drag-to-scroll refs and state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll bounds to enable/disable navigation buttons
  const checkScrollBounds = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Update scroll bounds on mount or image count change
  useEffect(() => {
    checkScrollBounds();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScrollBounds);
    window.addEventListener("resize", checkScrollBounds);
    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [galleryImages, viewMode]);

  // Arrow navigation scroll handler
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(300, el.clientWidth * 0.7);
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    dragDistanceRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    dragDistanceRef.current = Math.abs(walk);
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Card click: only trigger lightbox if not dragging
  const handleCardClick = (index: number) => {
    if (dragDistanceRef.current < 6) {
      setSelectedImageIndex(index);
    }
  };

  // Lightbox keyboard navigation (ESC, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImageIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1,
        );
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) =>
          prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, galleryImages.length]);

  if (!galleryImages || galleryImages.length === 0) return null;

  return (
    <section
      aria-label="Thư viện ảnh dự án"
      className={`p-5 sm:p-7 space-y-4 bg-slate-50/50 dark:bg-zinc-900/30 rounded-2xl border border-slate-200/80 dark:border-zinc-800 ${className}`}
    >
      {/* ── Section Header Toolbar ─────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 dark:border-zinc-800/80 pb-3.5">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-bold text-[#011A42] dark:text-white font-heading">
              Thư viện ảnh dự án ({galleryImages.length})
            </h2>
          </div>
          <p className="text-xs text-[#6C7E96] dark:text-zinc-400 mt-0.5 font-normal">
            Bộ sưu tập hình ảnh thực tế từ quá trình triển khai dự án (kéo thả
            chuột để lướt xem).
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* View Mode Toggle: Slider vs Grid */}
          {galleryImages.length > 0 && (
            <div className="flex items-center rounded-lg border border-slate-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-0.5 text-xs shadow-2xs font-mono-label">
              <button
                type="button"
                onClick={() => setViewMode("slider")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === "slider"
                    ? "bg-[#ca2a30] text-white shadow-2xs"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Dạng trượt ngang kéo thả (gọn gàng)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#ca2a30] text-white shadow-2xs"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
                }`}
                title="Dạng lưới mở rộng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Slider Prev / Next Arrows */}
          {viewMode === "slider" && galleryImages.length > 2 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-all hover:bg-slate-100 dark:hover:bg-zinc-700 hover:border-[#ca2a30]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                title="Lướt sang trái"
                aria-label="Lướt ảnh sang trái"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 transition-all hover:bg-slate-100 dark:hover:bg-zinc-700 hover:border-[#ca2a30]/50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs"
                title="Lướt sang phải"
                aria-label="Lướt ảnh sang phải"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Main Gallery Body ───────────────────────────────────── */}
      {viewMode === "slider" ? (
        /* SLIDER MODE: Drag-to-scroll horizontal filmstrip */
        <div className="relative group/gallery">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex gap-4 overflow-x-auto pb-3 pt-1 px-1 scroll-smooth select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-700 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-track]:bg-slate-100 dark:[&::-webkit-scrollbar-track]:bg-zinc-800/40`}
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "thin",
            }}
          >
            {galleryImages.map((img, index) => {
              const isLarge = img.size === "large";
              const imgSrc = img.url || img.src || "";
              return (
                <figure
                  key={img.id || index}
                  onClick={() => handleCardClick(index)}
                  className={`group/card relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs transition-all duration-200 hover:border-[#ca2a30]/60 hover:shadow-md shrink-0 cursor-pointer ${
                    isLarge ? "w-80 sm:w-96" : "w-64 sm:w-72"
                  }`}
                >
                  {/* Image Box */}
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imgSrc}
                      alt={img.caption || `Ảnh ${index + 1}`}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs font-mono-label">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Zoom Indicator on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-zinc-800/90 px-3 py-1 text-xs font-semibold text-slate-900 dark:text-white shadow-md backdrop-blur-xs font-mono-label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-[#ca2a30]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                        Xem
                      </span>
                    </div>
                  </div>

                  {/* Caption Bar */}
                  <figcaption className="border-t border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-slate-700 dark:text-zinc-200 transition-colors group-hover/card:bg-slate-50 dark:group-hover/card:bg-zinc-800/40">
                    {img.caption ? (
                      <p
                        className="line-clamp-1 font-medium text-[#011A42] dark:text-zinc-100"
                        title={img.caption}
                      >
                        {img.caption}
                      </p>
                    ) : (
                      <p className="text-[11px] italic text-[#6C7E96] dark:text-zinc-400">
                        (Chưa có chú thích ảnh)
                      </p>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>

          {/* Subtle drag hint underneath */}
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#6C7E96] dark:text-zinc-400 px-1 font-mono-label">
            <span className="flex items-center gap-1">
              <span>⇄</span>
              <span>Nhấn giữ và kéo chuột hoặc vuốt để xem ảnh tiếp theo</span>
            </span>
            <span>{galleryImages.length} ảnh</span>
          </div>
        </div>
      ) : (
        /* GRID MODE: Expanded multi-column gallery view */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((img, index) => {
            const isLarge = img.size === "large";
            const imgSrc = img.url || img.src || "";
            return (
              <figure
                key={img.id || index}
                onClick={() => setSelectedImageIndex(index)}
                className={`group/gridcard relative overflow-hidden rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs transition-all duration-200 hover:border-[#ca2a30]/60 hover:shadow-md cursor-pointer ${
                  isLarge ? "sm:col-span-2 md:col-span-2" : "col-span-1"
                }`}
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgSrc}
                    alt={img.caption || `Ảnh ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover/gridcard:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded-md bg-black/65 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs font-mono-label">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                {img.caption && (
                  <figcaption className="border-t border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5 text-xs text-[#011A42] dark:text-zinc-100">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}

      {/* ── Lightbox Preview Modal ───────────────────────────────── */}
      {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setSelectedImageIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex flex-col items-center max-w-5xl w-full max-h-[92vh] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-200/40 dark:border-zinc-700/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full px-5 py-3 border-b border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#ca2a30] text-white font-mono-label">
                  #{selectedImageIndex + 1} / {galleryImages.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-base font-bold"
                title="Đóng (Esc)"
                aria-label="Đóng xem ảnh"
              >
                ✕
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative flex items-center justify-center w-full flex-1 bg-black/95 min-h-[300px] max-h-[70vh] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  galleryImages[selectedImageIndex].url ||
                  galleryImages[selectedImageIndex].src ||
                  ""
                }
                alt={
                  galleryImages[selectedImageIndex].caption || "Project image"
                }
                className="max-h-[70vh] max-w-full object-contain select-none"
              />

              {/* Prev / Next Modal Buttons */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev !== null && prev > 0
                          ? prev - 1
                          : galleryImages.length - 1,
                      );
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ca2a30] transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                    title="Ảnh trước (Mũi tên trái)"
                    aria-label="Ảnh trước"
                  >
                    ❮
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex((prev) =>
                        prev !== null && prev < galleryImages.length - 1
                          ? prev + 1
                          : 0,
                      );
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ca2a30] transition-all cursor-pointer shadow-lg backdrop-blur-xs"
                    title="Ảnh sau (Mũi tên phải)"
                    aria-label="Ảnh sau"
                  >
                    ❯
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Caption */}
            {galleryImages[selectedImageIndex].caption && (
              <div className="w-full p-4 text-center border-t border-slate-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <p className="text-sm font-medium text-[#011A42] dark:text-zinc-100">
                  {galleryImages[selectedImageIndex].caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
