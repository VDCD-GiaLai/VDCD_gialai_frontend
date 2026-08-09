"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface CorporateMetricsProps {
  stats?: {
    staff?: number;
    experts?: number;
    centers?: number;
    projects?: number;
    provinces?: number;
  };
}

export function CorporateMetrics({ stats }: CorporateMetricsProps) {
  const metrics = [
    {
      value: stats?.staff || 1500,
      label: "Nhân sự",
      desc: "Đội ngũ nhân sự chuyên nghiệp, tận tâm",
      suffix: "+",
    },
    {
      value: stats?.experts || 250,
      label: "Chuyên gia",
      desc: "Năng lực R&D phần cứng, phần mềm cao cấp",
      suffix: "+",
    },
    {
      value: stats?.provinces || 30,
      label: "Tỉnh thành",
      desc: "Đo đạc, số hóa quy hoạch & GIS trên cả nước",
      suffix: "+",
    },
    {
      value: stats?.projects || 100,
      label: "Dự án",
      desc: "Số hóa quy hoạch, GIS & IOC toàn quốc",
      suffix: "+",
    },
  ];

  return (
    <section className="space-y-8 select-none">
      {/* Row of Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        {metrics.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: idx * 0.08,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="space-y-2 group text-center flex flex-col items-center"
          >
            <div className="text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tighter leading-none group-hover:text-accent-red transition-colors duration-300">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="space-y-1">
              <h4 className="text-[10px] md:text-xs font-bold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider transition-colors duration-300">
                {stat.label}
              </h4>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-450 leading-relaxed max-w-[20ch] transition-colors duration-300">
                {stat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ecosystem Inheritance Section - Swiss Editorial Layout */}
      <div className="pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (35%) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-3"
          >
            <span className="font-mono text-xs font-bold text-accent-red tracking-widest uppercase block">
              KẾ THỪA HỆ SINH THÁI
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-950 dark:text-white font-heading leading-tight uppercase transition-colors duration-300">
              Sức Mạnh Công Nghệ Từ VDCD Group
            </h3>
          </motion.div>

          {/* Right Column (65%) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            <p className="text-zinc-650 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-sans transition-colors duration-300">
              Trung tâm kế thừa toàn diện năng lực công nghệ, đội ngũ chuyên gia
              hàng đầu và mạng lưới triển khai thực địa của hệ sinh thái{" "}
              <strong className="text-zinc-950 dark:text-white font-semibold">
                VDCD Group
              </strong>{" "}
              trong các lĩnh vực trụ cột:
            </p>

            {/* Clean Editorial Tech Domains Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
              {[
                { num: "01", name: "Khảo sát trắc địa" },
                { num: "02", name: "Dữ liệu không gian" },
                { num: "03", name: "Trí tuệ nhân tạo" },
                { num: "04", name: "Công nghệ BIM" },
                { num: "05", name: "Hệ thống GIS" },
                { num: "06", name: "Hạ tầng dữ liệu" },
                { num: "07", name: "Phần mềm quản lý" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center gap-2.5 transition-all duration-300 hover:border-accent-red/40 hover:bg-white dark:hover:bg-zinc-900"
                >
                  <span className="font-mono text-[11px] font-bold text-accent-red opacity-90 shrink-0">
                    {item.num}
                  </span>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
