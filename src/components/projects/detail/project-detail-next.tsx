"use client";

import * as React from "react";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { ProjectEntry } from "@/data/projects.data";
import { useTransitionStore } from "@/store/transition-store";

/**
 * Next project section — large transition teaser.
 * Feels like continuing the story, not navigating away.
 * Triggers shared-element transition on click.
 */
export const ProjectDetailNext = ({ project }: { project: ProjectEntry }) => {
  const router = useRouter();
  const startTransition = useTransitionStore((s) => s.startTransition);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();

      const imageWrapper = e.currentTarget.querySelector(
        ".pd-next__image-wrapper",
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
    [project, router, startTransition],
  );

  return (
    <section className="pd-next" aria-label="Dự án tiếp theo">
      <div
        className="pd-next__container"
        role="link"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        aria-label={`Xem dự án ${project.title}`}
      >
        <div className="pd-next__header">
          <span className="pd-next__label">Dự án tiếp theo</span>
        </div>

        <div className="pd-next__image-wrapper">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="pd-next__content">
          <h2 className="pd-next__title">{project.title}</h2>
          <div className="pd-next__meta">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.location}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
