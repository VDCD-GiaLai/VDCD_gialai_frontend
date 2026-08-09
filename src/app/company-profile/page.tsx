import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { DownloadPdfButton } from "./download-button";

/* ── Config ────────────────────────────────────────────── */

const PDF_URL =
  "https://ik.imagekit.io/huy01040104/vdcd/Company%20Profile/HSNL%20VDCD%20GROUP%20update%20dkkd%2006072026%20v11.pdf";

const COMPANY_NAME = "VDCD Group";

/* ── Metadata ──────────────────────────────────────────── */

export const metadata: Metadata = {
  title: `Hồ sơ năng lực | ${COMPANY_NAME}`,
  description: `Xem hồ sơ năng lực của ${COMPANY_NAME} — Chuyển đổi số & Đổi mới sáng tạo tại Gia Lai.`,
  robots: "noindex",
};

/* ── Page ──────────────────────────────────────────────── */

export default function CompanyProfilePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f0f0f0] dark:bg-zinc-950">
      {/* ── Floating toolbar ───────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-center justify-between h-14 px-4 md:px-6 max-w-[2000px] mx-auto">
          {/* Back */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200"
            aria-label="Quay lại trang chủ"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Quay lại</span>
          </Link>

          {/* Center — logo + title */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ik.imagekit.io/huy01040104/vdcd/images/logo%20V%20only.svg?updatedAt=1785398459426"
              alt="VDCD"
              className="h-6 w-6 object-contain"
            />
            <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-700" />
            <h1 className="text-[13px] font-semibold tracking-wide text-black dark:text-white uppercase whitespace-nowrap">
              Hồ sơ năng lực
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 h-8 px-3 text-[12px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
              aria-label="Mở PDF trong tab mới"
            >
              <FiExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Tab mới</span>
            </a>
            <DownloadPdfButton url={PDF_URL} />
          </div>
        </div>
      </header>

      {/* ── PDF viewer ─────────────────────────────────── */}
      <main className="flex-1 relative">
        {/* Subtle inner shadow to frame the viewer */}
        <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]" />

        <iframe
          src={PDF_URL}
          title="Hồ sơ năng lực VDCD Group"
          className="w-full h-[calc(100dvh-56px)] border-0"
          loading="lazy"
        />
      </main>
    </div>
  );
}
