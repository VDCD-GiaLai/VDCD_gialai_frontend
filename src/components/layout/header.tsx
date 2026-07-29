"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX, FiFileText } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";

const emptySubscribe = () => () => {};

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
  }

  /* ── GSAP-powered scroll detection (replaces raw scroll listener) ── */
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: "50px top",
      end: 99999,
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    return () => st.kill();
  }, []);

  /* ── Mobile menu GSAP animation ── */
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    // Build a timeline but keep it paused
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      menuRef.current,
      { height: 0, opacity: 0, display: "none" },
      {
        height: "auto",
        opacity: 1,
        display: "flex",
        duration: 0.25,
        ease: "power2.inOut",
      },
    );

    menuTlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!menuTlRef.current) return;

    if (isMobileMenuOpen) {
      menuTlRef.current.play();
    } else {
      menuTlRef.current.reverse();
    }
  }, [isMobileMenuOpen]);

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
          className={`hidden lg:flex items-center gap-5 xl:gap-7 font-mono-label text-xs uppercase tracking-wider transition-colors duration-300 ${
            showSolidHeader
              ? "text-zinc-700 dark:text-zinc-300"
              : "text-zinc-200/90"
          }`}
        >
          <Link
            href="/about-us"
            className={`hover:text-accent-red transition-colors ${
              pathname === "/about-us" ? "text-accent-red font-semibold" : ""
            }`}
          >
            Về chúng tôi
          </Link>
          <a
            href="#programs"
            className="hover:text-accent-red transition-colors"
          >
            Chương trình
          </a>
          <Link
            href="/solution"
            className={`hover:text-accent-red transition-colors ${
              pathname === "/solution" || pathname.startsWith("/solution/")
                ? "text-accent-red font-semibold"
                : ""
            }`}
          >
            Giải pháp
          </Link>
          <Link
            href="/projects"
            className="hover:text-accent-red transition-colors"
          >
            Dự án
          </Link>
          <a href="#news" className="hover:text-accent-red transition-colors">
            Tin tức
          </a>
          <Link
            href="/careers"
            className={`hover:text-accent-red transition-colors ${
              pathname === "/careers" ? "text-accent-red font-semibold" : ""
            }`}
          >
            Tuyển dụng
          </Link>
          <a
            href="#contact"
            className="hover:text-accent-red transition-colors"
          >
            Liên hệ
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* Action CTA Button: Capacity Profile */}
          <a href="#capacity-profile">
            <Button
              color="primary"
              className="bg-accent-red hover:bg-accent-red-hover text-white font-mono-label text-xs tracking-wider uppercase font-bold px-3 sm:px-4"
              trailingIcon={<FiFileText className="w-3.5 h-3.5" />}
            >
              Hồ sơ năng lực
            </Button>
          </a>

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

      {/* Mobile Menu Panel — GSAP animated (replaces AnimatePresence) */}
      <div
        ref={menuRef}
        style={{ height: 0, opacity: 0, display: "none" }}
        className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md overflow-hidden flex-col font-mono-label text-xs uppercase tracking-wider divide-y divide-zinc-100 dark:divide-zinc-900/50"
      >
        <a
          href="#about"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Về chúng tôi
        </a>
        <a
          href="#programs"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Chương trình
        </a>
        <Link
          href="/solution"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Giải pháp
        </Link>
        <Link
          href="/projects"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Dự án
        </Link>
        <a
          href="#news"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Tin tức
        </a>
        <Link
          href="/careers"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Tuyển dụng
        </Link>
        <a
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-zinc-800 dark:text-zinc-200 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors"
        >
          Liên hệ
        </a>
        <a
          href="#capacity-profile"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-6 py-3.5 text-accent-red font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors flex items-center gap-2"
        >
          <FiFileText className="w-4 h-4" />
          Hồ sơ năng lực
        </a>
      </div>
    </header>
  );
}
