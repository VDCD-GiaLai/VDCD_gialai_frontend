"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MagnifyingGlassPlus,
  ArrowsCounterClockwise,
} from "@phosphor-icons/react";

interface BentoIntroProps {
  orgInfo?: {
    name?: string;
    description?: string;
    businessLicenseNo?: string;
    stats?: {
      staff?: number;
      experts?: number;
      centers?: number;
      projects?: number;
      provinces?: number;
    };
  } | null;
}

export function BentoIntro({ orgInfo }: BentoIntroProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Lock page scrolling when mouse is over the image, zoom smoothly instead
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
      setScale((prev) => {
        const next = Math.min(Math.max(prev + zoomDelta, 1), 3.5);
        if (next === 1) {
          setPosition({ x: 0, y: 0 });
        }
        return Number(next.toFixed(2));
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.2);
    }
  };

  const eventCaption =
    "Hội nghị Xúc tiến đầu tư tỉnh Gia Lai năm 2026 diễn ra vào ngày 28/3/2026 tại Trung tâm Hội nghị tỉnh (số 01 Nguyễn Tất Thành, phường Quy Nhơn)";

  return (
    <section className="select-none">
      {/* 2-Row Synchronized Grid: Row 1 = Image & Main Content, Row 2 = Caption & Leadership */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-12 gap-y-4 items-stretch">
        {/* ── ROW 1 - LEFT: Image with Scroll-to-Zoom (lg:col-span-6) ── */}
        <div className="lg:col-span-6">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDoubleClick={handleDoubleClick}
            className={`relative overflow-hidden bg-zinc-950 shadow-md group transition-all duration-300 hover:shadow-xl ${
              scale > 1
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
            }`}
          >
            <motion.div
              style={{
                x: position.x,
                y: position.y,
                scale: scale,
                transformOrigin: "center center",
              }}
              transition={{
                type: isDragging ? false : "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="w-full h-full flex items-center justify-center pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-us/3A5A2610.webp"
                alt="Hội nghị Xúc tiến đầu tư tỉnh Gia Lai năm 2026"
                draggable={false}
                className="w-full h-full object-cover select-none"
              />
            </motion.div>

            {/* Subtle Gradient for Bottom Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 pointer-events-none" />

            {/* Inline Controls & Zoom Icon */}
            {scale > 1 ? (
              <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-white text-xs font-mono font-bold shadow-lg">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={resetZoom}
                  title="Đặt lại kích thước ban đầu"
                  className="flex items-center gap-1.5 px-3 py-1 bg-accent-red hover:bg-accent-red/90 text-white text-xs font-medium shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <ArrowsCounterClockwise size={14} weight="bold" />
                  <span>Đặt lại</span>
                </button>
              </div>
            ) : (
              <div
                title="Cuộn chuột để phóng to ảnh"
                className="absolute bottom-3 right-3 w-8 h-8 bg-black/70 backdrop-blur-md text-white/90 flex items-center justify-center shadow-md opacity-80 group-hover:opacity-100 group-hover:bg-black/85 transition-all duration-300 pointer-events-none"
              >
                <MagnifyingGlassPlus size={16} weight="bold" />
              </div>
            )}
          </div>
        </div>

        {/* ── ROW 1 - RIGHT: Title + 2 Paragraphs + Corporate Metadata (lg:col-span-6) ── */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
              TRUNG TÂM ĐỔI MỚI SÁNG TẠO{" "}
              <span className="text-accent-red">GIA LAI</span>
            </h1>
            <p className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              Mã số doanh nghiệp: {orgInfo?.businessLicenseNo || "4101443823"}
            </p>

            <div className="space-y-3 text-zinc-650 dark:text-zinc-400 text-sm sm:text-[14.5px] leading-relaxed transition-colors duration-300">
              {orgInfo?.description && orgInfo.description.includes("<p>") ? (
                <div
                  className="space-y-3"
                  dangerouslySetInnerHTML={{ __html: orgInfo.description }}
                />
              ) : (
                <>
                  <p>
                    Là cầu nối thúc đẩy khởi nghiệp sáng tạo, chuyển giao công
                    nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ, Trung tâm
                    Đổi mới Sáng tạo Gia Lai đồng hành cùng sự phát triển kinh
                    tế số của tỉnh Gia Lai và khu vực Tây Nguyên.
                  </p>
                  <p>
                    Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên
                    gia và nguồn lực từ hệ sinh thái VDCD Group nhằm đưa các
                    giải pháp số vào thực tiễn. Từ thu thập dữ liệu hiện trường,
                    phân tích, quản lý đến hỗ trợ ra quyết định, Trung tâm đồng
                    hành cùng cơ quan quản lý và doanh nghiệp trong quá trình
                    đổi mới, chuyển đổi số và nâng cao hiệu quả hoạt động.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── ROW 2 - LEFT: Event Caption (lg:col-span-6) ── */}
        <div className="lg:col-span-6 flex items-center">
          <div className="w-full px-4 py-3.5 dark:bg-zinc-900/60 min-h-[72px] flex items-center transition-colors duration-300">
            <p className="text-xs sm:text-[13px] text-zinc-650 dark:text-zinc-400 italic leading-relaxed">
              {eventCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
