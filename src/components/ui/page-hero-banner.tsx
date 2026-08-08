"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fetchPageBannerFromApi } from "@/services/banner.service";
import type { PageBannerData, PageBannerCta, PageKey } from "@/types/banner";
import { MOCK_PAGE_BANNERS } from "@/services/banner.service";
import "./page-hero-banner.css";

/* ── Animation variants ─────────────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── Props ───────────────────────────────────────────── */

interface PageHeroBannerProps {
  /** Page key used to resolve banner data from the service */
  pageKey: PageKey;
  /** Override banner data (skips fetch) */
  bannerData?: PageBannerData;
  /** Accessible label for the section */
  ariaLabel?: string;
  /** Show scroll cue at bottom center */
  showScrollCue?: boolean;
}

/* ── Component ──────────────────────────────────────── */

export const PageHeroBanner = ({
  pageKey,
  bannerData: bannerDataOverride,
  ariaLabel,
  showScrollCue = false,
}: PageHeroBannerProps) => {
  const [banner, setBanner] = useState<PageBannerData>(
    bannerDataOverride || MOCK_PAGE_BANNERS[pageKey],
  );

  useEffect(() => {
    if (bannerDataOverride) return;

    let cancelled = false;

    const loadBanner = async () => {
      try {
        const data = await fetchPageBannerFromApi(pageKey);
        if (!cancelled) setBanner(data);
      } catch {
        // Fallback already set in initial state
      }
    };

    loadBanner();

    return () => {
      cancelled = true;
    };
  }, [pageKey, bannerDataOverride]);

  const handleRenderCta = (cta: PageBannerCta) => {
    const isInternal = cta.href.startsWith("/") || cta.href.startsWith("#");
    const className = `page-hero-banner__cta--${cta.variant}`;

    if (isInternal && !cta.href.startsWith("#")) {
      return (
        <Link
          key={cta.label}
          href={cta.href}
          className={className}
          aria-label={cta.ariaLabel}
        >
          {cta.label}
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
      </a>
    );
  };

  return (
    <section
      className="page-hero-banner"
      aria-label={ariaLabel || banner.tag || pageKey}
    >
      {/* Background image */}
      <div className="page-hero-banner__image">
        <OptimizedImage
          src={banner.image}
          alt={banner.tag || banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ willChange: "transform" }}
          transformation={[{ width: 1920, quality: 80, format: "auto" }]}
        />
      </div>

      {/* Content */}
      <div className="page-hero-banner__content">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          {/* Tag */}
          {banner.tag && (
            <span className="page-hero-banner__tag">{banner.tag}</span>
          )}

          {/* Headline */}
          <h1 className="page-hero-banner__headline">{banner.title}</h1>

          {/* Subtitle */}
          <p className="page-hero-banner__subtitle">{banner.subtitle}</p>

          {/* CTA Buttons */}
          {banner.ctaButtons && banner.ctaButtons.length > 0 && (
            <div className="page-hero-banner__cta-group">
              {banner.ctaButtons.map(handleRenderCta)}
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {showScrollCue && (
        <div className="page-hero-banner__scroll-cue" aria-hidden="true">
          <div className="page-hero-banner__scroll-line" />
        </div>
      )}
    </section>
  );
};
