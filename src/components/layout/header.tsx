"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiLogIn, FiLayout } from "react-icons/fi";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "https://vdcd.vn/wp-content/uploads/2024/03/Logo-VDCD-01.png"
      : "https://vdcd.vn/wp-content/uploads/2025/10/cropped-cropped-LogoFull_KhongNen_DenDo-1-2.png";

  return (
    <header className="bg-canvas-white dark:bg-zinc-950 text-on-surface border-b border-whisper-border/50 sticky top-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center h-20 px-6 md:px-12">
        <Link href={APP_ROUTES.HOME} className="flex items-center gap-2">
          <div className="relative w-32 h-12">
            <Image
              alt="VDCD Logo"
              fill
              priority
              sizes="128px"
              className="object-contain"
              src={logoSrc}
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-mono-label text-xs uppercase tracking-wider text-secondary">
          <a href="#about" className="hover:text-accent-red transition-colors">
            Về chúng tôi
          </a>
          <a
            href="#solutions"
            className="hover:text-accent-red transition-colors"
          >
            Giải pháp
          </a>
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
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="text-secondary dark:text-zinc-400 hover:text-accent-red"
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
            <Link href={APP_ROUTES.DASHBOARD} passHref legacyBehavior>
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
            <Link href={APP_ROUTES.LOGIN} passHref legacyBehavior>
              <Button
                color="primary"
                className="bg-accent-red hover:bg-accent-red-hover text-white font-mono-label text-xs tracking-wider uppercase font-bold"
                trailingIcon={<FiLogIn className="w-3.5 h-3.5" />}
              >
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
