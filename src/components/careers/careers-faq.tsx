"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/react";
import { FAQ_ITEMS } from "@/data/careers.data";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function CareersFaq() {
  return (
    <section
      className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/20"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left column — title */}
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              Câu hỏi thường gặp
            </span>
            <h2
              id="faq-heading"
              className="text-2xl md:text-4xl font-bold tracking-tight text-black dark:text-white font-heading"
            >
              Bạn cần biết thêm?
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed mt-4 max-w-sm">
              Dưới đây là các câu hỏi phổ biến nhất từ ứng viên. Nếu bạn cần hỗ
              trợ thêm, đừng ngần ngại liên hệ đội ngũ HR.
            </p>
          </motion.div>

          {/* Right column — accordion */}
          <motion.div
            className="lg:col-span-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Accordion
              variant="splitted"
              className="gap-3"
              itemClasses={{
                base: "border border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 shadow-none hover:border-accent-red/20 transition-all duration-300 rounded-xl px-2",
                title:
                  "text-sm md:text-base font-bold text-black dark:text-white font-heading",
                content:
                  "text-sm text-secondary dark:text-zinc-400 leading-relaxed pb-4",
                trigger: "py-4",
                indicator: "text-accent-red",
              }}
            >
              {FAQ_ITEMS.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  aria-label={item.question}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
