"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  fetchPageBannerFromApi,
  getCachedPageBanner,
  MOCK_PAGE_BANNERS,
} from "@/services/banner.service";
import type { PageBannerData, PageBannerCta, PageKey } from "@/types/banner";
import { ArrowUpRight, ArrowRight } from "@phosphor-icons/react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface PageHeroSplitBannerProps {
  pageKey: PageKey;
  bannerData?: PageBannerData;
  ariaLabel?: string;
}

export const PageHeroSplitBanner = ({
  pageKey,
  bannerData: bannerDataOverride,
  ariaLabel,
}: PageHeroSplitBannerProps) => {
  const [banner, setBanner] = useState<PageBannerData>(() => {
    if (bannerDataOverride) return bannerDataOverride;
    return getCachedPageBanner(pageKey) || MOCK_PAGE_BANNERS[pageKey];
  });

  useEffect(() => {
    if (bannerDataOverride) return;

    let cancelled = false;

    const loadBanner = async () => {
      try {
        const data = await fetchPageBannerFromApi(pageKey);
        if (!cancelled) setBanner(data);
      } catch {
        // Fallback set in initial state
      }
    };

    loadBanner();

    return () => {
      cancelled = true;
    };
  }, [pageKey, bannerDataOverride]);

  const handleRenderCta = (cta: PageBannerCta) => {
    const isInternal = cta.href.startsWith("/") || cta.href.startsWith("#");
    const isPrimary = cta.variant === "primary";

    const className = isPrimary
      ? "inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-mono-label text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all duration-300 rounded-lg shadow-md group"
      : "inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/40 text-white font-mono-label text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 rounded-lg backdrop-blur-sm group";

    const arrowIcon = isPrimary ? (
      <ArrowRight
        weight="thin"
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
      />
    ) : (
      <ArrowUpRight
        weight="thin"
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    );

    if (isInternal && !cta.href.startsWith("#")) {
      return (
        <Link
          key={cta.label}
          href={cta.href}
          className={className}
          aria-label={cta.ariaLabel}
        >
          {cta.label}
          {arrowIcon}
        </Link>
      );
    }

    return (
      <a
        key={cta.label}
        href={cta.href}
        className={className}
        aria-label={cta.ariaLabel}
      >
        {cta.label}
        {arrowIcon}
      </a>
    );
  };

  return (
    <section
      className="w-full h-[70vh] min-h-[500px] max-h-[720px] flex flex-col justify-end relative overflow-hidden border-b border-whisper-border/30 bg-zinc-950"
      aria-label={ariaLabel || banner.tag || pageKey}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
        <OptimizedImage
          src={banner.image}
          alt={banner.tag || banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ willChange: "transform", objectPosition: "bottom" }}
          transformation={[{ width: 1920, quality: 80, format: "auto" }]}
        />
      </div>

      {/* Content layer positioned at the bottom with proper clearance */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-12 md:pb-16 pt-28 w-full z-20 relative text-left">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="space-y-4"
        >
          {/* Tag */}
          {banner.tag && (
            <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red tracking-widest uppercase block">
              {banner.tag}
            </span>
          )}

          {/* Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.05] font-heading whitespace-pre-line uppercase">
            {banner.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl">
            {banner.subtitle}
          </p>

          {/* Business License */}
          {banner.businessLicense && (
            <p className="text-white/50 text-[10px] md:text-xs leading-relaxed max-w-xl font-mono pt-1">
              {banner.businessLicense}
            </p>
          )}

          {/* CTA Buttons */}
          {banner.ctaButtons && banner.ctaButtons.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {banner.ctaButtons.map(handleRenderCta)}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
