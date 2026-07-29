"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Project Journey — pinned horizontal scroll storytelling (desktop).
 * Falls back to stacked vertical layout on mobile.
 * Reuses the exact same pattern as the main projects-workflow.tsx.
 */
export const ProjectDetailJourney = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  const stages = project.detail.journeyStages;

  return (
    <section className="pd-journey" aria-label="Hành trình dự án">
      {/* Section header */}
      <div className="pd-journey__header">
        <span className="pd-journey__label">Hành trình</span>
        <h2 className="pd-journey__heading">
          Quy trình
          <br />
          triển khai
        </h2>
        <p className="pd-journey__subtitle">
          Từ khảo sát hiện trường đến bàn giao — mỗi giai đoạn được kiểm soát
          chặt chẽ về chất lượng và tiến độ.
        </p>
      </div>

      {/* ── Desktop: horizontal scroll track ──────────────────── */}
      <div className="pd-journey__pin-container hidden md:block overflow-hidden">
        <div className="pd-journey__track">
          {stages.map((stage) => (
            <div key={stage.number} className="pd-journey__panel">
              {/* Image */}
              <div className="pd-journey__panel-image">
                <Image
                  src={stage.image}
                  alt={`${stage.title} — ${stage.titleEn}`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="pd-journey__panel-content">
                <span className="pd-journey__panel-number">{stage.number}</span>
                <h3 className="pd-journey__panel-title">{stage.title}</h3>
                <span className="pd-journey__panel-title-en">
                  {stage.titleEn}
                </span>
                <p className="pd-journey__panel-desc">{stage.description}</p>
                <div className="pd-journey__panel-detail">
                  <span className="pd-journey__panel-detail-label">
                    Chi tiết kỹ thuật
                  </span>
                  <span className="pd-journey__panel-detail-value">
                    {stage.detail}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: stacked vertical layout ───────────────────── */}
      <div className="pd-journey__track--mobile md:hidden">
        {stages.map((stage) => (
          <div key={stage.number} className="pd-journey__panel">
            {/* Image */}
            <div className="pd-journey__panel-image">
              <Image
                src={stage.image}
                alt={`${stage.title} — ${stage.titleEn}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="pd-journey__panel-content">
              <span className="pd-journey__panel-number">{stage.number}</span>
              <h3 className="pd-journey__panel-title">{stage.title}</h3>
              <span className="pd-journey__panel-title-en">
                {stage.titleEn}
              </span>
              <p className="pd-journey__panel-desc">{stage.description}</p>
              <div className="pd-journey__panel-detail">
                <span className="pd-journey__panel-detail-label">
                  Chi tiết kỹ thuật
                </span>
                <span className="pd-journey__panel-detail-value">
                  {stage.detail}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
