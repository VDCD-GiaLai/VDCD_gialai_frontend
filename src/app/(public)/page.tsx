"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiMapPin,
  FiMail,
  FiCheckCircle,
  FiClock,
  FiGlobe,
  FiDatabase,
  FiServer,
  FiCpu,
  FiLayers,
  FiShield,
  FiCheck,
  FiSend,
  FiTerminal,
  FiActivity,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GsapHero } from "@/components/landing/gsap-hero";
import { VietnamMapSection } from "@/components/landing/vietnam-map-section";

export default function LandingPage() {
  const [copiedEmail, setCopiedEmail] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@vdcdgroup.vn");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full bg-canvas-white dark:bg-zinc-100 transition-colors duration-300">
      <GsapHero />

      {/* Introduction Section - Redesigned based on Taito.ai layout */}
      <section
        id="about"
        className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          {/* Header Zone */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
                Hệ sinh thái Đổi mới sáng tạo
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-3xl">
                Cầu nối vững chắc trong Hệ sinh thái Đổi mới sáng tạo
              </h2>
            </motion.div>
            <motion.div
              className="lg:col-span-4 lg:pt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              <p className="text-secondary dark:text-zinc-400 text-body-md mb-6 leading-relaxed">
                Chúng tôi cung cấp các giải pháp toàn diện từ tư vấn chiến lược,
                triển khai hạ tầng đến chuyển giao công nghệ, giúp doanh nghiệp
                tối ưu vận hành và bứt phá tăng trưởng trong kỷ nguyên số.
              </p>
              <a
                href="#"
                className="text-accent-red font-bold font-mono-label text-xs uppercase tracking-widest hover:opacity-80 inline-flex items-center gap-2 transition-all hover:translate-x-1"
              >
                Xem Hồ sơ năng lực <FiArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Bento/Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Card 1: Hạ tầng công nghệ toàn diện */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="h-80 relative rounded-none overflow-hidden bg-slate-50 dark:bg-zinc-900/60 border border-whisper-border dark:border-zinc-800 flex items-center justify-center p-6 select-none shadow-xs group">
                {/* Background Image (no rounding) */}
                <div className="absolute inset-0 opacity-90 dark:opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none">
                  <Image
                    src="/images/home/innovation_center.png"
                    alt="Hạ tầng công nghệ"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Outer connecting circles */}
                  <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-zinc-200 dark:border-zinc-800/80 animate-spin [animation-duration:40s]" />

                  {/* Central Node */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-white dark:bg-zinc-950 border-2 border-accent-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <FiDatabase className="w-5 h-5 text-accent-red animate-pulse" />
                    <span className="absolute -inset-2 rounded-full border border-accent-red/30 animate-ping [animation-duration:3s]" />
                  </div>

                  {/* Connected Nodes */}
                  {/* Top Left */}
                  <div className="absolute -translate-x-16 -translate-y-16 w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-md hover:border-accent-red dark:hover:border-accent-red transition-colors duration-300">
                    <FiGlobe className="w-5 h-5 text-secondary dark:text-zinc-400" />
                  </div>
                  {/* Top Right */}
                  <div className="absolute translate-x-16 -translate-y-16 w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-md hover:border-accent-red dark:hover:border-accent-red transition-colors duration-300">
                    <FiCpu className="w-5 h-5 text-secondary dark:text-zinc-400" />
                  </div>
                  {/* Bottom Left */}
                  <div className="absolute -translate-x-16 translate-y-16 w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-md hover:border-accent-red dark:hover:border-accent-red transition-colors duration-300">
                    <FiLayers className="w-5 h-5 text-secondary dark:text-zinc-400" />
                  </div>
                  {/* Bottom Right */}
                  <div className="absolute translate-x-16 translate-y-16 w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-md hover:border-accent-red dark:hover:border-accent-red transition-colors duration-300">
                    <FiServer className="w-5 h-5 text-secondary dark:text-zinc-400" />
                  </div>

                  {/* SVG Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-zinc-200 dark:stroke-zinc-800/80 stroke-[1.5] fill-none">
                    <line
                      x1="50%"
                      y1="50%"
                      x2="calc(50% - 64px)"
                      y2="calc(50% - 64px)"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="calc(50% + 64px)"
                      y2="calc(50% - 64px)"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="calc(50% - 64px)"
                      y2="calc(50% + 64px)"
                      strokeDasharray="4 4"
                    />
                    <line
                      x1="50%"
                      y1="50%"
                      x2="calc(50% + 64px)"
                      y2="calc(50% + 64px)"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-heading">
                  Hạ tầng công nghệ toàn diện
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                  Từ trung tâm dữ liệu vùng đến hệ thống kết nối 63 tỉnh thành,
                  chúng tôi xây dựng nền tảng vững chắc cho hành trình chuyển
                  đổi số của bạn.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Tối ưu hóa quy trình vận hành */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="h-80 relative rounded-none overflow-hidden bg-slate-50 dark:bg-zinc-900/60 border border-whisper-border dark:border-zinc-800 flex flex-col justify-end p-5 select-none shadow-xs group">
                {/* Background Image (no rounding) */}
                <div className="absolute inset-0 opacity-90 dark:opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none">
                  <Image
                    src="/images/home/farm_area_drone_view.jpg"
                    alt="Quy trình vận hành"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Mock Workspace Interface */}
                <div className="w-full bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Top Bar */}
                  <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/50 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-secondary dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Quy trình số hóa
                    </span>
                    <FiTerminal className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                  {/* Messages */}
                  <div className="p-4 space-y-3 font-sans text-xs">
                    {/* Message 1 */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-accent-red shrink-0">
                        US
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black dark:text-white leading-none mb-0.5">
                          Khách hàng
                        </p>
                        <p className="text-secondary dark:text-zinc-400 leading-tight">
                          Yêu cầu khởi chạy nông nghiệp CNC Gia Lai.
                        </p>
                      </div>
                    </div>
                    {/* Message 2 */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded bg-accent-red/10 flex items-center justify-center text-[10px] font-bold text-accent-red shrink-0">
                        VD
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-accent-red leading-none mb-0.5">
                          Hệ thống
                        </p>
                        <p className="text-secondary dark:text-zinc-400 leading-tight flex items-center gap-1">
                          <FiCheck className="text-emerald-500 shrink-0" /> Đã
                          kết nối bản đồ & IoT Hub.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-heading">
                  Tối ưu hóa quy trình vận hành
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                  Tự động hóa các tác vụ phức tạp, kết nối các phòng ban và đối
                  tác thông qua các giải pháp thông minh không cần code.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Tuân thủ tiêu chuẩn & An toàn */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-80 relative rounded-none overflow-hidden bg-slate-50 dark:bg-zinc-900/60 border border-whisper-border dark:border-zinc-800 flex items-center justify-center p-6 select-none shadow-xs group">
                {/* Background Image (no rounding) */}
                <div className="absolute inset-0 opacity-90 dark:opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none">
                  <Image
                    src="/images/home/data_center.jpg"
                    alt="Tiêu chuẩn an toàn"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Staggered Cert Cards */}
                <div className="relative w-full max-w-[220px] h-[150px]">
                  {/* Card A - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-md flex items-center gap-3 transition-transform duration-300 origin-bottom group-hover:-translate-y-4 group-hover:-rotate-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0">
                      <FiLayers className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-black dark:text-white leading-tight">
                        Tier III / IV
                      </p>
                      <p className="text-[9px] text-secondary dark:text-zinc-500">
                        Hạ tầng chuẩn Quốc tế
                      </p>
                    </div>
                  </div>

                  {/* Card B - Middle */}
                  <div className="absolute top-6 left-2 right-2 h-16 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 shadow-lg flex items-center gap-3 transition-transform duration-300 origin-bottom group-hover:-translate-y-2 group-hover:rotate-1">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-600 dark:text-zinc-400 shrink-0">
                      <FiShield className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-black dark:text-white leading-tight">
                        ISO 27001
                      </p>
                      <p className="text-[9px] text-secondary dark:text-zinc-500">
                        Bảo mật thông tin
                      </p>
                    </div>
                  </div>

                  {/* Card C - Top */}
                  <div className="absolute top-0 left-4 right-4 h-16 bg-white dark:bg-zinc-900 rounded-xl border border-accent-red/20 dark:border-accent-red/30 p-3 shadow-xl flex items-center gap-3 transition-transform duration-300 origin-bottom group-hover:translate-y-1 group-hover:rotate-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-red/5 flex items-center justify-center text-accent-red shrink-0">
                      <FiCheckCircle className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-black dark:text-white leading-tight">
                        Tuân thủ pháp lý
                      </p>
                      <p className="text-[9px] text-accent-red">
                        Đạt quy chuẩn QCVN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-heading">
                  Tuân thủ tiêu chuẩn & An toàn
                </h3>
                <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                  Quy trình vận hành chuẩn quốc tế, bảo mật dữ liệu cấp doanh
                  nghiệp và tuân thủ các quy định pháp lý tại từng địa phương.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VietnamMapSection />

      {/* Featured Projects */}
      <section
        id="projects"
        className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-900/10 transition-colors duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase">
                Danh mục hoạt động
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white">
                Dự án tiêu biểu
              </h2>
            </div>
            <p className="text-secondary dark:text-zinc-400 max-w-sm mt-4 md:mt-0 text-sm">
              Những bước đi tiên phong trong hành trình số hóa nông nghiệp, đô
              thị và xây dựng hạ tầng dữ liệu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Dự án Nông nghiệp Thông minh",
                category: "Công nghệ cao",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3_pi4nq9swPjtrnjkXBer0BcnV3tdbv_QWwcxCghuvkdkisr7WHRzBCF2NT_hsFdvClXqOE1zCdgvW_u_gfTFgpG4AiPl6xHe75xty7qOgD91V29BogzVVkprsHNLP6OXist4SW4qo5J7ieWA1apwHIRLnA2qyGPuE5eif4fZzc5dG3XrB95yQFPtFZyoBfDrg8_goEliSHb_ZDthO497CyUd9EHuyciCaymg0zIc_YS0vj9rtt_2blg5qMVpgsP4GnsNr3Y6N5s",
              },
              {
                title: "Hệ thống Quản lý Đô thị",
                category: "Đô thị số",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbByJEZ3YCeLztV59YYYx6ui2pVNNKBH0FyrLb6bH5rsLUkFyWsRPdlSX2w1O3xBe6-E9p8RECqRUDP_z7rWYI1AzXR0iMj9H6JXhckH6Baqca7GmK4JbAL6Lyqm5lgPdUasNgj7Z-4I5F3GMRc3tm6_sEnoxzeNypYjdJ6XdE1XyBxtnZ5EdEKFckdAuJ24SZqdJkQDPtfSWPSvhj_zYYfVEnxTbpwUOBusK_rszTZAj_4ha2Mg8d1w9lp74qx6ZqdBvGJBzmrN8",
              },
              {
                title: "Trung tâm Dữ liệu Vùng",
                category: "Hạ tầng số",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOC4a0nIghorFBjuVOMhUqrfruHrpAy5IhSqZuksn9j5YB4_f2JvWsBtf-NNh8ovEE68kOwuf7VaUqzqpEnneNawCgRUo7DJnYmUqUKbBUgxMqYXMOF7_dbXNabqEKx8pknqMcrpLXRT1wAI5rNMHIY-wSKfCEyG6YXA5_TjeTmQqo99skl1cuBud52sqyfBUJa_B_nT_fXbqtjC9k8XX1hNgq6PSiCO1Zvq0JTz9M4LIkZulIfizgH16Sh5Zp1rdI1mep5UqeKZc",
              },
            ].map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card className="h-full flex flex-col group cursor-pointer overflow-hidden">
                  <div className="h-60 relative w-full mb-6 rounded-xl overflow-hidden bg-neutral-100 dark:bg-zinc-800">
                    <Image
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      src={proj.img}
                    />
                  </div>
                  <div className="font-mono-label text-[10px] font-bold text-accent-red mb-2 uppercase tracking-widest">
                    {proj.category}
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-accent-red transition-colors line-clamp-2">
                    {proj.title}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Contact */}
      <section
        id="contact"
        className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          {/* Partners */}
          <div className="mb-24">
            <div className="font-mono-label text-xs text-secondary dark:text-zinc-400 text-center mb-10 uppercase tracking-widest">
              Đối tác chiến lược
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 dark:opacity-40 grayscale select-none">
              {[
                "MINISTRY",
                "TECH-CO",
                "UNIVERSITY",
                "LOCAL-GOV",
                "AGRI-CORP",
                "INNOV-HUB",
              ].map((brand) => (
                <div
                  key={brand}
                  className="text-xl font-bold font-mono tracking-tighter text-black dark:text-white"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Layout */}
          <motion.div
            className="bg-canvas-white dark:bg-zinc-900/40 rounded-2xl p-8 md:p-16 border border-whisper-border dark:border-zinc-800 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-6">
                Sẵn sàng để đột phá?
              </h2>
              <p className="text-secondary dark:text-zinc-400 mb-8 max-w-sm text-sm">
                Hãy kết nối với chúng tôi để cùng lên kế hoạch và hiện thực hóa
                mục tiêu số hóa của tổ chức bạn.
              </p>
              <div className="space-y-4 font-mono-label text-xs text-secondary dark:text-zinc-300">
                <p className="flex items-center gap-3">
                  <FiMapPin className="text-accent-red text-base" /> 01 Trần
                  Hưng Đạo, TP. Pleiku, Gia Lai
                </p>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 hover:text-accent-red transition-colors cursor-pointer"
                >
                  <FiMail className="text-accent-red text-base" />
                  {copiedEmail ? "Đã sao chép!" : "contact@vdcdgroup.vn"}
                </button>
              </div>
            </div>

            <div className="flex lg:justify-end">
              <Button
                color="primary"
                onClick={handleCopyEmail}
                className="bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs tracking-wider uppercase font-bold px-8 py-6 w-full md:w-auto"
                trailingIcon={<FiMail className="w-4 h-4" />}
              >
                GỬI YÊU CẦU LIÊN HỆ
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
