"use client";

import * as React from "react";
import Image from "next/image";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Asymmetric editorial gallery.
 * Uses flat galleryImages field from ProjectEntry.
 * Mix of large and small images with varied aspect ratios.
 */
export const ProjectDetailGallery = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  const images = project.galleryImages;

  if (!images || images.length === 0) return null;

  return (
    <section className="pd-gallery" aria-label="Hình ảnh dự án">
      <div className="pd-gallery__container">
        <div className="pd-gallery__header">
          <span className="pd-gallery__label">Hình ảnh</span>
          <h2 className="pd-gallery__heading">
            Góc nhìn
            <br />
            từ hiện trường
          </h2>
        </div>

        <div className="pd-gallery__grid">
          {images.map((img, i) => (
            <div
              key={i}
              className={`pd-gallery__item pd-gallery__item--${img.size}`}
            >
              <div className="pd-gallery__image-wrapper">
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes={
                    img.size === "large"
                      ? "(max-width: 768px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover"
                />
              </div>
              <p className="pd-gallery__caption">{img.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
