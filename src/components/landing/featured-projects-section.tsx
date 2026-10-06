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
  const [isNearViewport, setIsNearViewport] = React.useState(false);

  React.useEffect(() => {
    const cancelId: any = null;
    const fetchAction = () => {
      fetchFeaturedProjectsFromApi(3).then((data) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      });
    };

    if (
      typeof window !== "undefined" &&
      "IntersectionObserver" in window &&
      sectionRef.current
    ) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true);
            fetchAction();
            observer.disconnect();
          }
        },
        { rootMargin: "300px" },
      );
      observer.observe(sectionRef.current);
      return () => {
        observer.disconnect();
      };
    }
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
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 mb-12">
        {/* Row 1: CÁC DỰ ÁN & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <span className="font-heading text-4xl md:text-5xl lg:text-[60px] font-black uppercase leading-none text-black dark:text-white">
            Các dự án
          </span>
          <p className="text-sm md:text-base text-secondary dark:text-zinc-400 font-normal leading-relaxed md:text-right max-w-md">
            Những công trình tiêu biểu <br />
            đã triển khai trên khắp cả nước.
          </p>
        </div>

        {/* Row 2: TIÊU BIỂU & Stylized Red Horizon Line & CTA Link */}
        <div className="flex items-center justify-between gap-4 lg:gap-8 mt-2 md:mt-3">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[60px] font-black uppercase leading-none text-accent-red shrink-0">
            <span className="sr-only">Các dự án </span>tiêu biểu
          </h2>

          {/* Line đỏ mỏng cách điệu nối thẳng tắp */}
          <div className="hidden sm:flex flex-1 items-center">
            <div className="h-[1.5px] w-full bg-gradient-to-r from-accent-red via-accent-red/70 to-accent-red/20 rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 -ml-1" />
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent-red font-bold text-xs uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors duration-300 group shrink-0"
          >
            <span>Xem tất cả dự án</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              weight="bold"
            />
          </Link>
        </div>
      </div>

      {/* 50/50 Split Featured Layout (1 Big Card left, 2 Small Cards right stacked, 0 gap) */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {/* Left Side: 1 Big Card (50%) */}
          {mainProject && (
            <FeaturedBigCard
              project={mainProject}
              isNearViewport={isNearViewport}
            />
          )}

          {/* Right Side: 2 Small Cards Stacked (50%) */}
          <div className="flex flex-col gap-0 h-full">
            {sideProjects.map((proj) => (
              <FeaturedSmallCard
                key={proj.id}
                project={proj}
                isNearViewport={isNearViewport}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
