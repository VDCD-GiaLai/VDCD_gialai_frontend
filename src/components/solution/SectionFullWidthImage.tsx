"use client";

import React from "react";
import Image from "next/image";

interface SectionFullWidthImageProps {
  title: string;
  description?: string;
  points?: string[];
  imageUrl: string;
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

export function SectionFullWidthImage({
  title,
  description,
  points,
  imageUrl,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionFullWidthImageProps) {
  return (
    <section className="sd-section pb-12">
      {/* Header */}
      <div className="max-w-3xl mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-black dark:text-white mb-3 font-heading tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Large Featured Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 group mb-8 shadow-sm">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        <div
          className="absolute bottom-0 left-0 h-1 w-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      {/* Points Grid below image */}
      {points && points.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((point, i) => {
            const { title: pTitle, desc } = parsePoint(point);
            return (
              <div
                key={i}
                className="p-5 rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  />
                  {pTitle && (
                    <h4 className="text-sm font-bold text-black dark:text-white font-heading">
                      {pTitle}
                    </h4>
                  )}
                </div>
                <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
