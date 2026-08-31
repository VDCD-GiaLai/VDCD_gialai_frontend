"use client";

import React from "react";
import { Check } from "@phosphor-icons/react";

interface SectionIconListProps {
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

export function SectionIconList({
  title,
  description,
  points,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionIconListProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 mt-6">
        {points.map((point, i) => {
          const { title: pTitle, desc } = parsePoint(point);
          return (
            <div key={i} className="flex items-start gap-3 group">
              <span
                className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: accentColor + "18",
                  color: accentColor,
                }}
              >
                <Check weight="bold" className="w-3.5 h-3.5" />
              </span>
              <div>
                {pTitle && (
                  <span className="font-bold text-black dark:text-white text-sm block leading-snug">
                    {pTitle}
                  </span>
                )}
                <span className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                  {desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
