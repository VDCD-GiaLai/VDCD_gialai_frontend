"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiMapPin, FiAward, FiActivity } from "react-icons/fi";

import {
  PROVINCES,
  GEONAME_TO_PROVINCE_ID,
  Province,
} from "@/data/vietnam-provinces";

import { ProvincePath } from "./province-path";
import { FloatingInfoCard, FloatingInfoCardRef } from "./floating-info-card";
import { ProvinceCard } from "./province-card";
import { StatsPanel } from "./stats-panel";

const GEO_URL = "/data/vietnam-provinces.json";

// ─── Accessibility: prefers-reduced-motion hook ───
function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);
  return reducedMotion;
}

// ─── Heatmap colors: light gray → deep red ───
function getProvinceStyle(
  projectCount: number,
  maxProjects: number,
  isActive: boolean,
  isHovered: boolean,
  isSelected: boolean,
  isFlashing: boolean,
) {
  if (!isActive) {
    return {
      fill: "#e5e7eb",
      fillOpacity: 0.6,
      filter: "none",
    };
  }

  const ratio = Math.min(projectCount / maxProjects, 1);
  let fill: string;
  if (isSelected) fill = "#991b1b";
  else if (isHovered) fill = "#ef4444";
  else if (ratio < 0.15) fill = "#fecaca";
  else if (ratio < 0.3) fill = "#fca5a5";
  else if (ratio < 0.5) fill = "#f87171";
  else if (ratio < 0.7) fill = "#ef4444";
  else fill = "#dc2626";

  const fillOpacity = isActive ? 1.0 : 0.6;

  let filter = "none";
  if (isSelected) filter = "drop-shadow(0 0 10px rgba(185,28,28,0.7))";
  else if (isHovered) filter = "drop-shadow(0 0 6px rgba(239,68,68,0.5))";
  else if (isFlashing) filter = "drop-shadow(0 0 8px rgba(239,68,68,0.6))";

  return { fill, fillOpacity, filter };
}

export function VietnamMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reducedMotion = usePrefersReducedMotion();

  const [hoveredProvince, setHoveredProvince] = useState<Province | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null,
  );
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());
  const [liveFlashId, setLiveFlashId] = useState<string | null>(null);
  const [liveProvince, setLiveProvince] = useState<Province | null>(null);

  // Tooltip Ref for zero-re-render positioning
  const tooltipRef = useRef<FloatingInfoCardRef>(null);

  const maxProjects = useMemo(
    () => Math.max(...PROVINCES.map((p) => p.projectCount)),
    [],
  );

  // Wave animation: provinces light up in 4 batches on scroll
  useEffect(() => {
    if (!mapInView) return;
    const allIds = PROVINCES.map((p) => p.id);
    const batches = [
      new Set(allIds.slice(0, 3)),
      new Set(allIds.slice(0, 10)),
      new Set(allIds.slice(0, 22)),
      new Set(allIds),
    ];
    const delays = [300, 800, 1400, 2100];
    const timers = batches.map((batch, i) =>
      setTimeout(() => setActiveIds(batch), delays[i]),
    );
    return () => timers.forEach(clearTimeout);
  }, [mapInView]);

  // Live pulse: random province flashes every 4s
  useEffect(() => {
    if (activeIds.size < 5) return;
    const ids = Array.from(activeIds);
    const interval = setInterval(() => {
      const id = ids[Math.floor(Math.random() * ids.length)];
      const p = PROVINCES.find((pr) => pr.id === id) || null;
      setLiveFlashId(id);
      setLiveProvince(p);
      setTimeout(() => {
        setLiveFlashId(null);
        setLiveProvince(null);
      }, 1800);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIds]);

  // Stable positioning: Update tooltip position using target DOMRect shape instead of mousemove coordinates
  const handleHoverRect = useCallback((rect: DOMRect) => {
    tooltipRef.current?.updatePosition(rect);
  }, []);

  const geoToProvince = useCallback(
    (props: Record<string, unknown>): Province | null => {
      const name = props["Name"] as string;
      const id = GEONAME_TO_PROVINCE_ID[name];
      if (!id) return null;
      return PROVINCES.find((p) => p.id === id) || null;
    },
    [],
  );

  // Calculate adjacent provinces (top 3 closest to hovered province)
  const adjacentProvinceIds = useMemo(() => {
    if (!hoveredProvince) return new Set<string>();
    const withDistance = PROVINCES.filter(
      (p) => p.id !== hoveredProvince.id && activeIds.has(p.id),
    ).map((p) => {
      const dist = Math.sqrt(
        Math.pow(p.lat - hoveredProvince.lat, 2) +
          Math.pow(p.lng - hoveredProvince.lng, 2),
      );
      return { id: p.id, dist };
    });

    withDistance.sort((a, b) => a.dist - b.dist);
    const closest = withDistance.slice(0, 3).map((x) => x.id);
    return new Set(closest);
  }, [hoveredProvince, activeIds]);

  return (
    <section
      ref={sectionRef}
      className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 md:py-12">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Dấu ấn hoạt động trên toàn quốc
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-4 max-w-2xl font-sans">
            Đồng hành cùng các trung tâm trên khắp Việt Nam
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl text-sm leading-relaxed font-sans">
            Mạng lưới đối tác phủ sóng từ Bắc đến Nam — từ các trung tâm đổi mới
            sáng tạo đến hub nông nghiệp công nghệ cao tại từng địa phương.
          </p>
        </motion.div>

        {/* Layout: Map (65%) | Panel (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-8 items-start">
          {/* ─── Map ─── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="relative rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)",
              }}
            >
              {/* Legend */}
              <div className="absolute top-3 left-3 z-10 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm border border-zinc-100 dark:border-zinc-800">
                <p className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                  Mật độ dự án
                </p>
                <div className="flex items-center gap-1">
                  {["#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626"].map(
                    (c, i) => (
                      <div
                        key={i}
                        className="w-4 h-2 rounded-sm first:rounded-l last:rounded-r"
                        style={{ backgroundColor: c }}
                      />
                    ),
                  )}
                </div>
                <div className="flex justify-between text-[7px] text-zinc-400 mt-0.5 font-mono">
                  <span>Ít</span>
                  <span>Nhiều</span>
                </div>
              </div>

              {/* ComposableMap */}
              <div className="aspect-[9/13] sm:aspect-[3/4] md:aspect-[9/13]">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    center: [108.4, 15.6],
                    scale: 2550,
                  }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) => {
                      // Sort geographies to draw base first, then adjacent, then hovered
                      const sortedGeos = [
                        ...geographies.filter((geo) => {
                          const p = geoToProvince(
                            geo.properties as Record<string, unknown>,
                          );
                          return (
                            !p ||
                            (p.id !== hoveredProvince?.id &&
                              !adjacentProvinceIds.has(p.id))
                          );
                        }),
                        ...geographies.filter((geo) => {
                          const p = geoToProvince(
                            geo.properties as Record<string, unknown>,
                          );
                          return (
                            p &&
                            p.id !== hoveredProvince?.id &&
                            adjacentProvinceIds.has(p.id)
                          );
                        }),
                        ...geographies.filter((geo) => {
                          const p = geoToProvince(
                            geo.properties as Record<string, unknown>,
                          );
                          return p && p.id === hoveredProvince?.id;
                        }),
                      ];

                      return (
                        <>
                          {/* Map paths */}
                          {sortedGeos.map((geo) => {
                            const province = geoToProvince(
                              geo.properties as Record<string, unknown>,
                            );

                            if (!province) {
                              return (
                                <Geography
                                  key={geo.rsmKey}
                                  geography={geo}
                                  style={{
                                    default: {
                                      fill: "#e5e7eb",
                                      fillOpacity: 0.5,
                                      stroke: "#e5e7eb",
                                      strokeWidth: 1.2,
                                      outline: "none",
                                    },
                                    hover: {
                                      fill: "#e5e7eb",
                                      outline: "none",
                                    },
                                    pressed: { outline: "none" },
                                  }}
                                />
                              );
                            }

                            const isActive = activeIds.has(province.id);
                            const isHovered =
                              hoveredProvince?.id === province.id;
                            const isAdjacent = adjacentProvinceIds.has(
                              province.id,
                            );
                            const isSelected =
                              selectedProvince?.id === province.id;
                            const isFlashing = liveFlashId === province.id;

                            const { fill, fillOpacity } = getProvinceStyle(
                              province.projectCount,
                              maxProjects,
                              isActive,
                              isHovered,
                              isSelected,
                              isFlashing,
                            );

                            return (
                              <ProvincePath
                                key={geo.rsmKey}
                                province={province}
                                geo={geo}
                                pathData={geo.svgPath}
                                isActive={isActive}
                                isHovered={isActive && isHovered}
                                isAdjacent={isActive && isAdjacent}
                                isSelected={isSelected}
                                isFlashing={isFlashing}
                                fill={fill}
                                fillOpacity={fillOpacity}
                                reducedMotion={reducedMotion}
                                setHoveredProvince={setHoveredProvince}
                                setSelectedProvince={setSelectedProvince}
                                onHoverRect={handleHoverRect}
                              />
                            );
                          })}
                        </>
                      );
                    }}
                  </Geographies>

                  {/* Province center dots */}
                  {Array.from(activeIds).map((id) => {
                    const p = PROVINCES.find((pr) => pr.id === id);
                    if (!p) return null;
                    const isFlashing = liveFlashId === id;
                    const isSelected = selectedProvince?.id === id;
                    const isHovered = hoveredProvince?.id === id;
                    const highlight = isSelected || isFlashing || isHovered;

                    // Organic, non-synchronized floating offset duration
                    const floatDuration = 3.2 + (p.lng % 2) * 0.4;

                    return (
                      <Marker key={id} coordinates={[p.lng, p.lat]}>
                        <motion.g
                          animate={reducedMotion ? {} : { y: [0, -2.5, 0] }}
                          transition={
                            reducedMotion
                              ? {}
                              : {
                                  repeat: Infinity,
                                  duration: floatDuration,
                                  ease: "easeInOut",
                                }
                          }
                          style={{ cursor: "pointer" }}
                          onMouseEnter={(e) => {
                            setHoveredProvince(p);
                            handleHoverRect(
                              e.currentTarget.getBoundingClientRect(),
                            );
                          }}
                          onMouseLeave={() => setHoveredProvince(null)}
                          onClick={() => {
                            setSelectedProvince(
                              selectedProvince?.id === p.id ? null : p,
                            );
                          }}
                        >
                          {/* Expanding Ripple Ring */}
                          {!reducedMotion && (
                            <motion.circle
                              r={highlight ? 11 : 6}
                              fill="none"
                              stroke={isSelected ? "#991b1b" : "#ef4444"}
                              strokeWidth={1.2}
                              initial={{ scale: 0.8, opacity: 0.6 }}
                              animate={{
                                scale: highlight ? [1, 2.2, 1] : [1, 1.6, 1],
                                opacity: highlight
                                  ? [0.65, 0, 0.65]
                                  : [0.35, 0, 0.35],
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 2.2,
                                ease: "easeOut",
                              }}
                              style={{ transformOrigin: "center" }}
                            />
                          )}

                          {highlight && reducedMotion && (
                            <circle
                              r={10}
                              fill="none"
                              stroke="#ef4444"
                              strokeWidth={1.5}
                            />
                          )}

                          <circle
                            r={isSelected ? 4.5 : isHovered ? 4 : 2.5}
                            fill={isSelected ? "#991b1b" : "#ef4444"}
                            stroke="#ffffff"
                            strokeWidth={1}
                            style={{ transition: "r 0.2s ease" }}
                            className="transition-all duration-300"
                          />
                        </motion.g>
                      </Marker>
                    );
                  })}

                  {/* Quần đảo Hoàng Sa (Paracel Islands) */}
                  <Marker coordinates={[112.2, 16.2]}>
                    <g className="opacity-90 transition-all duration-300">
                      <text
                        x={14}
                        y={2}
                        fill="#4b5563"
                        className="dark:fill-zinc-300 font-sans font-bold text-[7px] tracking-wider select-none pointer-events-none"
                      >
                        Q.Đ Hoàng Sa
                      </text>
                      <text
                        x={14}
                        y={8}
                        fill="#9ca3af"
                        className="font-sans text-[5.5px] select-none pointer-events-none"
                      >
                        (TP. Đà Nẵng)
                      </text>
                    </g>
                  </Marker>

                  {/* Quần đảo Trường Sa (Spratly Islands) */}
                  <Marker coordinates={[114.0, 8.8]}>
                    <g className="opacity-90 transition-all duration-300">
                      <text
                        x={18}
                        y={2}
                        fill="#4b5563"
                        className="dark:fill-zinc-300 font-sans font-bold text-[7px] tracking-wider select-none pointer-events-none"
                      >
                        Q.Đ Trường Sa
                      </text>
                      <text
                        x={18}
                        y={8}
                        fill="#9ca3af"
                        className="font-sans text-[5.5px] select-none pointer-events-none"
                      >
                        (T. Khánh Hòa)
                      </text>
                    </g>
                  </Marker>
                </ComposableMap>
              </div>

              {/* Live activity toast */}
              <AnimatePresence>
                {liveProvince && (
                  <motion.div
                    key={liveProvince.id}
                    initial={{ opacity: 0, y: 8, x: -8 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-white/92 dark:bg-zinc-900/92 backdrop-blur-md rounded-xl px-3.5 py-2.5 shadow-xl border border-accent-red/10"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse shrink-0" />
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      <span className="text-accent-red font-bold">
                        {liveProvince.name}
                      </span>{" "}
                      — Đang hoạt động
                    </span>
                    <FiActivity className="w-3 h-3 text-accent-red" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Interactive Guide Widget */}
              <div className="absolute bottom-4 right-4 z-10 max-w-[200px] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-xl p-3 shadow-md border border-zinc-200/50 dark:border-zinc-800/50 text-[10px] text-zinc-500 dark:text-zinc-400 space-y-1.5 transition-colors duration-300">
                <p className="font-bold text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono mb-1">
                  Hướng dẫn bản đồ
                </p>
                <div className="flex items-start gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1 shrink-0" />
                  <span>Di chuột để xem nhanh thông tin dự án</span>
                </div>
                <div className="flex items-start gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-800 mt-1 shrink-0" />
                  <span>Nhấp để cố định bảng hiển thị trung tâm</span>
                </div>
                <div className="flex items-start gap-1.5 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                  <span>Chấm tròn đỏ thể hiện vị trí các trung tâm</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right panel ─── */}
          <div>
            <AnimatePresence mode="wait">
              {selectedProvince ? (
                <ProvinceCard
                  key="province"
                  province={selectedProvince}
                  onClose={() => setSelectedProvince(null)}
                />
              ) : (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StatsPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating tooltip */}
      <FloatingInfoCard
        ref={tooltipRef}
        province={hoveredProvince}
        visible={!!hoveredProvince && !selectedProvince}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}
