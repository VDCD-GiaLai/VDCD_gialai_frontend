"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCrosshair, FiGlobe, FiLayers, FiRadio } from "react-icons/fi";

export function HeroRadarBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({
    lat: "13.9832° N",
    lng: "108.0015° E",
  });
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate mock GIS latitude and longitude based on mouse relative position
    const latVal = (13.9832 + ((rect.height - y) / rect.height) * 0.05).toFixed(
      4,
    );
    const lngVal = (108.0015 + (x / rect.width) * 0.05).toFixed(4);

    setCoords({
      lat: `${latVal}° N`,
      lng: `${lngVal}° E`,
    });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[85vh] flex items-center justify-center bg-zinc-950 text-white overflow-hidden border-b border-zinc-800/80 cursor-crosshair select-none"
    >
      {/* Background Image / Aerial Mesh Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('/images/home/quynhon_herobanner.jpg')`,
        }}
      />

      {/* Radial Gradient & Grid Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dynamic Cursor Radar Reticle */}
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute z-20 top-0 left-0"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          {/* Outer Rotating Radar Ring */}
          <div className="relative w-44 h-44 rounded-full border border-red-500/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <div className="absolute inset-0 rounded-full border border-dashed border-red-500/20" />
            <div className="w-24 h-24 rounded-full border border-red-500/40" />
          </div>

          {/* Sweeping Radar Cone */}
          <div className="absolute inset-0 w-44 h-44 rounded-full overflow-hidden animate-[spin_4s_linear_infinite]">
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-red-500/20 to-transparent origin-bottom-right" />
          </div>

          {/* Target Reticle Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-red-500 flex items-center justify-center">
            <FiCrosshair className="w-4 h-4 animate-pulse" />
          </div>

          {/* Live GIS Coordinate HUD */}
          <div className="absolute top-12 left-12 whitespace-nowrap bg-zinc-900/90 border border-red-500/30 px-3 py-1.5 rounded text-[10px] font-mono text-zinc-300 backdrop-blur-md shadow-2xl flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>GIS SCAN:</span>
            <span className="text-red-400 font-bold">{coords.lat}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-red-400 font-bold">{coords.lng}</span>
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 w-full flex flex-col justify-between min-h-[70vh]">
        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <Link href="/" className="hover:text-red-500 transition-colors">
              Trang chủ
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-red-400 font-semibold">Về chúng tôi</span>
          </nav>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <FiRadio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="tracking-wider uppercase text-[11px]">
              Tập đoàn VDCD — Tây Nguyên
            </span>
          </div>
        </div>

        {/* Hero Headline & Subhead */}
        <div className="my-auto pt-12 pb-8 space-y-6 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs tracking-wider uppercase rounded">
            <FiGlobe className="w-3.5 h-3.5" />
            <span>Spatial Data Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-heading text-white leading-[1.08] uppercase">
            Về chúng tôi — Dẫn đầu kỷ nguyên{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-red-500">
              Số hóa Không gian Dữ liệu
            </span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-xl font-normal leading-relaxed max-w-3xl">
            Kiến tạo nền tảng bản đồ số 3D (Digital Twin), UAV tự động hóa và
            giải pháp điều hành đô thị thông minh chuyên sâu cho Gia Lai, Tây
            Nguyên và toàn quốc.
          </p>
        </div>

        {/* Bottom Technical Indicators Bar */}
        <div className="pt-8 border-t border-zinc-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <FiLayers className="w-4 h-4 text-red-500 shrink-0" />
            <span>3DG DIGITAL TWIN PLATFORM</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>UAV MAPPING & LIDAR SCAN</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span>AI URBAN IOC & AUTO-TIMELAPSE</span>
          </div>
          <div className="flex items-center gap-2 text-right justify-end">
            <span className="text-zinc-500">COORD:</span>
            <span className="text-zinc-300">{coords.lat}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
