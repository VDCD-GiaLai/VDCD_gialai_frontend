"use client";

import React from "react";
import Link from "next/link";

export function HeroRadar() {
  return (
    <div className="relative w-full h-[55vh] min-h-[450px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-6 md:p-12 select-none">
      {/* 1. Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage: "url('/images/home/farm_area_drone_view.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950 z-0" />

      {/* 2. Top Header Content (Breadcrumbs) */}
      <div className="relative z-30">
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

      {/* 3. Bottom Headline & Spatial Info */}
      <div className="relative z-30 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-heading">
            VỀ CHÚNG TÔI
          </h1>
        </div>
      </div>
    </div>
  );
}
