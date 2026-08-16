"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  TrendUp,
  Desktop,
  BookOpen,
  Trophy,
  Globe,
  Heart,
} from "@phosphor-icons/react";
import { BENEFITS } from "@/data/careers.data";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  FiTrendingUp: TrendUp,
  FiMonitor: Desktop,
  FiBookOpen: BookOpen,
  FiAward: Trophy,
  FiGlobe: Globe,
  FiHeart: Heart,
};

const BENEFIT_IMAGES: Record<string, string> = {
  "Phát triển chuyên môn": "https://picsum.photos/id/180/800/500",
  "Môi trường hiện đại": "https://picsum.photos/id/1060/800/500",
  "Đào tạo liên tục": "https://picsum.photos/id/20/800/500",
  "Đãi ngộ cạnh tranh": "https://picsum.photos/id/368/800/500",
  "Tác động cộng đồng": "https://picsum.photos/id/1015/800/500",
  "Cân bằng cuộc sống": "https://picsum.photos/id/1025/800/500",
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function CareersBenefits() {
  return (
    <section className="py-8 md:py-12" aria-labelledby="benefits-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
            Phúc lợi & Đãi ngộ
          </span>
          <h2
            id="benefits-heading"
            className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Tại sao chọn VDCD Gia Lai?
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {BENEFITS.map((benefit, idx) => {
            const IconComponent = ICON_MAP[benefit.icon] || Globe;
            const imageUrl =
              BENEFIT_IMAGES[benefit.title] ||
              "https://picsum.photos/id/180/800/500";

            return (
              <motion.div
                key={idx}
                className="group double-bezel-outer transition-all duration-300 hover:scale-[1.01] overflow-hidden"
                variants={fadeInUp}
              >
                <div className="double-bezel-inner overflow-hidden h-full flex flex-col">
                  {/* Card Cover Image */}
                  <div className="relative w-full h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={imageUrl}
                      alt={benefit.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 background-gradient bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                      <IconComponent
                        className="w-5 h-5 text-accent-red"
                        weight="thin"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-black dark:text-white font-heading mb-2 group-hover:text-accent-red transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
