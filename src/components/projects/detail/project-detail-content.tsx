"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import { getProjectById, type ProjectEntry } from "@/data/projects.data";
import {
  fetchProjectBySlugFromApi,
  fetchProjectsFromApi,
} from "@/services/project.service";
import { useTransitionStore } from "@/store/transition-store";
import { useProjectDetailGsap } from "@/hooks/use-project-detail-gsap";
import { ProjectDetailHero } from "./project-detail-hero";
import { ProjectDetailInfo } from "./project-detail-info";
import { ProjectDetailChallenge } from "./project-detail-challenge";
import { ProjectDetailTransformation } from "./project-detail-transformation";
import { ProjectDetailHighlights } from "./project-detail-highlights";
import { ProjectDetailGallery } from "./project-detail-gallery";
import { ProjectDetailRelatedArticles } from "./project-detail-related-articles";
import { ProjectDetailRelatedProjects } from "./project-detail-related-projects";
import { CommonCtaSection } from "@/components/ui/common-cta-section";
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
  const [relatedProjects, setRelatedProjects] = React.useState<ProjectEntry[]>(
    [],
  );

  useEffect(() => {
    fetchProjectBySlugFromApi(slug).then((data) => {
      if (data) {
        setProject(data);
      }
    });

    // Fetch related projects (latest projects excluding current)
    fetchProjectsFromApi(4).then((allProjects) => {
      const filtered = allProjects.filter((p) => p.id !== slug).slice(0, 3);
      setRelatedProjects(filtered);
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

      {/* 2 — Project Information + Overview + Services */}
      <ProjectDetailInfo project={project} />

      {/* 3 — Challenge */}
      <ProjectDetailChallenge project={project} />

      {/* 4 — Reality → Digital Transformation */}
      <ProjectDetailTransformation project={project} />

      {/* 5 — Technical Highlights */}
      <ProjectDetailHighlights project={project} />

      {/* 6 — Gallery */}
      <ProjectDetailGallery project={project} />

      {/* 7 — Related Articles */}
      <ProjectDetailRelatedArticles project={project} />

      {/* 8 — Related Projects */}
      {relatedProjects.length > 0 && (
        <ProjectDetailRelatedProjects projects={relatedProjects} />
      )}

      {/* 9 — Unified CTA Section */}
      <CommonCtaSection
        badge="Triển khai thực tế"
        title="BẠN CẦN GIẢI PHÁP TƯƠNG TỰ CHO CÔNG TRÌNH CỦA MÌNH?"
        description="Đội ngũ kỹ sư và chuyên gia công nghệ VDCD sẵn sàng khảo sát thực địa và tư vấn phương án tối ưu."
        primaryButton={{
          label: "Liên hệ tư vấn dự án",
          href: "/contact",
          icon: "envelope",
        }}
        secondaryButton={{
          label: "Xem các dự án khác",
          href: "/projects",
          icon: "arrow-right",
        }}
      />
    </div>
  );
};
