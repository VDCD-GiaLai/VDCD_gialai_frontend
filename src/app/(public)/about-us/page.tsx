"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMail,
  FiDatabase,
  FiMapPin,
  FiCpu,
  FiTrendingUp,
} from "react-icons/fi";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const stats = [
    { numericValue: 1500, suffix: "+", label: "Cán bộ nhân sự" },
    { numericValue: 250, suffix: "+", label: "Chuyên gia đầu ngành" },
    { numericValue: 10, suffix: "", label: "Công ty thành viên" },
    { numericValue: 12, suffix: "", label: "Trung tâm nghiên cứu" },
  ];

  const values = [
    {
      num: "01",
      title: "Tầm nhìn chiến lược",
      desc: "Trở thành đối tác công nghệ toàn diện và tin cậy hàng đầu Việt Nam, xây dựng một hệ sinh thái đổi mới sáng tạo vững chắc thúc đẩy chuyển đổi số sâu rộng cho cộng đồng và doanh nghiệp.",
    },
    {
      num: "02",
      title: "Sứ mệnh kiến tạo",
      desc: "Đồng hành cùng các địa phương và doanh nghiệp, chuyển hóa tri thức công nghệ cao thành các giải pháp thiết thực, tối ưu hóa nguồn lực và gia tăng giá trị kinh tế bền vững.",
    },
    {
      num: "03",
      title: "Giá trị cốt lõi",
      desc: "Không ngừng đổi mới sáng tạo, đặt chất lượng giải pháp làm trọng tâm, cam kết tính minh bạch tối đa và xây dựng mối quan hệ hợp tác đồng hành lâu dài cùng khách hàng.",
    },
  ];

  const activities = [
    {
      title: "Công nghệ số & Chuyển đổi số",
      desc: "Nghiên cứu phát triển và tích hợp các giải pháp trí tuệ nhân tạo (AI), Internet vạn vật (IoT), dữ liệu lớn (Big Data), điện toán đám mây (Cloud) và mô hình hóa thông tin số (Digital Twin) phục vụ tối ưu hóa vận hành.",
    },
    {
      title: "Khảo sát, Đo đạc & Số hóa bản đồ",
      desc: "Thành lập bản đồ địa hình và hiện trạng độ phân giải siêu cao sử dụng thiết bị bay không người lái (UAV/Drone). Số hóa cơ sở dữ liệu đất đai, lâm nghiệp và hạ tầng kỹ thuật chính xác.",
    },
    {
      title: "Giải pháp hạ tầng thông minh",
      desc: "Thiết kế, xây dựng và tích hợp hệ thống trung tâm điều hành thông minh (IOC/DOC), giải pháp đô thị thông minh (Smart City) và hệ thống giám sát tự động AutoTimelapse.",
    },
    {
      title: "Sản xuất & Chế tạo thiết bị công nghệ",
      desc: "Chế tạo các thiết bị robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái (Drone/UAV) chuyên dụng, camera AI thông minh và phần cứng IoT phục vụ đa lĩnh vực.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pt-28 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        {/* Navigation Breadcrumb */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest hover:text-accent-red transition-colors duration-300"
          >
            Trở lại Trang chủ
          </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 border-b border-zinc-100 dark:border-zinc-900 pb-16">
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Về chúng tôi
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white mb-6 leading-none font-heading uppercase">
              KIẾN TẠO TƯƠNG LAI SỐ
            </h1>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
              VDCD Group là hệ sinh thái công nghệ hàng đầu tại Việt Nam, tiên
              phong cung cấp các giải pháp đổi mới sáng tạo, chuyển đổi số toàn
              diện và chế tạo thiết bị công nghệ cao phục vụ phát triển kinh tế
              vùng bền vững.
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-whisper-border dark:border-zinc-800 shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/vdcd_about_hero.png"
              alt="Hệ sinh thái công nghệ VDCD"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </section>

        {/* Brand Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24 items-start">
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Hành trình phát triển
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading font-bold">
              Câu chuyện thương hiệu
            </h2>
          </motion.div>

          <motion.div
            className="lg:col-span-8 space-y-6 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p>
              Được thành lập từ năm 2006, **VDCD Group** khởi đầu hành trình từ
              những dự án trắc địa bản đồ truyền thống và nghiên cứu đo đạc địa
              lý cơ bản. Trải qua gần hai thập kỷ đổi mới sáng tạo liên tục,
              chúng tôi đã vươn mình mạnh mẽ để trở thành một tập đoàn công nghệ
              đa ngành, tích hợp chặt chẽ giữa phần cứng thông minh, phần mềm số
              hóa và hạ tầng lưu trữ đám mây.
            </p>
            <p>
              Với triết lý lấy đổi mới làm động lực, VDCD Group tự hào xây dựng
              một hệ sinh thái nghiên cứu và sản xuất vững mạnh gồm **10 công ty
              thành viên** và **12 viện, trung tâm nghiên cứu**. Chúng tôi cam
              kết đưa những thành tựu công nghệ 4.0 tiên tiến nhất—từ UAV tự
              động hóa, camera AI giám sát thông minh đến nền tảng AutoTimelapse
              và SmartScale—vào phục vụ phát triển kinh tế thực tiễn tại từng
              địa phương, đặc biệt tại khu vực Gia Lai và các tỉnh Tây Nguyên.
            </p>
            <p className="border-l-2 border-accent-red pl-4 italic text-black dark:text-white font-medium">
              “Chúng tôi không chỉ cung cấp dịch vụ công nghệ, chúng tôi đồng
              hành cùng khách hàng để kiến tạo nên những quy trình sản xuất
              thông minh hơn, quản lý hạ tầng minh bạch hơn và định vị tương lai
              số vững vàng hơn.”
            </p>
          </motion.div>
        </section>

        {/* Vision, Mission, Values Section */}
        <section id="vision" className="mb-24 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4 group hover:border-accent-red transition-colors duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase">
                    {v.num} / định hướng
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-black dark:text-white font-heading group-hover:text-accent-red transition-colors duration-300 font-bold">
                  {v.title}
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section
          id="stats"
          className="scroll-mt-28 mb-24 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/80 px-8 py-12 md:px-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left divide-y lg:divide-y-0 lg:divide-x divide-zinc-200 dark:divide-zinc-800">
            {stats.map((s, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-2 pt-6 lg:pt-0 lg:px-8 first:pt-0 first:border-0"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <span className="text-3xl md:text-5xl font-black text-black dark:text-white font-heading tracking-tight font-bold">
                  <AnimatedCounter target={s.numericValue} suffix={s.suffix} />
                </span>
                <span className="font-mono-label text-[10px] md:text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fields of Activity (Activities) - Premium Split-Row Style */}
        <section id="fields" className="scroll-mt-28 mb-24">
          <motion.div
            className="mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Hệ sinh thái giải pháp
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading font-bold">
              Lĩnh vực hoạt động
            </h2>
          </motion.div>

          <div className="mt-8 border-t border-zinc-100 dark:border-zinc-900/60">
            {activities.map((act, idx) => (
              <motion.div
                key={idx}
                className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-zinc-100 dark:border-zinc-900/60 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 px-4 md:px-6 -mx-4 md:-mx-6 transition-all duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {/* Left highlight bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                {/* Double-digit index */}
                <div className="md:col-span-1 flex items-start md:items-center">
                  <span className="font-mono text-base font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-accent-red transition-colors duration-300 font-bold">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4 flex items-start md:items-center">
                  <h4 className="text-base md:text-lg font-bold text-black dark:text-white tracking-tight leading-snug group-hover:text-accent-red transition-colors duration-300 font-heading font-bold">
                    {act.title}
                  </h4>
                </div>

                {/* Description */}
                <div className="md:col-span-7 flex items-start md:items-center">
                  <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                    {act.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Block */}
        <motion.section
          className="p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/80 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 font-heading font-bold">
            Cùng VDCD Group chuyển đổi số tương lai của bạn
          </h3>
          <p className="text-secondary dark:text-zinc-400 text-sm max-w-2xl mx-auto mb-8">
            Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ tối ưu
            nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa bàn tỉnh
            Gia Lai và Tây Nguyên.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:contact@vdcdgroup.vn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300"
            >
              Gửi email liên hệ <FiMail className="w-4 h-4" />
            </a>
            <Link
              href="/solution"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300"
            >
              Khám phá giải pháp <FiArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
