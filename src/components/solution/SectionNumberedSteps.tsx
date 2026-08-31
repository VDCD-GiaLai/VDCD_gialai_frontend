"use client";

import React from "react";

interface SectionNumberedStepsProps {
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

export function SectionNumberedSteps({
  title,
  description,
  points,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionNumberedStepsProps) {
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

      <div className="relative mt-8 ml-6 md:ml-10">
        {/* Vertical accent line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{
            background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}20)`,
          }}
        />

        <div className="space-y-0">
          {points.map((point, i) => {
            const { title: pTitle, desc } = parsePoint(point);
            return (
              <div
                key={i}
                className="relative pl-10 md:pl-14 pb-10 last:pb-0 group"
              >
                {/* Step number with clipping mask effect */}
                <div
                  className="absolute left-0 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 bg-canvas-white dark:bg-zinc-950 transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderColor: accentColor,
                    color: accentColor,
                  }}
                >
                  <span className="font-mono text-sm md:text-base font-bold">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1">
                  {pTitle && (
                    <h4
                      className="text-base md:text-lg font-bold text-black dark:text-white tracking-tight leading-snug mb-1 font-heading transition-colors duration-300 group-hover:transition-colors"
                      style={
                        { "--hover-color": accentColor } as React.CSSProperties
                      }
                    >
                      {pTitle}
                    </h4>
                  )}
                  <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed max-w-2xl">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
