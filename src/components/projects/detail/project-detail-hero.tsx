"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Full-viewport hero section for project detail.
 * Large cover image with project title, category, location, year.
 * All animations driven by the useProjectDetailGsap hook.
 */
export const ProjectDetailHero = ({ project }: { project: ProjectEntry }) => {
  return (
    <section className="pd-hero" aria-label={project.title}>
      {/* Background image */}
      <div className="pd-hero__image">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="pd-hero__img object-cover"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Content */}
      <div className="pd-hero__content">
        <div className="pd-hero__meta-top">
          <span className="pd-hero__category">{project.category}</span>
          <span className="pd-hero__divider" aria-hidden="true" />
          <span className="pd-hero__year">{project.year}</span>
        </div>

        <h1 className="pd-hero__title">{project.title}</h1>

        <div className="pd-hero__meta-bottom">
          <div className="pd-hero__meta-item">
            <span className="pd-hero__meta-label">Địa điểm</span>
            <span className="pd-hero__meta-value">{project.location}</span>
          </div>
          {project.discipline && (
            <div className="pd-hero__meta-item">
              <span className="pd-hero__meta-label">Lĩnh vực</span>
              <span className="pd-hero__meta-value">{project.discipline}</span>
            </div>
          )}
          <div className="pd-hero__meta-item">
            <span className="pd-hero__meta-label">Năm</span>
            <span className="pd-hero__meta-value">{project.year}</span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pd-hero__scroll-cue" aria-hidden="true">
        <div className="pd-hero__scroll-line" />
      </div>
    </section>
  );
};
