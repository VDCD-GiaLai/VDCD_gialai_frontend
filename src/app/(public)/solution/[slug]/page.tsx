"use client";

import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
import {
  SOLUTION_DETAILS,
  type SolutionDetail,
  type SolutionDetailSection,
} from "@/data/solution/solution-details";
import { fetchSolutionBySlugFromApi } from "@/services/solution.service";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

/* ── Section Layout Components ── */
import { SectionProse } from "@/components/solution/SectionProse";
import { SectionSplitImage } from "@/components/solution/SectionSplitImage";
import { SectionNumberedSteps } from "@/components/solution/SectionNumberedSteps";
import { SectionCardGrid } from "@/components/solution/SectionCardGrid";
import { SectionIconList } from "@/components/solution/SectionIconList";
import { SectionFullWidthImage } from "@/components/solution/SectionFullWidthImage";
import { SectionGallery } from "@/components/solution/SectionGallery";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ── Auto-assign layout when not specified in data ── */
function inferLayout(
  section: SolutionDetailSection,
  idx: number,
  prevLayout: string,
): string {
  if (section.layout) return section.layout;
  if (section.imageUrl) return "split-image";
  if (!section.points || section.points.length === 0) return "prose";

  /* Cycle through layouts avoiding repetition */
  const pool = ["card-grid", "icon-list", "numbered-steps"];
  const candidate = pool[idx % pool.length];
  return candidate === prevLayout ? pool[(idx + 1) % pool.length] : candidate;
}

/* ── Section Renderer ── */
function RenderSection({
  section,
  idx,
  accentColor,
  resolvedLayout,
}: {
  section: SolutionDetailSection;
  idx: number;
  accentColor: string;
  resolvedLayout: string;
}) {
  const commonProps = {
    title: section.title,
    description: section.description,
    accentColor,
    sectionIndex: idx,
  };

  switch (resolvedLayout) {
    case "full-width-image":
      return (
        <SectionFullWidthImage
          {...commonProps}
          points={section.points}
          imageUrl={
            section.imageUrl ||
            "https://picsum.photos/seed/vdcd-section/1200/600"
          }
        />
      );
    case "split-image":
      return (
        <SectionSplitImage
          {...commonProps}
          points={section.points}
          imageUrl={
            section.imageUrl ||
            "https://picsum.photos/seed/vdcd-section/800/600"
          }
        />
      );
    case "numbered-steps":
      return (
        <SectionNumberedSteps {...commonProps} points={section.points || []} />
      );
    case "card-grid":
      return <SectionCardGrid {...commonProps} points={section.points || []} />;
    case "icon-list":
      return <SectionIconList {...commonProps} points={section.points || []} />;
    case "prose":
    default:
      return <SectionProse {...commonProps} points={section.points} />;
  }
}

export default function SolutionDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [detail, setDetail] = React.useState<SolutionDetail | null>(
    SOLUTION_DETAILS[slug] || null,
  );

  React.useEffect(() => {
    fetchSolutionBySlugFromApi(slug).then((apiData) => {
      if (apiData) {
        const fallback = SOLUTION_DETAILS[slug];
        setDetail({
          slug: apiData.slug || slug,
          title: fallback?.title || apiData.title,
          subtitle:
            fallback?.subtitle ||
            "Hệ sinh thái Đổi mới Sáng tạo & Công nghệ số VDCD Gia Lai",
          introText: fallback?.introText || apiData.description,
          imageUrl:
            fallback?.imageUrl ||
            apiData.thumbnail ||
            "/images/placeholder-solution.webp",
          sections: fallback?.sections || [
            {
              title: "Tổng quan giải pháp & Năng lực triển khai",
              description: apiData.description || fallback?.introText,
              points: [
                "Số hóa toàn bộ dữ liệu hiện trường và quản lý trực quan.",
                "Tối ưu hóa chi phí và rút ngắn 40% thời gian triển khai.",
                "Tích hợp hệ thống báo cáo & cảnh báo tự động 24/7.",
              ],
            },
          ],
          accentColor: fallback?.accentColor || "#e11d48",
          galleryImages: fallback?.galleryImages,
        });
      }
    });
  }, [slug]);

  if (!detail) {
    notFound();
  }

  const accent = detail.accentColor || "#e11d48";
  const pageRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance + scroll animations ── */
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".sd-breadcrumb",
            ".sd-hero-text",
            ".sd-hero-image",
            ".sd-section",
            ".sd-cta",
            ".sd-clip-title",
          ],
          { autoAlpha: 1 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".sd-breadcrumb", {
          autoAlpha: 0,
          x: -10,
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.from(".sd-hero-text", {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.1,
        });

        gsap.from(".sd-hero-image", {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
        });

        gsap.from(".sd-clip-title", {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.05,
        });

        gsap.set(".sd-section", { autoAlpha: 0, y: 20 });

        ScrollTrigger.batch(".sd-section", {
          start: "top 85%",
          once: true,
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
            }),
        });

        gsap.set(".sd-cta", { autoAlpha: 0, y: 20 });

        ScrollTrigger.create({
          trigger: ".sd-cta",
          start: "top 85%",
          once: true,
          onEnter: () =>
            gsap.to(".sd-cta", {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            }),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, [slug]);

  /* ── Resolve layouts for all sections ── */
  const resolvedLayouts: string[] = [];
  detail.sections.forEach((section, i) => {
    const prev = i > 0 ? resolvedLayouts[i - 1] : "";
    resolvedLayouts.push(inferLayout(section, i, prev));
  });

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pb-20"
    >
      {/* ═══════════════════════════════════════════
       *  HERO — Clipping Mask Title + Image
       * ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={detail.imageUrl}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-canvas-white dark:to-zinc-950" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <div className="sd-breadcrumb mb-8">
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-white/70 uppercase tracking-widest hover:text-white transition-colors duration-300"
            >
              <ArrowLeft weight="thin" className="w-4 h-4" /> Quay lại danh mục
            </Link>
          </div>

          {/* Hero Title */}
          <div className="sd-clip-title mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] font-heading select-none text-white">
              {detail.title}
            </h1>
          </div>

          {/* Subtitle + Intro */}
          <div className="sd-hero-text max-w-3xl">
            {detail.subtitle && (
              <h2
                className="text-lg md:text-xl font-medium mb-4 font-heading"
                style={{ color: accent }}
              >
                {detail.subtitle}
              </h2>
            )}
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              {detail.introText}
            </p>
          </div>

          {/* Accent tag */}
          <div className="mt-6 flex items-center gap-3">
            <span
              className="inline-block w-8 h-[3px]"
              style={{ backgroundColor: accent }}
            />
            <span
              className="font-mono-label text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {detail.slug.replace(/-/g, " ")}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
       *  CONTENT SECTIONS — Layout-diversified
       * ═══════════════════════════════════════════ */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="space-y-16 mt-8">
          {detail.sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="border-b border-zinc-100 dark:border-zinc-900/60 last:border-0"
            >
              <RenderSection
                section={section}
                idx={sIdx}
                accentColor={accent}
                resolvedLayout={resolvedLayouts[sIdx]}
              />
            </div>
          ))}
        </div>

        {/* ═══════════════════════════════════════════
         *  GALLERY SECTION (if present)
         * ═══════════════════════════════════════════ */}
        {detail.galleryImages && detail.galleryImages.length > 0 && (
          <SectionGallery images={detail.galleryImages} accentColor={accent} />
        )}

        {/* ═══════════════════════════════════════════
         *  UNIFIED CTA BLOCK
         * ═══════════════════════════════════════════ */}
        <div className="mt-16 md:mt-20">
          <CommonCtaSection
            badge="Tư vấn & Triển khai"
            title="BẠN CẦN TƯ VẤN HOẶC TRIỂN KHAI GIẢI PHÁP NÀY?"
            description="Nhận khảo sát thực địa miễn phí, tư vấn chi tiết từ chuyên gia và lên phương án số hóa phù hợp nhất cho doanh nghiệp, cơ quan của bạn."
            primaryButton={{
              label: "Liên hệ chuyên gia",
              href: "/contact",
              icon: "envelope",
            }}
            secondaryButton={{
              label: "Khám phá giải pháp khác",
              href: "/solution",
              icon: "arrow-up-right",
            }}
            standalone={false}
          />
        </div>
      </div>
    </div>
  );
}
