"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function HeroRadar() {
  return (
    <div className="relative w-full h-[55vh] min-h-[450px] overflow-hidden bg-zinc-950 flex flex-col justify-between select-none">
      {/* 1. Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/home/farm_area_drone_view.webp"
          alt="Khung cảnh nông nghiệp Tây Nguyên"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-0" />

      {/* 2. Top Header & Bottom Content Container */}
      <div className="relative z-30 w-full max-w-[1600px] mx-auto px-4 md:px-8 h-full flex flex-col justify-between py-5 md:py-8">
        {/* Breadcrumbs */}
        <div>
          <nav className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-accent-red transition-colors focus-visible:ring-1 focus-visible:ring-accent-red focus-visible:outline-none"
            >
              Trang chủ
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-200">Về chúng tôi</span>
          </nav>
        </div>

        {/* Headline & Line */}
        <div className="flex items-center gap-6 w-full">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-heading shrink-0">
            VỀ CHÚNG TÔI
          </h1>
          {/* 2px White line extending almost across the banner */}
          <div className="h-[2px] bg-white flex-1 rounded-full opacity-90" />
        </div>
      </div>
    </div>
  );
}
