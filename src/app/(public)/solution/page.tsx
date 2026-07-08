"use client";

import React from "react";
import { ServiceCard } from "@/components/ui/service-card";
import { motion } from "framer-motion";
import { SOLUTIONS } from "@/data/solutions";

export default function SolutionsPage() {
  return (
    <div className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pt-28 pb-20">
      {/* Banner / Header Zone */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-12">
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Hệ sinh thái công nghệ VDCD
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
              Danh mục các Giải pháp & Trung tâm
            </h1>
            <p className="text-secondary dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
              Khám phá hệ sinh thái đổi mới sáng tạo toàn diện của chúng tôi,
              cung cấp các giải pháp từ hạ tầng dữ liệu, mô hình hóa 3D, thiết
              kế số đến nghiên cứu phát triển robot và AI.
            </p>
          </motion.div>
        </div>

        {/* Grid of ServiceCards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {SOLUTIONS.map((sol) => (
            <motion.div
              key={sol.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <ServiceCard
                title={sol.title}
                href={sol.href}
                imageUrl={sol.imageUrl}
                iconUrl={sol.iconUrl}
                description={sol.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
