"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  Briefcase,
  Star,
  LinkedinLogo,
} from "@phosphor-icons/react";

/* ─── Data ─── */
interface LeaderProfile {
  monogram: string;
  name: string;
  role: string;
  eyebrow: string;
  quote?: string;
  bio: string[];
  experience: string;
  expertise: string[];
  avatarSrc?: string;
}

const leaders: LeaderProfile[] = [
  {
    monogram: "CQV",
    name: "Ông Cao Quân Vũ",
    role: "Phó Chủ tịch HĐQT kiêm Tổng Giám đốc",
    eyebrow: "LÃNH ĐẠO ĐIỀU HÀNH",
    avatarSrc: "/about-us/sep-cao-quan-vu.webp",
    quote:
      "Kết nối công nghệ, chuyên gia và nguồn lực nhằm đưa các giải pháp số đi vào thực tiễn, đồng hành cùng sự phát triển bền vững của Gia Lai và khu vực Tây Nguyên.",
    bio: [
      "Với tầm nhìn chiến lược và sứ mệnh thúc đẩy đổi mới sáng tạo, Ông Cao Quân Vũ dẫn dắt Trung tâm Đổi mới Sáng tạo Gia Lai trở thành đầu mối kết nối công nghệ, chuyên gia và nguồn lực cho sự phát triển kinh tế số của tỉnh Gia Lai và khu vực Tây Nguyên.",
      "Dưới sự lãnh đạo của Ông, Trung tâm đã xây dựng và triển khai các giải pháp chuyển đổi số toàn diện, từ hạ tầng dữ liệu đến nền tảng phân tích thông minh, phục vụ cả cơ quan quản lý nhà nước và doanh nghiệp trên địa bàn.",
    ],
    experience: "15+ năm kinh nghiệm",
    expertise: [
      "Chuyển đổi số",
      "Quản trị doanh nghiệp",
      "Công nghệ thông tin",
      "Khởi nghiệp sáng tạo",
    ],
  },
];

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

/* ─── Leadership Card Component ─── */
function LeadershipCard({
  leader,
  index,
}: {
  leader: LeaderProfile;
  index: number;
}) {
  return (
    <motion.article
      custom={index + 2}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left: Avatar / Monogram */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="aspect-[3/4] max-w-[280px] bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden transition-colors duration-300">
            {leader.avatarSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={leader.avatarSrc}
                alt={leader.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-mono text-4xl sm:text-5xl font-black text-accent-red/30 tracking-widest select-none">
                {leader.monogram}
              </span>
            )}
          </div>
        </div>

        {/* Right: Profile Details */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-6">
          {/* Eyebrow + Name + Role */}
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-accent-red font-bold block">
              {leader.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight leading-tight">
              {leader.name}
            </h2>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              {leader.role}
            </p>
          </div>

          {/* Executive Dialogue / Quote Block */}
          {leader.quote && (
            <div className="relative p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/60 border-l-2 border-accent-red max-w-2xl transition-colors duration-300">
              <div className="flex items-start gap-2.5">
                <span className="text-2xl sm:text-3xl font-heading font-black text-accent-red select-none leading-none shrink-0 -mt-0.5">
                  “
                </span>
                <p className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 italic font-sans leading-relaxed flex-1">
                  {leader.quote}
                  <span className="text-2xl sm:text-3xl font-heading font-black text-accent-red select-none leading-none inline-block ml-1.5 align-baseline">
                    ”
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Bio Paragraphs */}
          <div className="space-y-4 max-w-2xl">
            {leader.bio.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm sm:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Meta: Experience + Expertise */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Experience */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Briefcase
                  size={15}
                  weight="bold"
                  className="text-accent-red"
                />
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">
                  Kinh nghiệm
                </span>
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {leader.experience}
              </p>
            </div>

            {/* Expertise */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Star size={15} weight="bold" className="text-accent-red" />
                <span className="font-mono text-[10.5px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">
                  Lĩnh vực chuyên môn
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {leader.expertise.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Content ─── */
export function LeadershipContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/about-us"
              className="inline-flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 hover:text-accent-red text-xs font-mono uppercase tracking-widest transition-colors duration-300 group cursor-pointer"
            >
              <ArrowLeft
                size={12}
                weight="bold"
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Giới thiệu
            </Link>
          </motion.div>

          {/* Title */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Buildings size={20} weight="bold" className="text-accent-red" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-accent-red font-bold">
                Trung tâm Đổi mới Sáng tạo Gia Lai
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white font-heading tracking-tighter leading-none">
              Đội ngũ lãnh đạo
            </h1>
            <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Những người dẫn dắt chiến lược đổi mới sáng tạo và chuyển đổi số
              cho tỉnh Gia Lai và khu vực Tây Nguyên.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
      </div>

      {/* Leadership Profiles */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {leaders.map((leader, index) => (
            <LeadershipCard
              key={leader.monogram}
              leader={leader}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300" />
      </div>

      {/* CTA Footer */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white font-heading">
                Tìm hiểu thêm về chúng tôi
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Khám phá tầm nhìn, sứ mệnh và hệ sinh thái đổi mới sáng tạo.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-red hover:text-accent-red/80 transition-colors duration-300 group cursor-pointer"
              >
                Về chúng tôi
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
