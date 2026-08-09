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
  "https://maps.google.com/maps?q=01%20Tr%E1%BA%A7n%20H%C6%B0ng%20%C4%90%E1%BA%A1o%2C%20Pleiku%2C%20Gia%20Lai&t=&z=16&ie=UTF8&iwloc=&output=embed";

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
            Văn phòng VDCD Gia Lai
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
                title="Bản đồ văn phòng VDCD Gia Lai — 01 Trần Hưng Đạo, Pleiku, Gia Lai"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
