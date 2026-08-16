"use client";

import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, List, X, FileText } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";
import { useMegaMenu } from "@/components/layout/mega-menu";
import { FiFileText } from "react-icons/fi";

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

  /** Pages with a full-viewport hero banner that need a transparent header */
  const HERO_BANNER_PATHS = new Set([
    "/",
    "/programs",
    "/solution",
    "/projects",
    "/news",
    "/contact",
    "/careers",
  ]);
  const hasHeroBanner = HERO_BANNER_PATHS.has(pathname);

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
      { height: 0, display: "none" },
      {
        height: "auto",
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

  const showSolidHeader = !hasHeroBanner || isScrolled || isMobileMenuOpen;

  const handleMobileNavigate = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const megaMenu = useMegaMenu({
    showSolidHeader,
    pathname,
    onMobileNavigate: handleMobileNavigate,
  });

  const logoSrc = React.useMemo(() => {
    if (!mounted) {
      return hasHeroBanner
        ? "/VDCD_gialai_white.webp"
        : "/VDCD_gialai_black.webp";
    }

    if (!showSolidHeader) {
      // Dark background at the top of hero banner pages -> use white logo
      return "/VDCD_gialai_white.webp";
    }

    return resolvedTheme === "dark"
      ? "/VDCD_gialai_white.webp"
      : "/VDCD_gialai_black.webp";
  }, [mounted, hasHeroBanner, showSolidHeader, resolvedTheme]);

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
          <div className="relative sm:w-[300px] sm:h-[80px] w-[220px] h-[80px]">
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
          className={`hidden xl:flex items-center gap-5 xl:gap-7 font-mono-label text-xs uppercase tracking-wider transition-colors duration-300 ${
            showSolidHeader
              ? "text-zinc-700 dark:text-zinc-300"
              : "text-zinc-200/90"
          }`}
        >
          <Link
            href="/about-us"
            className={`hover:text-primary transition-colors ${
              pathname === "/about-us" ? "text-primary font-semibold" : ""
            }`}
          >
            Về chúng tôi
          </Link>
          {megaMenu.desktop}
          <Link
            href="/projects"
            className={`hover:text-primary transition-colors ${
              pathname === "/projects" || pathname.startsWith("/projects/")
                ? "text-primary font-semibold"
                : ""
            }`}
          >
            Dự án
          </Link>
          <Link
            href="/news"
            className={`hover:text-primary transition-colors ${
              pathname === "/news" || pathname.startsWith("/news/")
                ? "text-primary font-semibold"
                : ""
            }`}
          >
            Tin tức
          </Link>
          <Link
            href="/careers"
            className={`hover:text-primary transition-colors ${
              pathname === "/careers" ? "text-primary font-semibold" : ""
            }`}
          >
            Tuyển dụng
          </Link>
          <Link
            href="/contact"
            className={`hover:text-primary transition-colors ${
              pathname === "/contact" ? "text-primary font-semibold" : ""
            }`}
          >
            Liên hệ
          </Link>
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
              aria-label={
                theme === "dark"
                  ? "Chuyển sang giao diện sáng"
                  : "Chuyển sang giao diện tối"
              }
              className={`transition-colors duration-300 ${
                showSolidHeader
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-accent-red"
                  : "text-zinc-200 hover:text-white"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" weight="thin" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" weight="thin" aria-hidden="true" />
              )}
            </Button>
          )}

          <Button
            as="a"
            href="/company-profile"
            target="_blank"
            rel="noopener noreferrer"
            startContent={<FiFileText className="w-4 h-4" aria-hidden="true" />}
            className="hidden md:inline-flex bg-black dark:bg-white text-white dark:text-black font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white hover:text-white transition-all duration-300 rounded-none"
          >
            Hồ sơ năng lực
          </Button>

          {/* Hamburger Menu Toggle for Mobile */}
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"
            }
            className={`xl:hidden transition-colors duration-300 ${
              showSolidHeader
                ? "text-zinc-600 dark:text-zinc-400 hover:text-accent-red"
                : "text-zinc-200 hover:text-white"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" weight="thin" aria-hidden="true" />
            ) : (
              <List className="w-5 h-5" weight="thin" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel — GSAP animated (replaces AnimatePresence) */}
      <div
        ref={menuRef}
        style={{ height: 0, display: "none" }}
        className="xl:hidden absolute top-20 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-md overflow-hidden flex-col font-mono-label text-xs uppercase tracking-wider divide-y divide-zinc-100 dark:divide-zinc-900/50"
      >
        <Link
          href="/about-us"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-6 py-3.5 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors ${
            pathname === "/about-us"
              ? "text-accent-red font-semibold bg-zinc-50 dark:bg-zinc-900/40"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          Về chúng tôi
        </Link>
        {megaMenu.mobile}
        <Link
          href="/projects"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-6 py-3.5 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors ${
            pathname === "/projects" || pathname.startsWith("/projects/")
              ? "text-accent-red font-semibold bg-zinc-50 dark:bg-zinc-900/40"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          Dự án
        </Link>
        <Link
          href="/news"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-6 py-3.5 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors ${
            pathname === "/news" || pathname.startsWith("/news/")
              ? "text-accent-red font-semibold bg-zinc-50 dark:bg-zinc-900/40"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          Tin tức
        </Link>
        <Link
          href="/careers"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-6 py-3.5 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors ${
            pathname === "/careers" || pathname.startsWith("/careers/")
              ? "text-accent-red font-semibold bg-zinc-50 dark:bg-zinc-900/40"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          Tuyển dụng
        </Link>
        <Link
          href="/contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-6 py-3.5 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors ${
            pathname === "/contact"
              ? "text-accent-red font-semibold bg-zinc-50 dark:bg-zinc-900/40"
              : "text-zinc-800 dark:text-zinc-200"
          }`}
        >
          Liên hệ
        </Link>
        <a
          href="/company-profile"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden px-6 py-3.5 text-accent-red font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors flex items-center gap-2"
        >
          <FileText className="w-4 h-4" weight="thin" />
          Hồ sơ năng lực
        </a>
      </div>
    </header>
  );
}
