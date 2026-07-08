"use client";

import * as React from "react";
import {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { Province, PROVINCE_DETAILS } from "@/data/vietnam-provinces";

export interface FloatingInfoCardRef {
  updatePosition: (rect: DOMRect) => void;
}

interface FloatingInfoCardProps {
  province: Province | null;
  visible: boolean;
  reducedMotion: boolean;
}

export const FloatingInfoCard = forwardRef<
  FloatingInfoCardRef,
  FloatingInfoCardProps
>(({ province, visible, reducedMotion }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeProvince, setActiveProvince] = useState<Province | null>(null);

  // Keep the card populated with the last active province during fade-out
  useEffect(() => {
    if (province) {
      setActiveProvince(province);
    }
  }, [province]);

  // Reset image loaded state when visible or province changes
  useEffect(() => {
    if (!visible) {
      setImageLoaded(false);
    }
  }, [visible, province]);

  // Expose position update function that aligns with the hovered region's bounding box
  useImperativeHandle(ref, () => ({
    updatePosition: (rect: DOMRect) => {
      const el = containerRef.current;
      if (!el) return;

      const tooltipWidth = 310;
      const tooltipHeight = 315; // Approximate tooltip height in px

      // Center horizontally on the hovered region/shape
      const centerX = rect.left + rect.width / 2;
      let adjustedX = centerX - tooltipWidth / 2;

      // Position 12px above the hovered region/shape
      let adjustedY = rect.top - tooltipHeight - 12;

      // If it overflows the top of the screen, place it 12px below the region
      if (adjustedY < 20) {
        adjustedY = rect.bottom + 12;
      }

      // Keep within left/right screen boundaries with a 20px safe margin
      if (adjustedX < 20) {
        adjustedX = 20;
      } else if (adjustedX + tooltipWidth > window.innerWidth - 20) {
        adjustedX = window.innerWidth - tooltipWidth - 20;
      }

      el.style.transform = `translate3d(${adjustedX}px, ${adjustedY}px, 0)`;
    },
  }));

  if (!activeProvince) return null;

  const details = PROVINCE_DETAILS[activeProvince.id] || {
    image:
      "https://images.unsplash.com/photo-1509060464153-4466739f78d0?auto=format&fit=crop&w=600&q=80",
    description: "Đối tác hoạt động phát triển công nghệ đổi mới.",
    population: "Đang cập nhật",
    area: "Đang cập nhật",
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed z-[9999] w-[310px] left-0 top-0"
      style={{
        transform: "translate3d(-1000px, -1000px, 0)", // Offscreen initially
        willChange: "transform",
      }}
    >
      <motion.div
        initial={
          reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 15 }
        }
        animate={{
          opacity: visible ? 1 : 0,
          scale: visible ? 1 : 0.95,
          y: visible ? 0 : 15,
        }}
        transition={
          reducedMotion
            ? { duration: 0.1 }
            : {
                type: "spring",
                stiffness: 280,
                damping: 24,
                opacity: { duration: 0.2 },
              }
        }
        className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-950/80 p-1 shadow-2xl transition-colors duration-300"
      >
        <div className="rounded-[calc(1rem-3px)] overflow-hidden bg-white/50 dark:bg-zinc-900/50 p-3">
          {/* Province Image */}
          <div className="relative h-28 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 mb-3">
            <motion.img
              src={details.image}
              alt={activeProvince.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              initial={
                reducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9, filter: "blur(8px)" }
              }
              animate={
                (imageLoaded && visible) || reducedMotion
                  ? { opacity: 1, scale: 1.1, filter: "blur(0px)" }
                  : { opacity: 0, scale: 0.9, filter: "blur(8px)" }
              }
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover"
            />
            {/* Region Badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase bg-black/60 text-white backdrop-blur-sm">
              {activeProvince.region === "Bắc"
                ? "Miền Bắc"
                : activeProvince.region === "Trung"
                  ? "Miền Trung"
                  : "Miền Nam"}
            </div>
          </div>

          {/* Card Info */}
          <div className="space-y-2">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <FiMapPin className="text-accent-red text-xs shrink-0" />
                {activeProvince.name}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                {details.description}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[10px]">
              <div className="bg-zinc-50 dark:bg-zinc-900/40 p-1.5 rounded-md border border-zinc-100 dark:border-zinc-800/20">
                <p className="text-zinc-400 font-medium font-sans">Diện tích</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 font-sans">
                  {details.area}
                </p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-900/40 p-1.5 rounded-md border border-zinc-100 dark:border-zinc-800/20">
                <p className="text-zinc-400 font-medium font-sans">Dân số</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 font-sans">
                  {details.population}
                </p>
              </div>
            </div>

            {/* Existing interactive metrics */}
            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[10px] text-center">
              <div>
                <p className="text-zinc-400 font-medium font-sans">Dự án</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 font-sans">
                  {activeProvince.projectCount}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 font-medium font-sans">TT</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 font-sans">
                  {activeProvince.centerCount}
                </p>
              </div>
              <div>
                <p className="text-zinc-400 font-medium font-sans">Học viên</p>
                <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 font-sans">
                  {activeProvince.studentCount >= 1000
                    ? `${(activeProvince.studentCount / 1000).toFixed(1)}K`
                    : activeProvince.studentCount}
                </p>
              </div>
            </div>

            <div className="pt-1.5 text-[9px] text-accent-red font-semibold flex items-center justify-end gap-0.5 font-sans">
              Click để xem chi tiết <FiArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

FloatingInfoCard.displayName = "FloatingInfoCard";
