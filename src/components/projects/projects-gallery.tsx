"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type ProjectEntry } from "@/data/projects.data";
import { useTransitionStore } from "@/store/transition-store";
import { Pagination } from "@/components/ui/pagination";

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
      className="group relative block cursor-pointer overflow-hidden rounded-none bg-zinc-950 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 select-none"
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
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Top Badges */}
        <div className="absolute top-4 right-4 z-10 flex items-center justify-end pointer-events-none">
          <span className="text-[11px] font-mono text-zinc-200 bg-black/50 backdrop-blur-md px-2.5 py-1 shadow-sm">
            {project.year}
          </span>
        </div>

        {/* Bottom Text Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end z-10">
          <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-mono mb-2">
            <MapPin weight="fill" className="text-accent-red w-3.5 h-3.5" />
            <span>{project.location}</span>
            <span className="opacity-40">·</span>
            <span className="uppercase text-[10px] tracking-wider text-zinc-400">
              {project.category}
            </span>
          </div>

          <h3 className="font-heading text-xl md:text-2xl font-extrabold text-white leading-tight mb-3 group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
            {project.title}
          </h3>

          <div className="flex items-center gap-2 text-xs font-bold text-white/90 group-hover:text-accent-red uppercase tracking-wider transition-colors">
            <span className="relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1.5px] after:bg-accent-red group-hover:after:w-full after:transition-all after:duration-300">
              Xem chi tiết
            </span>
            <ArrowRight
              weight="bold"
              className="w-3.5 h-3.5 text-accent-red transform group-hover:translate-x-1.5 transition-transform duration-300"
            />
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

const ITEMS_PER_PAGE = 9;

export const ProjectsGallery = ({ projects }: ProjectsGalleryProps) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [prevProjects, setPrevProjects] = React.useState(projects);

  if (prevProjects !== projects) {
    setPrevProjects(projects);
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const paginatedProjects = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [projects, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const galleryElement = document.querySelector(".gallery-section");
    if (galleryElement) {
      galleryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {paginatedProjects.length > 0 ? (
          paginatedProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              aspectClass="prj-card__image-wrapper--landscape"
            />
          ))
        ) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-zinc-900/50 rounded-none border border-dashed border-slate-200 dark:border-zinc-800">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            showControls
          />
        </div>
      )}
    </section>
  );
};
