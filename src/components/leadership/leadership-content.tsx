"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Buildings,
  Briefcase,
  Star,
  CheckCircle,
  Quotes,
  Compass,
  Cpu,
  Sparkle,
  Calendar,
  GraduationCap,
  ShieldCheck,
  TrendUp,
  GlobeHemisphereWest,
  Users,
} from "@phosphor-icons/react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

/* ─── Profile Data from Google Docs ─── */
const leaderProfile = {
  name: "Ông Cao Quân Vũ",
  title: "Giám đốc Trung tâm Đổi mới Sáng tạo Gia Lai",
  role: "Phó Chủ tịch HĐQT kiêm Tổng Giám đốc VDCD Group / Giám đốc Trung tâm Đổi mới Sáng tạo Gia Lai",
  eyebrow: "LÃNH ĐẠO ĐIỀU HÀNH",
  avatarSrc: "/about-us/sep-cao-quan-vu.webp",
  birthYear: "1984",
  education: "Cử nhân Nghệ thuật (ĐH Mỹ thuật Công nghiệp Hà Nội)",
  experience: "15+ năm kinh nghiệm điều hành & công nghệ",
  projectScale: "Hơn 100 dự án thuộc hệ sinh thái VDCD",
  leadershipStyle: "Quyết liệt – Quyết đoán – Tiên phong – Bám sát thực tiễn",
  primaryQuote:
    "Công nghệ chỉ thực sự có giá trị khi giải quyết đúng vấn đề và mang lại lợi ích cụ thể cho con người.",
  secondaryQuote:
    "Chúng tôi không bắt đầu từ những điều quá cao siêu. Chúng tôi bắt đầu từ những khó khăn thực tế của người dân, cơ quan quản lý và doanh nghiệp, để đưa công nghệ vào giải quyết những vấn đề thiết thực và góp phần nâng cao chất lượng cuộc sống.",
  summary: [
    "Ông Cao Quân Vũ hiện đảm nhiệm vai trò Phó Chủ tịch kiêm Giám đốc Trung tâm Đổi mới Sáng tạo Gia Lai, đồng thời giữ các vị trí quản lý, điều hành tại GeoViet và hệ sinh thái VDCD Group.",
    "Với nền tảng kỹ thuật, tư duy sáng tạo cùng kinh nghiệm thực tiễn trong tổ chức triển khai dự án, ông tập trung đưa các công nghệ như UAV, trí tuệ nhân tạo, GIS, dữ liệu không gian và mô hình 2D/3D vào giải quyết những bài toán cụ thể trong đo đạc, địa chính, đất đai, tài nguyên và môi trường, phòng chống thiên tai và phát triển đô thị thông minh.",
  ],
  solutions12: [
    {
      title: "Bay quét & Đo đạc địa hình",
      desc: "Sử dụng thiết bị UAV độ chính xác cao thành lập bản đồ địa hình.",
    },
    {
      title: "Cơ sở dữ liệu đất đai & Địa chính",
      desc: "Xây dựng CSDL đất đai, đo đạc địa chính và số hóa bản đồ chuyên nghiệp.",
    },
    {
      title: "Mô hình hóa không gian 2D/3D",
      desc: "Số hóa hiện trạng công trình và tái hiện trực quan không gian số.",
    },
    {
      title: "Kiểm kê & Theo dõi diễn biến rừng",
      desc: "Ứng dụng ảnh viễn thám và UAV trong quản lý tài nguyên rừng bền vững.",
    },
    {
      title: "Giám sát sạt lở & Mô phỏng ngập lụt",
      desc: "Phân tích xói mòn và mô phỏng ngập lụt hỗ trợ phòng chống thiên tai.",
    },
    {
      title: "Nhận diện & Phân tích đồng ruộng",
      desc: "Ứng dụng AI kết hợp dữ liệu bay chụp giám sát sinh trưởng cây trồng.",
    },
    {
      title: "Tự động hóa giám sát Timelapse",
      desc: "Giám sát tiến độ thi công công trình liên tục và trực quan 24/7.",
    },
    {
      title: "Thực tế ảo VR360 tương tác",
      desc: "Quảng bá du lịch và quản lý không gian trải nghiệm số sống động.",
    },
    {
      title: "Cảnh báo sớm thiên tai bằng AI & Big Data",
      desc: "Tích hợp AI và dữ liệu lớn cảnh báo sạt lở, cháy rừng theo thời gian thực.",
    },
    {
      title: "Nền tảng quản lý đô thị thông minh",
      desc: "Xây dựng hệ thống IOC/DOC và quản lý tài nguyên cho chính quyền, doanh nghiệp.",
    },
    {
      title: "Tối ưu chuỗi cung ứng nông sản",
      desc: "Truy xuất nguồn gốc và minh bạch chuỗi giá trị nông nghiệp bằng dữ liệu số.",
    },
    {
      title: "Giám sát an ninh & Hạ tầng giao thông",
      desc: "Hệ thống quản lý thông minh phục vụ vận hành an toàn và tối ưu giao thông.",
    },
  ],
  sections: [
    {
      id: "journey",
      letter: "A",
      title: "Từ xuất phát điểm khó khăn đến niềm đam mê công nghệ",
      paragraphs: [
        "Sinh ra và lớn lên trong một gia đình thuần nông tại vùng đất giàu truyền thống nghệ thuật dân gian, tuổi thơ của ông Cao Quân Vũ gắn liền với những khó khăn của cuộc sống lao động nông nghiệp. Những trải nghiệm này giúp ông sớm hình thành sự đồng cảm sâu sắc với người lao động, đồng thời thôi thúc mong muốn tìm kiếm những giải pháp giúp giảm bớt sự vất vả của con người bằng công nghệ.",
        "Ngay từ khi còn là học sinh, ông đã thể hiện niềm đam mê đặc biệt với các thiết bị kỹ thuật, tự tìm hiểu về cơ chế hoạt động của máy móc và bắt đầu thử nghiệm những ý tưởng công nghệ đầu tiên. Tư duy tự học, tinh thần kiên trì và thói quen giải quyết vấn đề từ gốc rễ đã trở thành nền tảng quan trọng trong suốt quá trình học tập và phát triển sự nghiệp sau này.",
        "Từ những quan sát thực tế trong cuộc sống, ông sớm nhận ra rằng công nghệ không nên chỉ dừng lại ở các phòng thí nghiệm hay các tài liệu lý thuyết, mà phải trở thành công cụ thực tế, phục vụ trực tiếp đời sống con người, nâng cao hiệu quả lao động và hỗ trợ sự phát triển của xã hội.",
      ],
    },
    {
      id: "arts-tech",
      letter: "B",
      title: "Nền tảng kỹ thuật kết hợp tư duy nghệ thuật",
      paragraphs: [
        "Bên cạnh đam mê kỹ thuật, ông Cao Quân Vũ tốt nghiệp Cử nhân Nghệ thuật. Sự kết hợp giữa nền tảng kỹ thuật chính xác và tư duy nghệ thuật mang lại cho ông góc nhìn khác biệt trong việc phát triển các giải pháp công nghệ: công nghệ không chỉ cần chính xác về mặt kỹ thuật, mà còn cần trực quan, dễ tiếp cận và mang lại trải nghiệm tối ưu cho người sử dụng.",
        "Tư duy này được thể hiện rõ nét trong cách ông định hướng xây dựng các sản phẩm và giải pháp của hệ sinh thái VDCD: từ việc trực quan hóa dữ liệu đo đạc, số hóa không gian 2D/3D đến xây dựng các nền tảng quản lý thông minh cho các cơ quan, doanh nghiệp và địa phương.",
      ],
    },
    {
      id: "projects",
      letter: "D",
      title: "Điều phối hơn 100 dự án thuộc hệ sinh thái VDCD",
      paragraphs: [
        "Trong vai trò điều hành tại GeoViet và hệ sinh thái VDCD Group, ông Cao Quân Vũ đã trực tiếp chỉ đạo và điều phối hơn 100 dự án lớn nhỏ trên nhiều tỉnh thành trên cả nước.",
        "Các dự án do ông phụ trách bao gồm đo đạc bản đồ địa chính, số hóa cơ sở dữ liệu đất đai, bay quét hiện trạng rừng, mô phỏng nguy cơ thiên tai và xây dựng nền tảng quản lý không gian cho các cơ quan nhà nước, ban quản lý dự án và các tập đoàn lớn.",
        "Phong cách làm việc của ông là trực tiếp bám sát hiện trường, cùng đội ngũ kỹ thuật tháo gỡ khó khăn tại thực địa, đảm bảo các giải pháp khi đưa vào ứng dụng đều đáp ứng các tiêu chuẩn kỹ thuật khắt khe và phù hợp với điều kiện thực tế của từng địa phương.",
      ],
    },
    {
      id: "gialai-mission",
      letter: "E",
      title: "Vai trò tại Trung tâm Đổi mới Sáng tạo Gia Lai",
      paragraphs: [
        "Tại Trung tâm Đổi mới Sáng tạo Gia Lai, ông Cao Quân Vũ đảm nhiệm vai trò Phó Chủ tịch kiêm Giám đốc, chịu trách nhiệm định hướng chiến lược và tổ chức triển khai các hoạt động của Trung tâm.",
        "Ông tập trung xây dựng Trung tâm thành đầu mối kết nối giữa các cơ quan quản lý nhà nước, trường đại học, viện nghiên cứu, doanh nghiệp và các nhóm khởi nghiệp công nghệ, nhằm:",
      ],
      bullets: [
        "Thúc đẩy các chương trình nghiên cứu ứng dụng và chuyển giao công nghệ.",
        "Hỗ trợ doanh nghiệp địa phương tiếp cận các giải pháp chuyển đổi số thiết thực.",
        "Ươm tạo và đồng hành cùng các dự án khởi nghiệp đổi mới sáng tạo tiềm năng.",
        "Đào tạo và phát triển nguồn nhân lực công nghệ trẻ cho tỉnh Gia Lai và khu vực Tây Nguyên.",
      ],
      closing:
        "Ông chủ trương xây dựng các mô hình hợp tác thực chất, lấy hiệu quả ứng dụng làm thước đo cao nhất cho mọi hoạt động đổi mới sáng tạo.",
    },
    {
      id: "leadership-style",
      letter: "F",
      title: "Phong cách lãnh đạo quyết liệt và tiên phong",
      paragraphs: [
        "Trong công tác quản lý và điều hành, ông Cao Quân Vũ được biết đến là người lãnh đạo quyết liệt, quyết đoán, sẵn sàng dấn thân vào những bài toán mới và phức tạp. Ông đặc biệt coi trọng tính kỷ luật, sự chuẩn xác trong công việc và tinh thần trách nhiệm đối với từng sản phẩm, dịch vụ được cung cấp.",
        "Đồng thời, ông luôn tạo điều kiện cho các nhân sự trẻ phát huy sáng kiến, khuyến khích tinh thần dám nghĩ, dám làm và coi trọng việc đào tạo, bồi dưỡng thế hệ kế cận trong lĩnh vực công nghệ cao.",
        "Với ông Cao Quân Vũ, công nghệ không phải là mục tiêu cuối cùng, mà là phương tiện để tạo ra những thay đổi tích cực cho xã hội.",
      ],
    },
  ],
};

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

export function LeadershipContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-secondary transition-colors duration-300">
      {/* ─── Hero / Header ─── */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-10 sm:pb-12 bg-linear-to-b from-slate-50 to-white dark:from-zinc-900/60 dark:to-zinc-950 border-b border-whisper-border/50 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white font-heading tracking-tight leading-tight">
              Ban Lãnh Đạo Điều Hành
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              Những người dẫn dắt chiến lược đổi mới sáng tạo, phát triển hạ
              tầng dữ liệu số và đồng hành cùng tiến trình chuyển đổi số của
              tỉnh Gia Lai và khu vực Tây Nguyên.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Main Executive Dossier ─── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Executive Profile Card */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900/40 rounded-3xl p-6 sm:p-10 border border-whisper-border/60 dark:border-zinc-800 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Photo Column */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
                <div className="w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leaderProfile.avatarSrc}
                    alt={leaderProfile.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-semibold tracking-wide">
                      {leaderProfile.name}
                    </p>
                    <p className="text-xs text-white/80 font-mono">
                      {leaderProfile.title}
                    </p>
                  </div>
                </div>

                {/* Quick Info Tags */}
                <div className="w-full max-w-[320px] mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-whisper-border/40 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-accent-red mb-1">
                      <Calendar size={14} weight="bold" />
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                        Năm sinh
                      </span>
                    </div>
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                      {leaderProfile.birthYear}
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-whisper-border/40 dark:border-zinc-800">
                    <div className="flex items-center gap-1.5 text-accent-red mb-1">
                      <TrendUp size={14} weight="bold" />
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">
                        Quy mô
                      </span>
                    </div>
                    <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                      100+ dự án
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio & Details Column */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent-red font-bold block mb-2">
                    {leaderProfile.eyebrow}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight leading-tight">
                    {leaderProfile.name}
                  </h2>
                  <p className="text-base sm:text-lg text-accent-red/90 font-medium mt-1">
                    {leaderProfile.role}
                  </p>
                </div>

                {/* Primary Quote Box */}
                <div className="relative p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/60 border-l-4 border-accent-red rounded-r-2xl">
                  <Quotes
                    size={28}
                    weight="fill"
                    className="text-accent-red/40 mb-2"
                  />
                  <p className="text-base sm:text-lg text-zinc-800 dark:text-zinc-150 italic font-sans font-medium leading-relaxed">
                    “{leaderProfile.primaryQuote}”
                  </p>
                </div>

                {/* Summary Intro */}
                <div className="space-y-3 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {leaderProfile.summary.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Meta Attributes Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-whisper-border/60 dark:border-zinc-800">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-400 font-bold">
                      <GraduationCap size={15} className="text-accent-red" />
                      Nền tảng đào tạo
                    </span>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                      {leaderProfile.education}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-xs font-mono uppercase text-zinc-400 font-bold">
                      <ShieldCheck size={15} className="text-accent-red" />
                      Phong cách lãnh đạo
                    </span>
                    <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">
                      {leaderProfile.leadershipStyle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Section C: 12 Core Domains & Practical Solutions ── */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent-red text-white flex items-center justify-center font-bold text-sm">
                C
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white font-heading">
                  Đưa công nghệ vào giải quyết bài toán thực tiễn
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  12 lĩnh vực trọng điểm được ông Cao Quân Vũ trực tiếp chỉ đạo
                  xây dựng và chuyển giao giải pháp
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {leaderProfile.solutions12.map((sol, sIdx) => (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-whisper-border/60 dark:border-zinc-800/80 hover:border-accent-red/50 transition-all duration-300 shadow-2xs group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-accent-red">
                      <CheckCircle
                        size={18}
                        weight="fill"
                        className="shrink-0"
                      />
                      <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500">
                        {String(sIdx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white font-heading group-hover:text-accent-red transition-colors">
                      {sol.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-whisper-border/40 dark:border-zinc-800 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
              “Với ông, một giải pháp công nghệ hoàn chỉnh không chỉ dừng lại ở
              việc thu thập dữ liệu, mà phải đi qua toàn bộ quy trình: từ xử lý
              dữ liệu thô, phân tích chuyên sâu đến trực quan hóa và đưa ra các
              đề xuất, cảnh báo có giá trị thực tiễn cho công tác quản trị và ra
              quyết định.”
            </div>
          </motion.div>

          {/* ── Detailed Narrative Sections (A, B, D, E, F) ── */}
          <div className="space-y-12">
            {leaderProfile.sections.map((sec, secIdx) => (
              <motion.article
                key={sec.id}
                custom={secIdx + 4}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900/30 rounded-3xl p-6 sm:p-10 border border-whisper-border/60 dark:border-zinc-800 shadow-xs space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-sm">
                    {sec.letter}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white font-heading">
                    {sec.title}
                  </h3>
                </div>

                <div className="space-y-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed pl-2 sm:pl-11">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {/* Optional Bullets */}
                  {sec.bullets && (
                    <ul className="space-y-2 pt-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <CheckCircle
                            size={18}
                            weight="bold"
                            className="text-accent-red shrink-0 mt-0.5"
                          />
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.closing && (
                    <p className="pt-2 font-medium text-zinc-800 dark:text-zinc-200 italic">
                      {sec.closing}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Secondary Quote Feature */}
          <motion.div
            custom={10}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-linear-to-r from-accent-red/10 via-zinc-50 to-accent-red/5 dark:from-accent-red/15 dark:via-zinc-900 dark:to-accent-red/10 border border-accent-red/20 text-center space-y-4"
          >
            <Quotes
              size={36}
              weight="fill"
              className="text-accent-red mx-auto opacity-70"
            />
            <p className="text-base sm:text-xl font-heading font-medium text-zinc-900 dark:text-white max-w-3xl mx-auto italic leading-relaxed">
              “{leaderProfile.secondaryQuote}”
            </p>
            <p className="text-xs font-mono uppercase tracking-widest text-accent-red font-bold">
              — Ông Cao Quân Vũ, Giám đốc Trung tâm Đổi mới Sáng tạo Gia Lai
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Unified CTA Section ─── */}
      <CommonCtaSection
        badge="Đội ngũ dẫn dắt"
        title="KẾT NỐI VÀ HỢP TÁC CÙNG BAN LÃNH ĐẠO VDCD"
        description="Chúng tôi luôn chào đón các cơ hội hợp tác chiến lược, nghiên cứu chuyển giao công nghệ và đầu tư phát triển hệ sinh thái số."
        primaryButton={{
          label: "Liên hệ hợp tác",
          href: "/contact",
          icon: "envelope",
        }}
        secondaryButton={{
          label: "Tìm hiểu về VDCD",
          href: "/about-us",
          icon: "arrow-right",
        }}
        className="pb-16 pt-8"
      />
    </div>
  );
}
