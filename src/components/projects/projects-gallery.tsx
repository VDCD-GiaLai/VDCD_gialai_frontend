"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import { fetchProjectsFromApi } from "@/services/project.service";
import { useTransitionStore } from "@/store/transition-store";

import { FiMapPin, FiArrowRight } from "react-icons/fi";

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
                  <FiMapPin className="text-accent-red" />
                  <span>{project.location}</span>
                  <span className="opacity-50">·</span>
                  <span>{project.year}</span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group/btn w-fit">
                  <span className="relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-accent-red group-hover/btn:after:w-full after:transition-all after:duration-300">
                    Xem chi tiết
                  </span>
                  <FiArrowRight className="text-accent-red transform group-hover/btn:translate-x-1 transition-transform" />
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
   Gallery Section — asymmetric editorial layout
   ──────────────────────────────────────────────────────── */

export const ProjectsGallery = () => {
  const [projects, setProjects] = React.useState<ProjectEntry[]>(PROJECTS_DATA);
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("Tất cả");
  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">(
    "newest",
  );

  React.useEffect(() => {
    fetchProjectsFromApi().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  // Extract unique categories
  const categories = React.useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return ["Tất cả", ...Array.from(cats)];
  }, [projects]);

  // Filter and sort
  const displayedProjects = React.useMemo(() => {
    let result = [...projects];

    // Filter by category
    if (selectedCategory !== "Tất cả") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort by year
    result.sort((a, b) => {
      const yearA = parseInt(a.year, 10) || 0;
      const yearB = parseInt(b.year, 10) || 0;
      return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
    });

    return result;
  }, [projects, selectedCategory, sortOrder]);

  return (
    <section
      className="gallery-section px-4 md:px-8 max-w-[1600px] mx-auto pb-24"
      aria-label="Bộ sưu tập dự án"
    >
      {/* Section header */}
      <div className="gallery-header mb-12">
        <h2 className="gsap-reveal font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight">
          Tất cả dự án
        </h2>
      </div>

      {/* Controls: Filter & Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 border-b border-slate-200/50 dark:border-zinc-800/50 pb-6">
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <span className="text-xs font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-widest hidden sm:inline-block whitespace-nowrap">
            Phân loại:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-transparent border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-black dark:text-white font-medium focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all cursor-pointer truncate max-w-full sm:max-w-[250px] md:max-w-[350px]"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="bg-white dark:bg-zinc-900"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <span className="text-xs font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-widest hidden sm:inline-block whitespace-nowrap">
            Sắp xếp:
          </span>
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "newest" | "oldest")
            }
            className="w-full sm:w-auto bg-transparent border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-black dark:text-white font-medium focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red transition-all cursor-pointer"
          >
            <option value="newest" className="bg-white dark:bg-zinc-900">
              Mới nhất
            </option>
            <option value="oldest" className="bg-white dark:bg-zinc-900">
              Cũ nhất
            </option>
          </select>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((proj) => (
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
              Chưa có dự án nào thuộc phân loại "{selectedCategory}". Vui lòng
              chọn phân loại khác.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
