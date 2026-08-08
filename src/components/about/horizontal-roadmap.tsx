"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";

export function HorizontalRoadmap() {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);

  useEffect(() => {
    fetchOrganizationInfoFromApi()
      .then(setOrgInfo)
      .catch(() => {});
  }, []);

  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: roadmapRef,
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  const milestoneImages = [
    "/images/home/farm_area_view.jpg",
    "/about-us/3A5A2610.JPG",
    "/images/home/innovation_center.png",
    "/images/home/quynhon_citynightview.webp",
  ];

  const milestoneTaglines = [
    "Đặt viên gạch đầu tiên tại Tây Nguyên",
    "Làm chủ không gian dữ liệu số",
    "Vươn mình số hóa thông minh",
    "Vươn tầm quốc gia & quốc tế",
  ];

  const milestoneYears = [
    "2006 - 2015",
    "2016 - 2022",
    "2023 - 2026",
    "2027 - 2030",
  ];

  const dynamicMilestones =
    orgInfo?.developmentOrientations &&
    orgInfo.developmentOrientations.length > 0
      ? orgInfo.developmentOrientations.map((item, idx) => ({
          year: milestoneYears[idx % milestoneYears.length],
          title: item.title,
          tagline: milestoneTaglines[idx % milestoneTaglines.length],
          desc: item.description || "",
          image: milestoneImages[idx % milestoneImages.length],
        }))
      : [
          {
            year: "2006 - 2015",
            title: "Khởi nghiệp trắc địa",
            tagline: "Đặt viên gạch đầu tiên tại Tây Nguyên",
            desc: "Thành lập các đội khảo sát đo đạc thực địa cơ bản, trắc địa bản đồ địa lý truyền thống, thu thập các dữ liệu không gian thực địa thô đầu tiên tại Gia Lai.",
            image: "/images/home/farm_area_view.jpg",
          },
          {
            year: "2016 - 2022",
            title: "Chuyển đổi GIS & Bản đồ số",
            tagline: "Làm chủ không gian dữ liệu số",
            desc: "Làm chủ kỹ thuật GIS, xây dựng hệ thống quản lý đất đai địa phương, ứng dụng viễn thám và số hóa dữ liệu quy hoạch hạ tầng quy mô lớn.",
            image: "/about-us/3A5A2610.JPG",
          },
          {
            year: "2023 - 2026",
            title: "Hệ sinh thái công nghệ đa ngành",
            tagline: "Vươn mình số hóa thông minh",
            desc: "Phát triển nền tảng 3DG Digital Twin, tự chủ chế tạo thiết bị bay không người lái (UAV) chuyên dụng và thiết lập cổng thông tin điều hành IOC hiện đại.",
            image: "/images/home/innovation_center.png",
          },
          {
            year: "2027 - 2030",
            title: "Dẫn đầu số hóa không gian",
            tagline: "Vươn tầm quốc gia & quốc tế",
            desc: "Mở rộng hệ sinh thái số hóa không gian 3D toàn diện trên cả nước, cung cấp phần cứng, hạ tầng đám mây và xuất khẩu dịch vụ phân tích dữ liệu lớn.",
            image: "/images/home/quynhon_citynightview.webp",
          },
        ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
      {/* Roadmap Section - Scroll Pinned Horizontal Progress */}
      <section
        ref={roadmapRef}
        className="relative h-[250vh] scroll-mt-28 hidden lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 mb-12">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Hành trình phát triển
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Định hướng & Cột mốc tương lai
            </h2>
          </div>

          <div className="w-full flex items-center overflow-hidden">
            <motion.div
              style={{ x: xTranslate }}
              className="flex gap-8 px-4 md:px-8 w-[180%]"
            >
              {dynamicMilestones.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-[400px] p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl relative overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300"
                >
                  <span className="text-4xl font-black text-accent-red/20 font-heading block mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-black dark:text-white font-heading mb-1">
                    {item.title}
                  </h3>
                  <span className="text-xs font-mono text-accent-red uppercase tracking-wider block mb-4">
                    {item.tagline}
                  </span>
                  <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Roadmap Fallback */}
      <section className="scroll-mt-28 block lg:hidden">
        <div className="mb-8">
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Hành trình phát triển
          </span>
          <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
            Định hướng & Cột mốc tương lai
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {dynamicMilestones.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl relative overflow-hidden"
            >
              <span className="text-3xl font-black text-accent-red/20 font-heading block mb-2">
                {item.year}
              </span>
              <h3 className="text-lg font-bold text-black dark:text-white font-heading mb-1">
                {item.title}
              </h3>
              <span className="text-xs font-mono text-accent-red uppercase tracking-wider block mb-3">
                {item.tagline}
              </span>
              <p className="text-secondary dark:text-zinc-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
