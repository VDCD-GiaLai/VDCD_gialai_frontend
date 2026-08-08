"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import {
  FiSliders,
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiGlobe,
  FiCalendar,
} from "react-icons/fi";

export function BentoIntroGrid() {
  // State for image comparison slider (percentage 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      <div className="mb-10">
        <span className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase block mb-2">
          VDCD Group — Giới thiệu tổng quan
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
          Nền tảng Năng lực & Hạ tầng Dữ liệu
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Cell 1: Large Intro Text & Strategic Narrative (lg:col-span-7) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-zinc-900 dark:bg-zinc-900 text-white p-8 md:p-12 rounded-3xl border border-zinc-800 flex flex-col justify-between relative overflow-hidden shadow-2xl group"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-red-500/20 transition-all duration-700" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono font-semibold rounded-full uppercase tracking-wider">
              <span>Hành trình từ 2006</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white tracking-tight leading-snug">
              Trung tâm Đổi mới Sáng tạo Gia Lai
            </h3>

            <p className="text-zinc-300 text-base md:text-lg leading-relaxed pt-2">
              Thành lập từ năm 2006,{" "}
              <strong className="text-white font-semibold">VDCD Group</strong>{" "}
              đã đi qua hành trình gần hai thập kỷ từ một đơn vị trắc địa bản đồ
              truyền thống trở thành tập đoàn công nghệ số tiên phong tại Tây
              Nguyên.
            </p>

            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Chúng tôi đồng hành cùng chính quyền và doanh nghiệp trong việc
              thiết lập hạ tầng dữ liệu không gian, tối ưu hóa lâm nghiệp và quy
              hoạch đô thị thông minh bằng năng lực tự chủ công nghệ toàn diện.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-800 relative z-10 mt-8">
            <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-zinc-300">
              <FiCheckCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>Tự chủ thiết bị bay UAV & LiDAR</span>
            </div>
            <div className="flex items-center gap-3 text-xs md:text-sm font-medium text-zinc-300">
              <FiCheckCircle className="w-5 h-5 text-red-500 shrink-0" />
              <span>Chuyển đổi số bản đồ 3DG Twin</span>
            </div>
          </div>
        </motion.div>

        {/* Cell 2: Image Comparison Slider (lg:col-span-5) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-4 flex flex-col justify-between relative shadow-2xl"
        >
          <div className="flex items-center justify-between px-3 py-2 mb-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <FiSliders className="w-4 h-4 text-red-500" />
              Interactive 3D Digital Twin Scan
            </span>
            <span className="text-[11px] font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              Kéo để so sánh
            </span>
          </div>

          {/* Interactive Image Slider */}
          <div
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-zinc-800"
          >
            {/* Background Image: 3DG Digital Twin Model */}
            <Image
              src="/images/home/hethongdothiso.jpg"
              alt="3DG Digital Twin Model"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute top-3 right-3 bg-red-600/90 text-white font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded shadow-lg backdrop-blur-md">
              Digital Twin 3D
            </div>

            {/* Foreground Clipped Image: Satellite / Aerial Photo */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <Image
                src="/images/home/farm_area_drone_view.jpg"
                alt="Thực địa Vệ tinh Aerial"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute top-3 left-3 bg-zinc-900/90 text-zinc-200 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded shadow-lg backdrop-blur-md">
                Thực địa Vệ tinh
              </div>
            </div>

            {/* Divider Line & Drag Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-900 border-2 border-red-500 text-white flex items-center justify-center shadow-xl">
                <FiSliders className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          <p className="text-zinc-500 text-xs font-mono text-center pt-3">
            Mô phỏng dữ liệu không gian thời gian thực giữa ảnh thực địa drone &
            bản đồ số 3D
          </p>
        </motion.div>

        {/* Cell 3: 4 Glassmorphic Stats Cards (lg:col-span-12) */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 md:p-8 bg-zinc-900/60 dark:bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-md hover:border-red-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FiCalendar className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Thành lập
              </span>
            </div>
            <div className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight tabular-nums">
              2006
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Viên gạch trắc địa đầu tiên tại vùng cao Gia Lai
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 md:p-8 bg-zinc-900/60 dark:bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-md hover:border-red-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FiAward className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Hệ sinh thái
              </span>
            </div>
            <div className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight tabular-nums flex items-baseline">
              <AnimatedCounter target={12} suffix="+" />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Viện & Trung tâm R&D công nghệ chuyên sâu
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 md:p-8 bg-zinc-900/60 dark:bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-md hover:border-red-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FiUsers className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Nhân sự
              </span>
            </div>
            <div className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight tabular-nums flex items-baseline">
              <AnimatedCounter target={250} suffix="+" />
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Kỹ sư, thạc sĩ & chuyên gia công nghệ chất lượng cao
            </p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 md:p-8 bg-zinc-900/60 dark:bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-md hover:border-red-500/40 transition-colors group shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <FiGlobe className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-mono text-zinc-500 uppercase">
                Quy mô
              </span>
            </div>
            <div className="text-3xl md:text-5xl font-black font-heading text-white tracking-tight uppercase">
              Toàn quốc
            </div>
            <p className="text-xs text-zinc-400 mt-2">
              Mạng lưới triển khai hạ tầng không gian dữ liệu
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
