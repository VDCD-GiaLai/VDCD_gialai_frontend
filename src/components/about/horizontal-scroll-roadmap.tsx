"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiCheckCircle,
  FiCompass,
  FiCpu,
  FiGlobe,
  FiMapPin,
} from "react-icons/fi";

export function HorizontalScrollRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress inside parent section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to horizontal translation (-0% to -75%) for 4 items
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const phases = [
    {
      period: "2006 - 2015",
      badge: "Giai đoạn 01",
      title: "Khởi nghiệp Trắc địa & Đo đạc",
      description:
        "Thành lập các đội khảo sát đo đạc thực địa cơ bản, thu thập lớp dữ liệu thô địa lý đầu tiên tại vùng cao Tây Nguyên.",
      highlights: [
        "Khảo sát thực địa địa hình",
        "Độ chính xác chuẩn quốc gia",
        "Xây dựng cơ sở dữ liệu móng",
      ],
      icon: FiMapPin,
    },
    {
      period: "2016 - 2022",
      badge: "Giai đoạn 02",
      title: "Chuyển đổi GIS & Bản đồ số",
      description:
        "Làm chủ kỹ thuật GIS, xây dựng hệ thống quản lý đất đai địa phương, số hóa dữ liệu hạ tầng và ứng dụng viễn thám vệ tinh.",
      highlights: [
        "Số hóa dữ liệu đất đai",
        "Ứng dụng GIS & Viễn thám",
        "Phát triển phần mềm chuyên dụng",
      ],
      icon: FiGlobe,
    },
    {
      period: "2023 - 2026",
      badge: "Giai đoạn 03",
      title: "Hệ sinh thái Công nghệ Đa ngành",
      description:
        "Phát triển nền tảng 3DG Digital Twin, chế tạo thiết bị bay UAV tự chủ và lắp đặt trung tâm điều hành thông minh IOC đô thị.",
      highlights: [
        "3DG Digital Twin Platform",
        "Phần cứng UAV tự chủ",
        "IOC / DOC Điều hành thông minh",
      ],
      icon: FiCpu,
    },
    {
      period: "2027 - 2030",
      badge: "Giai đoạn 04",
      title: "Dẫn đầu Số hóa Không gian",
      description:
        "Mở rộng toàn quốc, xuất khẩu giải pháp phần cứng Make-in-Vietnam và dịch vụ phân tích dữ liệu không gian ra khu vực Đông Nam Á.",
      highlights: [
        "Mở rộng quy mô toàn quốc",
        "Xuất khẩu thiết bị UAV/IoT",
        "AI Spatial Analytics toàn diện",
      ],
      icon: FiCompass,
    },
  ];

  return (
    <div className="relative w-full">
      {/* DESKTOP VIEW: Sticky Pin Horizontal Scroll Track (Hidden on mobile) */}
      <div
        ref={containerRef}
        className="hidden lg:block relative h-[300vh] bg-zinc-950"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-b border-zinc-800">
          {/* Header Title Bar */}
          <div className="max-w-[1400px] mx-auto px-12 w-full pt-8 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase block mb-1">
                Lộ trình lịch sử — VDCD Roadmap
              </span>
              <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight">
                Định hướng & Giai đoạn phát triển
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full">
              Cuộn chuột để xem tiến trình ➔
            </div>
          </div>

          {/* Horizontal Translating Track */}
          <div className="w-full overflow-hidden py-12">
            <motion.div style={{ x }} className="flex gap-8 px-12 w-[400vw]">
              {phases.map((item, idx) => {
                const IconComp = item.icon;

                return (
                  <div
                    key={idx}
                    className="w-[80vw] max-w-[680px] shrink-0 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 flex flex-col justify-between shadow-2xl relative group hover:border-red-500/50 transition-colors"
                  >
                    {/* Top indicator & Year */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-mono font-bold text-red-400 bg-red-500/10 px-3.5 py-1.5 rounded-full border border-red-500/20">
                          {item.badge}
                        </span>
                        <span className="text-4xl font-black font-heading text-zinc-700 group-hover:text-red-500 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <h3 className="text-3xl font-bold font-heading text-white tracking-tight">
                          {item.period}
                        </h3>
                      </div>

                      <h4 className="text-xl font-bold text-zinc-200 mb-3">
                        {item.title}
                      </h4>

                      <p className="text-zinc-400 text-base leading-relaxed mb-8">
                        {item.description}
                      </p>
                    </div>

                    {/* Highlights bullet list */}
                    <div className="pt-6 border-t border-zinc-800 space-y-2.5">
                      {item.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2.5 text-xs font-mono text-zinc-300"
                        >
                          <FiCheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Track Progress Indicator Bar */}
          <div className="max-w-[1400px] mx-auto px-12 w-full pb-8">
            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-red-500 origin-left"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Vertical Timeline Fallback (Shown on mobile < 1024px) */}
      <div className="block lg:hidden max-w-[1400px] mx-auto px-6 py-16 bg-zinc-950 text-white">
        <div className="mb-10">
          <span className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase block mb-2">
            Lộ trình phát triển
          </span>
          <h2 className="text-3xl font-extrabold font-heading tracking-tight">
            Định hướng & Giai đoạn lịch sử
          </h2>
        </div>

        <div className="relative border-l-2 border-zinc-800 pl-6 space-y-12">
          {phases.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <div key={idx} className="relative">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-red-500 border-4 border-zinc-950" />

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-red-400 font-bold">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {item.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <IconComp className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-bold font-heading text-white">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-zinc-800 space-y-1.5">
                    {item.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-center gap-2 text-[11px] font-mono text-zinc-300"
                      >
                        <FiCheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
