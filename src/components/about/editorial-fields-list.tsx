"use client";

import React, { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiCpu,
  FiMap,
  FiActivity,
  FiSettings,
  FiArrowRight,
} from "react-icons/fi";

interface FieldItem {
  title: string;
  desc: string;
  icon: any;
  techKeywords: string[];
  image: string;
}

interface EditorialFieldsListProps {
  fields?: FieldItem[];
}

export function EditorialFieldsList({ fields }: EditorialFieldsListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track mouse coordinates for spring-follow preview frame
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const defaultFields: FieldItem[] = [
    {
      title: "Công nghệ số & Chuyển đổi số",
      desc: "Lập mô hình dữ liệu không gian 3D thời gian thực thông qua nền tảng số 3DG Platform. Tích hợp phân tích dữ liệu lớn và AI để tối ưu hóa quản trị hạ tầng, vận hành đô thị thông minh.",
      icon: FiCpu,
      techKeywords: [
        "Digital Twin",
        "3DG Platform",
        "AI Analytics",
        "Cloud Infra",
      ],
      image: "/images/home/hethongdothiso.webp",
    },
    {
      title: "Khảo sát, Đo đạc & Số hóa bản đồ",
      desc: "Bay quét LiDAR và khảo sát trắc địa chuyên sâu bằng UAV để thành lập bản đồ địa hình tỷ lệ lớn (1/500). Số hóa đồng bộ cơ sở dữ liệu địa chính, hạ tầng kỹ thuật và lâm nghiệp Tây Nguyên.",
      icon: FiMap,
      techKeywords: [
        "UAV Mapping",
        "GIS Integration",
        "Remote Sensing",
        "Forest Digitization",
      ],
      image: "/images/home/farm_area_drone_view.webp",
    },
    {
      title: "Hạ tầng & Điều hành thông minh",
      desc: "Tích hợp và xây dựng trung tâm điều hành thông minh (IOC/DOC) hỗ trợ ra quyết định. Giám sát tự động tiến độ công trình xây dựng và biến động hiện trường thông qua hệ thống AutoTimelapse.",
      icon: FiActivity,
      techKeywords: [
        "IOC/DOC",
        "AutoTimelapse",
        "Smart City",
        "Process Automation",
      ],
      image: "/images/home/data_center.webp",
    },
    {
      title: "Nghiên cứu, Sản xuất & Chế tạo phần cứng",
      desc: "Nghiên cứu chế tạo robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái chuyên dụng, camera thông minh tích hợp AI và phần cứng IoT điều khiển tự chủ công nghệ.",
      icon: FiSettings,
      techKeywords: [
        "Robotics",
        "Industrial Drone",
        "AI Camera",
        "IoT Hardware",
      ],
      image: "/images/home/kientaotuonglai.webp",
    },
  ];

  const displayFields = fields || defaultFields;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Offset relative to the container
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section className="space-y-8 select-none">
      {/* Section Header */}
      <div className="max-w-3xl">
        <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block mb-3">
          NĂNG LỰC CỐT LÕI
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
          Lĩnh vực hoạt động trọng tâm
        </h2>
      </div>

      {/* List Container with Mouse Move tracker */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800/60 mt-8"
      >
        {displayFields.map((field, idx) => {
          const IconComp = field.icon;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-8 group cursor-pointer transition-colors duration-300 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 px-4 md:px-6 relative z-10"
            >
              {/* Left Column: Number, Title, Desc, Keywords */}
              <div className="flex gap-6 items-start max-w-4xl">
                {/* Massive Index */}
                <span className="font-mono text-4xl md:text-5xl font-black text-zinc-300 dark:text-zinc-800 group-hover:text-accent-red transition-colors duration-300 leading-none shrink-0 pt-1">
                  {(idx + 1).toString().padStart(2, "0")}
                </span>

                {/* Content Block */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 group-hover:text-accent-red group-hover:bg-accent-red/5 group-hover:border-accent-red/10 rounded-xl transition-all duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-accent-red transition-colors duration-300 font-heading leading-tight uppercase">
                      {field.title}
                    </h3>
                  </div>

                  <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">
                    {field.desc}
                  </p>

                  {/* Tech Keywords */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {field.techKeywords.map((kw, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-2.5 py-0.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-mono text-[10px] tracking-wider rounded-md uppercase"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating Preview Frame (visible on desktop) */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none z-30 hidden lg:block overflow-hidden rounded-2xl border border-white/20 dark:border-zinc-800 shadow-2xl w-80 h-52 -translate-x-1/2 -translate-y-1/2"
              style={{
                x: springX,
                y: springY,
              }}
            >
              {displayFields.map((field, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    hoveredIndex === idx ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={field.image}
                    alt={field.title}
                    fill
                    sizes="320px"
                    className="object-cover scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-mono text-white/95 uppercase tracking-widest bg-accent-red/80 px-2 py-0.5 rounded">
                    PREVIEW FIELD
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
