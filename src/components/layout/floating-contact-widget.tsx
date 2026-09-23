"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FiPhone, FiMail, FiMapPin, FiX } from "react-icons/fi";
import { SiZalo } from "react-icons/si";
import { FaFacebookMessenger } from "react-icons/fa6";
import { BsChatDotsFill } from "react-icons/bs";
import { DEFAULT_ORGANIZATION_INFO } from "@/data/hero.data";

interface ContactActionItem {
  id: string;
  name: string;
  subtext: string;
  href: string;
  isExternal?: boolean;
  icon: React.ReactNode;
  bgGradient: string;
  shadowColor: string;
}

const dialContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    },
    transitionEnd: {
      display: "none",
    },
  },
  visible: {
    opacity: 1,
    display: "flex",
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
};

const dialItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.85,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 450,
      damping: 25,
    },
  },
};

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = React.useState(false);
  const widgetRef = React.useRef<HTMLDivElement>(null);

  const hotline = DEFAULT_ORGANIZATION_INFO.socialLinks.hotline || "0373600099";
  const zaloUrl =
    DEFAULT_ORGANIZATION_INFO.socialLinks.zalo || "https://zalo.me/0373600099";
  const messengerUrl =
    DEFAULT_ORGANIZATION_INFO.socialLinks.messenger ||
    "https://www.messenger.com/t/888742211000071";
  const email =
    DEFAULT_ORGANIZATION_INFO.socialLinks.email || "dmstgialai@vdcd.vn";

  const actionItems: ContactActionItem[] = [
    {
      id: "hotline",
      name: "Gọi Hotline",
      subtext: "0373 600 099",
      href: `tel:${hotline.replace(/\s+/g, "")}`,
      isExternal: false,
      icon: <FiPhone className="w-5 h-5" />,
      bgGradient: "from-rose-500 to-red-600",
      shadowColor: "shadow-red-500/30",
    },
    {
      id: "zalo",
      name: "Chat Zalo",
      subtext: "Tư vấn trực tiếp",
      href: zaloUrl,
      isExternal: true,
      icon: <SiZalo className="w-5 h-5" />,
      bgGradient: "from-[#0068FF] to-[#0052cc]",
      shadowColor: "shadow-blue-500/30",
    },
    {
      id: "messenger",
      name: "Facebook Messenger",
      subtext: "Trò chuyện qua Fanpage",
      href: messengerUrl,
      isExternal: true,
      icon: <FaFacebookMessenger className="w-5 h-5" />,
      bgGradient: "from-[#0084FF] via-[#7B2BF9] to-[#A824F9]",
      shadowColor: "shadow-purple-500/30",
    },
    {
      id: "email",
      name: "Gửi Email",
      subtext: email,
      href: `mailto:${email}`,
      isExternal: false,
      icon: <FiMail className="w-5 h-5" />,
      bgGradient: "from-amber-500 to-orange-600",
      shadowColor: "shadow-orange-500/30",
    },
    {
      id: "contact-page",
      name: "Trang Liên Hệ",
      subtext: "Gửi form & Bản đồ chỉ đường",
      href: "/contact",
      isExternal: false,
      icon: <FiMapPin className="w-5 h-5" />,
      bgGradient: "from-blue-600 to-indigo-600",
      shadowColor: "shadow-indigo-500/30",
    },
  ];

  // Click outside to close
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Dimmed backdrop when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="contact-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/25 dark:bg-black/50 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Floating Speed Dial Container */}
      <div
        ref={widgetRef}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end pointer-events-none select-none"
        role="region"
        aria-label="Tiện ích liên hệ nhanh"
      >
        {/* Speed Dial Stack Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="speed-dial-menu-container"
              variants={dialContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`flex flex-col items-end gap-3 mb-4 ${
                isOpen ? "pointer-events-auto" : "pointer-events-none"
              }`}
              style={{ pointerEvents: isOpen ? "auto" : "none" }}
              aria-hidden={!isOpen}
            >
              {actionItems.map((item) => {
                const isInternal =
                  !item.isExternal && item.href.startsWith("/");

                const handleItemClick = (e: React.MouseEvent) => {
                  if (!isOpen) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  setIsOpen(false);
                };

                const buttonContent = (
                  <div className="group flex items-center justify-end gap-3 cursor-pointer">
                    {/* Label Badge on the Left */}
                    <div className="px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/80 dark:border-zinc-800 shadow-lg shadow-black/5 dark:shadow-black/20 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-accent-red/40 group-hover:shadow-md text-right">
                      <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 flex items-center justify-end gap-1.5">
                        {item.name}
                      </div>
                      <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                        {item.subtext}
                      </div>
                    </div>

                    {/* Circular Action Button */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-tr ${item.bgGradient} shadow-md ${item.shadowColor} transition-transform duration-300 group-hover:scale-110 active:scale-95 shrink-0`}
                    >
                      {item.icon}
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.id}
                    variants={dialItemVariants}
                    className={
                      isOpen ? "pointer-events-auto" : "pointer-events-none"
                    }
                  >
                    {isInternal ? (
                      <Link
                        href={item.href}
                        onClick={handleItemClick}
                        tabIndex={isOpen ? 0 : -1}
                        className={`outline-none focus-visible:ring-2 focus-visible:ring-accent-red rounded-full block ${
                          isOpen ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                        aria-label={`${item.name} - ${item.subtext}`}
                      >
                        {buttonContent}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={
                          item.isExternal ? "noopener noreferrer" : undefined
                        }
                        onClick={handleItemClick}
                        tabIndex={isOpen ? 0 : -1}
                        className={`outline-none focus-visible:ring-2 focus-visible:ring-accent-red rounded-full block ${
                          isOpen ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                        aria-label={`${item.name} - ${item.subtext}`}
                      >
                        {buttonContent}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Trigger Button */}
        <div className="relative pointer-events-auto">
          {/* Subtle Ripple/Pulse Animation when closed */}
          {!isOpen && (
            <>
              <span className="absolute -inset-1.5 rounded-full bg-accent-red/25 animate-ping pointer-events-none opacity-75" />
              <span className="absolute -inset-1 rounded-full border-2 border-accent-red/40 animate-pulse pointer-events-none" />
            </>
          )}

          <motion.button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={
              isOpen ? "Đóng danh sách liên hệ" : "Mở danh sách liên hệ nhanh"
            }
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 outline-none focus-visible:ring-4 focus-visible:ring-accent-red/40 ${
              isOpen
                ? "bg-zinc-800 dark:bg-zinc-700 shadow-zinc-900/30"
                : "bg-gradient-to-tr from-accent-red via-[#f01c24] to-rose-600 shadow-red-500/40 hover:shadow-red-500/50"
            }`}
          >
            {/* Animated Icon Rotation */}
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <BsChatDotsFill className="w-6 h-6 sm:w-7 sm:h-7" />
              )}
            </motion.div>

            {/* Notification Indicator Dot when closed */}
            {!isOpen && (
              <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-zinc-900 shadow-sm" />
            )}
          </motion.button>

          {/* Hover Tooltip when closed */}
          {!isOpen && (
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-zinc-900/90 dark:bg-zinc-800/90 text-white text-xs font-medium whitespace-nowrap shadow-lg backdrop-blur-md opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-200 hidden sm:block">
              Hỗ trợ & Liên hệ
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-zinc-900/90 dark:border-l-zinc-800/90" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
