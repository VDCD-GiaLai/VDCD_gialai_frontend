"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FiArrowUpRight,
  FiCpu,
  FiMap,
  FiActivity,
  FiSettings,
} from "react-icons/fi";

interface ActivityItem {
  id: string;
  num: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  icon: React.ElementType;
}

export function EditorialActivityList() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<ActivityItem | null>(null);

  // Mouse position values for floating preview frame
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const activities: ActivityItem[] = [
    {
      id: "tech-digital",
      num: "01",
      title: "CÔNG NGHỆ SỐ & CHUYỂN ĐỔI SỐ",
      description:
        "Nền tảng Bản đồ số 3D (3DG Platform), xử lý dữ liệu lớn bằng Trí tuệ nhân tạo (AI) và lưu trữ đám mây an toàn bảo mật cao.",
      tags: [
        "Digital Twin 3D",
        "3DG Platform",
        "AI Data Analytics",
        "Cloud Infrastructure",
      ],
      image: "/images/home/hethongdothiso.jpg",
      icon: FiCpu,
    },
    {
      id: "mapping-gis",
      num: "02",
      title: "KHẢO SÁT, ĐO ĐẠC & SỐ HÓA BẢN ĐỒ",
      description:
        "Ứng dụng UAV quét địa hình lập bản đồ 3D địa chính, lâm nghiệp và giám sát tài nguyên rừng theo thời gian thực.",
      tags: [
        "UAV LiDAR Scan",
        "GIS Mapping",
        "Remote Sensing",
        "Forest Digitization",
      ],
      image: "/images/home/farm_area_drone_view.jpg",
      icon: FiMap,
    },
    {
      id: "smart-city-ioc",
      num: "03",
      title: "HẠ TẦNG & ĐIỀU HÀNH THÔNG MINH",
      description:
        "Tích hợp các hệ thống camera AI giám sát giao thông, AutoTimelapse theo dõi tiến độ công trình và cổng điều hành IOC/DOC.",
      tags: [
        "IOC Center",
        "AutoTimelapse",
        "Smart City Surveillance",
        "Process Automation",
      ],
      image: "/images/home/quynhon_citynightview.webp",
      icon: FiActivity,
    },
    {
      id: "hardware-manufacturing",
      num: "04",
      title: "SẢN XUẤT & CHẾ TẠO PHẦN CỨNG",
      description:
        "Nghiên cứu, lắp ráp thiết bị bay không người lái chuyên dụng, trạm sạc tự động, robot công nghiệp và cảm biến IoT.",
      tags: [
        "Industrial UAV",
        "IoT Hardware",
        "AI Camera",
        "Robotics Assembly",
      ],
      image: "/images/home/innovation_center.png",
      icon: FiSettings,
    },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 py-20 select-none overflow-hidden"
    >
      <div className="mb-14">
        <span className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase block mb-2">
          Năng lực cốt lõi
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
          Lĩnh vực hoạt động chủ chốt
        </h2>
      </div>

      {/* Floating Image Preview Frame following mouse cursor */}
      {activeItem && (
        <motion.div
          className="pointer-events-none absolute z-40 hidden lg:block"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "30px",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-[360px] aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-red-500/80 bg-zinc-900">
            <Image
              src={activeItem.image}
              alt={activeItem.title}
              fill
              className="object-cover"
              sizes="360px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
              <span className="font-bold text-red-400">{activeItem.num}</span>
              <span className="truncate max-w-[200px] text-[11px] text-zinc-300">
                {activeItem.title}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Editorial List Items */}
      <div className="border-t border-zinc-800 divide-y divide-zinc-800/80">
        {activities.map((item) => {
          const IconComp = item.icon;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setActiveItem(item)}
              onMouseLeave={() => setActiveItem(null)}
              className="py-10 md:py-14 group cursor-pointer transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:px-4 rounded-xl hover:bg-zinc-900/40"
            >
              {/* Left: Index + Icon + Title + Description */}
              <div className="flex items-start gap-6 md:gap-10 max-w-4xl">
                <span className="text-4xl md:text-6xl font-black font-mono text-zinc-700 group-hover:text-red-500 transition-colors duration-300 pt-1 shrink-0">
                  {item.num}
                </span>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-red-500 group-hover:border-red-500/30 transition-all duration-300 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl md:text-3xl font-extrabold font-heading text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors duration-300 uppercase tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed pl-0 md:pl-1">
                    {item.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded group-hover:border-zinc-700 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Action Arrow Link */}
              <div className="shrink-0 flex items-center justify-end">
                <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <FiArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
