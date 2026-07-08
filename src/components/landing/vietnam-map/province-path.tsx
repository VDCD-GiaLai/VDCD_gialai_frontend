"use client";

import * as React from "react";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { Province } from "@/data/vietnam-provinces";

interface ProvincePathProps {
  province: Province;
  geo: any;
  pathData: string;
  isActive: boolean;
  isHovered: boolean;
  isAdjacent: boolean;
  isSelected: boolean;
  isFlashing: boolean;
  fill: string;
  fillOpacity: number;
  reducedMotion: boolean;
  setHoveredProvince: (p: Province | null) => void;
  setSelectedProvince: React.Dispatch<React.SetStateAction<Province | null>>;
  onHoverRect?: (rect: DOMRect) => void;
}

export const ProvincePath = React.memo(
  ({
    province,
    pathData,
    isActive,
    isHovered,
    isAdjacent,
    isSelected,
    fill,
    fillOpacity,
    reducedMotion,
    setHoveredProvince,
    setSelectedProvince,
    onHoverRect,
  }: ProvincePathProps) => {
    const variant = isHovered ? "hovered" : isAdjacent ? "adjacent" : "base";

    const variants = {
      base: {
        y: 0,
        scale: 1,
        filter: isSelected
          ? "drop-shadow(0 0 10px rgba(185,28,28,0.65))"
          : "none",
      },
      adjacent: {
        y: reducedMotion ? 0 : -6,
        scale: reducedMotion ? 1 : 1.02,
        filter:
          "drop-shadow(0 8px 16px rgba(0,0,0,0.08)) drop-shadow(0 0 6px rgba(239,68,68,0.2))",
      },
      hovered: {
        y: reducedMotion ? 0 : -16,
        scale: reducedMotion ? 1 : 1.06,
        filter:
          "drop-shadow(0 20px 32px rgba(0,0,0,0.18)) drop-shadow(0 0 12px rgba(239,68,68,0.45))",
      },
    };

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<SVGElement>) => {
        if (isActive) {
          setHoveredProvince(province);
          onHoverRect?.(e.currentTarget.getBoundingClientRect());
        }
      },
      [isActive, province, setHoveredProvince, onHoverRect],
    );

    const handleMouseLeave = useCallback(() => {
      if (isActive) setHoveredProvince(null);
    }, [isActive, setHoveredProvince]);

    const handleCellClick = useCallback(() => {
      if (!isActive) return;
      setSelectedProvince((curr) =>
        curr?.id === province.id ? null : province,
      );
    }, [isActive, province, setSelectedProvince]);

    return (
      <motion.g
        variants={variants}
        animate={variant}
        initial="base"
        transition={
          reducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 350, damping: 25 }
        }
        style={{
          transformOrigin: "center",
          cursor: isActive ? "pointer" : "default",
          willChange:
            (isHovered || isAdjacent) && !reducedMotion ? "transform" : "auto",
        }}
      >
        {/* Volumetric outer edge glow bloom layers (only rendered when hovered and reduced motion is off) */}
        {isHovered && !reducedMotion && (
          <>
            <path
              d={pathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth={6}
              opacity={0.35}
              style={{
                filter: "blur(7px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
            <path
              d={pathData}
              fill="none"
              stroke="#ef4444"
              strokeWidth={2}
              opacity={0.65}
              style={{
                filter: "blur(2px)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </>
        )}

        {/* Main Province path */}
        <path
          d={pathData}
          fill={fill}
          fillOpacity={fillOpacity}
          stroke={isHovered ? "#fca5a5" : fill} // Glowing edge effect on hover
          strokeWidth={isHovered ? 1.5 : 1.2}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCellClick}
          className="transition-colors duration-300"
          style={{
            outline: "none",
          }}
        />
      </motion.g>
    );
  },
);

ProvincePath.displayName = "ProvincePath";
