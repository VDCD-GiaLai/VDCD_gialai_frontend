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
        "Đưa công nghệ đến gần hơn với thực tế, tạo ra những giá trị thiết thực cho người dân, doanh nghiệp và địa phương.",
      icon: GlobeHemisphereWestIcon,
      bgImage: "/images/home/farm_area_view.webp",
    },
    {
      id: "02",
      title: "TẦM NHÌN",
      desc:
        visionText ||
        "Từ Gia Lai, kết nối những con người dám nghĩ, dám làm để cùng tạo nên những thay đổi tích cực bằng công nghệ.",
      icon: TargetIcon,
      bgImage:
        "https://ik.imagekit.io/huy01040104/vdcd/images/dia-diem-du-lich-gia-lai-2.jpg",
    },
    {
      id: "03",
      title: "GIÁ TRỊ CỐT LÕI",
      desc:
        coreValuesText ||
        "Bắt đầu từ thực tế, đổi mới bằng hành động và đồng hành đến khi tạo ra giá trị thật",
      icon: Shield,

      bgImage:
        "https://ik.imagekit.io/huy01040104/vdcd/images/e176ed08f460c637915788d8ecf23152.jpg",
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="w-full">
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
            NỀN TẢNG PHÁT TRIỂN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight transition-colors duration-300 whitespace-nowrap">
            Sứ mệnh - Tầm nhìn - Giá trị cốt lõi
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
                  quality={100}
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
