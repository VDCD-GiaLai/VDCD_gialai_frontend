"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiMail,
  FiTarget,
  FiCompass,
  FiCpu,
  FiAward,
  FiShield,
  FiUsers,
  FiMap,
  FiActivity,
  FiSettings,
} from "react-icons/fi";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { PageHeroSplitBanner } from "@/components/ui/page-hero-split-banner";
import { Card } from "@/components/ui/card";

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

  const coreValues = [
    {
      icon: FiCpu,
      title: "Bản lĩnh Đổi mới",
      desc: "Không ngừng nghiên cứu các công nghệ mới, dũng cảm dấn thân và tiên phong chuyển hóa tri thức số vào đời sống thực tế.",
    },
    {
      icon: FiAward,
      title: "Khát vọng Chất lượng",
      desc: "Đặt độ chính xác và tính tối ưu làm thước đo tối thượng cho mỗi dự án bản đồ số, sản phẩm phần mềm hay thiết bị chế tạo.",
    },
    {
      icon: FiShield,
      title: "Cam kết Minh bạch",
      desc: "Cam kết trung thực tuyệt đối trong dữ liệu, minh bạch trong quy trình và giải pháp để tạo dựng niềm tin bền vững.",
    },
    {
      icon: FiUsers,
      title: "Trọn vẹn Đồng hành",
      desc: "Luôn đồng hành cùng địa phương, cộng đồng và doanh nghiệp trên suốt hành trình số hóa khó khăn và lâu dài.",
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

  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Banner split 50/50 */}
      <PageHeroSplitBanner pageKey="about" ariaLabel="Về chúng tôi" />

      {/* Main Section Padding increased for Premium spatial rhythm */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 pt-24 pb-32 space-y-36">
        {/* Brand Story Section - Editorial Split Layout */}
        <section
          id="brand-story"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start scroll-mt-28"
        >
          {/* Left Column: Heading & Quote Card */}
          <motion.div
            className="lg:col-span-5 space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="space-y-3">
              <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
                Lịch sử & Vị thế
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
                Từ thực địa núi rừng <br />
                <span className="text-accent-red">đến không gian số</span>
              </h2>
              <span className="font-mono text-[10px] md:text-xs text-zinc-400 dark:text-zinc-500 tracking-wider block pt-1">
                Giấy chứng nhận đăng ký kinh doanh số: 4101443823
              </span>
            </div>

            {/* Premium Quote Card - Minimalist edge styled */}
            <Card className="hover:scale-[1.01] hover:border-accent-red/25 transition-all duration-300">
              <p className="text-black dark:text-zinc-200 font-medium italic text-base md:text-lg leading-relaxed">
                “Chúng tôi mang theo tinh thần kiên cường của đất rừng Tây
                Nguyên và trí tuệ công nghệ hiện đại để cùng kiến tạo một tương
                lai số thịnh vượng, bắt đầu từ những giải pháp thực tế nhất cho
                cộng đồng.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-[1px] bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-xs font-bold font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-widest">
                  Ban Lãnh đạo VDCD Group
                </span>
              </div>
            </Card>
          </motion.div>

          {/* Right Column: Paragraphs */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Plain text representation without AI-ish bold words */}
            <div className="space-y-6 text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              <p>
                Hành trình của tập đoàn VDCD bắt đầu từ năm 2006, xuất phát từ
                những bước chân băng rừng lội suối để đo đạc địa lý và vẽ nên
                những tấm bản đồ thực địa đầu tiên. Chính những ngày tháng gắn
                bó với đất rừng Tây Nguyên đã nhen nhóm trong chúng tôi một khát
                vọng lớn lao hơn: Làm thế nào để đưa tri thức công nghệ cao về
                phục vụ và phát triển vùng đất này?
              </p>
              <p>
                Trải qua gần 20 năm kiên tâm đổi mới, những bản đồ giấy năm xưa
                nay đã được số hóa thành các mô hình Digital Twin (bản đồ số 3D)
                sống động; những thước đo truyền thống được thay thế bằng những
                phi đội UAV tự chủ làm chủ bầu trời. Chúng tôi tự hào kiến tạo
                một hệ sinh thái R&D khép kín, đưa các phát kiến công nghệ tiên
                tiến nhất từ phòng thí nghiệm ra thực địa, giúp tối ưu hóa nguồn
                lực tự nhiên, lâm nghiệp và hạ tầng đô thị. Từ cái nôi Gia Lai,
                VDCD đang vững vàng vươn tầm phục vụ các dự án trọng điểm trên
                toàn quốc.
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
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-black dark:text-white font-heading">
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

        {/* Vision & Mission Section - Asymmetrical Bento Grid */}
        <section id="vision" className="scroll-mt-28">
          <div className="mb-12">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Triết lý hoạt động
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-black dark:text-white font-heading">
              Tầm nhìn & Sứ mệnh
            </h2>
          </div>

          {/* Asymmetrical Bento Grid (7 columns Tầm nhìn + 5 columns Sứ mệnh) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Tầm nhìn Card (Lớn hơn - lg:col-span-7) */}
            <motion.div
              className="lg:col-span-7 relative p-8 md:p-10 bg-pure-surface dark:bg-zinc-900 border border-whisper-border rounded-2xl overflow-hidden shadow-xs group flex flex-col justify-between min-h-[300px] hover:border-accent-red/30 transition-all duration-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-accent-red/5 rounded-full blur-3xl group-hover:bg-accent-red/10 transition-colors duration-500" />
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red border border-accent-red/20">
                  <FiTarget className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold font-mono text-accent-red/70 tracking-widest uppercase font-heading">
                  Tầm nhìn
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight font-heading">
                  Kiến tạo thế giới số thông minh
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  Kiến tạo một thế giới số thông minh và minh bạch, nơi công
                  nghệ tiên tiến phục vụ cuộc sống con người, bảo tồn tài nguyên
                  thiên nhiên và rút ngắn khoảng cách phát triển giữa các vùng
                  miền.
                </p>
              </div>
            </motion.div>

            {/* Sứ mệnh Card (Nhỏ hơn - lg:col-span-5) */}
            <motion.div
              className="lg:col-span-5 relative p-8 md:p-10 bg-pure-surface dark:bg-zinc-900 border border-whisper-border rounded-2xl overflow-hidden shadow-xs group flex flex-col justify-between min-h-[300px] hover:border-accent-red/30 transition-all duration-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="absolute -right-16 -top-16 w-48 h-48 bg-accent-red/5 rounded-full blur-3xl group-hover:bg-accent-red/10 transition-colors duration-500" />
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-accent-red/10 rounded-xl text-accent-red border border-accent-red/20">
                  <FiCompass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold font-mono text-accent-red/70 tracking-widest uppercase font-heading">
                  Sứ mệnh
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight font-heading">
                  Khơi dậy tiềm năng vùng đất
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  Khơi dậy tiềm năng của mọi vùng đất bằng công nghệ hiện đại,
                  kết nối tri thức toàn cầu với sự am hiểu địa phương để giải
                  quyết những thách thức thực tế nhất.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Values Section - Structured Row Dividers instead of repetitive Bezel Boxes */}
          <div className="mt-20">
            <span className="font-mono-label text-[10px] md:text-xs font-bold text-secondary dark:text-zinc-500 uppercase tracking-widest block mb-8">
              Cam kết giá trị
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-10 border-t border-zinc-200 dark:border-zinc-800">
              {coreValues.map((val, idx) => {
                const IconComp = val.icon;
                return (
                  <motion.div
                    key={idx}
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                  >
                    <div className="p-2.5 bg-accent-red/5 rounded-lg w-fit text-accent-red border border-accent-red/10">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-black dark:text-white font-heading">
                      {val.title}
                    </h4>
                    <p className="text-secondary dark:text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fields of Activity (Activities) - Editorial Horizontal List (Cardless UI) */}
        <section id="fields" className="scroll-mt-28">
          <div className="mb-12">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Năng lực công nghệ
            </span>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-black dark:text-white font-heading">
              Lĩnh vực hoạt động chủ chốt
            </h2>
          </div>

          <div className="border-t border-zinc-200 dark:border-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-800/60 mt-8">
            {activities.map((act, idx) => {
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
                      {/* Monospace inline tech list */}
                      <p className="text-[10px] md:text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider pt-1.5 flex flex-wrap gap-x-2 gap-y-1">
                        <span className="text-accent-red/70">Tích hợp:</span>
                        {act.techKeywords.map((tag, tagIdx) => (
                          <React.Fragment key={tagIdx}>
                            <span>{tag}</span>
                            {tagIdx < act.techKeywords.length - 1 && (
                              <span className="text-zinc-300 dark:text-zinc-800">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* Right part: clean hover arrow */}
                  <div className="flex items-center justify-end shrink-0 pl-12 md:pl-0">
                    <div className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-accent-red group-hover:text-accent-red group-hover:rotate-45 transition-all duration-300 shrink-0">
                      <FiArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
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
