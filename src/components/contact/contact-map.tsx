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
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.123!2d108.0048!3d13.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316b6c6e8b3b3b3b%3A0x0!2s01+Tr%E1%BA%A7n+H%C6%B0ng+%C4%90%E1%BA%A1o%2C+TP.+Pleiku%2C+Gia+Lai!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn";

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
                title="Bản đồ văn phòng VDCD Gia Lai — 01 Trần Hưng Đạo, TP. Pleiku"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
