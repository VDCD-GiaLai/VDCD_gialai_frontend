"use client";

import * as React from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import type { ProjectEntry } from "@/data/projects.data";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
import { Pagination } from "@/components/ui/pagination";

interface ProjectsDirectoryProps {
  projects: ProjectEntry[];
  total?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

/**
 * Computes asymmetric editorial column span and height classes.
 * Ensures that rows cleanly sum to 12 columns across all device sizes,
 * even when the current page has fewer than 10 items.
 */
function getGridItemStyle(idx: number, count: number) {
  // Full 10-item standard page
  if (count === 10) {
    if (idx === 0 || idx === 8) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1 || idx === 7) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    if (idx === 2 || idx === 3 || idx === 5 || idx === 6) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    if (idx === 4 || idx === 9) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
        isHeroWide: true,
      };
    }
  }

  // Adaptive layout for partial page (count < 10)
  if (count === 1) {
    return {
      colSpanClass: "md:col-span-12 lg:col-span-12 h-[420px] lg:h-[480px]",
      isHeroWide: true,
    };
  }
  if (count === 2) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    return {
      colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
      isHeroWide: false,
    };
  }
  if (count === 3) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-12 lg:col-span-12 h-[380px] lg:h-[420px]",
      isHeroWide: true,
    };
  }
  if (count === 4) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
      isHeroWide: false,
    };
  }
  if (count === 5) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    if (idx === 2 || idx === 3) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
      isHeroWide: true,
    };
  }
  if (count === 6) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
      isHeroWide: false,
    };
  }
  if (count === 7) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    if (idx === 2 || idx === 3) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    if (idx === 4) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
        isHeroWide: true,
      };
    }
    return {
      colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
      isHeroWide: false,
    };
  }
  if (count === 8) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    if (idx === 2 || idx === 3) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    if (idx === 4) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
        isHeroWide: true,
      };
    }
    if (idx === 5 || idx === 6) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
      isHeroWide: true,
    };
  }
  if (count === 9) {
    if (idx === 0) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
        isHeroWide: true,
      };
    }
    if (idx === 1) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    if (idx === 2 || idx === 3) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    if (idx === 4) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
        isHeroWide: true,
      };
    }
    if (idx === 5 || idx === 6) {
      return {
        colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
        isHeroWide: false,
      };
    }
    if (idx === 7) {
      return {
        colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
        isHeroWide: false,
      };
    }
    return {
      colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
      isHeroWide: true,
    };
  }

  // Fallback pattern for arbitrary counts
  const mod = idx % 10;
  if (mod === 0 || mod === 8) {
    return {
      colSpanClass: "md:col-span-12 lg:col-span-8 h-[420px] lg:h-[460px]",
      isHeroWide: true,
    };
  }
  if (mod === 1 || mod === 7) {
    return {
      colSpanClass: "md:col-span-12 lg:col-span-4 h-[420px] lg:h-[460px]",
      isHeroWide: false,
    };
  }
  if (mod === 2 || mod === 3 || mod === 5 || mod === 6) {
    return {
      colSpanClass: "md:col-span-6 lg:col-span-6 h-[380px] lg:h-[400px]",
      isHeroWide: false,
    };
  }
  return {
    colSpanClass: "md:col-span-12 lg:col-span-12 h-[340px] lg:h-[380px]",
    isHeroWide: true,
  };
}

export const ProjectsDirectory: React.FC<ProjectsDirectoryProps> = ({
  projects,
  total,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
}) => {
  const displayProjects = projects;
  const projectCount = total ?? projects.length;

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

          <div className="flex items-center gap-4">
            <span className="hidden md:block w-16 h-[1px] bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm font-mono uppercase tracking-[0.2em]">
              [{projectCount}] DỰ ÁN
            </p>
          </div>
        </div>

        {/* ── ASYMMETRIC EDITORIAL MASONRY GRID ── */}
        {displayProjects.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-12 md:mb-16 transition-opacity duration-300 ${
              isLoading ? "opacity-40 pointer-events-none" : "opacity-100"
            }`}
          >
            {displayProjects.map((project, idx) => {
              const { colSpanClass, isHeroWide } = getGridItemStyle(
                idx,
                displayProjects.length,
              );

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

        {/* ── PAGINATION CONTROLS ── */}
        {totalPages > 1 && onPageChange ? (
          <div className="flex justify-center mb-16 md:mb-20">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={onPageChange}
              showControls
            />
          </div>
        ) : null}

        {/* ── UNIFIED CTA SECTION ── */}
        <CommonCtaSection standalone={false} />
      </div>
    </section>
  );
};
