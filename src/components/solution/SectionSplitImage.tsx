"use client";

import React from "react";
import Image from "next/image";

interface SectionSplitImageProps {
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

export function SectionSplitImage({
  title,
  description,
  points,
  imageUrl,
  accentColor = "#e11d48",
  sectionIndex,
}: SectionSplitImageProps) {
  /* Alternate image left/right based on section index */
  const imageOnRight = sectionIndex % 2 === 0;

  const textBlock = (
    <div className="flex flex-col justify-center">
      <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 font-heading">
        {title}
      </h3>
      {description && (
        <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>
      )}
      {points && points.length > 0 && (
        <ul className="space-y-3">
          {points.map((point, i) => {
            const { title: pTitle, desc } = parsePoint(point);
            return (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                />
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  const imageBlock = (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 group">
      {/* Clipping mask: diagonal cut on the image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: imageOnRight
            ? "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)"
            : "polygon(0% 0%, 100% 0%, 92% 100%, 0% 100%)",
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {/* Accent corner accent */}
      <div
        className="absolute bottom-0 w-16 h-16"
        style={{
          [imageOnRight ? "left" : "right"]: 0,
          background: `linear-gradient(${imageOnRight ? "135deg" : "225deg"}, ${accentColor}40, transparent)`,
        }}
      />
    </div>
  );

  return (
    <section className="sd-section pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {imageOnRight ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  );
}
