"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Crosshair,
  Shield,
  GlobeHemisphereWestIcon,
  TargetIcon,
} from "@phosphor-icons/react";

interface PhilosophyAccordionProps {
  initialVariant?: "storytelling" | "formal";
  missionText?: string;
  visionText?: string;
  coreValuesText?: string;
}

export function PhilosophyAccordion({
  missionText,
  visionText,
  coreValuesText,
}: PhilosophyAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const items = [
    {
      id: "01",
      title: "SỨ MỆNH",
      desc:
        missionText ||
        "Thúc đẩy đổi mới sáng tạo, chuyển đổi số và phát triển bền vững cho tỉnh Gia Lai và khu vực Tây Nguyên.",
      icon: GlobeHemisphereWestIcon,
      bgImage: "/images/home/farm_area_view.webp",
    },
    {
      id: "02",
      title: "TẦM NHÌN",
      desc:
        visionText ||
        "Trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Tây Nguyên vào năm 2030.",
      icon: TargetIcon,
      bgImage: "/images/home/hethongdothiso.webp",
    },
    {
      id: "03",
      title: "GIÁ TRỊ CỐT LÕI",
      desc: coreValuesText || "Sáng tạo – Chính trực – Hợp tác – Tác động",
      icon: Shield,

      bgImage: "/images/home/data_center.webp",
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
            TRIẾT LÝ HOẠT ĐỘNG
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight transition-colors duration-300">
            Kim chỉ nam dẫn lối thành công
          </h2>
        </div>
      </div>

      {/* Horizontal Accordion Container */}
      <div className="flex flex-col md:flex-row gap-4 w-full min-h-[380px] items-stretch">
        {items.map((item, index) => {
          const IconComponent = item.icon;
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ease-in-out flex flex-col justify-between p-6 md:p-8 text-white ${
                isOpen ? "flex-[3.5] shadow-md" : "flex-1 hover:brightness-105"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={item.bgImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center scale-105"
                  loading="lazy"
                />
              </div>
              {/* Bottom text gradient for contrast without darkening the main image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent z-0" />

              {/* Top part: High-contrast Icon */}
              <div className="flex items-center justify-end relative z-10">
                <div
                  className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-accent-red text-white shadow-lg shadow-accent-red/30 scale-110"
                      : "bg-black/40 border border-white/20 text-white hover:bg-black/60"
                  }`}
                >
                  <IconComponent className="w-5 h-5" weight="bold" />
                </div>
              </div>

              {/* Bottom part: Text content */}
              <div className="space-y-3 relative z-10 mt-8">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight font-heading leading-tight uppercase">
                  {item.title}
                </h3>

                {/* Smooth collapse container */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "max-h-[200px] opacity-100 mt-2"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-zinc-200 text-sm md:text-base leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Corner accent line */}
              <span
                className={`absolute top-0 right-0 w-0 h-1 bg-accent-red transition-all duration-500 ${
                  isOpen ? "w-1/3" : "w-0"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
