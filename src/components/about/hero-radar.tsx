"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  fetchPageBannerFromApi,
  MOCK_PAGE_BANNERS,
} from "@/services/banner.service";
import type { PageBannerData } from "@/types/banner";
import "@/components/news/news.css";

export function HeroRadar() {
  const [banner, setBanner] = useState<PageBannerData>(
    MOCK_PAGE_BANNERS["about"],
  );

  useEffect(() => {
    fetchPageBannerFromApi("about").then((data) => {
      if (data) setBanner(data);
    });
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="news-hero relative"
      aria-label={banner.tag || "Về chúng tôi"}
    >
      <div className="news-hero__image">
        <Image
          src={banner.image || "/vdcd_about_hero.png"}
          alt={banner.tag || banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Overlay grid mapping GIS grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="news-hero__content z-20">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <nav className="text-xs font-mono-label text-zinc-400 uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-accent-red transition-colors">
              Trang chủ
            </Link>
            <span className="mx-2 text-zinc-500">/</span>
            <span className="text-white">Về chúng tôi</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white font-heading uppercase leading-none">
            Về chúng tôi
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
