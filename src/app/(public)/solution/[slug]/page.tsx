"use client";

import React, { use, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Envelope, Phone } from "@phosphor-icons/react";
import {
  SOLUTION_DETAILS,
  type SolutionDetail,
} from "@/data/solution/solution-details";
import { fetchSolutionBySlugFromApi } from "@/services/solution.service";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

interface PageProps {
  params: Promise<{ slug: string }>;
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
          title: apiData.title,
          subtitle: fallback?.subtitle || "VDCD Solution",
          introText: apiData.description,
          imageUrl:
            apiData.thumbnail ||
            fallback?.imageUrl ||
            "/images/placeholder-solution.webp",
          sections: fallback?.sections || [
            {
              title: "Tổng quan giải pháp",
              description: apiData.description,
              points: [
                "Số hóa toàn bộ dữ liệu hiện trường và quản lý trực quan.",
                "Tối ưu hóa chi phí và rút ngắn 40% thời gian triển khai.",
                "Tích hợp hệ thống báo cáo & cảnh báo tự động 24/7.",
              ],
            },
          ],
        });
      }
    });
  }, [slug]);

  if (!detail) {
    notFound();
  }

  const pageRef = useRef<HTMLDivElement>(null);

  // Helper to parse bold header and description
  const parsePoint = (point: string) => {
    const colonIndex = point.indexOf(":");
    if (colonIndex !== -1) {
      return {
        title: point.substring(0, colonIndex).trim(),
        description: point.substring(colonIndex + 1).trim(),
      };
    }
    return { title: "", description: point };
  };

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
          ],
          { autoAlpha: 1 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Breadcrumb entrance */
        gsap.from(".sd-breadcrumb", {
          autoAlpha: 0,
          x: -10,
          duration: 0.5,
          ease: "power3.out",
        });

        /* Hero text entrance */
        gsap.from(".sd-hero-text", {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.1,
        });

        /* Hero image entrance */
        gsap.from(".sd-hero-image", {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.15,
        });

        /* Scroll-revealed sections with stagger */
        gsap.set(".sd-section", {
          autoAlpha: 0,
          y: 20,
        });

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

        /* CTA block scroll-reveal */
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

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pt-28 pb-20"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Navigation Breadcrumb */}
        <div className="sd-breadcrumb mb-8">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
          >
            <ArrowLeft weight="thin" className="w-4 h-4" /> Quay lại danh mục Giải pháp
          </Link>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 border-b border-zinc-100 dark:border-zinc-900 pb-12">
          <div className="sd-hero-text lg:col-span-7">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              giải pháp theo lĩnh vực
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4 leading-tight font-heading">
              {detail.title}
            </h1>
            {detail.subtitle && (
              <h2 className="text-lg md:text-xl text-accent-red font-medium mb-6 font-heading">
                {detail.subtitle}
              </h2>
            )}
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              {detail.introText}
            </p>
          </div>

          <div className="sd-hero-image lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-xl">
            <Image
              src={detail.imageUrl}
              alt={detail.title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Detailed Sections */}
        <div className="space-y-16">
          {detail.sections.map((section, sIdx) => (
            <section
              key={sIdx}
              className="sd-section border-b border-zinc-100 dark:border-zinc-900/60 pb-12 last:border-0 last:pb-0"
            >
              {/* Section Header */}
              <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 font-heading">
                {section.title}
              </h3>
              {section.description && (
                <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-4xl italic">
                  {section.description}
                </p>
              )}

              {/* Points Split-Row List */}
              {section.points && section.points.length > 0 && (
                <div className="mt-8 border-t border-zinc-100 dark:border-zinc-900/60">
                  {section.points.map((point, pIdx) => {
                    const { title, description } = parsePoint(point);
                    return (
                      <div
                        key={pIdx}
                        className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-zinc-100 dark:border-zinc-900/60 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 px-4 md:px-6 -mx-4 md:-mx-6 transition-all duration-300"
                      >
                        {/* Left highlight bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                        {/* Double-digit index */}
                        <div className="md:col-span-1 flex items-start md:items-center">
                          <span className="font-mono text-base font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-accent-red transition-colors duration-300">
                            {(pIdx + 1).toString().padStart(2, "0")}
                          </span>
                        </div>

                        {/* Title */}
                        <div className="md:col-span-4 flex items-start md:items-center">
                          <h4 className="text-base md:text-lg font-bold text-black dark:text-white tracking-tight leading-snug group-hover:text-accent-red transition-colors duration-300 font-heading">
                            {title || "Giải pháp"}
                          </h4>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-7 flex items-start md:items-center">
                          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <section className="sd-cta mt-20 p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 font-heading">
            Bạn cần tư vấn hoặc triển khai giải pháp này tại Gia Lai?
          </h3>
          <p className="text-secondary dark:text-zinc-400 text-sm max-w-2xl mx-auto mb-8">
            Hãy liên hệ với chúng tôi để nhận khảo sát thực địa miễn phí, tư vấn
            chi tiết từ chuyên gia và lên phương án số hóa phù hợp nhất cho
            doanh nghiệp/cơ quan của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:dmstgialai@vdcd.vn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300"
            >
              Gửi email liên hệ <Envelope weight="thin" className="w-4 h-4" />
            </a>
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
            >
              Khám phá giải pháp khác <ArrowUpRight weight="thin" className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
