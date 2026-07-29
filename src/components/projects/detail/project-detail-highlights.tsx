"use client";

import * as React from "react";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Technical highlights section — editorial data presentation.
 * Large typographic numbers with labels.
 * Not dashboard cards — pure editorial layout.
 */
export const ProjectDetailHighlights = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  const highlights = project.detail.technicalHighlights;

  return (
    <section className="pd-highlights" aria-label="Thông số kỹ thuật">
      <div className="pd-highlights__container">
        <div className="pd-highlights__header">
          <span className="pd-highlights__label">Thông số</span>
          <h2 className="pd-highlights__heading">
            Dữ liệu
            <br />
            kỹ thuật
          </h2>
        </div>

        <div className="pd-highlights__grid">
          {highlights.map((item, i) => (
            <div key={i} className="pd-highlights__item">
              <span className="pd-highlights__value">{item.value}</span>
              <span className="pd-highlights__item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
