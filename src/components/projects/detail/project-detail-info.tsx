"use client";

import * as React from "react";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Project overview section — shows overview HTML, services, and metadata.
 * Redesigned to display rich content from the API.
 */
export const ProjectDetailInfo = ({ project }: { project: ProjectEntry }) => {
  const metaRows = [
    { label: "Tên dự án", value: project.title },
    { label: "Địa điểm", value: project.location },
    { label: "Năm thực hiện", value: project.year },
    { label: "Lĩnh vực", value: project.category },
    ...(project.discipline
      ? [{ label: "Chuyên ngành", value: project.discipline }]
      : []),
  ];

  return (
    <section
      className="py-12 md:py-16 px-4 md:px-8 max-w-[1600px] mx-auto"
      aria-label="Thông tin dự án"
    >
      {/* Metadata rows */}
      <dl className="pd-info-list">
        {metaRows.map((row, i) => (
          <div key={i} className="pd-info-list__row">
            <dt className="pd-info-list__label">{row.label}</dt>
            <dd className="pd-info-list__value">{row.value}</dd>
          </div>
        ))}
      </dl>

      {/* Overview / Description */}
      {project.overview ? (
        <div
          className="pd-overview__content"
          dangerouslySetInnerHTML={{ __html: project.overview }}
        />
      ) : (
        <h2 className="pd-info-list__heading">{project.description}</h2>
      )}

      {/* Services tags */}
      {project.services && project.services.length > 0 && (
        <div className="pd-services">
          <span className="pd-services__label">Dịch vụ cung cấp</span>
          <div className="pd-services__list">
            {project.services.map((service, i) => (
              <span key={i} className="pd-services__tag">
                {service}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
