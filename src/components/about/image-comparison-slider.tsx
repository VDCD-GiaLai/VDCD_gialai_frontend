"use client";

import React, {
  useState,
  useRef,
  useEffect,
  MouseEvent,
  TouchEvent,
} from "react";
import Image from "next/image";

interface ImageComparisonSliderProps {
  leftImage?: string;
  rightImage?: string;
  leftAlt?: string;
  rightAlt?: string;
  className?: string;
}

export function ImageComparisonSlider({
  leftImage = "/images/home/farm_area_view.webp",
  rightImage = "/images/home/hethongdothiso.webp",
  leftAlt = "Thực địa Vệ tinh",
  rightAlt = "Bản đồ số 3D",
  className = "",
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[4/3] select-none overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg cursor-ew-resize ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Right Image (Background) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={rightImage}
          alt={rightAlt}
          fill
          sizes="(max-w-[768px]) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute right-4 bottom-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90 tracking-wider uppercase border border-white/10">
          {rightAlt}
        </div>
      </div>

      {/* Left Image (Foreground with Clip Path) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <Image
          src={leftImage}
          alt={leftAlt}
          fill
          sizes="(max-w-[768px]) 100vw, 50vw"
          className="object-cover"
          draggable={false}
        />
        <div className="absolute left-4 bottom-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-white/90 tracking-wider uppercase border border-white/10">
          {leftAlt}
        </div>
      </div>

      {/* Slider Bar & Handle Button */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-zinc-950 flex items-center justify-center shadow-lg border border-zinc-200 pointer-events-auto transition-transform hover:scale-110 active:scale-95">
          <svg
            className="w-4 h-4 text-zinc-950"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M8 9l-4 4 4 4m8 0l4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
