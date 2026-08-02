"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ProjectEntry } from "@/data/projects.data";
import { useTransitionStore } from "@/store/transition-store";

/**
 * Related projects section — displays other projects.
 * Replaces the old "Next Project" single-teaser with a multi-card grid.
 * Maintains shared-element transition on click.
 */
export const ProjectDetailRelatedProjects = ({
  projects,
}: {
  projects: ProjectEntry[];
}) => {
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.startTransition);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, project: ProjectEntry) => {
      e.preventDefault();

      const imageWrapper = e.currentTarget.querySelector(
        ".pd-related-projects__card-image",
      ) as HTMLElement | null;

      if (!imageWrapper) {
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
    [router, startTransition],
  );

  if (!projects || projects.length === 0) return null;

  return (
    <section className="pd-related-projects" aria-label="Dự án liên quan">
      <div className="pd-related-projects__container">
        <div className="pd-related-projects__header">
          <span className="pd-related-projects__label">Dự án khác</span>
          <h2 className="pd-related-projects__heading">Khám phá thêm</h2>
        </div>

        <div className="pd-related-projects__grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="pd-related-projects__card"
              role="link"
              tabIndex={0}
              onClick={(e) => handleClick(e, project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClick(
                    e as unknown as React.MouseEvent<HTMLDivElement>,
                    project,
                  );
                }
              }}
              aria-label={`Xem dự án ${project.title}`}
            >
              <div className="pd-related-projects__card-image">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="pd-related-projects__card-content">
                <h3 className="pd-related-projects__card-title">
                  {project.title}
                </h3>
                <div className="pd-related-projects__card-meta">
                  <span>{project.category}</span>
                  <span>·</span>
                  <span>{project.location}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
