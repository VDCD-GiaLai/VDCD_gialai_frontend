"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGlobe, FiTarget, FiShield } from "react-icons/fi";
import {
  fetchOrganizationInfoFromApi,
  type OrganizationInfo,
} from "@/services/hero.service";

export function PhilosophyAccordion({
  initialOption,
}: {
  initialOption?: string;
}) {
  const [orgInfo, setOrgInfo] = useState<OrganizationInfo | null>(null);
  const [activePhilosophy, setActivePhilosophy] = useState<number | null>(0);

  useEffect(() => {
    fetchOrganizationInfoFromApi()
      .then(setOrgInfo)
      .catch(() => {});
  }, []);

  const dynamicPhilosophy = [
    {
      title: "SỨ MỆNH",
      subtitle: "Vẽ lại bản đồ tương lai bằng ánh sáng công nghệ",
      desc:
        orgInfo?.mission ||
        "Chúng tôi bắt đầu bằng những bước chân đo đạc núi đồi năm 2006 và tiếp tục hành trình chuyển đổi số hóa để lưu giữ, bảo tồn và phát triển tài nguyên đất đai, rừng xanh Tây Nguyên.",
      icon: FiGlobe,
      image: "/images/home/farm_area_drone_view.jpg",
    },
    {
      title: "TẦM NHÌN",
      subtitle: "Đưa Tây Nguyên vươn tầm trong dòng chảy số toàn cầu",
      desc:
        orgInfo?.vision ||
        "Không chỉ là một trung tâm đổi mới, chúng tôi khát khao định hình Gia Lai thành cực phát triển công nghệ cao, nơi những chiếc UAV tự chủ do người Việt chế tạo bay cao giám sát tài nguyên quốc gia.",
      icon: FiTarget,
      image: "/images/home/quynhon_citynightview.webp",
    },
    {
      title: "GIÁ TRỊ CỐT LÕI",
      subtitle: "Nhịp đập hệ sinh thái VDCD",
      desc:
        orgInfo?.coreValues ||
        "Khát vọng: Dám nghĩ lớn, bắt đầu từ những việc thực tiễn nhất. Tận tâm: Mỗi dòng code, mỗi mét vuông số hóa đều chứa đựng tinh thần trách nhiệm. Chia sẻ: Kết nối tri thức, nâng tầm nguồn nhân lực bản địa. Bền vững: Công nghệ phục vụ con người và bảo vệ thiên nhiên.",
      icon: FiShield,
      image: "/images/home/data_center.jpg",
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
      <section id="vision" className="scroll-mt-28">
        <div className="mb-12">
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Triết lý hoạt động
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white font-heading leading-tight">
            Tầm nhìn · Sứ mệnh · Giá trị cốt lõi
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {dynamicPhilosophy.map((item, idx) => {
            const IconComp = item.icon;
            const isActive = activePhilosophy === idx;

            return (
              <motion.div
                key={idx}
                layout
                onClick={() => setActivePhilosophy(idx)}
                onMouseEnter={() => setActivePhilosophy(idx)}
                className={`relative overflow-hidden cursor-pointer border border-slate-200 dark:border-zinc-800 flex flex-col justify-end transition-all duration-500 ${
                  isActive ? "lg:flex-[2.5]" : "lg:flex-1"
                }`}
                style={{ minHeight: "420px" }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover transition-all duration-700 ${isActive ? "scale-105" : "scale-100"}`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-black/40 to-black/10 ${isActive ? "opacity-100" : "opacity-80"}`}
                  />
                </div>

                {/* Top: Index badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span
                    className={`font-mono text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors ${isActive ? "bg-accent-red text-white" : "bg-white/20 text-white/70"}`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Top: Icon */}
                <div className="absolute top-6 left-6 z-10">
                  <div
                    className={`p-2.5 rounded-full flex items-center justify-center shrink-0 backdrop-blur-sm transition-colors ${isActive ? "bg-accent-red text-white" : "bg-white/15 text-white/80"}`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom contents */}
                <div className="relative z-10 p-8 space-y-3">
                  <h3 className="text-xl md:text-2xl font-black font-heading text-white tracking-tight">
                    {item.title}
                  </h3>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="space-y-2"
                    >
                      <h4 className="text-xs font-bold text-accent-red font-heading uppercase tracking-wide">
                        {item.subtitle}
                      </h4>
                      <p className="text-white/85 text-sm leading-relaxed max-w-lg">
                        {item.desc}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
