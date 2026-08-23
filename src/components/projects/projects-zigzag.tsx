"use client";

import * as React from "react";
import Link from "next/link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  ArrowRight,
  Broadcast,
  Compass,
  Cube,
  Gauge,
  MapPin,
  Sparkle,
  TrendUp,
  Cpu,
} from "@phosphor-icons/react";
import type { ProjectEntry } from "@/data/projects.data";

interface ProjectsZigzagProps {
  projects?: ProjectEntry[];
}

interface SpotlightProjectConfig {
  id: string;
  number: string;
  badge: string;
  title: string;
  titleEn: string;
  categoryTag: string;
  location: string;
  progress: number;
  progressLabel: string;
  statusTag: string;
  image: string;
  description: string;
  stats: { label: string; value: string }[];
  gisDetails?: {
    length: string;
    completed: string;
    startEnd: string;
    lanes: string;
    speed: string;
  };
  bimDetails?: {
    capacity: string;
    automation: string;
    technologies: string;
    phase: string;
  };
}

const DEFAULT_SPOTLIGHT_PROJECTS: SpotlightProjectConfig[] = [
  {
    id: "van-phong-khanh-hoa",
    number: "01",
    badge: "DỰ ÁN NHÓM A — CÔNG TRÌNH CẤP ĐẶC BIỆT",
    title: "LONG THÀNH AIRPORT",
    titleEn: "SÂN BAY QUỐC TẾ LONG THÀNH",
    categoryTag: "Hạ tầng Hàng không & Giám sát số",
    location: "Long Thành, Đồng Nai",
    progress: 78,
    progressLabel: "Tiến độ thi công",
    statusTag: "LIVE AUTOTIMELAPSE",
    image:
      "https://vdcd.vn/wp-content/uploads/2025/11/L1003913-1-1024x683-1.jpg",
    description:
      "Dự án cảng hàng không quốc tế trọng điểm quốc gia, ứng dụng trọn bộ giải pháp bay quét LiDAR, AutoTimelapse 4K 24/7 và bản đồ số phục vụ chỉ đạo điều hành tiến độ tức thời.",
    stats: [
      { label: "Công suất", value: "100tr khách/năm" },
      { label: "Diện tích", value: "5.000 ha" },
      { label: "Tổng mức đầu tư", value: "16 tỷ USD" },
    ],
  },
  {
    id: "lotte-mall-vo-chi-cong",
    number: "02",
    badge: "THÔNG SỐ KỸ THUẬT & DỮ LIỆU GIS",
    title: "CAO TỐC BẮC — NAM",
    titleEn: "HỆ THỐNG ĐƯỜNG BỘ CAO TỐC VIỆT NAM",
    categoryTag: "Trục Giao thông Xương sống Quốc gia",
    location: "Tuyến Bắc – Nam, Việt Nam",
    progress: 72,
    progressLabel: "Tiến độ hoàn thành",
    statusTag: "GIS MAPPING REALTIME",
    image:
      "https://vdcd.vn/wp-content/uploads/2024/03/Lotte-Mall-1-1-1-scaled.jpg",
    description:
      "Khảo sát địa hình và số hóa toàn bộ tuyến cao tốc Bắc – Nam phía Đông trên nền tảng GIS động, theo dõi khối lượng đào đắp và kiểm soát chất lượng mặt đường.",
    stats: [
      { label: "Tổng chiều dài", value: "2.063 km" },
      { label: "Đã thông xe", value: "1.450 km" },
      { label: "Quy mô", value: "4 — 6 làn xe" },
    ],
    gisDetails: {
      length: "2.063 km",
      completed: "1.450 km",
      startEnd: "Lạng Sơn — Cà Mau",
      lanes: "4-6 làn",
      speed: "120 km/h",
    },
  },
  {
    id: "becamex-binh-duong",
    number: "03",
    badge: "MÔ HÌNH BIM & DỮ LIỆU VẬN HÀNH",
    title: "CẢNG BIỂN THÔNG MINH CÁI MÉP",
    titleEn: "MÔ HÌNH BIM & HỆ THỐNG LOGISTICS SỐ HÓA",
    categoryTag: "Cảng nước sâu & Khu công nghệ",
    location: "Bà Rịa – Vũng Tàu",
    progress: 85,
    progressLabel: "Mức độ tự động hóa",
    statusTag: "3D BIM WIREFRAME",
    image:
      "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1.jpeg",
    description:
      "Tích hợp mô hình thông tin công trình BIM Level 3 kết hợp hệ sinh thái cảm biến IoT giám sát cầu cảng, nâng cao hiệu suất bốc dỡ hàng hải và quản lý vòng đời tài sản.",
    stats: [
      { label: "Công suất xếp dỡ", value: "12tr TEU/năm" },
      { label: "Tự động hóa", value: "85%" },
      { label: "Tiêu chuẩn BIM", value: "BIM Level 3 / LOD 400" },
    ],
    bimDetails: {
      capacity: "12tr TEU/năm",
      automation: "85%",
      technologies: "IoT, AI, Big Data, LiDAR",
      phase: "Hoàn thành Giai đoạn 2",
    },
  },
];

export const ProjectsZigzag: React.FC<ProjectsZigzagProps> = ({ projects }) => {
  // Merge dynamic API projects if available with our rich Z-pattern spotlight config
  const spotlightList = React.useMemo(() => {
    return DEFAULT_SPOTLIGHT_PROJECTS.map((spotlight, index) => {
      const apiItem = projects && projects[index];
      if (!apiItem) return spotlight;

      return {
        ...spotlight,
        id: apiItem.id || spotlight.id,
        titleEn: apiItem.title || spotlight.titleEn,
        location: apiItem.location || spotlight.location,
        image: apiItem.coverImage || spotlight.image,
        description: apiItem.description || spotlight.description,
        categoryTag: apiItem.category || spotlight.categoryTag,
      };
    });
  }, [projects]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-zinc-950 text-white overflow-hidden selection:bg-teal-500 selection:text-black">
      {/* Background Cybernetic Grid & Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-20 [background-image:linear-gradient(to_right,#14b8a615_1px,transparent_1px),linear-gradient(to_bottom,#14b8a615_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Ambient glowing radial spots */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-mono font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            DỰ ÁN HẠ TẦNG TRỌNG ĐIỂM QUỐC GIA
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white font-heading">
            HỆ THỐNG GIÁM SÁT TIẾN ĐỘ &amp; QUY HOẠCH THÔNG MINH
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
            Áp dụng trọn gói công nghệ GIS, BIM, Trắc địa quét LiDAR và hệ sinh
            thái AutoTimelapse 4K độc quyền của VDCD trên 3 đại công trình chiến
            lược.
          </p>
        </div>

        {/* Vertical Connecting Tech Line (Desktop only) */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px -translate-x-1/2 bg-gradient-to-b from-teal-500/0 via-teal-500/40 to-teal-500/0 pointer-events-none" />

          {/* 3 Projects in Alternating Zigzag Layout */}
          <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
            {spotlightList.map((item, idx) => {
              const isEven = idx % 2 === 1; // Project 02 is reversed (Content Left, Image Right)

              return (
                <article
                  key={item.id}
                  className="relative group scroll-mt-24"
                  id={`project-spotlight-${item.number}`}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                      isEven ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* ── IMAGE PANEL (Cols 1-7 or 6-12) ── */}
                    <div
                      className={`relative w-full ${
                        isEven
                          ? "lg:col-span-6 lg:col-start-7 lg:order-2"
                          : "lg:col-span-6 lg:order-1"
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-teal-500/20 bg-zinc-900 shadow-2xl shadow-black/80 transition-all duration-500 group-hover:border-teal-400/60 group-hover:shadow-teal-950/40">
                        {/* Status Tag Overlay */}
                        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="tracking-wider uppercase font-bold text-[11px] text-teal-300">
                            {item.statusTag}
                          </span>
                        </div>

                        {/* Number Watermark badge */}
                        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-teal-500/20 backdrop-blur-md border border-teal-500/40 text-teal-300 font-mono font-bold text-xs">
                          NO.{item.number}
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
                          <OptimizedImage
                            src={item.image}
                            alt={item.titleEn}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          {/* Inner gradient shadows */}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                          <div className="absolute inset-0 bg-teal-950/10 mix-blend-color" />
                        </div>

                        {/* Bottom Bar Info on Image */}
                        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-20 flex items-center justify-between gap-4 border-t border-white/10 bg-zinc-950/80 backdrop-blur-md">
                          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                            <MapPin
                              weight="fill"
                              className="w-4 h-4 text-teal-400 shrink-0"
                            />
                            <span className="truncate">{item.location}</span>
                          </div>
                          <div className="text-[11px] font-mono text-teal-400 uppercase tracking-wider font-semibold">
                            {item.categoryTag}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── CONTENT PANEL (Cols 1-6 or 7-12) ── */}
                    <div
                      className={`flex flex-col justify-center space-y-6 ${
                        isEven
                          ? "lg:col-span-6 lg:col-start-1 lg:order-1"
                          : "lg:col-span-6 lg:order-2"
                      }`}
                    >
                      {/* Badge / Group */}
                      <div>
                        <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
                          <span className="text-teal-400 font-black text-sm">
                            ● {item.number}
                          </span>
                          <span>{item.badge}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-heading leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm font-mono text-zinc-400 uppercase tracking-wider mt-1">
                          {item.titleEn}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="p-4 rounded-xl bg-zinc-900/90 border border-teal-500/20 backdrop-blur-sm space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                            <TrendUp
                              weight="bold"
                              className="w-4 h-4 text-teal-400"
                            />
                            {item.progressLabel}
                          </span>
                          <span className="text-teal-300 font-bold text-sm">
                            {item.progress}%
                          </span>
                        </div>
                        {/* Glowing progress line */}
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden relative">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400 shadow-[0_0_12px_rgba(20,184,166,0.8)] transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Special Box for Project 02 (GIS) or Project 03 (BIM) or Project 01 (Stats Grid) */}
                      {item.gisDetails ? (
                        /* GIS Box for Cao Tốc Bắc Nam */
                        <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 backdrop-blur-sm">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-300 uppercase mb-3">
                            <Compass
                              weight="fill"
                              className="w-4 h-4 text-teal-400"
                            />
                            THỐNG KÊ TUYẾN GIS TỌA ĐỘ THỜI GIAN THỰC
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <div className="text-zinc-500 text-[10px]">
                                TỔNG CHIỀU DÀI
                              </div>
                              <div className="text-teal-300 font-bold text-sm mt-0.5">
                                {item.gisDetails.length}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <div className="text-zinc-500 text-[10px]">
                                ĐÃ THÔNG XE
                              </div>
                              <div className="text-emerald-300 font-bold text-sm mt-0.5">
                                {item.gisDetails.completed}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <div className="text-zinc-500 text-[10px]">
                                VẬN TỐC THIẾT KẾ
                              </div>
                              <div className="text-white font-bold text-sm mt-0.5">
                                {item.gisDetails.speed}
                              </div>
                            </div>
                            <div className="col-span-2 sm:col-span-3 p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-500 text-[10px]">
                                TRỤC TUYẾN
                              </span>
                              <span className="text-zinc-200 font-bold text-xs">
                                {item.gisDetails.startEnd} (
                                {item.gisDetails.lanes})
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : item.bimDetails ? (
                        /* BIM Box for Cảng biển Cái Mép */
                        <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 backdrop-blur-sm">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-300 uppercase mb-3">
                            <Cube
                              weight="fill"
                              className="w-4 h-4 text-teal-400"
                            />
                            THỐNG KÊ CÔNG NGHỆ BIM &amp; LOGISTICS
                          </div>
                          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <div className="text-zinc-500 text-[10px]">
                                CÔNG SUẤT XẾP DỠ
                              </div>
                              <div className="text-teal-300 font-bold text-sm mt-0.5">
                                {item.bimDetails.capacity}
                              </div>
                            </div>
                            <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                              <div className="text-zinc-500 text-[10px]">
                                MỨC TỰ ĐỘNG HÓA
                              </div>
                              <div className="text-emerald-300 font-bold text-sm mt-0.5">
                                {item.bimDetails.automation}
                              </div>
                            </div>
                            <div className="col-span-2 p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
                              <span className="text-zinc-500 text-[10px]">
                                CÔNG NGHỆ ÁP DỤNG
                              </span>
                              <span className="text-zinc-200 font-bold text-xs">
                                {item.bimDetails.technologies}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Standard 3-Grid Stats for Project 01 */
                        <div className="grid grid-cols-3 gap-3">
                          {item.stats.map((st, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 flex flex-col justify-between"
                            >
                              <div className="text-zinc-500 font-mono text-[10px] uppercase leading-tight">
                                {st.label}
                              </div>
                              <div className="text-teal-300 font-mono font-bold text-xs sm:text-sm mt-1">
                                {st.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Action Button */}
                      <div className="pt-2">
                        <Link
                          href={`/projects/${item.id}`}
                          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn"
                        >
                          <span>Xem chi tiết dự án</span>
                          <ArrowRight
                            weight="bold"
                            className="w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Bottom Assurance / Trust Bar */}
        <div className="mt-20 sm:mt-28 p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-teal-500/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center shrink-0 text-teal-400">
              <Cpu weight="duotone" className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-heading">
                Giải pháp Chuyển đổi số &amp; Giám sát Toàn diện của VDCD
              </h4>
              <p className="text-zinc-400 text-xs mt-0.5">
                Cung cấp nền tảng bản đồ số GIS, dữ liệu 3D LiDAR và camera giám
                sát thông minh cho mọi quy mô công trình.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-teal-500/40 text-teal-300 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-teal-500/10 hover:border-teal-400 transition-all duration-300 shrink-0"
          >
            Liên hệ tư vấn giải pháp
            <ArrowRight weight="bold" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
