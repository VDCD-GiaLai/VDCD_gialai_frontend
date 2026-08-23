"use client";

import * as React from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import type { ProjectEntry } from "@/data/projects.data";

interface ProjectsMondrianProps {
  projects: ProjectEntry[];
}

export const ProjectsMondrian: React.FC<ProjectsMondrianProps> = ({
  projects,
}) => {
  // Take top 3 spotlight projects
  const topProjects = projects.slice(0, 3);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  if (topProjects.length === 0) return null;

  return (
    <section className="relative w-full px-6 md:px-12 py-6 md:py-10 bg-canvas-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      <div className="w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-5 border-b border-zinc-200 dark:border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-accent-red font-mono text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
              Trung tâm Đổi Mới Sáng Tạo Gia Lai
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight font-heading text-black dark:text-white">
              TIÊU BIỂU
            </h2>
          </div>
        </div>

        {/* ── KINETIC EXPANDABLE ARCHITECTURAL CANVAS (3 SPOTLIGHT PROJECTS) ── */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 h-auto lg:h-[640px] w-full">
          {topProjects.map((project, index) => {
            const isActive = activeIndex === index;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group relative overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                  isActive
                    ? "lg:flex-[3.5] h-[480px] lg:h-full shadow-2xl"
                    : "lg:flex-[1] h-[160px] lg:h-full opacity-90 lg:opacity-75 hover:opacity-100"
                }`}
              >
                {/* 1. Background Image */}
                <div className="absolute inset-0 z-0">
                  <OptimizedImage
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover object-center transition-all duration-700 ease-out ${
                      isActive
                        ? "scale-100 group-hover:scale-105"
                        : "scale-100 brightness-90 group-hover:brightness-100"
                    }`}
                  />
                  {/* Clean natural gradient */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/90 via-black/30 to-transparent"
                        : "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                    }`}
                  />
                </div>

                {/* 2. Number Identifier (Top Right) */}
                <div className="absolute top-6 right-6 z-20 pointer-events-none">
                  <span className="font-mono text-sm lg:text-base font-bold text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                    {itemNumber}
                  </span>
                </div>

                {/* 3. Collapsed State: Vertical Kinetic Typography (Desktop only) */}
                {!isActive && (
                  <div className="hidden lg:flex absolute inset-0 z-10 flex-col justify-end p-8 pointer-events-none">
                    <div className="flex items-center gap-3 [writing-mode:vertical-rl] rotate-180 mb-4">
                      <span className="font-heading text-lg font-bold text-white tracking-wider uppercase truncate max-h-[380px]">
                        {project.title}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono">
                      <MapPin
                        weight="fill"
                        className="text-accent-red w-3.5 h-3.5 shrink-0"
                      />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                )}

                {/* 4. Active Expanded Content (with Liquid Glass panel on hover) */}
                <div
                  className={`relative z-20 flex flex-col justify-end h-full p-6 sm:p-8 md:p-10 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-100 lg:opacity-0"
                  }`}
                >
                  {/* Default Info */}
                  <div className="transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-4">
                    <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono mb-2">
                      <MapPin
                        weight="fill"
                        className="text-accent-red w-4 h-4 shrink-0"
                      />
                      <span className="font-medium tracking-wide">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase leading-tight max-w-2xl">
                      {project.title}
                    </h3>
                  </div>

                  {/* Liquid Glass Hover Reveal Drawer */}
                  <div className="absolute bottom-0 inset-x-0 z-30 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-lg backdrop-saturate-150 border-t border-white/50 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_32px_0_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="relative overflow-hidden p-6 sm:p-8 md:p-10 text-black dark:text-white">
                      {/* Watermark Number */}
                      <span
                        aria-hidden="true"
                        className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none text-black/5 dark:text-white/5 font-heading"
                        style={{
                          fontSize: "8rem",
                          lineHeight: 1,
                          transform: "translateX(15%) translateY(-10%)",
                        }}
                      >
                        {itemNumber}
                      </span>

                      {/* Location bar */}
                      <div className="relative flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-2">
                        <MapPin
                          weight="fill"
                          className="text-accent-red w-4 h-4 shrink-0"
                        />
                        <span>{project.location}</span>
                      </div>

                      {/* Title */}
                      <h3 className="relative font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase leading-snug text-black dark:text-white mb-3">
                        {project.title}
                      </h3>

                      {/* Description */}
                      {project.description && (
                        <p className="relative text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans line-clamp-2 sm:line-clamp-3 mb-5 max-w-3xl">
                          {project.description}
                        </p>
                      )}

                      {/* Link CTA */}
                      <div className="relative flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-3.5">
                        <Link
                          href={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-red hover:underline"
                        >
                          Khám phá chi tiết dự án
                          <ArrowRight
                            className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
                            weight="bold"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
