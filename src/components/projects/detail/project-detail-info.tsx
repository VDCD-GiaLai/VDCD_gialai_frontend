"use client";

import * as React from "react";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Project information section — architectural/documentary style.
 * Two-column layout: description left, structured metadata right.
 * No cards. Pure typography + whitespace.
 */
export const ProjectDetailInfo = ({ project }: { project: ProjectEntry }) => {
  return (
    <section className="pd-info" aria-label="Thông tin dự án">
      <div className="pd-info__container">
        {/* Left column — description */}
        <div className="pd-info__description">
          <span className="pd-info__label">Tổng quan</span>
          <p className="pd-info__text">{project.description}</p>
        </div>

        {/* Right column — structured metadata */}
        <div className="pd-info__metadata">
          <div className="pd-info__meta-group">
            <span className="pd-info__meta-label">Dịch vụ</span>
            <ul className="pd-info__meta-list">
              {project.detail.services.map((service, i) => (
                <li key={i} className="pd-info__meta-list-item">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="pd-info__meta-group">
            <span className="pd-info__meta-label">Địa điểm</span>
            <span className="pd-info__meta-value">{project.location}</span>
          </div>

          <div className="pd-info__meta-group">
            <span className="pd-info__meta-label">Năm</span>
            <span className="pd-info__meta-value">{project.year}</span>
          </div>

          <div className="pd-info__meta-group">
            <span className="pd-info__meta-label">Lĩnh vực</span>
            <span className="pd-info__meta-value">
              {project.detail.discipline}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
