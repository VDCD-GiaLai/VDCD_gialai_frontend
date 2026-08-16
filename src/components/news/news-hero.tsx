"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { motion } from "framer-motion";
import {
  fetchPageBannerFromApi,
  getCachedPageBanner,
  MOCK_PAGE_BANNERS,
} from "@/services/banner.service";
import type { PageBannerData } from "@/types/banner";

/* ── Animation variants ─────────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

import Link from "next/link";

/* ── Component ──────────────────────────────────────────── */

export const NewsHero = () => {
  const [banner, setBanner] = useState<PageBannerData>(
    () => getCachedPageBanner("news") || MOCK_PAGE_BANNERS["news"],
  );

  useEffect(() => {
    let cancelled = false;

    const loadBanner = async () => {
      try {
        const data = await fetchPageBannerFromApi("news");
        if (!cancelled) {
          setBanner(data);
          setImgSrc(data.image);
        }
      } catch {
        // Fallback already set in initial state
      }
    };

    loadBanner();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative w-full h-[55vh] min-h-[450px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-6 md:p-12 select-none">
      {/* 1. Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={imgSrc}
          alt={banner.title || "Tin tức & Bài viết"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          transformation={[{ width: 1920, quality: 80, format: "auto" }]}
          onError={() => setImgSrc(mockBanner.image)}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-0" />

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
          <span className="text-zinc-200">Tin tức & Bài viết</span>
        </nav>
      </div>

      {/* 3. Bottom Headline & White Line */}
      <div className="relative z-30 flex items-center gap-6 w-full">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-heading shrink-0">
          TIN TỨC & BÀI VIẾT
        </h1>
        {/* 2px White line extending almost across the banner */}
        <div className="h-[2px] bg-white flex-1 rounded-full opacity-90" />
      </div>
    </div>
  );
};
