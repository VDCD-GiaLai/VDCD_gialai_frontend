"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiServer,
  FiLayers,
  FiShare2,
  FiAward,
  FiArrowUpRight,
} from "react-icons/fi";

interface CoreFunctionItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  tag: string;
}

export function CoreFunctions() {
  const functions: CoreFunctionItem[] = [
    {
      id: "01",
      title: "Xây dựng và vận hành hạ tầng dữ liệu số",
      desc: "Lập mô hình 3D số hóa không gian, chuẩn hóa hệ thống GIS và vận hành điện toán mây phục vụ dữ liệu số toàn tỉnh.",
      icon: FiServer,
      tag: "HẠ TẦNG SỐ",
    },
    {
      id: "02",
      title: "Triển khai nền tảng công nghệ phục vụ tỉnh và doanh nghiệp",
      desc: "Cung cấp hệ thống giám sát IOC/DOC, tự động hóa AutoTimelapse và nền tảng Digital Twin hỗ trợ quản trị và vận hành.",
      icon: FiLayers,
      tag: "NỀN TẢNG CÔNG NGHỆ",
    },
    {
      id: "03",
      title: "Kết nối hệ sinh thái đổi mới sáng tạo",
      desc: "Xây dựng mạng lưới liên kết giữa cơ quan quản lý, viện nghiên cứu, tập đoàn công nghệ và quỹ đầu tư trong nước.",
      icon: FiShare2,
      tag: "HỆ SINH THÁI",
    },
    {
      id: "04",
      title: "Ươm tạo, đào tạo và hỗ trợ doanh nghiệp công nghệ",
      desc: "Đào tạo nhân lực số chất lượng cao, tư vấn chuyển đổi số và chuyển giao giải pháp cho doanh nghiệp địa phương.",
      icon: FiAward,
      tag: "ƯƠM TẠO & ĐÀO TẠO",
    },
  ];

  return (
    <section className="space-y-12 select-none">
      {/* Section Header */}
      <div className="max-w-3xl space-y-3">
        <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
          CHỨC NĂNG TRỌNG TÂM
        </span>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
          Nền Tảng Năng Lực <br />
          Thúc Đẩy Đổi Mới Sáng Tạo
        </h2>
      </div>

      {/* 4 Horizontal Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {functions.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300 min-h-[300px]"
            >
              {/* Top: Serial Number & Tag */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-accent-red opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.id}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-accent-red group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <span className="font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                  {item.tag}
                </span>
              </div>

              {/* Bottom: Title & Description */}
              <div className="space-y-3 pt-6">
                <h3 className="text-base md:text-lg font-bold text-zinc-950 dark:text-white font-heading leading-snug group-hover:text-accent-red transition-colors duration-300 flex items-start justify-between gap-2">
                  <span>{item.title}</span>
                  <FiArrowUpRight className="w-4 h-4 text-zinc-400 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
