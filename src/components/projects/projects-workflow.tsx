"use client";

import * as React from "react";
import Image from "next/image";
import { WORKFLOW_STAGES } from "@/data/projects.data";

/**
 * Workflow section — pinned horizontal scroll storytelling (desktop).
 * Falls back to a stacked vertical layout on mobile.
 *
 * Animation is handled by the useProjectsGsap hook.
 * This component only renders the markup and assigns the correct class names.
 */
export const ProjectsWorkflow = () => {
  return (
    <section className="workflow-section" aria-label="Quy trình làm việc">
      {/* Section header */}
      <div className="workflow-header">
        <span className="block font-heading text-[11px] font-bold tracking-[0.25em] uppercase text-accent-red mb-4">
          Quy trình
        </span>
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight max-w-2xl">
          Từ ý tưởng đến
          <br />
          công trình thực tế
        </h2>
        <p className="mt-4 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
          Mỗi dự án của chúng tôi đi qua năm giai đoạn chặt chẽ — đảm bảo chất
          lượng, tiến độ và giá trị bền vững cho khách hàng.
        </p>
      </div>

      {/* ── Desktop: horizontal scroll track ──────────────────── */}
      <div className="workflow-pin-container hidden md:block overflow-hidden">
        <div className="workflow-track">
          {WORKFLOW_STAGES.map((stage) => (
            <div key={stage.number} className="workflow-panel">
              {/* Image */}
              <div className="workflow-panel__image-wrapper">
                <Image
                  src={stage.image}
                  alt={`${stage.title} — ${stage.titleEn}`}
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="workflow-panel__content">
                <span className="workflow-panel__number">{stage.number}</span>
                <h3 className="workflow-panel__title">{stage.title}</h3>
                <span className="workflow-panel__title-en">
                  {stage.titleEn}
                </span>
                <p className="workflow-panel__desc">{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: stacked vertical layout ───────────────────── */}
      <div className="workflow-track--mobile md:hidden">
        {WORKFLOW_STAGES.map((stage) => (
          <div key={stage.number} className="workflow-panel">
            {/* Image */}
            <div className="workflow-panel__image-wrapper">
              <Image
                src={stage.image}
                alt={`${stage.title} — ${stage.titleEn}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="workflow-panel__content">
              <span className="workflow-panel__number">{stage.number}</span>
              <h3 className="workflow-panel__title">{stage.title}</h3>
              <span className="workflow-panel__title-en">{stage.titleEn}</span>
              <p className="workflow-panel__desc">{stage.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
