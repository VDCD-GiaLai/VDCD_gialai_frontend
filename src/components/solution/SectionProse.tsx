"use client";

import React from "react";

interface SectionProseProps {
  title: string;
  description?: string;
  points?: string[];
  accentColor?: string;
  sectionIndex: number;
}

export function SectionProse({
  title,
  description,
  points,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionProseProps) {
  return (
    <section className="sd-section pb-12">
      <div className="max-w-3xl">
        <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 font-heading">
          {title}
        </h3>
        {description && (
          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
            {description}
          </p>
        )}
        {points && points.length > 0 && (
          <div className="space-y-4 mt-6">
            {points.map((point, i) => (
              <p
                key={i}
                className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed pl-4"
                style={{ borderLeft: `2px solid ${accentColor}30` }}
              >
                {point}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
