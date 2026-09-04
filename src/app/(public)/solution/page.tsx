"use client";

import React, { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/ui/service-card";
import {
  CORE_TECH_SOLUTIONS,
  SOLUTIONS as INITIAL_CENTERS,
} from "@/data/solution/solutions";
import { fetchSolutionsFromApi } from "@/services/solution.service";
import { gsap } from "@/lib/animations/register-gsap";
import { PageHeroBanner } from "@/components/ui/page-hero-banner";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

interface SolutionItem {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  iconUrl?: string;
  slug?: string;
}

export default function SolutionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [coreSolutions, setCoreSolutions] =
    useState<SolutionItem[]>(CORE_TECH_SOLUTIONS);
  const [centers, setCenters] = useState<SolutionItem[]>(INITIAL_CENTERS);

  useEffect(() => {
    fetchSolutionsFromApi(50).then((items) => {
      if (items && items.length > 0) {
        // Sync 6 core solutions if matched from API
        setCoreSolutions(
          CORE_TECH_SOLUTIONS.map((s) => {
            const match = items.find(
              (it) =>
                it.slug === s.slug ||
                it.title.toLowerCase() === s.title.toLowerCase(),
            );
            return match
              ? {
                  ...s,
                  description: match.description || s.description,
                  imageUrl: match.thumbnail || s.imageUrl,
                }
              : s;
          }),
        );

        // Sync 12 centers if matched from API
        setCenters(
          INITIAL_CENTERS.map((c) => {
            const match = items.find(
              (it) =>
                it.slug === c.slug ||
                it.title.toLowerCase() === c.title.toLowerCase(),
            );
            return match
              ? {
                  ...c,
                  description: match.description || c.description,
                  imageUrl: match.thumbnail || c.imageUrl,
                }
              : c;
          }),
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".sol-card"], { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Staggered card reveal on mount */
        gsap.from(".sol-card", {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.04,
          delay: 0.15,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [coreSolutions, centers]);

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Hero Banner — backend-ready */}
      <PageHeroBanner pageKey="solutions" ariaLabel="Giải pháp theo lĩnh vực" />

      {/* ── Khối 1: 6 Giải Pháp Công Nghệ Cốt Lõi ── */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 pb-12">
        <div className="mb-10">
          <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
            Công nghệ cốt lõi
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            6 Nền tảng Công nghệ Tiên phong
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm mt-2 max-w-2xl">
            Các công nghệ mũi nhọn được Trung tâm Đổi mới Sáng tạo Gia Lai
            nghiên cứu, làm chủ và ứng dụng chuyển đổi số toàn diện.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {coreSolutions.map((sol) => (
            <div key={sol.title} className="sol-card h-full">
              <ServiceCard
                title={sol.title}
                href={sol.href}
                imageUrl={sol.imageUrl}
                iconUrl={sol.iconUrl || "/icons/cpu.svg"}
                description={sol.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Khối 2: 12 Trung Tâm Chuyên Sâu Trực Thuộc ── */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 pb-20 border-t border-whisper-border/50 dark:border-zinc-900">
        <div className="mb-10">
          <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
            Hệ sinh thái Đổi mới Sáng tạo
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            12 Trung tâm Chuyên sâu Trực thuộc
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm mt-2 max-w-2xl">
            Mạng lưới các trung tâm nghiên cứu, phát triển công nghệ và dịch vụ
            chuyên sâu trực thuộc Trung tâm Đổi mới Sáng tạo Gia Lai.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {centers.map((center) => (
            <div key={center.title} className="sol-card h-full">
              <ServiceCard
                title={center.title}
                href={center.href}
                imageUrl={center.imageUrl}
                iconUrl={center.iconUrl || "/icons/cpu.svg"}
                description={center.description}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Khối 3: Unified CTA Section ── */}
      <CommonCtaSection
        badge="Hệ sinh thái công nghệ"
        title="SẴN SÀNG CHUYỂN ĐỔI SỐ CÙNG HỆ SINH THÁI VDCD"
        description="Kết nối công nghệ cao, dữ liệu số và chuyên gia hàng đầu để giải quyết những bài toán phát triển thực tiễn."
        primaryButton={{
          label: "Liên hệ tư vấn giải pháp",
          href: "/contact",
          icon: "envelope",
        }}
        secondaryButton={{
          label: "Xem các dự án thực tế",
          href: "/projects",
          icon: "arrow-right",
        }}
      />
    </div>
  );
}
