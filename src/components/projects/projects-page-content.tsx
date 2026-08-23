"use client";

import * as React from "react";
import { useRef } from "react";
import { useProjectsGsap } from "@/hooks/use-projects-gsap";
import { ProjectsHeroBanner } from "./projects-hero-banner";
import { ProjectsDirectory } from "./projects-directory";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import { fetchProjectsFromApi } from "@/services/project.service";
import "./projects.css";

/**
 * Client-side container for the Projects page.
 * Displays the Hero Banner followed by the 10 featured projects showcase.
 */
export const ProjectsPageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Initialise GSAP animations scoped to this container */
  useProjectsGsap(containerRef);

  /* ── Data ─────────────────────────────────────────── */
  const [projects, setProjects] = React.useState<ProjectEntry[]>(PROJECTS_DATA);

  React.useEffect(() => {
    fetchProjectsFromApi().then((data) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* 1 -- Editorial Hero Slider */}
      <ProjectsHeroBanner />

      {/* 2 -- Những dự án tiêu biểu (Top 10 Featured Projects Showcase) */}
      <ProjectsDirectory projects={projects} />
    </div>
  );
};
