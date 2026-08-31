"use client";

import React from "react";

interface SectionCardGridProps {
  title: string;
  description?: string;
  points: string[];
  accentColor?: string;
  sectionIndex: number;
}

/** Parse "Title: Description" format */
function parsePoint(point: string) {
  const i = point.indexOf(":");
  if (i !== -1) {
    return {
      title: point.substring(0, i).trim(),
      desc: point.substring(i + 1).trim(),
    };
  }
  return { title: "", desc: point };
}

export function SectionCardGrid({
  title,
  description,
  points,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionCardGridProps) {
  /* Pick column count based on number of points */
  const colClass =
    points.length <= 3
      ? "grid-cols-1 md:grid-cols-3"
      : points.length === 4
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        : points.length <= 6
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section className="sd-section pb-12">
      <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3 font-heading">
        {title}
      </h3>
      {description && (
        <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
          {description}
        </p>
      )}

      <div className={`grid ${colClass} gap-5 mt-6`}>
        {points.map((point, i) => {
          const { title: pTitle, desc } = parsePoint(point);
          return (
            <div
              key={i}
              className="group relative p-6 border border-zinc-100 dark:border-zinc-800/60 hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              {/* Top accent bar with clipping mask gradient */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: accentColor }}
              />
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${accentColor}08, transparent 70%)`,
                }}
              />

              {/* Card index number — clipping mask style large number */}
              <span
                className="block font-mono text-4xl font-black leading-none mb-3 select-none"
                style={{
                  color: "transparent",
                  backgroundImage: `linear-gradient(135deg, ${accentColor}, ${accentColor}40)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                {(i + 1).toString().padStart(2, "0")}
              </span>

              {pTitle && (
                <h4 className="text-base font-bold text-black dark:text-white tracking-tight leading-snug mb-2 font-heading">
                  {pTitle}
                </h4>
              )}
              <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed relative z-10">
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
