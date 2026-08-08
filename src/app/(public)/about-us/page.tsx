"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiShield,
  FiPhoneCall,
  FiCompass,
  FiSend,
} from "react-icons/fi";
import { HeroRadarBanner } from "@/components/about/hero-radar-banner";
import { BentoIntroGrid } from "@/components/about/bento-intro-grid";
import { PhilosophySection } from "@/components/about/philosophy-section";
import { EditorialActivityList } from "@/components/about/editorial-activity-list";
import { HorizontalScrollRoadmap } from "@/components/about/horizontal-scroll-roadmap";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white transition-colors duration-300 overflow-x-hidden">
      {/* 1. HERO BANNER WITH GIS RADAR SCANNER OVERLAY */}
      <HeroRadarBanner />

      {/* SPATIAL SEPARATOR WITH DENSITY RHYTHM (144px breathing space) */}
      <div className="space-y-36 py-12">
        {/* 2. KHỐI GIỚI THIỆU & CHỈ SỐ BENTO GRID (WITH IMAGE COMPARISON SLIDER & GLASS COUNTERS) */}
        <section id="introduction" className="scroll-mt-28">
          <BentoIntroGrid />
        </section>

        {/* 3. TRIẾT LÝ HOẠT ĐỘNG (STORYTELLING & VISIONARY VS CORPORATE) */}
        <section
          id="philosophy"
          className="scroll-mt-28 border-t border-zinc-900 pt-16"
        >
          <PhilosophySection />
        </section>

        {/* 4. LĨNH VỰC HOẠT ĐỘNG CHỦ CHỐT (EDITORIAL LIST WITH FLOATING PREVIEW FRAME) */}
        <section
          id="activities"
          className="scroll-mt-28 border-t border-zinc-900 pt-16"
        >
          <EditorialActivityList />
        </section>

        {/* 5. ĐỊNH HƯỚNG TƯƠNG LAI (HORIZONTAL SCROLL ROADMAP) */}
        <section
          id="roadmap"
          className="scroll-mt-28 border-t border-zinc-900 pt-12"
        >
          <HorizontalScrollRoadmap />
        </section>

        {/* 6. CTA SECTION — SLATE DARK HYPER-MODERN STYLE WITH TACTILE BUTTONS */}
        <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 pt-12 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 md:p-20 overflow-hidden text-center shadow-2xl"
          >
            {/* Ambient Background Radial Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider">
                <FiCompass className="w-3.5 h-3.5" />
                <span>Hợp tác & Đồng hành chuyển đổi số</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight uppercase">
                Cùng VDCD Group Kiến Tạo{" "}
                <span className="text-red-500">Tương Lai Số</span>
              </h2>

              <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                Hãy liên hệ với chúng tôi để thiết kế các giải pháp không gian
                dữ liệu 3D, ứng dụng drone UAV tự động và trung tâm điều hành
                IOC tối ưu nhất dành riêng cho cơ quan, tổ chức của bạn.
              </p>

              {/* Tactile Feedback Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                <a
                  href="mailto:contact@vdcdgroup.vn"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl shadow-xl hover:shadow-red-600/30 active:scale-[0.98] transition-all duration-200 group"
                >
                  <FiSend className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Gửi email liên hệ</span>
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-zinc-800 active:scale-[0.98] transition-all duration-200 group"
                >
                  <span>Liên hệ tư vấn</span>
                  <FiArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
