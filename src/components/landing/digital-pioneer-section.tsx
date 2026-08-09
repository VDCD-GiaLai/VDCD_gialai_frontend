"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";

/* ────────────────────────────────────────────────────────
   STATS DATA (updated per user spec)
   ──────────────────────────────────────────────────────── */

const STATS = [
  {
    key: "staff" as const,
    fallback: 1500,
    suffix: "+",
    label: "Cán bộ, Nhân sự",
  },
  {
    key: "partners" as const,
    fallback: 250,
    suffix: "+",
    label: "Chuyên gia đa lĩnh vực",
  },
  {
    key: "centers" as const,
    fallback: 12,
    suffix: "",
    label: "Trung tâm nghiên cứu chuyên sâu",
  },
  {
    key: "provinces" as const,
    fallback: 34,
    suffix: "",
    label: "Tỉnh, thành hiện diện",
  },
];

/* ────────────────────────────────────────────────────────
   COMPONENT — Khối 2+3 merged
   ──────────────────────────────────────────────────────── */

export function DigitalPioneerSection() {
  const [orgInfo, setOrgInfo] = React.useState<OrganizationInfo | null>(null);

  React.useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
  }, []);

  const containerRef = useScrollReveal({
    targets: ".pioneer-reveal",
    options: { y: 24, blur: 4, duration: 0.8, ease: "power3.out" },
  });

  return (
    <section
      id="digital-pioneer"
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      <div
        ref={containerRef}
        className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-14"
      >
        {/* ── Top Row: Headline left + Body right ── */}
        <div className="pioneer-reveal grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left: Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tighter text-black dark:text-white font-heading leading-[1.15]">
            <span className="block">Tiên phong công nghệ số</span>
            <span className="block">làm chủ hiện trường trong tầm tay</span>
          </h2>

          {/* Right: Body + CTA */}
          <div className="space-y-5">
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              Trung tâm Đổi mới Sáng tạo Gia Lai kết nối công nghệ, chuyên gia
              và nguồn lực từ hệ sinh thái VDCD Group nhằm đưa các giải pháp số
              vào thực tiễn. Từ thu thập dữ liệu hiện trường, phân tích, quản lý
              đến hỗ trợ ra quyết định, Trung tâm đồng hành cùng cơ quan quản lý
              và doanh nghiệp trong quá trình đổi mới, chuyển đổi số và nâng cao
              hiệu quả hoạt động.
            </p>
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Khám phá giải pháp{" "}
              <ArrowRight className="w-4 h-4" weight="thin" />
            </Link>
          </div>
        </div>

        {/* ── Bottom Row: 4 Stats ── */}
        <div className="pioneer-reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-800 mt-8 md:mt-12">
          {STATS.map((s) => {
            const val = (orgInfo?.stats as any)?.[s.key] ?? s.fallback;

            return (
              <div
                key={s.key}
                className="bg-canvas-white dark:bg-zinc-950 py-6 md:py-8 px-4 md:px-6 flex flex-col items-center text-center group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/80 transition-colors duration-300"
              >
                <div className="text-4xl md:text-5xl font-black text-black dark:text-white group-hover:text-accent-red tracking-tighter font-heading tabular-nums leading-none mb-3 transition-colors duration-300">
                  <AnimatedCounter target={val} suffix={s.suffix} />
                </div>
                <span className="text-xs text-secondary dark:text-zinc-400 group-hover:text-black dark:group-hover:text-zinc-200 leading-snug block transition-colors duration-300">
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
