"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Reality → Digital transformation visual comparison.
 * Two overlapping images with a ScrollTrigger clip-path reveal.
 * Conditional render: only shows when both before and after images exist.
 */
export const ProjectDetailTransformation = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  if (!project.transformationBefore || !project.transformationAfter) {
    return null;
  }

  return (
    <section className="pd-transform" aria-label="Chuyển đổi số">
      <div className="pd-transform__header">
        <span className="pd-transform__label">Chuyển đổi</span>
        <h2 className="pd-transform__heading">
          Từ thực tế
          <br />
          đến mô hình số
        </h2>
        <p className="pd-transform__subtitle">
          Dữ liệu hiện trường được chuyển đổi thành tài sản số — chính xác, đáng
          tin cậy và có thể phân tích.
        </p>
      </div>

      <div className="pd-transform__comparison">
        {/* Before (real image) — full size, below */}
        <div className="pd-transform__before">
          <Image
            src={project.transformationBefore}
            alt="Hình ảnh thực tế"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="pd-transform__badge pd-transform__badge--before">
            Thực tế
          </span>
        </div>

        {/* After (digital model) — clip-path revealed on scroll */}
        <div className="pd-transform__after">
          <Image
            src={project.transformationAfter}
            alt="Mô hình số hóa"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <span className="pd-transform__badge pd-transform__badge--after">
            Mô hình số
          </span>
        </div>
      </div>
    </section>
  );
};
