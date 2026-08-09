"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

import { fetchFeaturedProjectsFromApi } from "@/services/project.service";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";

interface ProjectItem {
  title: string;
  desc: string;
  img: string;
  link: string;
}

const INITIAL_PROJECTS: ProjectItem[] = PROJECTS_DATA.slice(0, 6).map((p) => ({
  title: p.title,
  desc: p.description || p.title,
  img: p.coverImage,
  link: `/projects/${p.id}`,
}));

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group relative overflow-hidden cursor-pointer
                 border border-whisper-border dark:border-zinc-800
                 hover:shadow-2xl transition-shadow duration-500"
      style={{ height: "400px" }}
    >
      {/* ── Image — always fills full card ── */}
      <OptimizedImage
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover group-hover:scale-105 transition-all duration-700"
        src={project.img}
        transformation={[{ width: 1200, quality: 90, format: "auto" }]}
      />

      {/* ── Animated border — draws clockwise on hover ── */}
      <span
        className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40
                       group-hover:w-full transition-[width] duration-[350ms] ease-linear [transition-delay:0ms]
                       group-hover:[transition-delay:0ms]"
      />
      <span
        className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40
                       group-hover:h-full transition-[height] duration-[350ms] ease-linear
                       group-hover:[transition-delay:350ms]"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40
                       group-hover:w-full transition-[width] duration-[350ms] ease-linear
                       group-hover:[transition-delay:700ms]"
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40
                       group-hover:h-full transition-[height] duration-[350ms] ease-linear
                       group-hover:[transition-delay:1050ms]"
      />

      {/* ── Default bottom: gradient + title + white border ── */}
      <div
        className="project-card-default-bottom absolute bottom-0 left-0 right-0 z-10
                   transition-transform transition-opacity duration-500 ease-in-out will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative px-5 pb-4 pt-14">
          <h3 className="font-heading text-base font-bold uppercase leading-snug line-clamp-2 text-white">
            {project.title}
          </h3>
          <div className="mt-3 h-px bg-white/20" />
        </div>
      </div>

      {/* ── White data panel — slides UP on hover ── */}
      <div
        className="project-card-hover-panel absolute bottom-0 left-0 right-0 z-20
                   bg-white dark:bg-zinc-900
                   transition-transform transition-opacity duration-500 ease-in-out will-change-transform"
      >
        {/* Panel content wrapper */}
        <div className="relative overflow-hidden px-6 pt-5 pb-6">
          {/* Decorative number */}
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: "13rem",
              color: "rgba(0, 0, 0, 0.07)",
              lineHeight: 1,
              transform: "translateX(33%)",
            }}
          >
            {index + 1}
          </span>

          {/* Tag */}
          <div className="relative flex items-center gap-2 mb-3">
            <div className="w-2 h-2 flex-shrink-0 bg-accent-red" />
            <span className="font-bold text-[10px] text-accent-red uppercase tracking-[0.3em]">
              AutoTimelapse · VDCD
            </span>
          </div>

          {/* Title */}
          <h3
            className="relative font-heading text-base font-bold uppercase leading-snug line-clamp-2
                         text-black dark:text-white mb-2"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="relative text-xs leading-relaxed line-clamp-2 text-secondary dark:text-zinc-400">
            {project.desc}
          </p>

          {/* Arrow */}
          <div className="relative mt-4">
            <ArrowRight className="w-4 h-4 text-accent-red" weight="thin" />
          </div>
        </div>
      </div>
    </a>
  );
}

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] =
    React.useState<ProjectItem[]>(INITIAL_PROJECTS);

  React.useEffect(() => {
    fetchFeaturedProjectsFromApi(6).then((data) => {
      if (data && data.length > 0) {
        setProjects(
          data.map((p) => ({
            title: p.title,
            desc: p.description || p.title,
            img: p.coverImage,
            link: `/projects/${p.id}`,
          })),
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current || projects.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      ScrollTrigger.config({ limitCallbacks: true });

      requestAnimationFrame(() => {
        gsap.set(".project-card", {
          autoAlpha: 0,
          y: 40,
          willChange: "transform, opacity",
        });

        ScrollTrigger.batch(".project-card", {
          start: "top 85%",
          once: true,
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.05,
            }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 py-16"
    >
      {/* Section Header */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-start">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase leading-tight text-black dark:text-white">
            Các dự án <br />
            <span
              style={{
                WebkitTextStroke: "2px #3c3c3cff",
                color: "transparent",
              }}
            >
              tiêu biểu
            </span>
          </h2>
        </div>
        <div
          className="h-px flex-grow mx-10 hidden md:block mb-5"
          style={{ background: "rgba(255, 0, 0, 1)" }}
        />
        <div className="flex flex-col items-start md:items-end gap-3 mt-6 md:mt-0">
          <p className="max-w-xs text-sm text-secondary dark:text-zinc-400 uppercase tracking-widest leading-loose md:text-right">
            Những công trình tiêu biểu VDCD đã triển khai trên khắp cả nước.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent-red font-bold text-xs uppercase tracking-[0.25em] hover:opacity-70 transition-opacity"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" weight="thin" />
          </Link>
        </div>
      </div>

      {/* Card Grid */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
