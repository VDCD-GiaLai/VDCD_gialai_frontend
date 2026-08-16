"use client";

import React, { useState, useCallback } from "react";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";

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
  const [isHovered, setIsHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  const LENS_SIZE = 170; // Diameter of the magnifying lens in px
  const ZOOM = 2.8; // Magnification factor

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursor({ x, y });
    setBounds({ width: rect.width, height: rect.height });
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setBounds({ width: rect.width, height: rect.height });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const eventCaption =
    "Hội nghị Xúc tiến đầu tư tỉnh Gia Lai năm 2026 diễn ra vào ngày 28/3/2026 tại Trung tâm Hội nghị tỉnh (số 01 Nguyễn Tất Thành, phường Quy Nhơn)";

  return (
    <section className="select-none">
      {/* 2-Row Synchronized Grid: Row 1 = Image & Main Content, Row 2 = Caption */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-12 gap-y-4 items-stretch">
        {/* ── ROW 1 - LEFT: Base Image + Floating Magnifying Glass Loupe (lg:col-span-6) ── */}
        <div className="lg:col-span-6">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden bg-zinc-950 shadow-md group transition-all duration-300 hover:shadow-xl cursor-crosshair"
          >
            {/* 1. Static Base Image (1x - Does not scale or move) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-us/3A5A2610.webp"
              alt="Hội nghị Xúc tiến đầu tư tỉnh Gia Lai năm 2026"
              draggable={false}
              className="w-full h-auto object-cover select-none pointer-events-none block"
            />

            {/* 2. Floating Magnifier Glass Loupe (Follows Cursor) */}
            {isHovered && bounds.width > 0 && bounds.height > 0 && (
              <div
                style={{
                  width: `${LENS_SIZE}px`,
                  height: `${LENS_SIZE}px`,
                  left: `${cursor.x - LENS_SIZE / 2}px`,
                  top: `${cursor.y - LENS_SIZE / 2}px`,
                  backgroundImage: `url(/about-us/3A5A2610.webp)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${bounds.width * ZOOM}px ${bounds.height * ZOOM}px`,
                  backgroundPosition: `-${cursor.x * ZOOM - LENS_SIZE / 2}px -${cursor.y * ZOOM - LENS_SIZE / 2}px`,
                }}
                className="absolute rounded-full border-2 border-white/95 shadow-[0_0_25px_rgba(0,0,0,0.7),inset_0_0_12px_rgba(0,0,0,0.25)] pointer-events-none z-30 ring-2 ring-black/40 ring-offset-0"
              >
                {/* Subtle Optical Crosshair Highlight */}
                <div className="w-full h-full rounded-full bg-radial from-transparent via-transparent to-black/15 pointer-events-none" />
              </div>
            )}

            {/* Subtle Gradient for Bottom Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />

            {/* Hover Hint Badge (Visible when not hovered) */}
            {!isHovered && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white/90 text-xs font-mono flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-md">
                <MagnifyingGlassPlus size={14} weight="bold" />
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
