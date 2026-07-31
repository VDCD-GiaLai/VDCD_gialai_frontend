"use client";

import * as React from "react";
import { useRef } from "react";
import { useProjectsGsap } from "@/hooks/use-projects-gsap";
import { PageHeroBanner } from "@/components/ui/page-hero-banner";
import { ProjectsWorkflow } from "./projects-workflow";
import { ProjectsGallery } from "./projects-gallery";
import "./projects.css";

/**
 * Client-side container for the Projects page.
 * Composes all sections and initialises GSAP animations via the hook.
 */
export const ProjectsPageContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Initialise all GSAP animations scoped to this container */
  useProjectsGsap(containerRef);

  return (
    <div
      ref={containerRef}
      className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    >
      {/* 1 -- Hero */}
      <PageHeroBanner pageKey="projects" showScrollCue />

      {/* 2 -- Workflow */}
      <ProjectsWorkflow />

      {/* 3 -- Transition */}
      <div className="projects-transition">
        <span className="gsap-reveal block font-heading text-[11px] font-bold tracking-[0.25em] uppercase text-accent-red mb-4">
          Dự án
        </span>
        <h2 className="gsap-reveal font-heading text-2xl md:text-4xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight max-w-xl">
          Kết quả chúng tôi
          <br />
          đã đạt được
        </h2>
        <p className="gsap-reveal mt-3 text-secondary dark:text-zinc-400 text-sm leading-relaxed max-w-md">
          Hơn 50 công trình trọng điểm trên khắp Việt Nam — từ hạ tầng giao
          thông, khu kinh tế đến bảo tồn di sản văn hóa.
        </p>
      </div>

      {/* 4 -- Gallery */}
      <ProjectsGallery />
    </div>
  );
};
