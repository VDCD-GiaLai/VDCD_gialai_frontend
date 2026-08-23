"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  MapPin,
  ArrowRight,
  Envelope,
  ArrowUpRight,
} from "@phosphor-icons/react";
import type { ProjectEntry } from "@/data/projects.data";

interface ProjectsDirectoryProps {
  projects: ProjectEntry[];
}

export const ProjectsDirectory: React.FC<ProjectsDirectoryProps> = ({
  projects,
}) => {
  // Take exactly 10 featured projects
  const displayProjects = React.useMemo(() => {
    return projects.slice(0, 10);
  }, [projects]);

  return (
    <section
      id="projects-featured-section"
      className="relative w-full px-6 md:px-12 py-10 md:py-16 bg-canvas-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300"
    >
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 pb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent-red font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
              Trung tâm Đổi Mới Sáng Tạo Gia Lai
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-black dark:text-white">
              NHỮNG DỰ ÁN TIÊU BIỂU
            </h2>
          </div>
        </div>

        {/* ── ASYMMETRIC EDITORIAL MASONRY GRID (10 FEATURED PROJECTS) ── */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-16 md:mb-24">
            {displayProjects.map((project, idx) => {
              // Varied architectural proportions per item:
              // 0: Wide Panorama (8 cols)
              // 1: Vertical Portrait (4 cols)
              // 2: Half Canvas (6 cols)
              // 3: Half Canvas (6 cols)
              // 4: Full-width Ribbon (12 cols)
              // 5: Half Canvas (6 cols)
              // 6: Half Canvas (6 cols)
              // 7: Vertical Portrait (4 cols)
              // 8: Wide Panorama (8 cols)
              // 9: Full-width Panorama (12 cols)
              const mod = idx % 5;
              let colSpanClass = "md:col-span-6 lg:col-span-4 h-[380px]";
              let isHeroWide = false;

              if (idx === 0 || idx === 8) {
                colSpanClass =
                  "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]";
                isHeroWide = true;
              } else if (idx === 1 || idx === 7) {
                colSpanClass =
                  "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]";
              } else if (idx === 2 || idx === 3 || idx === 5 || idx === 6) {
                colSpanClass =
                  "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]";
              } else if (idx === 4 || idx === 9) {
                colSpanClass =
                  "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]";
                isHeroWide = true;
              }

              return (
                <article
                  key={project.id}
                  className={`group relative flex flex-col justify-end overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-500 select-none ${colSpanClass}`}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="absolute inset-0 z-0"
                    aria-label={`Xem dự án ${project.title}`}
                  >
                    {/* Background Image */}
                    <OptimizedImage
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes={
                        isHeroWide
                          ? "(max-width: 1024px) 100vw, 70vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  {/* ── Default Bottom State (Fades out on hover) ── */}
                  <div className="absolute bottom-0 inset-x-0 z-10 p-5 sm:p-6 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent -z-10" />
                    <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono mb-1.5">
                      <MapPin
                        weight="fill"
                        className="text-accent-red w-3.5 h-3.5 shrink-0"
                      />
                      <span>{project.location}</span>
                    </div>
                    <h3
                      className={`font-heading font-extrabold text-white uppercase leading-tight line-clamp-2 ${
                        isHeroWide
                          ? "text-xl sm:text-2xl lg:text-3xl max-w-3xl"
                          : "text-lg sm:text-xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* ── Liquid Glass Hover Panel (Slides up on hover) ── */}
                  <div className="absolute bottom-0 inset-x-0 z-20 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-lg backdrop-saturate-150 border-t border-white/50 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
                    <div className="relative overflow-hidden p-5 sm:p-6 text-black dark:text-white">
                      {/* Location */}
                      <div className="relative flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-2">
                        <MapPin
                          weight="fill"
                          className="text-accent-red w-3.5 h-3.5 shrink-0"
                        />
                        <span>{project.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="relative font-heading text-base sm:text-xl font-extrabold uppercase leading-snug text-black dark:text-white mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Description */}
                      {project.description && (
                        <p className="relative text-xs leading-relaxed line-clamp-2 text-zinc-700 dark:text-zinc-300 font-sans mb-3 max-w-2xl">
                          {project.description}
                        </p>
                      )}

                      {/* Action CTA */}
                      <div className="relative flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-accent-red">
                          Khám phá chi tiết
                        </span>
                        <ArrowRight
                          className="w-3.5 h-3.5 text-accent-red transform group-hover:translate-x-1.5 transition-transform duration-300"
                          weight="bold"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {/* ── ABOUT US STYLE FULL-WIDTH CTA SECTION ── */}
        <motion.div
          className="relative text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 md:p-16 space-y-6 relative overflow-hidden transition-all duration-300">
            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-2 text-accent-red font-mono text-xs font-bold uppercase tracking-widest mb-1">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
              Năng lực chuyển đổi số
            </div>

            {/* Headline */}
            <h3 className="text-2xl md:text-4xl font-bold font-heading tracking-tight uppercase max-w-4xl mx-auto leading-tight text-zinc-950 dark:text-white transition-colors duration-300">
              Hơn 100+ Công trình Trọng điểm trên Toàn Quốc
            </h3>

            {/* Description */}
            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4 transition-colors duration-300 font-sans">
              Hãy liên hệ để kết nối công nghệ, chuyên gia và hệ sinh thái, cùng
              đưa chuyển đổi số vào thực tiễn.
            </p>

            {/* Dual Action Buttons matching About Us */}
            <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 shadow-lg group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none"
              >
                Liên hệ tư vấn giải pháp
                <span className="w-8 h-8 bg-white/10 dark:bg-zinc-100 flex items-center justify-center text-inherit group-hover:bg-white/20 transition-colors">
                  <Envelope className="w-4 h-4" weight="thin" />
                </span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("open-mega-menu"));
                }}
                className="inline-flex items-center gap-3 pl-6 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 font-mono text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 backdrop-blur-sm group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer"
              >
                Khám phá giải pháp
                <span className="w-8 h-8 bg-zinc-100 dark:bg-white/10 flex items-center justify-center text-inherit group-hover:bg-accent-red/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4" weight="thin" />
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
