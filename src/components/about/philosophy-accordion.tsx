"use client";

import React, { useState } from "react";
import { FiGlobe, FiTarget, FiShield } from "react-icons/fi";

interface PhilosophyAccordionProps {
  initialVariant?: "storytelling" | "formal";
  missionText?: string;
  visionText?: string;
  coreValuesText?: string;
}

export function PhilosophyAccordion({
  initialVariant = "storytelling",
  missionText,
  visionText,
  coreValuesText,
}: PhilosophyAccordionProps) {
  const [variant, setVariant] = useState<"storytelling" | "formal">(
    initialVariant,
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Content for both variants
  const content = {
    formal: [
      {
        id: "01",
        title: "SỨ MỆNH",
        desc:
          missionText ||
          "Thúc đẩy đổi mới sáng tạo, chuyển đổi số và phát triển bền vững cho tỉnh Gia Lai và khu vực Tây Nguyên.",
        icon: FiGlobe,
        tagline: "Vì sự phát triển bền vững vùng Tây Nguyên",
        colorClass:
          "from-blue-600/10 to-indigo-600/5 dark:from-blue-950/20 dark:to-indigo-950/10",
        borderClass: "hover:border-blue-500/30",
        accentText: "text-blue-600 dark:text-blue-400",
      },
      {
        id: "02",
        title: "TẦM NHÌN",
        desc:
          visionText ||
          "Trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Tây Nguyên vào năm 2030.",
        icon: FiTarget,
        tagline: "Tiên phong công nghệ & đổi mới sáng tạo",
        colorClass:
          "from-emerald-600/10 to-teal-600/5 dark:from-emerald-950/20 dark:to-teal-950/10",
        borderClass: "hover:border-emerald-500/30",
        accentText: "text-emerald-600 dark:text-emerald-400",
      },
      {
        id: "03",
        title: "GIÁ TRỊ CỐT LÕI",
        desc: coreValuesText || "Sáng tạo – Chính trực – Hợp tác – Tác động",
        icon: FiShield,
        tagline: "Chuẩn mực đạo đức & hiệu quả thực tế",
        colorClass:
          "from-amber-600/10 to-orange-600/5 dark:from-amber-950/20 dark:to-orange-950/10",
        borderClass: "hover:border-amber-500/30",
        accentText: "text-amber-600 dark:text-amber-400",
      },
    ],
    storytelling: [
      {
        id: "01",
        title: "SỨ MỆNH",
        desc: "Khơi dậy khát vọng số hóa địa phương, ứng dụng công nghệ không gian 3D, GIS và tự động hóa để nâng tầm vị thế tri thức và phát triển bền vững khu vực Tây Nguyên.",
        icon: FiGlobe,
        tagline: "Ghi nhận từng thực địa, nâng tầm từng tọa độ",
        colorClass:
          "from-accent-red/5 to-zinc-900/5 dark:from-accent-red/10 dark:to-zinc-900/20",
        borderClass: "hover:border-accent-red/30",
        accentText: "text-accent-red",
      },
      {
        id: "02",
        title: "TẦM NHÌN",
        desc: "Thiết lập tiêu chuẩn mới về Bản đồ số hóa và Digital Twin toàn quốc, chuyển giao giải pháp quản lý thực địa thông minh từ vùng đất Tây Nguyên vươn ra khu vực.",
        icon: FiTarget,
        tagline: "Bản đồ không gian số chuẩn xác tương lai",
        colorClass:
          "from-accent-red/5 to-zinc-900/5 dark:from-accent-red/10 dark:to-zinc-900/20",
        borderClass: "hover:border-accent-red/30",
        accentText: "text-accent-red",
      },
      {
        id: "03",
        title: "GIÁ TRỊ CỐT LÕI",
        desc: "Đổi mới vượt giới hạn – Đồng hành phụng sự xã hội – Minh bạch chính xác trên từng tọa độ.",
        icon: FiShield,
        tagline: "Công nghệ tiên phong kết hợp trái tim nhân văn",
        colorClass:
          "from-accent-red/5 to-zinc-900/5 dark:from-accent-red/10 dark:to-zinc-900/20",
        borderClass: "hover:border-accent-red/30",
        accentText: "text-accent-red",
      },
    ],
  };

  const currentItems = content[variant];

  return (
    <section className="space-y-8 select-none">
      {/* Header section with switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
            TRIẾT LÝ HOẠT ĐỘNG
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
            Kim chỉ nam dẫn lối thành công
          </h2>
        </div>

        {/* Toggle between Formal and Storytelling */}
        <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 self-start">
          <button
            onClick={() => setVariant("storytelling")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all focus-visible:ring-1 focus-visible:ring-accent-red focus-visible:outline-none ${
              variant === "storytelling"
                ? "bg-white dark:bg-zinc-800 text-accent-red shadow-xs"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            }`}
          >
            Storytelling
          </button>
          <button
            onClick={() => setVariant("formal")}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all focus-visible:ring-1 focus-visible:ring-accent-red focus-visible:outline-none ${
              variant === "formal"
                ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            }`}
          >
            Formal
          </button>
        </div>
      </div>

      {/* Horizontal Accordion Container */}
      <div className="flex flex-col md:flex-row gap-4 w-full min-h-[380px] items-stretch">
        {currentItems.map((item, index) => {
          const IconComponent = item.icon;
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 ease-in-out flex flex-col justify-between p-8 bg-gradient-to-br ${item.colorClass} ${
                isOpen
                  ? "flex-[3.5] border-accent-red/30 shadow-lg dark:bg-zinc-900"
                  : "flex-1 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
              }`}
            >
              {/* Outer Glow Highlight */}
              {isOpen && (
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-red/5 to-transparent opacity-40 pointer-events-none" />
              )}

              {/* Top part: Number index & Icon */}
              <div className="flex items-center justify-between relative z-10">
                <span
                  className={`font-mono text-3xl font-black ${isOpen ? "text-accent-red" : "text-zinc-300 dark:text-zinc-800"} transition-colors duration-300`}
                >
                  {item.id}
                </span>

                <div
                  className={`p-3 rounded-full bg-white dark:bg-zinc-800 border ${isOpen ? "border-accent-red/20 text-accent-red" : "border-zinc-200 dark:border-zinc-700 text-zinc-400"} flex items-center justify-center transition-colors duration-300 shadow-xs`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom part: Text content */}
              <div className="space-y-3 relative z-10 mt-8">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-widest ${isOpen ? "text-accent-red" : "text-zinc-400"}`}
                >
                  {item.tagline}
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-heading leading-tight uppercase">
                  {item.title}
                </h3>

                {/* Smooth collapse container */}
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    isOpen
                      ? "max-h-[200px] opacity-100 mt-2"
                      : "max-h-0 opacity-0 md:max-h-[200px] md:opacity-20 pointer-events-none"
                  }`}
                >
                  <p className="text-zinc-600 dark:text-zinc-350 text-sm md:text-base leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Corner accent line */}
              <span
                className={`absolute top-0 right-0 w-0 h-1 bg-accent-red transition-all duration-500 ${isOpen ? "w-1/3" : "w-0"}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
