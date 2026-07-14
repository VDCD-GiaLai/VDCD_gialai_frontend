"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiLogIn, FiLayout, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const showSolidHeader = !isHome || isScrolled || isMobileMenuOpen;

  const logoSrc = React.useMemo(() => {
    if (!mounted) {
      return isHome ? "/VDCD_gialai_white.png" : "/VDCD_gialai_black.png";
    }

    if (!showSolidHeader) {
      // Dark background at the top of homepage -> use white logo
      return "/VDCD_gialai_white.png";
    }

    return resolvedTheme === "dark"
      ? "/VDCD_gialai_white.png"
      : "/VDCD_gialai_black.png";
  }, [mounted, isHome, showSolidHeader, resolvedTheme]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 h-20 transition-all duration-300 ${
        showSolidHeader
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm"
          : "bg-transparent backdrop-blur-[5px] border-b border-white/10"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center h-full px-4 md:px-8">
        <Link href={APP_ROUTES.HOME} className="flex items-center gap-2">
          <div className="relative w-[180px] sm:w-[240px] h-[50px] sm:h-[68px]">
            <Image
              alt="VDCD Logo"
              fill
              priority
              sizes="256px"
              className="object-contain"
              src={logoSrc}
            />
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav
          className={`hidden lg:flex items-center gap-8 font-mono-label text-xs uppercase tracking-wider transition-colors duration-300 ${
            showSolidHeader
              ? "text-zinc-700 dark:text-zinc-300"
              : "text-zinc-200/90"
          }`}
        >
          <a href="#about" className="hover:text-accent-red transition-colors">
            Về chúng tôi
          </a>
          <Link
            href="/solution"
            className="hover:text-accent-red transition-colors"
          >
            Giải pháp
          </Link>
          <a
            href="#projects"
            className="hover:text-accent-red transition-colors"
          >
            Dự án
          </a>
          <a
            href="#contact"
            className="hover:text-accent-red transition-colors"
          >
            Liên hệ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`transition-colors duration-300 ${
                showSolidHeader
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-accent-red"
                  : "text-zinc-200 hover:text-white"
              }`}
            >
              {theme === "dark" ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </Button>
          )}
          {/* Auth State Button */}
          {isAuthenticated ? (
            <Link href={APP_ROUTES.DASHBOARD}>
              <Button
                color="primary"
                variant="flat"
                className="font-mono-label text-xs tracking-wider uppercase font-bold text-accent-red bg-accent-red/10 border-accent-red/20 border"
                trailingIcon={<FiLayout className="w-3.5 h-3.5" />}
              >
                Bảng điều khiển
              </Button>
            </Link>
          ) : (
            <Link href={APP_ROUTES.LOGIN}>
              <Button
                color="primary"
                className="bg-accent-red hover:bg-accent-red-hover text-white font-mono-label text-xs tracking-wider uppercase font-bold px-3 sm:px-4"
                trailingIcon={<FiLogIn className="w-3.5 h-3.5" />}
              >
                Đăng nhập
              </Button>
            </Link>
          )}

          {/* Hamburger Menu Toggle for Mobile */}
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className={`lg:hidden transition-colors duration-300 ${
              showSolidHeader
                ? "text-zinc-600 dark:text-zinc-400 hover:text-accent-red"
                : "text-zinc-200 hover:text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md overflow-hidden flex flex-col font-mono-label text-xs uppercase tracking-wider divide-y divide-zinc-100 dark:divide-zinc-900/50"
          >
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              Về chúng tôi
            </a>
            <Link
              href="/solution"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              Giải pháp
            </Link>
            <a
              href="#projects"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              Dự án
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-4 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
            >
              Liên hệ
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
