"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiClock, FiLayers, FiRadio, FiCpu } from "react-icons/fi";

interface Milestone {
  period: string;
  title: string;
  tagline: string;
  desc: string;
  icon: any;
  achievements: string[];
}

export function HorizontalRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check window width for responsive fallback
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const milestones: Milestone[] = [
    {
      period: "2006 - 2015",
      title: "Đo Đạc Bản Đồ & GIS Sơ Khởi",
      tagline: "Đại ngàn Tây Nguyên kì vĩ",
      desc: "Khởi đầu từ những đội khảo sát thực địa trắc địa truyền thống, vượt qua địa hình hiểm trở vùng núi Gia Lai để lập bản đồ lâm nghiệp, nông nghiệp sơ khởi.",
      icon: FiClock,
      achievements: [
        "Thành lập đội kỹ sư đo đạc cơ bản",
        "Số hóa bản đồ lâm nghiệp quy mô huyện",
        "Xây dựng cơ sở dữ liệu GIS đầu tiên",
      ],
    },
    {
      period: "2016 - 2022",
      title: "Số Hóa Không Gian & UAV",
      tagline: "Làm chủ bầu trời số",
      desc: "Chuyển mình bứt phá, ứng dụng thiết bị bay không người lái (UAV/Drone) và công nghệ quét LiDAR, số hóa dữ liệu không gian quy mô lớn.",
      icon: FiLayers,
      achievements: [
        "Sở hữu đội UAV quét LiDAR chuyên dụng",
        "Số hóa bản đồ 3D Gia Lai tỷ lệ lớn",
        "Tích hợp GIS vào quy hoạch đô thị",
      ],
    },
    {
      period: "2023 - 2026",
      title: "Hệ Sinh Thái Số Đa Ngành",
      tagline: "Kỷ nguyên Digital Twin",
      desc: "Hiện tại bứt phá với nền tảng bản đồ số 3DG Platform, tích hợp dữ liệu AutoTimelapse giám sát biến động và các giải pháp đô thị thông minh IOC/DOC.",
      icon: FiRadio,
      achievements: [
        "Hoàn thiện nền tảng 3DG Digital Twin",
        "Triển khai hệ thống IOC Gia Lai",
        "Tự động hóa giám sát AutoTimelapse",
      ],
    },
    {
      period: "2027 - 2030",
      title: "Tự Chủ AI & Vươn Tầm Quốc Tế",
      tagline: "Định hình tương lai số",
      desc: "Định hướng làm chủ hoàn toàn chuỗi công nghệ, phát triển AI chuyên sâu phục vụ giám sát địa chất, bảo tồn rừng và chuyển giao mô hình ra quốc tế.",
      icon: FiCpu,
      achievements: [
        "Lắp ráp, chế tạo Drone tự chủ phần cứng",
        "Triển khai mô hình AI Lâm nghiệp",
        "Mở rộng thị trường sang Lào & Campuchia",
      ],
    },
  ];

  // Scroll tracking for horizontal slider on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate sliding path: 4 panels -> offset by (number of panels - 1) * 100 / number of panels
  // We have 4 cards, so we need to scroll by roughly -75% to show all of them.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  if (isMobile) {
    // Vertical timeline layout on mobile screens
    return (
      <section className="space-y-12 select-none px-4">
        <div>
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
            LỘ TRÌNH PHÁT TRIỂN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
            Chặng đường kiến tạo giá trị thực
          </h2>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 space-y-12 py-2">
          {milestones.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="relative pl-8 group">
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-accent-red flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                </div>

                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-accent-red bg-accent-red/5 px-2 py-0.5 border border-accent-red/10 rounded">
                      {item.period}
                    </span>
                    <IconComp className="w-4 h-4 text-zinc-400" />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-heading uppercase">
                    {item.title}
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                    {item.tagline}
                  </p>

                  <p className="text-zinc-650 dark:text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  <ul className="space-y-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    {item.achievements.map((ach, aIdx) => (
                      <li
                        key={aIdx}
                        className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent-red" />
                        {ach}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Sticky Horizontal Timeline on Desktop screen sizes
  return (
    <div ref={containerRef} className="relative h-[300vh] select-none">
      {/* Sticky full-screen container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-zinc-950">
        {/* Title elements inside sticky viewport */}
        <div className="absolute top-12 left-12 z-20 space-y-2">
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
            LỘ TRÌNH PHÁT TRIỂN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white font-heading leading-tight uppercase">
            Hành trình kiến tạo giá trị thực
          </h2>
        </div>

        {/* Scroll percentage indicator line */}
        <div className="absolute top-36 left-12 right-12 h-[1px] bg-zinc-800 z-15">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            className="h-full bg-accent-red w-full"
          />
        </div>

        {/* Horizontal sliding track */}
        <div className="relative flex items-center pl-12 z-20 mt-16">
          <motion.div
            style={{ x }}
            className="flex gap-8 w-[400vw] lg:w-[320vw] xl:w-[260vw]"
          >
            {milestones.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[80vw] lg:w-[65vw] xl:w-[50vw] shrink-0 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/80 p-8 rounded-3xl flex flex-col justify-between gap-6 relative group hover:border-accent-red/20 transition-colors duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-black text-accent-red bg-accent-red/10 px-3 py-1 border border-accent-red/20 rounded-md">
                        {item.period}
                      </span>
                      <div className="p-2.5 rounded-full bg-zinc-800 text-zinc-400 group-hover:text-accent-red group-hover:bg-accent-red/5 transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white font-heading uppercase tracking-tight">
                      {item.title}
                    </h3>

                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
                      {item.tagline}
                    </span>

                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="border-t border-zinc-800/80 pt-6">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                      KEY MILESTONES ACHIEVED
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.achievements.map((ach, aIdx) => (
                        <li
                          key={aIdx}
                          className="text-xs text-zinc-350 flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0 mt-1" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Corner indicator */}
                  <span className="absolute bottom-6 right-6 font-mono text-2xl font-black text-zinc-800 group-hover:text-accent-red/10 transition-colors duration-300">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Instruction on bottom center */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest"
          >
            Cuộn chuột xuống để trượt ngang ↓
          </motion.div>
        </div>
      </div>
    </div>
  );
}
