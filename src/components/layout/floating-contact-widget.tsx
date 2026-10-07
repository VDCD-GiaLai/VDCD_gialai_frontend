"use client";

import * as React from "react";
import { FiPhone } from "react-icons/fi";
import { DEFAULT_ORGANIZATION_INFO } from "@/data/hero.data";

export function FloatingContactWidget() {
  const hotline = DEFAULT_ORGANIZATION_INFO.socialLinks.hotline || "0373600099";
  const rawPhone = hotline.replace(/\s+/g, "");
  const zaloUrl =
    DEFAULT_ORGANIZATION_INFO.socialLinks.zalo || `https://zalo.me/${rawPhone}`;

  return (
    <aside
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-2.5 sm:gap-3 select-none"
      aria-label="Tiện ích liên hệ nhanh"
    >
      {/* ── 1. Nút Gọi Hotline ── */}
      <a
        href={`tel:${rawPhone}`}
        className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#ea1d2c] hover:bg-[#d01523] text-white shadow-md shadow-red-500/25 hover:shadow-red-500/40 hover:scale-110 active:scale-95 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-red-400/50"
        aria-label={`Gọi Hotline: ${hotline}`}
      >
        {/* Telephone Handset Icon */}
        <FiPhone
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white stroke-[2.2]"
          aria-hidden="true"
        />

        {/* Hover Tooltip (Desktop) */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-zinc-900/90 dark:bg-zinc-800/90 text-white text-xs font-semibold whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 hidden sm:flex items-center gap-1.5 border border-white/10">
          <span>Gọi Hotline:</span>
          <span className="text-red-400 font-bold">{hotline}</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/90 dark:border-l-zinc-800/90" />
        </div>
      </a>

      {/* ── 2. Nút Chat Zalo ── */}
      <a
        href={zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-[#0068FF] hover:bg-[#0054d6] text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-110 active:scale-95 transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50"
        aria-label="Chat qua Zalo"
      >
        {/* Zalo Text Icon matching brand reference */}
        <span className="font-bold text-white text-[12px] sm:text-[13px] tracking-tight leading-none select-none font-sans">
          Zalo
        </span>

        {/* Hover Tooltip (Desktop) */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-zinc-900/90 dark:bg-zinc-800/90 text-white text-xs font-semibold whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 hidden sm:flex items-center gap-1.5 border border-white/10">
          <span>Chat Zalo:</span>
          <span className="text-blue-400 font-bold">{hotline}</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/90 dark:border-l-zinc-800/90" />
        </div>
      </a>
    </aside>
  );
}
