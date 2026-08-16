"use client";

import * as React from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MapPin, ArrowRight } from "@phosphor-icons/react";
import type { ProjectEntry } from "@/data/projects.data";

/* ── Props ───────────────────────────────────────────── */

interface ProjectsFeaturedProps {
  projects: ProjectEntry[];
}

/* ── Big Card (50% left side) ────────────────────────── */

export const FeaturedBigCard = ({ project }: { project: ProjectEntry }) => (
  <Link
    href={`/projects/${project.id}`}
    className="group relative block w-full h-[450px] sm:h-[520px] lg:h-full min-h-[480px] lg:min-h-[560px] overflow-hidden rounded-none bg-zinc-950 select-none transition-all duration-500"
  >
    <div className="absolute inset-0">
      <OptimizedImage
        src={project.coverImage}
        alt={project.title}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
    {/* Dark Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Content */}
    <div className="relative z-20 flex flex-col justify-between h-full p-6 sm:p-8 md:p-10">
      <div className="flex items-center justify-end">
        <span className="text-xs font-mono text-zinc-200 bg-black/50 backdrop-blur-md px-3 py-1 shadow-sm">
          {project.year}
        </span>
      </div>

      <div>
        {/* Category & Title */}
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono mb-2">
            <MapPin weight="fill" className="text-accent-red w-3.5 h-3.5" />
            <span>{project.location}</span>
            <span className="opacity-40">·</span>
            <span className="uppercase text-[11px] tracking-wider text-accent-red font-bold">
              {project.category}
            </span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {project.title}
          </h3>
        </div>

        {/* Hidden Reveal Section using grid 0fr -> 1fr */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
              {project.description && (
                <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 leading-relaxed max-w-xl opacity-90">
                  {project.description}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-accent-red transition-colors group/btn w-fit">
                <span className="relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent-red group-hover/btn:after:w-full after:transition-all after:duration-300">
                  Xem chi tiết dự án
                </span>
                <ArrowRight
                  weight="bold"
                  className="w-4 h-4 text-accent-red transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

/* ── Small Card (50% right side stacked) ─────────────── */

export const FeaturedSmallCard = ({ project }: { project: ProjectEntry }) => (
  <Link
    href={`/projects/${project.id}`}
    className="group relative block w-full h-[220px] sm:h-[260px] lg:h-1/2 overflow-hidden rounded-none bg-zinc-950 select-none flex-1 transition-all duration-500"
  >
    <div className="absolute inset-0">
      <OptimizedImage
        src={project.coverImage}
        alt={project.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-20 flex flex-col justify-between h-full p-5 sm:p-6">
      <div className="flex items-center justify-end">
        <span className="text-[11px] font-mono text-zinc-200 bg-black/50 backdrop-blur-md px-2.5 py-1 shadow-sm">
          {project.year}
        </span>
      </div>

      <div>
        {/* Category & Title */}
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <div className="flex items-center gap-1.5 text-zinc-300 text-[11px] font-mono mb-1">
            <MapPin weight="fill" className="text-accent-red w-3 h-3" />
            <span>{project.location}</span>
            <span className="opacity-40">·</span>
            <span className="uppercase text-[10px] tracking-wider text-accent-red font-bold">
              {project.category}
            </span>
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white leading-snug line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Hidden Reveal Section using grid 0fr -> 1fr */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
              {project.description && (
                <p className="text-zinc-300 text-xs line-clamp-2 leading-relaxed opacity-90">
                  {project.description}
                </p>
              )}
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white/90 group-hover:text-accent-red transition-colors group/btn w-fit">
                <span className="relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent-red group-hover/btn:after:w-full after:transition-all after:duration-300">
                  Chi tiết
                </span>
                <ArrowRight
                  weight="bold"
                  className="w-3.5 h-3.5 text-accent-red transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

/* ── Main Featured Component ───────────────────────────── */

export function ProjectsFeatured({ projects }: ProjectsFeaturedProps) {
  if (!projects || projects.length < 3) return null;

  const mainProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <section
      className="px-4 md:px-8 max-w-[1600px] mx-auto pt-12 pb-6 md:pt-16 md:pb-8"
      aria-label="Dự án tiêu biểu"
    >
      {/* Section Header */}
      <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <span className="text-accent-red font-mono text-xs uppercase tracking-[0.2em] font-semibold block mb-2">
            [Tiêu biểu]
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tighter text-on-surface dark:text-white leading-none">
            Các dự án tiêu biểu
          </h2>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-sm max-w-md">
          Các công trình trọng điểm khẳng định vị thế và năng lực giải pháp
          chuyển đổi số của VDCD Group.
        </p>
      </div>

      {/* Grid inside container with 0 Gap between cards */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Left Side: 1 Big Card (50%) */}
        {mainProject && <FeaturedBigCard project={mainProject} />}

        {/* Right Side: 2 Small Cards Stacked (50%) */}
        <div className="flex flex-col gap-0 h-full">
          {sideProjects.map((proj) => (
            <FeaturedSmallCard key={proj.id} project={proj} />
          ))}
        </div>
      </div>
    </section>
  );
}
