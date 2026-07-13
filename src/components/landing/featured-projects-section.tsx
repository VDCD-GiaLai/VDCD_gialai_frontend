"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

interface ProjectItem {
  title: string;
  desc: string;
  img: string;
  link: string;
}

const projectsData: ProjectItem[] = [
  {
    title: "Vân Phong – Khánh Hòa",
    desc: "Khu kinh tế Vân Phong được giám sát số hóa toàn diện, ứng dụng AutoTimelapse ghi lại từng giai đoạn phát triển của khu kinh tế chiến lược tại Khánh Hòa.",
    img: "https://vdcd.vn/wp-content/uploads/2025/11/z6246976510436_a1885eca27bd88117afc251ceab774be-edited-768x576.jpg",
    link: "https://vdcd.vn/projects/van-phong-khanh-hoa/",
  },
  {
    title: "Lotte Mall Võ Chí Công",
    desc: "Trung tâm thương mại & chung cư Lotte Mall được giám sát tiến độ xây dựng bằng hệ thống camera AutoTimelapse 24/7 từ lúc khởi công đến hoàn thiện.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/Lotte-Mall-1-1-1-768x509.jpg",
    link: "https://vdcd.vn/projects/lotte-mall-vo-chi-cong/",
  },
  {
    title: "Becamex Bình Dương",
    desc: "AutoTimelapse đồng hành cùng Becamex Tower Bình Dương – biểu tượng mới của đô thị thông minh, nơi công nghệ và kiến trúc hòa quyện.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/hinh-anh-du-an-becamex2-atl-1024x683-1-768x512.jpeg",
    link: "https://vdcd.vn/projects/becamex-binh-duong/",
  },
  {
    title: "The Terra An Hưng",
    desc: "VDCD mang công nghệ giám sát tự động vào The Terra An Hưng, giúp Văn Phú – Invest quản lý tiến độ số hóa và xây dựng đô thị thông minh.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/the-terra-an-hung-1-1-1-768x499.jpg",
    link: "https://vdcd.vn/projects/the-terra-an-hung/",
  },
  {
    title: "Tháp Bà Ponagar",
    desc: "Ứng dụng công nghệ số hóa và giám sát bảo tồn di tích lịch sử Tháp Bà Ponagar, bảo vệ di sản văn hóa Chăm Pa bằng hệ thống camera thông minh.",
    img: "https://vdcd.vn/wp-content/uploads/2025/11/11-1024x680-1-768x510.png",
    link: "https://vdcd.vn/projects/thap-ba-ponagar/",
  },
  {
    title: "Sun Marina Hạ Long",
    desc: "AutoTimelapse triển khai tại Marina Hạ Long, ứng dụng công nghệ giám sát tự động giúp kiến tạo sắc vóc đô thị ven biển hiện đại.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/13632_12-11-2025-11-30-00-1-1-768x512.jpg",
    link: "https://vdcd.vn/projects/sun-marina-ha-long/",
  },
  {
    title: "Sơn Trà – Đà Nẵng",
    desc: "Dự án Sơn Trà nằm cách trung tâm Đà Nẵng 10km về phía Đông Bắc, được giám sát toàn diện bằng hệ thống camera thông minh tích hợp AI.",
    img: "https://vdcd.vn/wp-content/uploads/2025/11/Screenshot_76-min-1024x609-1-768x457.png",
    link: "https://vdcd.vn/projects/son-tra-da-nang/",
  },
  {
    title: "Sân Bay Vân Đồn",
    desc: "Hệ thống AutoTimelapse ghi lại toàn bộ tiến độ xây dựng sân bay Vân Đồn – sân bay tư nhân đầu tiên của Việt Nam tại Quảng Ninh.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/467321399_1099508478849158_37644-768x512.jpg",
    link: "https://vdcd.vn/projects/san-bay-van-don/",
  },
  {
    title: "Sân Bay Quốc Tế Phú Quốc",
    desc: "VDCD triển khai giám sát tiến độ xây dựng tại cảng hàng không quốc tế Phú Quốc, cửa ngõ du lịch hàng đầu của Việt Nam.",
    img: "https://vdcd.vn/wp-content/uploads/2024/03/cang-hkqt-phu-quoc-1750338379-62-768x434.jpg",
    link: "https://vdcd.vn/projects/san-bay-quoc-te-phu-quoc/",
  },
];

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden cursor-pointer
                 border border-whisper-border dark:border-zinc-800
                 hover:shadow-2xl transition-shadow duration-500"
      style={{ height: "400px" }}
    >
      {/* ── Image — always fills full card ── */}
      <Image
        alt={project.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        src={project.img}
      />

      {/* ── Animated border — draws clockwise on hover ── */}
      <span
        className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40
                       group-hover:w-full transition-[width] duration-[350ms] ease-linear [transition-delay:0ms]
                       group-hover:[transition-delay:0ms]"
      />
      <span
        className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40
                       group-hover:h-full transition-[height] duration-[350ms] ease-linear
                       group-hover:[transition-delay:350ms]"
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40
                       group-hover:w-full transition-[width] duration-[350ms] ease-linear
                       group-hover:[transition-delay:700ms]"
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40
                       group-hover:h-full transition-[height] duration-[350ms] ease-linear
                       group-hover:[transition-delay:1050ms]"
      />

      {/* ── Default bottom: gradient + title + white border ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10
                   transition-all duration-500 ease-in-out
                   group-hover:opacity-0 group-hover:translate-y-3"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative px-5 pb-4 pt-14">
          <h3 className="font-heading text-base font-bold uppercase leading-snug line-clamp-2 text-white">
            {project.title}
          </h3>
          <div className="mt-3 h-px bg-white/20" />
        </div>
      </div>

      {/* ── White data panel — slides UP on hover ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20
                   bg-white dark:bg-zinc-900
                   translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-in-out"
      >
        {/* Panel content wrapper */}
        <div className="relative overflow-hidden px-6 pt-5 pb-6">
          {/* Decorative number */}
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: "13rem",
              color: "rgba(0, 0, 0, 0.07)",
              lineHeight: 1,
              transform: "translateX(33%)",
            }}
          >
            {index + 1}
          </span>

          {/* Tag */}
          <div className="relative flex items-center gap-2 mb-3">
            <div className="w-2 h-2 flex-shrink-0 bg-accent-red" />
            <span className="font-bold text-[10px] text-accent-red uppercase tracking-[0.3em]">
              AutoTimelapse · VDCD
            </span>
          </div>

          {/* Title */}
          <h3
            className="relative font-heading text-base font-bold uppercase leading-snug line-clamp-2
                         text-black dark:text-white mb-2"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="relative text-xs leading-relaxed line-clamp-2 text-secondary dark:text-zinc-400">
            {project.desc}
          </p>

          {/* Arrow */}
          <div className="relative mt-4">
            <FiArrowRight className="w-4 h-4 text-accent-red" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function FeaturedProjectsSection() {
  return (
    <section
      id="projects"
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 py-20"
    >
      {/* Section Header */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase leading-tight text-black dark:text-white">
            Các dự án <br />
            <span
              style={{
                WebkitTextStroke: "2px #3c3c3cff",
                color: "transparent",
              }}
            >
              tiêu biểu
            </span>
          </h2>
        </div>
        <div
          className="h-px flex-grow mx-10 hidden md:block mb-5"
          style={{ background: "rgba(255, 0, 0, 1)" }}
        />
        <div className="flex flex-col items-start md:items-end gap-3 mt-6 md:mt-0">
          <p className="max-w-xs text-sm text-secondary dark:text-zinc-400 uppercase tracking-widest leading-loose md:text-right">
            Những công trình tiêu biểu VDCD đã triển khai trên khắp cả nước.
          </p>
          <a
            href="https://vdcd.vn/du-an/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-red font-bold text-xs uppercase tracking-[0.25em] hover:opacity-70 transition-opacity"
          >
            Xem tất cả <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Card Grid */}
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
