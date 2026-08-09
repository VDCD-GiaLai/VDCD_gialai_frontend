import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FooterPartners } from "./footer-partners";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FiMapPin, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { APP_ROUTES } from "@/lib/constants";
import {
  fetchOrganizationInfoFromApi,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";

export async function Footer() {
  const orgInfo = await fetchOrganizationInfoFromApi();
  const address = orgInfo?.address || DEFAULT_ORGANIZATION_INFO.address;
  const email =
    orgInfo?.socialLinks?.email || DEFAULT_ORGANIZATION_INFO.socialLinks.email;
  const hotline =
    orgInfo?.socialLinks?.hotline ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.hotline;
  const facebook =
    orgInfo?.socialLinks?.facebook ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.facebook;
  const tiktok =
    orgInfo?.socialLinks?.tiktok ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.tiktok;
  const zalo =
    orgInfo?.socialLinks?.zalo || DEFAULT_ORGANIZATION_INFO.socialLinks.zalo;
  const messenger =
    orgInfo?.socialLinks?.messenger ||
    DEFAULT_ORGANIZATION_INFO.socialLinks.messenger;

  return (
    <footer className="bg-gradient-to-b from-canvas-white via-pure-surface to-slate-50/50 dark:from-[#08080a] dark:via-zinc-950 dark:to-[#0c0c0e] text-secondary border-t border-whisper-border/30 dark:border-zinc-800/40 py-16 px-6 md:px-12 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
        {/* Column 1: Logo & Info */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="relative w-52 h-[100px] -ml-2 -mt-4 mb-2">
            {/* Light Mode Logo */}
            <Image
              alt="VDCD Gia Lai Logo"
              fill
              sizes="208px"
              className="object-contain object-left dark:hidden transition-all duration-300"
              src="/GL_NOBGArtboard 4.webp"
              priority
            />
            {/* Dark Mode Logo */}
            <Image
              alt="VDCD Gia Lai Logo"
              fill
              sizes="208px"
              className="object-contain object-left hidden dark:block transition-all duration-300"
              src="/GL_NOBGArtboard 4_white.webp"
              priority
            />
          </div>
          <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed max-w-[280px] -mt-4">
            Kiến tạo tương lai số bền vững cho doanh nghiệp và cộng đồng tại Gia
            Lai & Tây Nguyên.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-4">
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Trang Facebook chính thức của VDCD Gia Lai"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-300 shadow-xs border border-[#1877F2]/20"
              >
                <FaFacebookF className="text-base" aria-hidden="true" />
              </a>
            )}
            {tiktok && (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kênh TikTok chính thức của VDCD Gia Lai"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:scale-110 transition-all duration-300 shadow-xs border border-zinc-200 dark:border-zinc-700"
              >
                <FaTiktok className="text-base" aria-hidden="true" />
              </a>
            )}
            {zalo && (
              <a
                href={zalo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kênh Zalo chính thức của VDCD Gia Lai"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0068FF]/10 text-[#0068FF] hover:bg-[#0068FF] hover:text-white hover:scale-110 transition-all duration-300 shadow-xs border border-[#0068FF]/20"
              >
                <SiZalo className="text-base" />
              </a>
            )}
            {messenger && (
              <a
                href={messenger}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kênh Messenger nhắn tin của VDCD Gia Lai"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00B2FF]/10 text-[#00B2FF] hover:bg-[#00B2FF] hover:text-white hover:scale-110 transition-all duration-300 shadow-xs border border-[#00B2FF]/20"
              >
                <FiMessageCircle className="text-base" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        {/* Column 2: Liên hệ */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <h3 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Liên hệ
          </h3>
          <div className="flex flex-col gap-4 text-sm text-secondary dark:text-zinc-400">
            <div className="group flex items-start gap-3 transition-colors duration-300">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0 shadow-sm border border-slate-200/20 dark:border-zinc-800/20">
                <FiMapPin className="text-base" />
              </div>
              <span className="leading-relaxed pt-1 select-all font-medium text-slate-600 dark:text-zinc-300 pr-4">
                {address}
              </span>
            </div>

            {hotline && (
              <a
                href={`tel:${hotline}`}
                className="group flex items-center gap-3 transition-colors duration-300 hover:text-accent-red"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0 shadow-sm border border-slate-200/20 dark:border-zinc-800/20">
                  <FiPhone className="text-base" />
                </div>
                <span className="font-semibold text-slate-600 dark:text-zinc-300 group-hover:text-accent-red transition-colors">
                  {hotline}
                </span>
              </a>
            )}

            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-3 transition-colors duration-300 hover:text-accent-red"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100/80 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 group-hover:bg-accent-red/10 group-hover:text-accent-red transition-all duration-300 shrink-0 shadow-sm border border-slate-200/20 dark:border-zinc-800/20">
                <FiMail className="text-base" />
              </div>
              <span className="font-semibold text-slate-600 dark:text-zinc-300 group-hover:text-accent-red transition-colors break-all pr-4">
                {email}
              </span>
            </a>
          </div>
        </div>

        {/* Column 3: Về chúng tôi */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Về chúng tôi
          </h3>
          <Link
            href="/about-us#vision"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Tầm nhìn & Sứ mệnh
            </span>
          </Link>
          <Link
            href="/about-us#stats"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Hệ sinh thái VDCD Group
            </span>
          </Link>
          <a
            href="/company-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Hồ sơ năng lực
            </span>
          </a>
        </div>

        {/* Column 4: Chương trình & Giải pháp */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Chương trình & Giải pháp
          </h3>
          <Link
            href="/programs"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Chương trình đổi mới
            </span>
          </Link>
          <Link
            href="/solution"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Giải pháp công nghệ
            </span>
          </Link>
          <Link
            href="/projects"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Dự án tiêu biểu
            </span>
          </Link>
        </div>

        {/* Column 5: Chính sách & Pháp lý */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <h3 className="font-heading text-xs font-semibold text-black dark:text-white uppercase tracking-widest mb-6 relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-accent-red/70 self-start">
            Chính sách & Pháp lý
          </h3>
          <Link
            href="/policies/dieu-khoan-su-dung"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Điều khoản sử dụng
            </span>
          </Link>
          <Link
            href="/policies/chinh-sach-bao-mat"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Chính sách bảo mật
            </span>
          </Link>
          <Link
            href="/policies/hinh-thuc-thanh-toan"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Hình thức thanh toán
            </span>
          </Link>
          <Link
            href="/policies/van-chuyen-giao-nhan-cung-cap-dich-vu"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Vận chuyển & Giao nhận
            </span>
          </Link>
          <Link
            href="/policies/chinh-sach-doi-tra"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Chính sách đổi trả
            </span>
          </Link>
          <Link
            href="/policies/tiep-nhan-giai-quyet-khieu-nai"
            className="group flex items-center text-sm text-slate-600 dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-all duration-300 py-0.5"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              Giải quyết khiếu nại
            </span>
          </Link>
        </div>
      </div>

      {/* ── Partner Logos (renders on all pages except Homepage & About-Us) ── */}
      <FooterPartners />

      <div className="max-w-[1600px] mx-auto border-t-2 border-slate-200/80 dark:border-zinc-800 pt-6 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-4 text-slate-400 dark:text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} VDCD Group. All rights reserved.</p>
          <span className="hidden md:inline text-slate-300 dark:text-zinc-700">
            •
          </span>
          <Link
            href="/policies/chinh-sach-bao-mat"
            className="hover:text-accent-red transition-colors"
          >
            Chính sách bảo mật
          </Link>
          <span className="text-slate-300 dark:text-zinc-700">•</span>
          <Link
            href="/policies/dieu-khoan-su-dung"
            className="hover:text-accent-red transition-colors"
          >
            Điều khoản sử dụng
          </Link>
          <span className="text-slate-300 dark:text-zinc-700">•</span>
          <Link
            href="/policies/hinh-thuc-thanh-toan"
            className="hover:text-accent-red transition-colors"
          >
            Thanh toán
          </Link>
        </div>
        <p className="text-slate-400 dark:text-zinc-500 font-medium">
          Developed & Designed by{" "}
          <a
            href="https://looperslab.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 dark:text-zinc-300 hover:text-accent-red font-semibold transition-colors"
          >
            LoopersLab
          </a>
        </p>
      </div>
    </footer>
  );
}
