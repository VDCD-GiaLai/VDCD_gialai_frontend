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
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="w-full bg-canvas-white dark:bg-zinc-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[85vh]">
        <motion.div
          className="lg:col-span-6 flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <div className="font-mono-label text-xs font-bold text-accent-red mb-4 tracking-widest uppercase">
            Kiến tạo tương lai số
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white mb-6 leading-none">
            Chuyển đổi số & <br />
            Đổi mới sáng tạo tại Gia Lai.
          </h1>
          <p className="text-secondary dark:text-zinc-400 text-body-md max-w-xl mb-8 leading-relaxed">
            VDCD Group là hạt nhân thúc đẩy hệ sinh thái khởi nghiệp sáng tạo,
            ứng dụng công nghệ lõi và xây dựng hạ tầng kỹ thuật số đồng bộ, kiến
            tạo nền tảng vững chắc cho sự phát triển bền vững của địa phương và
            khu vực.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              color="primary"
              className="bg-accent-red hover:bg-accent-red-hover text-white px-8 py-6 rounded-full font-bold shadow-sm"
              trailingIcon={<FiArrowRight />}
            >
              Hồ sơ năng lực
            </Button>
            <a href="#about">
              <Button
                variant="bordered"
                className="border-whisper-border dark:border-zinc-800 text-secondary dark:text-zinc-300 px-8 py-6 rounded-full font-bold"
              >
                Tìm hiểu thêm
              </Button>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-6 h-[350px] md:h-[550px] relative w-full rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt="Gia Lai landscape"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3DOpcyE9BZOHevHJfT4F5aKDVphR1D3fi9Que-63ykBqf1G5f1c2nPaxwqdY4pLLiCOdXqULetKFJq_3wzdU96PLc_dXoyy_jq4flbdj1yzrNqqYdL9p9CjiZAkP-L0PSnA3rLknBlAqRJZaIAVNQe7IkUb0v3okyrOBtaJhjhPz04W1ZeehVAD5Cy1DmutEEUMcUw2AZrqFtnByCfLXFTfB5ENucxMa6_-2yr311orj5W9no9NjrzlpcG62-VFsddSuEKEU42XU"
          />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section
        id="about"
        className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-900/10 transition-colors duration-300"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="h-[300px] md:h-[480px] relative rounded-2xl overflow-hidden shadow-lg bg-surface-container"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              alt="Innovation center"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXu8Kuj2LeKN1tbje6yuZDp0afhxjl4_FcZ4GT_J9qSakmTq8ZAbD7_xuLDs4L7M_kKj1PXM3tyv3b7aiO2l3iZUVKZmP2yD56v_zMBQd3T7YaaKfcd1473OcUefPLZ69crYl0mujWY_OLKnlPX9r0nLu7JLACsm1ZfrglLqBDA_TFGfIzKWI_L_w-Rtco7RpcF3_NWvMH2tQi0ip3zpFR33Pm71VdhooqFHdldPpmKwGlrI1FUqywzs0bfaYKCsAb0pZeiO8H2dKLk"
            />
          </motion.div>

          <motion.div
            className="lg:pl-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-6">
              Cầu nối vững chắc trong Hệ sinh thái Đổi mới sáng tạo
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-body-md mb-4 leading-relaxed">
              Chúng tôi cung cấp các giải pháp toàn diện từ tư vấn chiến lược,
              triển khai hạ tầng đến chuyển giao công nghệ. Với phương pháp tiếp
              cận lấy dữ liệu làm trung tâm, VDCD Group đồng hành cùng các doanh
              nghiệp và tổ chức trong quá trình tối ưu hóa vận hành và bứt phá
              doanh thu.
            </p>
            <p className="text-secondary dark:text-zinc-400 text-body-md mb-8 leading-relaxed">
              Đội ngũ chuyên gia của chúng tôi cam kết mang lại những giá trị
              thực tiễn, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất, đảm bảo
              tính liên tục và bảo mật trong mọi dự án triển khai.
            </p>
            <a
              href="#"
              className="text-accent-red font-bold font-mono-label text-xs uppercase tracking-widest hover:opacity-80 inline-flex items-center gap-2 transition-all hover:translate-x-1"
            >
              Xem Hồ sơ năng lực <FiArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Network Map & Stats */}
      <section className="border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white mb-4">
              Mạng lưới kết nối toàn diện
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-body-md max-w-lg mx-auto">
              Hệ thống trung tâm hỗ trợ và hạ tầng kết nối các tỉnh thành phục
              vụ chuyển đổi số doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              className="lg:col-span-8 h-[400px] md:h-[550px] relative rounded-2xl overflow-hidden border border-whisper-border dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-6 flex items-center justify-center shadow-inner"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                alt="Vietnam Map Network"
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-contain p-4 dark:invert-[0.9] dark:hue-rotate-180"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2HqScy0l6RwWUnMEDk3JGfEpp9gOEXNd3Bg4wCzEWsqZ5LQcADVlgrzoWoDHTq93KxTzShmOoZSQMIRfX_a3vkrKbrSyJusKISD957DYOFPV6jWiDWfMP9i3KFI9N0Oqfy9Dh67PSw4YbMDAD3DFkW055tugolR3_78Z9kOEH1NHts76SiDjVDfcfdw_-zC1a4FAHrmy57tkJJAW37DnwwAL6jY86R83LQ6tjDxAGg8TicLyXWb9-Z9vugbY7hVdTDG9KbslB6tg"
              />
            </motion.div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              {[
                {
                  value: "63+",
                  label: "Tỉnh thành kết nối",
                  icon: <FiGlobe />,
                },
                {
                  value: "15+",
                  label: "Trung tâm vệ tinh",
                  icon: <FiDatabase />,
                },
                {
                  value: "500+",
                  label: "Dự án hoàn tất",
                  icon: <FiCheckCircle />,
                },
                { value: "24/7", label: "Hỗ trợ kỹ thuật", icon: <FiClock /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="border-l-3 border-accent-red pl-6 py-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-2 text-secondary dark:text-zinc-400 mb-1">
                    <span className="text-accent-red text-lg">{stat.icon}</span>
                    <span className="font-mono-label text-[10px] uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
