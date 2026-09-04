"use client";

import React, { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/ui/service-card";
import {
  CAPABILITY_SOLUTIONS,
  CORE_TECH_SOLUTIONS,
  SPECIALIZED_SOLUTIONS,
} from "@/data/solution/solutions";
import { fetchSolutionsFromApi } from "@/services/solution.service";
import { gsap } from "@/lib/animations/register-gsap";
import { PageHeroBanner } from "@/components/ui/page-hero-banner";

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
  const [solutions, setSolutions] =
    useState<SolutionItem[]>(CAPABILITY_SOLUTIONS);
  const [coreSolutions, setCoreSolutions] =
    useState<SolutionItem[]>(CORE_TECH_SOLUTIONS);
  const [specializedSolutions, setSpecializedSolutions] = useState<
    SolutionItem[]
  >(SPECIALIZED_SOLUTIONS);

  useEffect(() => {
    fetchSolutionsFromApi(100).then((items) => {
      if (items && items.length > 0) {
        setSolutions(
          items.map((sol) => ({
            title: sol.title,
            description: sol.description,
            href: sol.websiteUrl || `/solution/${sol.slug}`,
            imageUrl: sol.thumbnail || "/images/placeholder-solution.webp",
            iconUrl: sol.icon || "/icons/cpu.svg",
            slug: sol.slug,
          })),
        );

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

        setSpecializedSolutions(
          SPECIALIZED_SOLUTIONS.map((s) => {
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
      }
    });
  }, []);

  useEffect(() => {
    if (!pageRef.current || solutions.length === 0) return;

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
          stagger: 0.05,
          delay: 0.2,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [solutions]);

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* Hero Banner — backend-ready */}
      <PageHeroBanner pageKey="solutions" ariaLabel="Giải pháp theo lĩnh vực" />

      {/* ── Khối 1: Công nghệ Cốt lõi ── */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="mb-10">
          <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
            Công nghệ cốt lõi
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            6 Nền tảng Công nghệ
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm mt-2 max-w-2xl">
            Các công nghệ trọng tâm được Trung tâm Đổi mới Sáng tạo Gia Lai
            nghiên cứu, phát triển và ứng dụng.
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

      {/* ── Khối 2: Giải pháp Chuyên ngành ── */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 pb-8">
        <div className="mb-10">
          <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
            Giải pháp chuyên ngành
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            4 Giải pháp Mũi nhọn
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm mt-2 max-w-2xl">
            Các giải pháp chuyên sâu kết hợp đa công nghệ, giải quyết bài toán
            thực tiễn theo từng lĩnh vực.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {specializedSolutions.map((sol) => (
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

      {/* ── Khối 3: Giải pháp theo lĩnh vực (Existing) ── */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pt-8 pb-16">
        <div className="mb-10">
          <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block mb-2">
            Giải pháp theo lĩnh vực
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            Năng lực giải pháp
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm mt-2 max-w-2xl">
            Ứng dụng công nghệ vào các ngành kinh tế trọng điểm tại khu vực Tây
            Nguyên và cả nước.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {solutions.map((sol) => (
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
    </div>
  );
}
