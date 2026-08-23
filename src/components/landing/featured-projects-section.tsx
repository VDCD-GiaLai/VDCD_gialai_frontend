"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

import { fetchFeaturedProjectsFromApi } from "@/services/project.service";
import { PROJECTS_DATA, type ProjectEntry } from "@/data/projects.data";
import {
  FeaturedBigCard,
  FeaturedSmallCard,
} from "@/components/projects/projects-featured";

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = React.useState<ProjectEntry[]>(() =>
    PROJECTS_DATA.slice(0, 3),
  );

  React.useEffect(() => {
    fetchFeaturedProjectsFromApi(3).then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
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

  const mainProject = projects[0];
  const sideProjects = projects.slice(1, 3);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 pt-16 pb-4"
    >
      {/* Section Header */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 mb-12 flex flex-col md:flex-row justify-between items-start">
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
            Những công trình tiêu biểu đã triển khai trên khắp cả nước.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent-red font-bold text-xs uppercase tracking-[0.25em] hover:opacity-70 transition-opacity"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" weight="thin" />
          </Link>
        </div>
      </div>

      {/* 50/50 Split Featured Layout (1 Big Card left, 2 Small Cards right stacked, 0 gap) */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
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
      </div>
    </section>
  );
}
