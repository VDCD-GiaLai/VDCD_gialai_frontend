"use client";

import * as React from "react";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Technical highlights section — editorial data presentation.
 * Large typographic numbers with labels.
 * Uses flat technicalHighlights field from ProjectEntry.
 */
export const ProjectDetailHighlights = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  const highlights = project.technicalHighlights;

  if (!highlights || highlights.length === 0) return null;

  return (
    <section
      className="px-4 md:px-8 max-w-[1600px] mx-auto"
      aria-label="Thông số kỹ thuật"
    >
      <div className="bg-slate-50 dark:bg-zinc-900/40 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200/60 dark:border-zinc-800/60">
        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <span className="block font-heading text-[11px] font-bold tracking-[0.25em] uppercase text-accent-red mb-3">
            Thông số kỹ thuật
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface dark:text-white leading-tight">
            Dữ liệu dự án
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {highlights.map((item, i) => (
            <div
              key={i}
              className="pl-4 border-l-2 border-accent-red/30 dark:border-accent-red/20 flex flex-col gap-1.5"
            >
              <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-on-surface dark:text-white leading-snug break-words">
                {item.value}
              </span>
              <span className="font-heading text-[10px] font-bold tracking-[0.18em] uppercase text-secondary dark:text-zinc-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
