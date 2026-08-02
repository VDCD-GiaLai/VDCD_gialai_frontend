"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Challenge section — explains the real project problem.
 * Large editorial typography + supporting photograph.
 * Uses challengeImage from API when available, falls back to coverImage.
 */
export const ProjectDetailChallenge = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  if (!project.challenge) return null;

  const challengeImg = project.challengeImage || project.coverImage;

  return (
    <section className="pd-challenge" aria-label="Thách thức dự án">
      <div className="pd-challenge__container">
        <div className="pd-challenge__header">
          <span className="pd-challenge__label">Thách thức</span>
          <h2 className="pd-challenge__heading">
            Bài toán
            <br />
            thực tế
          </h2>
        </div>

        <div className="pd-challenge__body">
          <p className="pd-challenge__text">{project.challenge}</p>
        </div>
      </div>

      {/* Supporting image */}
      <div className="pd-challenge__image">
        <Image
          src={challengeImg}
          alt={`${project.title} — Thách thức dự án`}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};
