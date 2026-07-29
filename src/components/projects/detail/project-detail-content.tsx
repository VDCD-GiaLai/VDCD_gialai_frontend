"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import {
  getProjectById,
  getNextProject,
  type ProjectEntry,
} from "@/data/projects.data";
import { fetchProjectBySlugFromApi } from "@/services/project.service";
import { useTransitionStore } from "@/store/transition-store";
import { useProjectDetailGsap } from "@/hooks/use-project-detail-gsap";
import { ProjectDetailHero } from "./project-detail-hero";
import { ProjectDetailInfo } from "./project-detail-info";
import { ProjectDetailChallenge } from "./project-detail-challenge";

import { ProjectDetailTransformation } from "./project-detail-transformation";
import { ProjectDetailHighlights } from "./project-detail-highlights";
import { ProjectDetailGallery } from "./project-detail-gallery";
import { ProjectDetailNext } from "./project-detail-next";
import "./project-detail.css";

interface ProjectDetailContentProps {
  slug: string;
}

/**
 * Client-side orchestrator for the Project Detail page.
 * Composes all sections and manages the entry transition.
 */
export const ProjectDetailContent = ({ slug }: ProjectDetailContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = React.useState<ProjectEntry | null>(
    getProjectById(slug) || null,
  );
  const [nextProject, setNextProject] = React.useState<
    ProjectEntry | undefined
  >(project ? getNextProject(project.id) : undefined);

  useEffect(() => {
    fetchProjectBySlugFromApi(slug).then((data) => {
      if (data) {
        setProject(data);
        if (data.detail?.nextProjectId) {
          fetchProjectBySlugFromApi(data.detail.nextProjectId).then(
            (nextData) => {
              if (nextData) setNextProject(nextData);
            },
          );
        }
      }
    });
  }, [slug]);

  const { isTransitioning, endTransition } = useTransitionStore();

  /* Signal the transition overlay to fade out after mount */
  useEffect(() => {
    if (isTransitioning) {
      /* Small delay to let the page paint first */
      const timer = setTimeout(() => {
        endTransition();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, endTransition]);

  /* Initialise all GSAP animations scoped to this container */
  useProjectDetailGsap(containerRef);

  if (!project) return null;

  return (
    <div
      ref={containerRef}
      className="project-detail w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* 1 — Hero */}
      <ProjectDetailHero project={project} />

      {/* 2 — Project Information */}
      <ProjectDetailInfo project={project} />

      {/* 3 — Challenge */}
      <ProjectDetailChallenge project={project} />

      {/* 5 — Reality → Digital Transformation */}
      <ProjectDetailTransformation project={project} />

      {/* 6 — Technical Highlights */}
      <ProjectDetailHighlights project={project} />

      {/* 7 — Gallery */}
      <ProjectDetailGallery project={project} />

      {/* 8 — Next Project */}
      {nextProject && <ProjectDetailNext project={nextProject} />}
    </div>
  );
};
