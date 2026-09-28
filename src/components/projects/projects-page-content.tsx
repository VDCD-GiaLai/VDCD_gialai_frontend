"use client";

import * as React from "react";
import { useRef, useState, useEffect, useTransition } from "react";
import { useProjectsGsap } from "@/hooks/use-projects-gsap";
import { ProjectsHeroBanner } from "./projects-hero-banner";
import { ProjectsDirectory } from "./projects-directory";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import { fetchProjectsPaginatedFromApi } from "@/services/project.service";
import "./projects.css";

const PROJECTS_PER_PAGE = 10;

/**
 * Client-side container for the Projects page.
 * Displays the Hero Banner followed by the featured projects showcase with pagination.
 */
export const ProjectsPageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Initialise GSAP animations scoped to this container */
  useProjectsGsap(containerRef);

  /* ── State ─────────────────────────────────────────── */
  const [projects, setProjects] = useState<ProjectEntry[]>(() =>
    PROJECTS_DATA.slice(0, PROJECTS_PER_PAGE),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(PROJECTS_DATA.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(PROJECTS_DATA.length / PROJECTS_PER_PAGE),
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let ignore = false;

    fetchProjectsPaginatedFromApi({
      page: 1,
      limit: PROJECTS_PER_PAGE,
    })
      .then((res) => {
        if (!ignore && res) {
          setProjects(res.items);
          setTotal(res.total);
          setTotalPages(res.totalPages);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch paginated projects:", err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const handlePageChange = (page: number) => {
    const directorySection = document.getElementById(
      "projects-featured-section",
    );
    if (directorySection) {
      directorySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    startTransition(async () => {
      setCurrentPage(page);
      try {
        const res = await fetchProjectsPaginatedFromApi({
          page,
          limit: PROJECTS_PER_PAGE,
        });
        if (res) {
          setProjects(res.items);
          setTotal(res.total);
          setTotalPages(res.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch paginated projects:", err);
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* 1 -- Editorial Hero Slider */}
      <ProjectsHeroBanner />

      {/* 2 -- Những dự án tiêu biểu (Featured Projects Showcase with Pagination) */}
      <ProjectsDirectory
        projects={projects}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isPending}
      />
    </div>
  );
};
