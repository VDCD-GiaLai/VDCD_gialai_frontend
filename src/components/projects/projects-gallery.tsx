"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ProjectEntry } from "@/data/projects.data";
import { useTransitionStore } from "@/store/transition-store";

import { MapPin, ArrowRight } from "@phosphor-icons/react";

/* ────────────────────────────────────────────────────────
   Project Card — shared atomic component
   Now intercepts clicks for shared-element transition.
   ──────────────────────────────────────────────────────── */

interface ProjectCardProps {
  project: ProjectEntry;
  aspectClass: string;
}

const ProjectCard = ({ project, aspectClass }: ProjectCardProps) => {
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.startTransition);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      /* Find the image wrapper to capture its rect */
      const card = e.currentTarget;
      const imageWrapper = card.querySelector(
        ".prj-card__image-wrapper",
      ) as HTMLElement | null;

      if (!imageWrapper) {
        /* Fallback: navigate without transition */
        router.push(`/projects/${project.id}`);
        return;
      }

      const rect = imageWrapper.getBoundingClientRect();

      startTransition({
        sourceRect: {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        },
        imageSrc: project.coverImage,
        projectId: project.id,
        projectTitle: project.title,
      });
    },
    [project, router, startTransition],
  );

  return (
    <div
      className="group relative block cursor-pointer overflow-hidden rounded-xl bg-black"
      role="link"
      tabIndex={0}
      aria-label={`Xem dự án ${project.title}`}
      data-project-id={project.id}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
      }}
    >
      <div
        className={`prj-card__image-wrapper relative w-full overflow-hidden ${aspectClass}`}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Text Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end">
          {/* Category & Title */}
          <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
            <div className="flex items-end gap-2 mb-3">
              <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-accent-red">
                {project.category}
              </span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Hidden Reveal Section using grid 0fr -> 1fr trick */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
            <div className="overflow-hidden">
              <div className="flex flex-col gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <div className="flex items-center gap-2 text-sm text-zinc-300 font-mono-label">
                  <MapPin weight="thin" className="text-accent-red" />
                  <span>{project.location}</span>
                  <span className="opacity-50">·</span>
                  <span>{project.year}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group/btn w-fit">
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent-red group-hover/btn:after:w-full after:transition-all after:duration-300">
                    Xem chi tiết
                  </span>
                  <ArrowRight
                    weight="thin"
                    className="text-accent-red transform group-hover/btn:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────
   Gallery Section — receives pre-filtered projects
   ──────────────────────────────────────────────────────── */

interface ProjectsGalleryProps {
  projects: ProjectEntry[];
}

export const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
  return (
    <section
      className="gallery-section px-4 md:px-8 max-w-[1600px] mx-auto py-16 md:py-24"
      aria-label="Bộ sưu tập dự án"
    >
      {/* Section header */}
      <div className="gallery-header mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 md:pb-8">
        <h2 className="gsap-reveal font-heading text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface dark:text-white leading-none">
          Tất cả dự án
        </h2>
        <div className="gsap-reveal flex items-center gap-4">
          <span className="hidden md:block w-16 h-[1px] bg-zinc-300 dark:bg-zinc-700"></span>
          <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm font-mono uppercase tracking-[0.2em]">
            [{projects.length}] dự án
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              aspectClass="prj-card__image-wrapper--landscape"
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800">
            <span className="text-4xl mb-4">🔍</span>
            <h3 className="text-xl font-bold text-black dark:text-white mb-2">
              Không tìm thấy dự án
            </h3>
            <p className="text-secondary dark:text-zinc-500 max-w-md">
              Không có dự án nào phù hợp với tiêu chí tìm kiếm. Vui lòng thử lại
              với từ khóa hoặc bộ lọc khác.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
