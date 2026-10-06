"use client";

import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { fetchFeaturedProgramsFromApi } from "@/services/program.service";
import { fetchSolutionsFromApi } from "@/services/solution.service";

/* ────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────── */

interface SolutionCard {
  title: string;
  image: string;
  description: string;
  href?: string;
}

interface Category {
  id: string;
  label: string;
  items: SolutionCard[];
}

const CATEGORIES: Category[] = [
  {
    id: "programs",
    label: "Hoạt động",
    items: [
      {
        title: "Ươm tạo khởi nghiệp sáng tạo",
        image:
          "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9242.JPG?tr=w-800,q-85,f-auto",
        description:
          "Hỗ trợ ý tưởng từ giai đoạn hình thành đến thương mại hóa.",
        href: "/programs/uom-tao-khoi-nghiep-sang-tao",
      },
      {
        title: "Đào tạo",
        image:
          "https://ik.imagekit.io/huy01040104/vdcd/images/gen-h-hoat-dong-dau-tu-xay-dung.avif?tr=w-800,q-85,f-auto",
        description:
          "Nâng cao kỹ năng số, quản trị dữ liệu cho cán bộ địa phương.",
        href: "/programs/dao-tao-cong-nghe-va-chuyen-doi-so",
      },
      {
        title: "Kết nối chuyên gia",
        image:
          "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-800,q-85,f-auto",
        description:
          "Xây dựng mạng lưới liên kết đa bên, chuyển giao công nghệ.",
        href: "/programs/ket-noi-chuyen-gia-va-he-sinh-thai",
      },
      {
        title: "Tư vấn chuyển đổi số",
        image:
          "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9155.jpg?tr=w-800,q-85,f-auto",
        description:
          "Đánh giá hiện trạng, lộ trình và triển khai giải pháp số.",
        href: "/programs/tu-van-chuyen-doi-so-cap-tinh",
      },
    ],
  },
  {
    id: "solutions",
    label: "Giải pháp công nghệ",
    items: [
      {
        title: "UAV",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_flycam.png?tr=w-800,q-85,f-auto",
        description:
          "Khảo sát địa hình, bay quét 3D và đo đạc trắc địa số chính xác cao bằng thiết bị bay.",
        href: "/solution/uav",
      },
      {
        title: "AI",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-800,q-85,f-auto",
        description:
          "Nghiên cứu ứng dụng Robot thông minh & Trí tuệ nhân tạo nhận diện hình ảnh.",
        href: "/solution/ai",
      },
      {
        title: "Autotimelapse",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-800,q-85,f-auto",
        description:
          "Hệ thống Timelapse tự động hóa giám sát tiến độ công trình, nông nghiệp và môi trường 24/7.",
        href: "/solution/autotimelapse",
      },
      {
        title: "SmartScale",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_can_dien_tu.png?tr=w-800,q-85,f-auto",
        description:
          "Hệ thống cân đo thông minh kết nối IoT, nhận diện biển số tự động chống gian lận.",
        href: "/solution/smartscale",
      },
      {
        title: "VR360",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-800,q-85,f-auto",
        description:
          "Tái hiện không gian số thực tế ảo 360° và quét laser 3D phục vụ quy hoạch, du lịch.",
        href: "/solution/vr360",
      },
      {
        title: "Data Center",
        image:
          "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-800,q-85,f-auto",
        description:
          "Hạ tầng siêu máy tính hiệu năng cao HPC lưu trữ và đào tạo AI chuẩn quốc tế.",
        href: "/solution/data-center",
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────── */

export function ProgramsSolutionsSection() {
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const containerRef = useScrollReveal({
    targets: ".ps-reveal",
    options: {
      y: 24,
      blur: 4,
      duration: 0.8,
      ease: "power3.out",
    },
  });

  useEffect(() => {
    let cancelled = false;
    const cancelId: any = null;

    const fetchAction = () => {
      Promise.all([
        fetchFeaturedProgramsFromApi(4).catch(() => []),
        fetchSolutionsFromApi(20).catch(() => []),
      ]).then(([progs, sols]) => {
        if (cancelled) return;
        if ((progs && progs.length > 0) || (sols && sols.length > 0)) {
          setCategories((prev) => {
            const updated = [...prev];
            if (progs && progs.length > 0) {
              updated[0] = {
                id: "programs",
                label: "Hoạt động",
                items: progs.map((p) => ({
                  title: p.title,
                  image:
                    p.thumbnail ||
                    (p as unknown as Record<string, string>).imageUrl ||
                    (p as unknown as Record<string, string>).coverImage ||
                    CATEGORIES[0].items.find((c) => c.href?.includes(p.slug))
                      ?.image ||
                    "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9242.JPG",
                  description: p.shortDescription || p.title,
                  href: `/programs/${p.slug}`,
                })),
              };
            }
            if (sols && sols.length > 0) {
              // Keep the exact 6 core solutions in canonical order
              const coreSlugs = [
                "uav",
                "ai",
                "autotimelapse",
                "smartscale",
                "vr360",
                "data-center",
              ];

              let displaySols = coreSlugs
                .map((cs) =>
                  sols.find(
                    (s) =>
                      s.slug?.toLowerCase() === cs ||
                      s.slug?.toLowerCase().includes(cs),
                  ),
                )
                .filter(Boolean) as typeof sols;

              // If not all 6 found via coreSlugs, supplement with any remaining solutions from API
              if (displaySols.length < 6) {
                const remaining = sols.filter(
                  (s) => !displaySols.some((d) => d.slug === s.slug),
                );
                displaySols = [...displaySols, ...remaining].slice(0, 6);
              }

              if (displaySols.length > 0) {
                updated[1] = {
                  id: "solutions",
                  label: "Giải pháp công nghệ",
                  items: displaySols.map((s) => {
                    let shortTitle = s.title;
                    const lower = s.slug?.toLowerCase() || "";
                    if (lower.includes("uav")) shortTitle = "UAV";
                    else if (lower.includes("ai")) shortTitle = "AI";
                    else if (
                      lower.includes("autotimelapse") ||
                      lower.includes("timelapse")
                    )
                      shortTitle = "Autotimelapse";
                    else if (
                      lower.includes("smartscale") ||
                      lower.includes("scale")
                    )
                      shortTitle = "SmartScale";
                    else if (
                      lower.includes("vr360") ||
                      lower.includes("vr") ||
                      lower.includes("scan")
                    )
                      shortTitle = "VR360";
                    else if (
                      lower.includes("data-center") ||
                      lower.includes("datacenter")
                    )
                      shortTitle = "Data Center";

                    const apiThumb =
                      s.thumbnail ||
                      (s as unknown as Record<string, string>).imageUrl ||
                      (s as unknown as Record<string, string>).thumbnailUrl ||
                      (s as unknown as Record<string, string>).coverImage;

                    return {
                      title: shortTitle,
                      image:
                        apiThumb ||
                        CATEGORIES[1].items.find(
                          (c) =>
                            c.href === `/solution/${s.slug}` ||
                            c.title.toLowerCase() === shortTitle.toLowerCase(),
                        )?.image ||
                        "/images/home/sol_ai.webp",
                      description:
                        s.shortDescription ||
                        (s as unknown as Record<string, string>).description ||
                        s.title,
                      href: s.websiteUrl || `/solution/${s.slug}`,
                    };
                  }),
                };
              }
            }
            return updated;
          });
        }
      });
    };

    if (
      typeof window !== "undefined" &&
      "IntersectionObserver" in window &&
      containerRef.current
    ) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fetchAction();
            observer.disconnect();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(containerRef.current);
      return () => {
        cancelled = true;
        observer.disconnect();
      };
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  const handleSwitch = useCallback((id: string) => {
    setActiveId(id);
    setActiveCardIndex(0);
  }, []);

  return (
    <section
      id="programs-solutions"
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 py-16 md:py-24"
    >
      <div ref={containerRef}>
        {/* ── Section Header ── */}
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-12 md:mb-14">
          <div className="ps-reveal text-center mb-8">
            <h2 className="text-3xl md:text-5xl lg:text-[64px] font-bold tracking-tighter uppercase text-black dark:text-white font-heading leading-[1.1]">
              Hoạt động và giải pháp
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
              Các hoạt động và giải pháp trọng tâm do Trung tâm Đổi mới Sáng tạo
              Gia Lai thực hiện nhằm bứt phá công nghệ và nâng tầm khu vực.
            </p>
          </div>

          {/* ── Category Tabs ── */}
          <div className="ps-reveal flex justify-center gap-2">
            {categories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSwitch(cat.id)}
                  className={`
                    px-6 py-3 font-mono-label text-xs font-bold uppercase tracking-widest
                    transition-all duration-300 cursor-pointer border
                    ${
                      isActive
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "bg-transparent text-secondary dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:text-black dark:hover:text-white hover:border-zinc-500"
                    }
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Horizontal Accordion Cards ── */}
        <div className="ps-reveal max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row gap-3 w-full min-h-[380px] md:min-h-[420px] items-stretch">
            {active.items.map((item, idx) => {
              const isOpen = activeCardIndex === idx;

              return (
                <div
                  key={`${activeId}-${idx}`}
                  onClick={() => setActiveCardIndex(idx)}
                  onMouseEnter={() => setActiveCardIndex(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out flex flex-col justify-between p-6 md:p-8 text-white ${
                    isOpen
                      ? "flex-[3.5] shadow-lg"
                      : "flex-1 hover:brightness-105"
                  }`}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      loading="lazy"
                      decoding="async"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      transformation={[
                        { width: 640, quality: 85, format: "auto" },
                      ]}
                    />
                  </div>

                  {/* Gradient Overlay: Deep at bottom for crisp text readability, clear at top & center */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isOpen
                        ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100"
                        : "bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-75"
                    }`}
                  />

                  {/* Bottom: Text Content */}
                  <div className="space-y-3 relative z-10 mt-8">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight font-heading leading-snug uppercase drop-shadow">
                      {item.title}
                    </h3>

                    {/* Smooth collapse container */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isOpen
                          ? "max-h-[220px] opacity-100 mt-2"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans mb-3">
                        {item.description}
                      </p>
                      {item.href && (
                        <Link
                          href={item.href}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-mono-label font-bold text-accent-red uppercase tracking-widest hover:text-white transition-colors duration-200"
                        >
                          Khám phá chi tiết{" "}
                          <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Corner accent line */}
                  <span
                    className={`absolute top-0 right-0 h-1 bg-accent-red transition-all duration-500 ${
                      isOpen ? "w-1/3" : "w-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
