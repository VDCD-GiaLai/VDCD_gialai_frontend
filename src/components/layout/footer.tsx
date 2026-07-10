import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiMail } from "react-icons/fi";
import { APP_ROUTES } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-canvas-white via-pure-surface to-slate-50/50 dark:from-[#08080a] dark:via-zinc-950 dark:to-[#0c0c0e] text-secondary border-t border-whisper-border/30 dark:border-zinc-800/40 py-16 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
        <div className="col-span-1 flex flex-col gap-4">
          <div className="relative w-52 h-[100px] -ml-2 -mt-4 mb-2">
            {/* Light Mode Logo */}
            <Image
              alt="VDCD Gia Lai Logo"
              fill
              sizes="208px"
              className="object-contain object-left dark:hidden transition-all duration-300"
              src="/GL_NOBGArtboard 4.png"
              priority
            />
            {/* Dark Mode Logo */}
            <Image
              alt="VDCD Gia Lai Logo"
              fill
              sizes="208px"
              className="object-contain object-left hidden dark:block transition-all duration-300"
              src="/GL_NOBGArtboard 4_white.png"
              priority
            />
          </div>
          <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm -mt-4">
            Kiến tạo tương lai số bền vững cho doanh nghiệp và cộng đồng tại Gia
            Lai & Tây Nguyên.
          </p>
          <div className="flex flex-col gap-3.5 mt-6 text-sm text-secondary dark:text-zinc-400">
            <div className="group flex items-start gap-3 transition-colors duration-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0 shadow-sm border border-slate-200/20 dark:border-zinc-800/20">
                <FiMapPin className="text-base" />
              </div>
              <span className="leading-relaxed pt-1 select-all font-medium text-slate-600 dark:text-zinc-300">
                01 Trần Hưng Đạo, TP. Pleiku, Gia Lai
              </span>
            </div>
            <a
              href="mailto:contact@vdcdgroup.vn"
              className="group flex items-center gap-3 transition-colors duration-300 hover:text-accent-red"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0 shadow-sm border border-slate-200/20 dark:border-zinc-800/20">
                <FiMail className="text-base" />
              </div>
              <span className="font-semibold text-slate-600 dark:text-zinc-300 group-hover:text-accent-red transition-colors">
                contact@vdcdgroup.vn
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Về chúng tôi
          </h4>
          <a
            href="#about"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Tầm nhìn & Sứ mệnh
            </span>
          </a>
          <a
            href="#about"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Ban lãnh đạo
            </span>
          </a>
          <a
            href="#about"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Mạng lưới đối tác
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Giải pháp
          </h4>
          <Link
            href="/solution"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Chuyển đổi số
            </span>
          </Link>
          <Link
            href="/solution"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Nông nghiệp thông minh
            </span>
          </Link>
          <Link
            href="/solution"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Đô thị số
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Thông tin
          </h4>
          <a
            href="#projects"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Dự án tiêu biểu
            </span>
          </a>
          <a
            href="#contact"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Liên hệ
            </span>
          </a>
          <Link
            href={APP_ROUTES.LOGIN}
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Cổng thông tin đối tác
            </span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto border-t border-whisper-border/30 dark:border-zinc-800/40 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
        <p className="text-slate-400 dark:text-zinc-500 font-medium">
          © {new Date().getFullYear()} VDCD Group. All rights reserved.
        </p>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/80 dark:bg-zinc-900/40 border border-slate-200/30 dark:border-zinc-800/40 font-heading text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-400 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
          <span>Thiết kế bởi Vanguard UI Architect</span>
        </div>
      </div>
    </footer>
  );
}
