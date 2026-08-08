"use client";

import React, { useState, useRef, MouseEvent, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FiCompass } from "react-icons/fi";

export function HeroRadar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({
    lat: "13°58'32\"N",
    lng: "108°00'45\"E",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Mouse position for spring animation (radar circle tracker)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Rotate radar line continuously
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setRotation((prev) => (prev + 2.5) % 360);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Calculate realistic GIS coordinates for Gia Lai (Latitude ~13.5 to 14.5, Longitude ~107.5 to 108.8)
    const pctX = x / rect.width;
    const pctY = y / rect.height;

    const latDeg = 14 + (1 - pctY) * 0.8 - 0.4;
    const latMin = Math.floor((latDeg % 1) * 60);
    const latSec = Math.floor((((latDeg % 1) * 60) % 1) * 60);

    const lngDeg = 108 + pctX * 1.2 - 0.6;
    const lngMin = Math.floor((lngDeg % 1) * 60);
    const lngSec = Math.floor((((lngDeg % 1) * 60) % 1) * 60);

    setCoords({
      lat: `${Math.floor(latDeg)}°${latMin.toString().padStart(2, "0")}'${latSec.toString().padStart(2, "0")}"N`,
      lng: `${Math.floor(lngDeg)}°${lngMin.toString().padStart(2, "0")}'${lngSec.toString().padStart(2, "0")}"E`,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[55vh] min-h-[450px] overflow-hidden bg-zinc-950 flex flex-col justify-between p-6 md:p-12 select-none"
    >
      {/* 1. Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage: "url('/images/home/farm_area_drone_view.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950 z-0" />

      {/* 2. GIS Grid overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 3. Dynamic Radar Scanner Element (Follows cursor on hover) */}
      {isHovered && (
        <motion.div
          className="absolute w-60 h-60 -left-30 -top-30 rounded-full border border-accent-red/30 pointer-events-none z-20"
          style={{
            x: springX,
            y: springY,
          }}
        >
          {/* Radar rotating line */}
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-red/20 to-transparent"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center",
            }}
          />
          {/* Radar target center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-red shadow-[0_0_8px_#ef4444]" />

          {/* Mini Scanner Rings */}
          <div className="absolute inset-8 rounded-full border border-accent-red/20" />
          <div className="absolute inset-16 rounded-full border border-accent-red/10" />

          {/* Coordinate Tag floating above radar */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-950/85 backdrop-blur-md px-2.5 py-0.5 border border-accent-red/30 rounded text-[9px] font-mono text-accent-red tracking-wider whitespace-nowrap shadow-md">
            {coords.lat} {coords.lng}
          </div>
        </motion.div>
      )}

      {/* 4. Top Header Content (Breadcrumbs) */}
      <div className="relative z-30">
        <nav className="text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <Link
            href="/"
            className="hover:text-accent-red transition-colors focus-visible:ring-1 focus-visible:ring-accent-red focus-visible:outline-none"
          >
            Trang chủ
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-200">Về chúng tôi</span>
        </nav>
      </div>

      {/* 5. Bottom Headline & Spatial Info */}
      <div className="relative z-30 flex flex-col md:flex-row md:items-end justify-between gap-6 w-full">
        <div className="space-y-3 max-w-2xl">
          <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase flex items-center gap-1.5">
            <FiCompass className="w-3.5 h-3.5 animate-spin-slow" />
            HỆ SINH THÁI KHÔNG GIAN SỐ
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none font-heading">
            VỀ CHÚNG TÔI
          </h1>
        </div>

        {/* Real-time coordinates panel on bottom-right */}
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-4 rounded-xl min-w-[200px] font-mono">
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">
            VDCD GIS COORDINATES
          </div>
          <div className="text-xs text-zinc-300 flex flex-col gap-0.5">
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">LAT:</span>
              <span className="text-white font-bold tabular-nums">
                {coords.lat}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-zinc-500">LNG:</span>
              <span className="text-white font-bold tabular-nums">
                {coords.lng}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
