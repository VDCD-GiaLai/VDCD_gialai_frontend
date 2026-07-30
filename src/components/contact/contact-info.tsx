"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";

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

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  isExternal?: boolean;
}

const ContactInfoItem = ({
  icon,
  label,
  value,
  href,
  isExternal = false,
}: ContactInfoItemProps) => {
  const content = (
    <motion.div
      className="group flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/30 hover:border-accent-red/30 hover:bg-white dark:hover:bg-zinc-900/50 transition-all duration-300"
      variants={fadeInUp}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 text-secondary dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-mono-label text-[10px] font-bold text-secondary/60 dark:text-zinc-500 uppercase tracking-widest block mb-1">
          {label}
        </span>
        <span className="text-sm font-semibold text-black dark:text-white leading-relaxed block">
          {value}
        </span>
      </div>
      {href && isExternal && (
        <FiExternalLink className="w-3.5 h-3.5 text-secondary/40 dark:text-zinc-600 group-hover:text-accent-red transition-colors duration-300 shrink-0 mt-1" />
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block"
        aria-label={`${label}: ${value}`}
      >
        {content}
      </a>
    );
  }

  return content;
};

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    url: "https://facebook.com/vdcdgroup",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "Zalo",
    url: "https://zalo.me/vdcdgroup",
    icon: (
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
];

export function ContactInfo() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="contact-info-heading">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-[10px] font-bold text-accent-red uppercase tracking-widest block mb-3">
            Thông tin liên hệ
          </span>
          <h2
            id="contact-info-heading"
            className="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white font-heading"
          >
            Các kênh liên lạc
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <ContactInfoItem
              icon={<FiMapPin className="w-5 h-5" />}
              label="Địa chỉ văn phòng"
              value="01 Trần Hưng Đạo, TP. Pleiku, Gia Lai"
              href="https://maps.google.com/?q=01+Trần+Hưng+Đạo,+TP.+Pleiku,+Gia+Lai"
              isExternal
            />
            <ContactInfoItem
              icon={<FiPhone className="w-5 h-5" />}
              label="Hotline"
              value="0269 300 0000"
              href="tel:02693000000"
            />
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <ContactInfoItem
              icon={<FiMail className="w-5 h-5" />}
              label="Email"
              value="contact@vdcdgroup.vn"
              href="mailto:contact@vdcdgroup.vn"
            />
            <ContactInfoItem
              icon={<FiClock className="w-5 h-5" />}
              label="Giờ làm việc"
              value="Thứ 2 — Thứ 6 · 08:00 — 17:30"
            />
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          className="mt-8 flex items-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeInUp}
        >
          <span className="font-mono-label text-[10px] font-bold text-secondary/60 dark:text-zinc-500 uppercase tracking-widest mr-2">
            Mạng xã hội
          </span>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/30 text-secondary dark:text-zinc-400 hover:border-accent-red/30 hover:text-accent-red hover:bg-accent-red/5 transition-all duration-300"
              aria-label={`Truy cập trang ${social.name} của VDCD`}
              tabIndex={0}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
