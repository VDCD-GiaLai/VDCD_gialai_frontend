"use client";

import * as React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=62A%20Di%C3%AAn%20H%E1%BB%93ng%2C%20Ph%C6%B0%E1%BB%9Dng%20Quy%20Nh%C6%A1n%2C%20Gia%20Lai&t=&z=16&ie=UTF8&iwloc=&output=embed";

export function ContactMap() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="contact-map-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-[10px] font-bold text-accent-red uppercase tracking-widest block mb-3">
            Vị trí
          </span>
          <h2
            id="contact-map-heading"
            className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Văn phòng Trung tâm Đổi mới Sáng tạo Gia Lai
          </h2>
        </motion.div>

        <motion.div
          className="double-bezel-outer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <div className="double-bezel-inner overflow-hidden">
            <div className="relative w-full aspect-[16/7] md:aspect-[16/5]">
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ văn phòng VDCD Gia Lai — 62A Diên Hồng, Phường Quy Nhơn, Gia Lai"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
