"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiTarget,
  FiCompass,
  FiCpu,
  FiAward,
  FiGlobe,
  FiShield,
  FiMap,
  FiActivity,
  FiSettings,
  FiLayers,
  FiDatabase,
  FiMessageCircle,
} from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";
import {
  fetchOperationFieldsFromApi,
  type OperationFieldItem,
} from "@/services/operation-field.service";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);
  const [operationFields, setOperationFields] = useState<OperationFieldItem[]>(
    [],
  );

  useEffect(() => {
    fetchOrganizationInfoFromApi().then(setOrgInfo);
    fetchOperationFieldsFromApi().then(setOperationFields);
  }, []);

  const philosophyItems = [
    {
      title: "01. SỨ MỆNH",
      desc: "Thúc đẩy đổi mới sáng tạo, chuyển đổi số và phát triển bền vững cho tỉnh Gia Lai và khu vực Tây Nguyên.",
      icon: FiGlobe,
    },
    {
      title: "02. TẦM NHÌN",
      desc: "Trở thành trung tâm đổi mới sáng tạo hàng đầu khu vực Tây Nguyên vào năm 2030.",
      icon: FiTarget,
    },
    {
      title: "03. GIÁ TRỊ CỐT LÕI",
      desc: "Sáng tạo – Chính trực – Hợp tác – Tác động",
      icon: FiShield,
    },
  ];

  const statsItems = [
    { label: "Nhân sự", value: 1500, suffix: "+" },
    { label: "Chuyên gia", value: 250, suffix: "+" },
    { label: "Tỉnh thành", value: 30, suffix: "" },
    { label: "Trung tâm", value: 12, suffix: "" },
    { label: "Công ty thành viên", value: 10, suffix: "" },
    { label: "Dự án", value: 100, suffix: "+" },
  ];

  const inheritedCapacities = [
    {
      title: "Khảo sát chuyên sâu",
      desc: "Ứng dụng các thiết bị bay không người lái (UAV/Drone) và quét LiDAR để đo đạc bản đồ địa hình chuyên nghiệp.",
      icon: FiMap,
    },
    {
      title: "Dữ liệu không gian",
      desc: "Xây dựng hệ thống cơ sở dữ liệu GIS và mô hình bản đồ số 3D (Digital Twin/3DG Platform) trực quan.",
      icon: FiLayers,
    },
    {
      title: "Trí tuệ nhân tạo",
      desc: "Tích hợp phân tích dữ liệu lớn và AI để tự động hóa giám sát hiện trường (AutoTimelapse) thông minh.",
      icon: FiCpu,
    },
    {
      title: "Thông tin công trình",
      desc: "Nghiên cứu và triển khai mô hình thông tin công trình (BIM) hỗ trợ đắc lực cho quy hoạch hạ tầng.",
      icon: FiSettings,
    },
    {
      title: "Hạ tầng dữ liệu",
      desc: "Xây dựng nền tảng đám mây và hệ thống cơ sở dữ liệu lớn đáp ứng các yêu cầu bảo mật cao nhất.",
      icon: FiDatabase,
    },
    {
      title: "Phần mềm quản lý",
      desc: "Thiết kế và lập trình các ứng dụng SaaS chuyên dụng hỗ trợ quản trị và vận hành doanh nghiệp hiệu quả.",
      icon: FiActivity,
    },
  ];

  const developmentOrientations = [
    {
      step: "01",
      title: "Phát triển Hạ tầng",
      desc: "Phát triển hạ tầng dữ liệu và công nghệ dùng chung làm bệ phóng vững chắc cho chuyển đổi số toàn diện.",
    },
    {
      step: "02",
      title: "Kinh tế Chủ lực",
      desc: "Thúc đẩy ứng dụng công nghệ số trong các ngành kinh tế chủ lực tại Gia Lai và khu vực Tây Nguyên.",
    },
    {
      step: "03",
      title: "Ươm mầm Đổi mới",
      desc: "Hỗ trợ các startup và doanh nghiệp địa phương tối ưu hóa vận hành, chuyển đổi mô hình hoạt động hiệu quả.",
    },
    {
      step: "04",
      title: "Kết nối Nguồn lực",
      desc: "Kết nối Gia Lai với mạng lưới chuyên gia quốc tế, chuyển giao công nghệ và thu hút các quỹ đầu tư tiềm năng.",
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const timelineMilestones = [
    {
      year: 2006,
      title: "Khởi Đầu Hành Trình",
      tagline: "Đặt viên gạch đầu tiên tại Tây Nguyên",
      desc: "Khởi nghiệp từ những dự án trắc địa bản đồ và khảo sát địa lý truyền thống. Những kỹ sư đầu tiên của VDCD đã đặt chân đến các vùng rừng núi hiểm trở của Gia Lai và Tây Nguyên để thu thập dữ liệu thực địa, xây dựng nền móng dữ liệu địa lý đầu tiên.",
    },
    {
      year: 2015,
      title: "Bứt Phá Số Hóa & GIS",
      tagline: "Làm chủ không gian dữ liệu",
      desc: "Chuyển dịch chiến lược mạnh mẽ sang công nghệ bản đồ số, ứng dụng sâu rộng hệ thống thông tin địa lý (GIS), viễn thám và số hóa dữ liệu hạ tầng quy mô lớn. Bắt đầu phát triển các phần mềm chuyên dụng giải quyết bài toán địa chính địa phương.",
    },
    {
      year: 2026,
      title: "Hệ Sinh Thái Đa Ngành",
      tagline: "Vươn mình dẫn đầu công nghệ số",
      desc: "Trở thành Tập đoàn công nghệ đa ngành tích hợp phần cứng thông minh và hạ tầng đám mây. Làm chủ công nghệ thiết bị bay không người lái (UAV) tự chủ, hệ thống trí tuệ nhân tạo (AI), nền tảng Bản đồ 3D tương tác (Digital Twin) và các hệ thống IOC điều hành đô thị hiện đại.",
    },
  ];

  const activities = [
    {
      title: "Công nghệ số & Chuyển đổi số",
      desc: "Lập mô hình dữ liệu không gian 3D thời gian thực thông qua nền tảng số 3DG Platform. Tích hợp phân tích dữ liệu lớn và AI để tối ưu hóa quản trị hạ tầng, vận hành đô thị thông minh.",
      icon: FiCpu,
      techKeywords: [
        "Digital Twin",
        "3DG Platform",
        "AI Analytics",
        "Cloud Infra",
      ],
    },
    {
      title: "Khảo sát, Đo đạc & Số hóa bản đồ",
      desc: "Bay quét LiDAR và khảo sát trắc địa chuyên sâu bằng UAV để thành lập bản đồ địa hình tỷ lệ lớn (1/500). Số hóa đồng bộ cơ sở dữ liệu địa chính, hạ tầng kỹ thuật và lâm nghiệp Tây Nguyên.",
      icon: FiMap,
      techKeywords: [
        "UAV Mapping",
        "GIS Integration",
        "Remote Sensing",
        "Forest Digitization",
      ],
    },
    {
      title: "Hạ tầng & Điều hành thông minh",
      desc: "Tích hợp và xây dựng trung tâm điều hành thông minh (IOC/DOC) hỗ trợ ra quyết định. Giám sát tự động tiến độ công trình xây dựng và biến động hiện trường thông qua hệ thống AutoTimelapse.",
      icon: FiActivity,
      techKeywords: [
        "IOC/DOC",
        "AutoTimelapse",
        "Smart City",
        "Process Automation",
      ],
    },
    {
      title: "Nghiên cứu, Sản xuất & Chế tạo phần cứng",
      desc: "Nghiên cứu chế tạo robot công nghiệp, lắp ráp các hệ thống thiết bị bay không người lái chuyên dụng, camera thông minh tích hợp AI và phần cứng IoT điều khiển tự chủ công nghệ.",
      icon: FiSettings,
      techKeywords: [
        "Robotics",
        "Industrial Drone",
        "AI Camera",
        "IoT Hardware",
      ],
    },
  ];

  // 1. Triết lý hoạt động (Sứ mệnh, Tầm nhìn, Giá trị cốt lõi)
  const dynamicPhilosophy = [
    {
      title: "01. SỨ MỆNH",
      desc: orgInfo?.mission || philosophyItems[0].desc,
      icon: FiGlobe,
    },
    {
      title: "02. TẦM NHÌN",
      desc: orgInfo?.vision || philosophyItems[1].desc,
      icon: FiTarget,
    },
    {
      title: "03. GIÁ TRỊ CỐT LÕI",
      desc: orgInfo?.coreValues || philosophyItems[2].desc,
      icon: FiShield,
    },
  ];

  // 2. Mạng lưới & Thống kê
  const dynamicStats = [
    { label: "Nhân sự", value: orgInfo?.stats?.staff ?? 1500, suffix: "+" },
    { label: "Chuyên gia", value: orgInfo?.stats?.experts ?? 250, suffix: "+" },
    { label: "Tỉnh thành", value: orgInfo?.stats?.provinces ?? 30, suffix: "" },
    { label: "Trung tâm", value: orgInfo?.stats?.centers ?? 12, suffix: "" },
    {
      label: "Công ty thành viên",
      value: orgInfo?.stats?.subsidiaries ?? 10,
      suffix: "",
    },
    { label: "Dự án", value: orgInfo?.stats?.projects ?? 100, suffix: "+" },
  ];

  // 3. Lĩnh vực hoạt động chủ chốt (Lấy từ Operation Fields API chuyên biệt)
  const defaultIcons = [
    FiCpu,
    FiMap,
    FiActivity,
    FiSettings,
    FiGlobe,
    FiLayers,
  ];
  const dynamicActivities =
    operationFields && operationFields.length > 0
      ? operationFields.map((field, idx) => {
          const iconMap: Record<string, any> = {
            FiCpu,
            FiMap,
            FiActivity,
            FiSettings,
            FiGlobe,
            FiLayers,
          };
          const icon =
            (field.icon && iconMap[field.icon]) ||
            defaultIcons[idx % defaultIcons.length];
          return {
            title: field.name,
            desc: field.shortDescription || "",
            icon,
            techKeywords: [] as string[],
          };
        })
      : activities;

  // 4. Nền tảng vững chắc (Năng lực kế thừa từ hệ sinh thái VDCD)
  const dynamicEcosystemDesc =
    orgInfo?.ecosystemCapabilities ||
    "Trung tâm kế thừa năng lực công nghệ vượt trội, đội ngũ chuyên gia hàng đầu và mạng lưới triển khai rộng khắp của hệ sinh thái VDCD Group trong các dự án thực tế trên toàn quốc.";

  // 5. Định hướng phát triển
  const dynamicOrientations =
    orgInfo?.developmentOrientations &&
    orgInfo.developmentOrientations.length > 0
      ? orgInfo.developmentOrientations.map((item, idx) => ({
          step: (idx + 1).toString().padStart(2, "0"),
          title: item.title,
          desc: item.description || "",
        }))
      : developmentOrientations;

  // 6. Kênh truyền thông & Mạng xã hội
  const dynamicSocialChannels = [
    {
      name: "Facebook",
      subLabel: "Theo dõi hoạt động, sự kiện công nghệ",
      icon: FaFacebookF,
      url:
        orgInfo?.socialLinks?.facebook || "https://www.facebook.com/vdcdgroup",
    },
    {
      name: "Zalo OA",
      subLabel: "Kết nối trực tiếp với đội ngũ hỗ trợ",
      icon: SiZalo,
      url: orgInfo?.socialLinks?.zalo || "https://zalo.me/vdcdgroup",
    },
    {
      name: "TikTok",
      subLabel: "Xem video xu hướng, giải pháp thực địa",
      icon: FaTiktok,
      url: orgInfo?.socialLinks?.tiktok || "https://www.tiktok.com/@vdcdgroup",
    },
    {
      name: "Messenger",
      subLabel: "Trao đổi & nhận tư vấn giải pháp 24/7",
      icon: FiMessageCircle,
      url: orgInfo?.socialLinks?.messenger || "https://m.me/vdcdgroup",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Tiêu đề trang tối giản */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-36 pb-6">
        <nav className="text-xs font-mono-label text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
          <Link href="/" className="hover:text-accent-red transition-colors">
            Trang chủ
          </Link>
          <span className="mx-2 text-zinc-300 dark:text-zinc-800">/</span>
          <span className="text-zinc-600 dark:text-zinc-400">Về chúng tôi</span>
        </nav>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-black dark:text-white font-heading uppercase leading-none">
          Về chúng tôi
        </h1>
      </div>

      {/* Main Section Padding increased for Premium spatial rhythm */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-6 pb-32 space-y-36">
        {/* Khối 1 – Giới thiệu chung */}
        <section
          id="introduction"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-28"
        >
          {/* Cột trái: Hình ảnh */}
          <motion.div
            className="lg:col-span-6 relative aspect-[16/10] md:aspect-[4/3] w-full overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Image
              src="/about-us/3A5A2610.JPG"
              alt="Trung tâm Đổi mới Sáng tạo Gia Lai"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-w-1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Cột phải: Nội dung văn bản */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="space-y-2.5">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                {orgInfo?.name || "Trung tâm Đổi mới Sáng tạo Gia Lai"}
              </h2>
              <p className="text-xs md:text-sm font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Giấy chứng nhận đăng ký kinh doanh số:{" "}
                {orgInfo?.businessLicenseNo || "4101443823"}
              </p>
            </div>

            <div className="space-y-5 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              <p>
                {orgInfo?.description ||
                  "Trung tâm Đổi mới Sáng tạo Gia Lai, là mô hình xã hội hóa do doanh nghiệp đầu tư và vận hành. Trung tâm được hình thành nhằm kết nối nguồn lực công nghệ, chuyên gia, doanh nghiệp và dữ liệu; thúc đẩy ứng dụng công nghệ, chuyển đổi số và phát triển hệ sinh thái khởi nghiệp sáng tạo tại địa phương."}
              </p>
              <p>
                Với định hướng lấy nhu cầu thực tiễn làm trung tâm, Trung tâm
                không chỉ là không gian kết nối mà còn trực tiếp đồng hành trong
                quá trình tư vấn, thử nghiệm, đào tạo, chuyển giao và triển khai
                công nghệ.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Timeline Section - Redesigned as a continuous vertical journey for richer content display */}
        <section id="history-timeline" className="scroll-mt-28">
          <div className="mb-16">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Hành trình phát triển
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Các mốc lịch sử quan trọng
            </h2>
          </div>

          <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-8 space-y-16 py-2">
            {timelineMilestones.map((item, idx) => (
              <motion.div
                key={item.year}
                className="relative pl-8 md:pl-12 group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-0 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full bg-canvas-white dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-accent-red transition-colors duration-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-accent-red transition-colors duration-300" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
                  {/* Left: Year & Title info */}
                  <div className="lg:col-span-4">
                    <span className="text-3xl md:text-5xl font-black font-heading tracking-tight text-zinc-300 dark:text-zinc-800 group-hover:text-accent-red/20 transition-colors duration-300 leading-none block mb-2">
                      {item.year}
                    </span>
                    <h4 className="text-base md:text-lg font-bold text-black dark:text-white font-heading leading-tight">
                      {item.title}
                    </h4>
                    <span className="text-xs font-bold font-mono text-accent-red uppercase tracking-wider block mt-1">
                      {item.tagline}
                    </span>
                  </div>

                  {/* Right: Description text */}
                  <div className="lg:col-span-8">
                    <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Vision, Mission & Core Values Section - 3-Column Grid Layout */}
        <section id="vision" className="scroll-mt-28">
          <div className="mb-12">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Triết lý hoạt động
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Tầm nhìn · Sứ mệnh · Giá trị cốt lõi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
            {dynamicPhilosophy.map((item, idx) => {
              const IconComp = item.icon;

              return (
                <motion.div
                  key={idx}
                  className="group relative p-8 md:p-10 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-none shadow-xs hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col justify-between select-none cursor-pointer overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  {/* ── Animated border — draws clockwise on hover ── */}
                  <span
                    className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40
                                   group-hover:w-full transition-[width] duration-[200ms] ease-linear"
                  />
                  <span
                    className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40
                                   group-hover:h-full transition-[height] duration-[200ms] ease-linear group-hover:[transition-delay:200ms]"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40
                                   group-hover:w-full transition-[width] duration-[200ms] ease-linear group-hover:[transition-delay:400ms]"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40
                                   group-hover:h-full transition-[height] duration-[200ms] ease-linear group-hover:[transition-delay:600ms]"
                  />

                  {/* Top: Icon container */}
                  <div className="flex items-center justify-start mb-8">
                    <div className="p-3 rounded-full bg-accent-red/5 text-accent-red border border-accent-red/10 flex items-center justify-center shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content space */}
                  <div className="space-y-4 flex-grow flex flex-col justify-start">
                    <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] dark:text-white tracking-tight font-heading leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[#334155] dark:text-zinc-300 text-base md:text-[17px] leading-[1.65] pt-2">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Network & Statistics Section (Replicating Home Page Style: Chỉ số phát triển hệ sinh thái qua các con số) */}
        <section
          id="stats"
          className="border-t border-b border-zinc-200/50 dark:border-zinc-800/50 py-16 scroll-mt-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial intro */}
            <div className="lg:col-span-4 space-y-4">
              <span className="font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase block">
                Chỉ số phát triển
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                Hệ sinh thái qua các con số
              </h2>
              <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                Nền tảng năng lực thực chất của VDCD Group được xây dựng bền bỉ
                qua từng dự án thực tế trên toàn quốc.
              </p>
            </div>

            {/* Right: Scorecard Grid with fine borders and inner paddings */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
              {/* Stat 1: Personnel */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 space-y-3">
                <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                  <AnimatedCounter
                    target={orgInfo?.stats?.staff ?? 1500}
                    suffix="+"
                  />
                </div>
                <div>
                  <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                    Cán bộ, Nhân sự
                  </span>
                  <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                    Đội ngũ nhân lực vững chuyên môn hoạt động trên toàn quốc.
                  </p>
                </div>
              </div>

              {/* Stat 2: R&D Centers */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 space-y-3">
                <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                  <AnimatedCounter
                    target={orgInfo?.stats?.centers ?? 12}
                    suffix=""
                  />
                </div>
                <div>
                  <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                    Viện & Trung Tâm R&D
                  </span>
                  <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                    Hệ thống đơn vị nghiên cứu phát triển công nghệ chuyên sâu.
                  </p>
                </div>
              </div>

              {/* Stat 3: Tech Experts */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 space-y-3">
                <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                  <AnimatedCounter
                    target={orgInfo?.stats?.experts ?? 250}
                    suffix="+"
                  />
                </div>
                <div>
                  <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                    Chuyên Gia & Kỹ Sư
                  </span>
                  <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                    Nhân lực chất lượng cao, các thạc sĩ, tiến sĩ R&D phần cứng
                    và phần mềm.
                  </p>
                </div>
              </div>

              {/* Stat 4: Projects / Scale */}
              <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 space-y-3">
                <div className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter font-heading tabular-nums leading-none">
                  <AnimatedCounter
                    target={orgInfo?.stats?.projects ?? 100}
                    suffix="+"
                  />
                </div>
                <div>
                  <span className="font-mono-label text-[10px] md:text-xs font-bold text-accent-red uppercase tracking-widest block">
                    Dự án triển khai
                  </span>
                  <p className="text-xs text-secondary dark:text-zinc-500 mt-1 leading-snug">
                    Hàng trăm dự án chuyển đổi số và công nghệ quy mô lớn trên
                    toàn quốc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fields of Activity (Activities) - Editorial Horizontal List (Cardless UI) */}
        <section id="fields" className="scroll-mt-28">
          <div className="mb-12">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Năng lực công nghệ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Lĩnh vực hoạt động chủ chốt
            </h2>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800/60 mt-8">
            {dynamicActivities.map((act, idx) => {
              const IconComp = act.icon;
              return (
                <motion.div
                  key={idx}
                  className="py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group transition-all duration-300 relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                >
                  {/* Left part: Index, Icon, Title, Desc & Tags (inline) */}
                  <div className="flex items-start gap-4 md:gap-6 max-w-4xl">
                    {/* Index */}
                    <span className="font-mono text-3xl md:text-4xl font-black text-zinc-300 dark:text-zinc-800 group-hover:text-accent-red transition-colors duration-300 leading-none shrink-0 pt-1">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>

                    {/* Icon container */}
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-400 group-hover:text-accent-red group-hover:bg-accent-red/5 group-hover:border-accent-red/10 rounded-xl transition-all duration-300 shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>

                    {/* Text Block */}
                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-bold text-black dark:text-white group-hover:text-accent-red transition-colors duration-300 font-heading leading-snug">
                        {act.title}
                      </h3>
                      <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Inherited Capacity Section (Block 5) */}
        <section id="inheritance" className="scroll-mt-28">
          {/* Header block (full-width, max-w-3xl for optimal line width) */}
          <div className="mb-12 text-left max-w-3xl">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Nền tảng vững chắc
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight mb-4">
              Kế thừa sức mạnh từ hệ sinh thái VDCD Group
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-base leading-relaxed pt-1">
              {dynamicEcosystemDesc}
            </p>
          </div>

          {/* 3-column grid of capacities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {inheritedCapacities.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="group relative p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-none shadow-xs hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col justify-start select-none cursor-pointer overflow-hidden"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  {/* Clockwise drawing border lines */}
                  <span className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear" />
                  <span className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear group-hover:[transition-delay:150ms]" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear group-hover:[transition-delay:300ms]" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear group-hover:[transition-delay:450ms]" />

                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2.5 rounded-full bg-accent-red/5 text-accent-red border border-accent-red/10 flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[#0F172A] dark:text-white tracking-tight font-heading">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Development Orientation Section (Block 6) */}
        <section id="orientation" className="scroll-mt-28">
          <div className="mb-12 text-left">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Tầm nhìn tương lai
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
              Định hướng phát triển trọng tâm
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch w-full">
            {dynamicOrientations.map((item, idx) => (
              <motion.div
                key={idx}
                className="group relative p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-none shadow-xs hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out hover:-translate-y-1 flex flex-col justify-between select-none cursor-pointer overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {/* Clockwise drawing border lines */}
                <span className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear" />
                <span className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear group-hover:[transition-delay:150ms]" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear group-hover:[transition-delay:300ms]" />
                <span className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear group-hover:[transition-delay:450ms]" />

                {/* Top index and label */}
                <div className="flex items-center justify-between mb-8">
                  <div className="px-2.5 py-1 text-xs font-mono font-bold text-accent-red bg-accent-red/5 border border-accent-red/10 select-none">
                    {item.step}
                  </div>
                </div>

                {/* Content space */}
                <div className="space-y-3 flex-grow flex flex-col justify-start">
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] dark:text-white tracking-tight font-heading leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Media Contact Grid Section */}
        <section id="social-connect" className="scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
                Kết nối cộng đồng
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                Kênh truyền thông & Mạng xã hội
              </h2>
            </div>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base max-w-md leading-relaxed">
              Theo dõi chúng tôi trên các nền tảng mạng xã hội để cập nhật tin
              tức công nghệ và các giải pháp đổi mới sáng tạo mới nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dynamicSocialChannels.map((chan, idx) => {
              const IconComp = chan.icon;
              return (
                <motion.a
                  key={idx}
                  href={chan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 flex items-center justify-between select-none cursor-pointer overflow-hidden rounded-none"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  {/* Clockwise drawing border lines */}
                  <span className="pointer-events-none absolute top-0 left-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear" />
                  <span className="pointer-events-none absolute top-0 right-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear delay-[150ms] group-hover:delay-[150ms]" />
                  <span className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-0 bg-accent-red z-40 group-hover:w-full transition-[width] duration-[150ms] ease-linear delay-[300ms] group-hover:delay-[300ms]" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-[1px] h-0 bg-accent-red z-40 group-hover:h-full transition-[height] duration-[150ms] ease-linear delay-[450ms] group-hover:delay-[450ms]" />

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-zinc-800/80 flex items-center justify-center text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/5 group-hover:text-accent-red border border-slate-200/20 dark:border-zinc-800/20 transition-all duration-300 shrink-0">
                      <IconComp className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm md:text-base text-black dark:text-white transition-colors duration-300">
                        {chan.name}
                      </h4>
                      <p className="text-[11px] md:text-xs text-slate-500 dark:text-zinc-500 leading-normal mt-0.5 max-w-[180px]">
                        {chan.subLabel}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full border border-slate-200/60 dark:border-zinc-800/40 flex items-center justify-center text-slate-400 group-hover:border-accent-red group-hover:text-accent-red group-hover:rotate-45 transition-all duration-300 shrink-0">
                    <FiArrowUpRight className="w-4 h-4" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* CTA Block matching Nested CTA & "Island" Button Architecture */}
        <motion.section
          className="relative text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Card className="hover:border-accent-red/20 transition-all duration-500">
            <div className="p-8 md:p-16 space-y-6 relative overflow-hidden">
              <div className="absolute -right-24 -bottom-24 w-72 h-72 bg-gradient-to-br from-accent-red/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white font-heading leading-tight">
                Cùng VDCD Group chuyển đổi số tương lai của bạn
              </h3>
              <p className="text-secondary dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4">
                Hãy liên hệ với chúng tôi để thiết kế các giải pháp công nghệ
                tối ưu nhất dành riêng cho doanh nghiệp, cơ quan của bạn tại địa
                bàn tỉnh Gia Lai và Tây Nguyên.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4 relative z-10">
                {/* Button-in-Button Trailing Icon for mail */}
                <a
                  href="mailto:contact@vdcdgroup.vn"
                  className="inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300 rounded-lg shadow-lg hover:shadow-accent-red/20 group"
                >
                  Gửi email liên hệ
                  <span className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center text-inherit group-hover:bg-white/20 transition-colors">
                    <FiMail className="w-4 h-4" />
                  </span>
                </a>

                {/* Button-in-Button Trailing Icon for arrow */}
                <Link
                  href="/solution"
                  className="inline-flex items-center gap-3 pl-6 pr-4 py-3 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-mono-label text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red transition-all duration-300 rounded-lg backdrop-blur-sm group"
                >
                  Khám phá giải pháp
                  <span className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/15 flex items-center justify-center text-inherit group-hover:bg-accent-red/10 transition-colors">
                    <FiArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
