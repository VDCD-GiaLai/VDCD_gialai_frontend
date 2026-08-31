"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ArrowsOut } from "@phosphor-icons/react";

interface SectionGalleryProps {
  title?: string;
  description?: string;
  images: string[];
  accentColor?: string;
}

export function SectionGallery({
  title = "Hình ảnh thực tế & Triển khai",
  description = "Tập hợp hình ảnh dữ liệu khảo sát, trang thiết bị và kết quả mô hình hóa thực địa từ các dự án.",
  images,
  accentColor = "#e11d48",
}: SectionGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <section className="sd-section pb-14 mt-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-6 h-[2px]"
              style={{ backgroundColor: accentColor }}
            />
            <span
              className="font-mono-label text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              Thư viện ảnh
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading">
            {title}
          </h3>
        </div>
        {description && (
          <p className="text-secondary dark:text-zinc-400 text-sm max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Grid of gallery images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imgUrl, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(imgUrl)}
            className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 cursor-pointer shadow-sm"
          >
            <Image
              src={imgUrl}
              alt={`Gallery image ${i + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white">
                <ArrowsOut weight="bold" className="w-5 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X weight="bold" className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[80vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Expanded preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
