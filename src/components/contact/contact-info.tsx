"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowSquareOut, Clock } from "@phosphor-icons/react";
import { FiMapPin, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

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
        <ArrowSquareOut weight="thin" className="w-3.5 h-3.5 text-secondary/40 dark:text-zinc-600 group-hover:text-accent-red transition-colors duration-300 shrink-0 mt-1" />
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

import {
  OrganizationInfo,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";

export function ContactInfo({
  orgInfo,
}: {
  orgInfo?: OrganizationInfo | null;
}) {
  const address = orgInfo?.address || DEFAULT_ORGANIZATION_INFO.address || "";
  const hotline =
    orgInfo?.socialLinks?.hotline ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.hotline ||
    "";
  const email =
    orgInfo?.socialLinks?.email ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.email ||
    "";

  const facebookUrl =
    orgInfo?.socialLinks?.facebook ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.facebook;
  const zaloUrl =
    orgInfo?.socialLinks?.zalo || DEFAULT_ORGANIZATION_INFO.socialLinks.zalo;
  const tiktokUrl =
    orgInfo?.socialLinks?.tiktok ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.tiktok;
  const messengerUrl =
    orgInfo?.socialLinks?.messenger ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.messenger;

  const SOCIAL_LINKS = [
    {
      name: "Facebook",
      url: facebookUrl,
      icon: <FaFacebookF className="w-4 h-4" />,
      colorClass:
        "border-[#1877F2]/30 text-[#1877F2] bg-[#1877F2]/10 hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "TikTok",
      url: tiktokUrl,
      icon: <FaTiktok className="w-4 h-4" />,
      colorClass:
        "border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black",
    },
    {
      name: "Zalo",
      url: zaloUrl,
      icon: <SiZalo className="w-4 h-4" />,
      colorClass:
        "border-[#0068FF]/30 text-[#0068FF] bg-[#0068FF]/10 hover:bg-[#0068FF] hover:text-white",
    },
    {
      name: "Messenger",
      url: messengerUrl,
      icon: <FiMessageCircle className="w-4 h-4" />,
      colorClass:
        "border-[#00B2FF]/30 text-[#00B2FF] bg-[#00B2FF]/10 hover:bg-[#00B2FF] hover:text-white",
    },
  ];

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
              value={address}
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              isExternal
            />
            <ContactInfoItem
              icon={<FiPhone className="w-5 h-5" />}
              label="Hotline"
              value={hotline}
              href={`tel:${hotline.replace(/\s+/g, "")}`}
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
              value={email}
              href={`mailto:${email}`}
            />
            <ContactInfoItem
              icon={<Clock weight="thin" className="w-5 h-5" />}
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
              className={`flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300 ${social.colorClass}`}
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
