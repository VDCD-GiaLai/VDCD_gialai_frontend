"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchPageBannerFromApi } from "@/services/banner.service";
import { MOCK_PAGE_BANNERS } from "@/services/banner.service";
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

/* ── Component ──────────────────────────────────────────── */

export const NewsHero = () => {
  const [banner, setBanner] = useState<PageBannerData>(
    MOCK_PAGE_BANNERS["news"],
  );

  useEffect(() => {
    let cancelled = false;

    const loadBanner = async () => {
      try {
        const data = await fetchPageBannerFromApi("news");
        if (!cancelled) setBanner(data);
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
    <section className="news-hero" aria-label={banner.tag || "Tin tức"}>
      {/* Background image */}
      <div className="news-hero__image">
        <Image
          src={banner.image}
          alt={banner.tag || banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Content — no CTA */}
      <div className="news-hero__content">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          {banner.tag && <h1 className="news-hero__tag">{banner.tag}</h1>}
        </motion.div>
      </div>
    </section>
  );
};
