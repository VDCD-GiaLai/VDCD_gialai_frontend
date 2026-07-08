"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiBriefcase,
  FiHome,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";
import { Province, PROVINCE_DETAILS } from "@/data/vietnam-provinces";

interface ProvinceCardProps {
  province: Province;
  onClose: () => void;
}

export function ProvinceCard({ province, onClose }: ProvinceCardProps) {
  const details = PROVINCE_DETAILS[province.id] || {
    image:
      "https://images.unsplash.com/photo-1509060464153-4466739f78d0?auto=format&fit=crop&w=600&q=80",
    description: "Đối tác hoạt động phát triển công nghệ đổi mới.",
    population: "Đang cập nhật",
    area: "Đang cập nhật",
  };

  return (
    <motion.div
      key={province.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-accent-red/20 overflow-hidden shadow-xl bg-white dark:bg-zinc-900"
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex items-start justify-between"
        style={{
          background:
            "linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(220,38,38,0.02) 100%)",
        }}
      >
        <div>
          <span className="text-[10px] font-mono font-bold text-accent-red uppercase tracking-widest block mb-1">
            {province.region === "Bắc"
              ? "Miền Bắc"
              : province.region === "Trung"
                ? "Miền Trung"
                : "Miền Nam"}
          </span>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-sans">
            {province.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-accent-red hover:bg-accent-red/10 transition-all"
          aria-label="Đóng"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-zinc-100 dark:divide-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
        {[
          {
            label: "Dự án",
            value: province.projectCount,
            icon: <FiBriefcase className="w-4 h-4" />,
          },
          {
            label: "TT",
            value: province.centerCount,
            icon: <FiHome className="w-4 h-4" />,
          },
          {
            label: "Học viên",
            value:
              province.studentCount >= 1000
                ? `${(province.studentCount / 1000).toFixed(1)}K`
                : province.studentCount,
            icon: <FiUsers className="w-4 h-4" />,
          },
        ].map((s) => (
          <div key={s.label} className="flex flex-col items-center py-4 gap-1">
            <span className="text-accent-red">{s.icon}</span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white leading-none font-sans">
              {s.value}
            </span>
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-mono">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Centers */}
      <div className="px-6 py-5">
        <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Các trung tâm
        </p>
        <ul className="space-y-2">
          {province.centers.map((c, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.1 }}
              className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 font-sans"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 shrink-0" />
              {c.name}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="px-6 pb-5">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-red uppercase tracking-widest hover:gap-2.5 transition-all font-sans"
        >
          Xem tất cả dự án <FiArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* Representative landmark photo */}
      <div className="px-6 pb-6 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="relative h-40 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 shadow-inner">
          <img
            src={details.image}
            alt={province.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
}
