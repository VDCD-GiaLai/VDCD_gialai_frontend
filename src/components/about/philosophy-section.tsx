"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiTarget,
  FiShield,
  FiHeart,
  FiCompass,
} from "react-icons/fi";

export function PhilosophySection() {
  // Mode switcher: 'storytelling' (default) vs 'corporate'
  const [mode, setMode] = useState<"storytelling" | "corporate">(
    "storytelling",
  );

  const corporateContent = [
    {
      step: "01",
      title: "SỨ MỆNH — KIẾN TẠO THẾ GIỚI SỐ BỀN VỮNG",
      desc: "Cung cấp hạ tầng thông tin địa lý và giải pháp số hóa không gian dữ liệu chính xác tuyệt đối, làm bệ phóng cho các quyết định quản trị thông minh và quy hoạch bền vững.",
      icon: FiGlobe,
      subPoints: [
        "Dữ liệu chính xác tuyệt đối",
        "Hạ tầng GIS chuẩn hóa",
        "Quản trị thông minh",
      ],
    },
    {
      step: "02",
      title: "TẦM NHÌN — ĐỐI TÁC CÔNG NGHỆ TOÀN DIỆN",
      desc: "Trở thành tập đoàn công nghệ dẫn đầu cả nước về giải pháp Digital Twin, phần cứng UAV tự chủ và tích hợp IOC đô thị thông minh vào năm 2030.",
      icon: FiTarget,
      subPoints: [
        "Dẫn đầu Digital Twin",
        "Phần cứng UAV tự chủ",
        "Hệ thống IOC thông minh",
      ],
    },
    {
      step: "03",
      title: "GIÁ TRỊ CỐT LÕI — 4 TRỤ CỘT NỀN TẢNG",
      desc: "Hệ thống giá trị định hình chuẩn mực vận hành chuyên nghiệp của tập đoàn:",
      icon: FiShield,
      pillars: [
        {
          name: "Đổi mới",
          text: "Không ngừng nghiên cứu, làm chủ công nghệ mới nhất.",
        },
        { name: "Chất lượng", text: "Dữ liệu thực chất, phần cứng bền bỉ." },
        { name: "Minh bạch", text: "Quy trình chuẩn hóa, dữ liệu trung thực." },
        {
          name: "Đồng hành",
          text: "Sát cánh cùng địa phương giải quyết bài toán thực tế.",
        },
      ],
    },
  ];

  const storytellingContent = [
    {
      step: "01",
      title: "SỨ MỆNH — VẼ LẠI BẢN ĐỒ TƯƠNG LAI BẰNG ÁNH SÁNG CÔNG NGHỆ",
      desc: "Chúng tôi bắt đầu bằng những bước chân đo đạc núi đồi năm 2006 và tiếp tục hành trình chuyển đổi số hóa để lưu giữ, bảo tồn và phát triển tài nguyên đất đai, rừng xanh Tây Nguyên.",
      icon: FiHeart,
      subPoints: [
        "Dấu chân khảo sát 2006",
        "Bảo tồn tài nguyên đất & rừng",
        "Số hóa di sản không gian",
      ],
    },
    {
      step: "02",
      title: "TẦM NHÌN — ĐƯA TÂY NGUYÊN VƯƠN TẦM TRONG DÒNG CHẢY SỐ TOÀN CẦU",
      desc: "Không chỉ là một trung tâm đổi mới, chúng tôi khát khao định hình Gia Lai thành cực phát triển công nghệ cao, nơi những chiếc UAV tự chủ do người Việt chế tạo bay cao giám sát tài nguyên quốc gia.",
      icon: FiCompass,
      subPoints: [
        "Cực công nghệ Gia Lai",
        "UAV Make in Vietnam",
        "Tầm nhìn dòng chảy số toàn cầu",
      ],
    },
    {
      step: "03",
      title: "GIÁ TRỊ CỐT LÕI — NHỊP ĐẬP HỆ SINH THÁI VDCD",
      desc: "Hành trình chinh phục không gian dữ liệu bằng khát vọng và trái tim:",
      icon: FiShield,
      pillars: [
        {
          name: "Khát vọng",
          text: "Dám nghĩ lớn, bắt đầu từ những việc thực tiễn nhất.",
        },
        {
          name: "Tận tâm",
          text: "Mỗi dòng code, mỗi mét vuông số hóa đều chứa đựng tinh thần trách nhiệm.",
        },
        {
          name: "Chia sẻ",
          text: "Kết nối tri thức chuyên gia, nâng tầm nguồn nhân lực bản địa.",
        },
        {
          name: "Bền vững",
          text: "Công nghệ phục vụ con người và bảo vệ thiên nhiên.",
        },
      ],
    },
  ];

  const activeItems =
    mode === "storytelling" ? storytellingContent : corporateContent;

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-16">
      {/* Section Header with Copywriting Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono font-bold text-red-500 tracking-widest uppercase block mb-2">
            Triết lý hoạt động
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white font-heading tracking-tight">
            Tầm nhìn · Sứ mệnh · Giá trị cốt lõi
          </h2>
        </div>

        {/* Copywriting Option Switcher Tab */}
        <div className="bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 flex items-center shrink-0 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setMode("storytelling")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 ${
              mode === "storytelling"
                ? "bg-red-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Storytelling & Visionary
          </button>
          <button
            onClick={() => setMode("corporate")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 ${
              mode === "corporate"
                ? "bg-red-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Corporate & Formal
          </button>
        </div>
      </div>

      {/* 3-Column Grid Cards with Clockwise 1px Draw Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {activeItems.map((item, idx) => {
          const IconComp = item.icon;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-8 md:p-10 bg-zinc-900 dark:bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Animated 1px Clockwise Border on Hover */}
              <span className="pointer-events-none absolute top-[-1px] left-[-1px] h-[2px] w-0 bg-red-500 z-30 group-hover:w-[calc(100%+2px)] transition-[width] duration-300 ease-linear" />
              <span className="pointer-events-none absolute top-[-1px] right-[-1px] w-[2px] h-0 bg-red-500 z-30 group-hover:h-[calc(100%+2px)] transition-[height] duration-300 ease-linear group-hover:[transition-delay:300ms]" />
              <span className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-[2px] w-0 bg-red-500 z-30 group-hover:w-[calc(100%+2px)] transition-[width] duration-300 ease-linear group-hover:[transition-delay:600ms]" />
              <span className="pointer-events-none absolute bottom-[-1px] left-[-1px] w-[2px] h-0 bg-red-500 z-30 group-hover:h-[calc(100%+2px)] transition-[height] duration-300 ease-linear group-hover:[transition-delay:900ms]" />

              <div>
                {/* Header: Step index & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded border border-red-500/20">
                    {item.step}
                  </span>
                  <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl md:text-2xl font-bold font-heading text-white tracking-tight leading-snug mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Sub-Points or Pillars display */}
                {item.subPoints && (
                  <ul className="space-y-2 pt-4 border-t border-zinc-800">
                    {item.subPoints.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs font-mono text-zinc-400 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.pillars && (
                  <div className="space-y-3 pt-4 border-t border-zinc-800">
                    {item.pillars.map((pil, pIdx) => (
                      <div key={pIdx} className="text-xs space-y-1">
                        <span className="font-bold text-red-400 font-mono uppercase">
                          {pil.name}:
                        </span>{" "}
                        <span className="text-zinc-300">{pil.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>VDCD PHILOSOPHY</span>
                <span className="group-hover:text-red-400 transition-colors">
                  0{idx + 1} / 03
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
