"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShareNetwork,
  LinkSimple,
  Check,
  QrCode,
  DownloadSimple,
  X,
  EnvelopeSimple,
  Copy,
  DeviceMobile,
} from "@phosphor-icons/react";
import { copyToClipboard, formatDate } from "@/lib/utils";
import type { JobPosition } from "@/types";

interface JobShareActionsProps {
  job: JobPosition;
  variant?: "compact" | "full";
  className?: string;
}

// ── MINIMAL BRAND ICONS ───────────────────────────────────────────────────────

const MessengerIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.455 5.512 3.735 7.168V22l3.418-1.876c.904.25 1.86.386 2.847.386 5.523 0 10-4.145 10-9.252C22 6.145 17.523 2 12 2z"
      fill="url(#msg-clean-grad)"
    />
    <path
      d="M6.5 14.2l3.5-5.5 2.5 2.5 4.5-4-3.5 5.5-2.5-2.5-4.5 4z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="msg-clean-grad"
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00B2FF" />
        <stop offset="0.5" stopColor="#006AFF" />
        <stop offset="1" stopColor="#9B00E8" />
      </linearGradient>
    </defs>
  </svg>
);

const ZaloIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.03 2 11c0 2.87 1.5 5.43 3.84 7.03-.17.95-.62 2.7-1.8 3.97 1.95 0 3.87-.84 5.09-1.82.91.24 1.87.37 2.87.37 5.52 0 10-4.03 10-9s-4.48-9-10-9zm.27 12.38h-3.4c-.23 0-.42-.19-.42-.42 0-.15.08-.28.2-.36l2.76-3.23h-2.5c-.23 0-.42-.19-.42-.42s.19-.42.42-.42h3.36c.23 0 .42.19.42.42 0 .15-.08.28-.2.36l-2.76 3.23h2.54c.23 0 .42.19.42.42s-.19.42-.42.42zm4.18 0h-.84c-.23 0-.42-.19-.42-.42V9.95c0-.23.19-.42.42-.42h.84c.23 0 .42.19.42.42v3.99c0 .23-.19.44-.42.44z" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TelegramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.6 7.55c-.12.55-.45.68-.9.43l-2.47-1.82-1.19 1.15c-.13.13-.24.24-.49.24l.18-2.51 4.57-4.13c.2-.18-.04-.27-.31-.1l-5.65 3.56-2.43-.76c-.53-.16-.54-.53.11-.79l9.5-3.66c.44-.16.83.11.67.84z" />
  </svg>
);

const PRODUCTION_SITE_URL = "https://doimoisangtaogialai.vn";
const emptySubscribe = () => () => {};

export function JobShareActions({
  job,
  variant = "compact",
  className = "",
}: JobShareActionsProps) {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedPost, setCopiedPost] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [showQr, setShowQr] = React.useState(false);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  // Close modal on Escape
  React.useEffect(() => {
    if (!isOpenModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpenModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpenModal]);

  // Subtle auto-dismiss feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // URL generator
  const getJobUrl = React.useCallback(
    (source?: string, forcePublic = false) => {
      let origin = PRODUCTION_SITE_URL;
      if (typeof window !== "undefined") {
        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";
        if (!forcePublic && !isLocal) {
          origin = window.location.origin;
        }
      }
      const base = `${origin}/careers?job=${encodeURIComponent(job.id)}`;
      const utm = source ? `&utm_source=${source}&utm_medium=share` : "";
      return `${base}${utm}#job-${encodeURIComponent(job.id)}`;
    },
    [job.id],
  );

  // Clean structured recruitment post
  const getRecruitmentPostText = React.useCallback(
    (source?: string) => {
      const url = getJobUrl(source || "quick_share", true);
      const lines = [
        `[TUYỂN DỤNG] ${job.title} — VDCD GIA LAI`,
        `• Phòng ban: ${job.department}`,
        `• Địa điểm: ${job.location}`,
        `• Mức lương: ${job.salary || "Thỏa thuận"}`,
        `• Kinh nghiệm: ${job.experience}`,
        job.deadline ? `• Hạn nộp: ${formatDate(job.deadline)}` : null,
        ``,
        `Chi tiết & Nộp hồ sơ tại: ${url}`,
      ];
      return lines.filter(Boolean).join("\n");
    },
    [job, getJobUrl],
  );

  // Copy Direct Link
  const handleCopyLink = async () => {
    const url = getJobUrl("copy_link");
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopiedLink(true);
      showToast("Đã sao chép liên kết vào bộ nhớ tạm");
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Copy Formatted Text
  const handleCopyPost = async () => {
    const text = getRecruitmentPostText("formatted_post");
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedPost(true);
      showToast("Đã sao chép nội dung tóm tắt để gửi Zalo / Facebook");
      setTimeout(() => setCopiedPost(false), 2000);
    }
  };

  // Messenger
  const handleShareMessenger = async () => {
    const url = getJobUrl("messenger", true);
    await copyToClipboard(getRecruitmentPostText("messenger"));

    const isMobile =
      typeof navigator !== "undefined" &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `fb-messenger://share/?link=${encodeURIComponent(url)}`;
      setTimeout(() => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
      }, 500);
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank",
        "noopener,noreferrer,width=650,height=550",
      );
    }

    showToast("Đã mở Messenger & sao chép nội dung tin đăng vào bộ nhớ tạm");
  };

  // Zalo
  const handleShareZalo = async () => {
    const url = getJobUrl("zalo", true);
    await copyToClipboard(getRecruitmentPostText("zalo"));
    window.open(
      `https://zalo.me/share?url=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=550",
    );
    showToast("Đã mở Zalo & sao chép nội dung tin đăng vào bộ nhớ tạm");
  };

  // Facebook
  const handleShareFacebook = async () => {
    const url = getJobUrl("facebook", true);
    await copyToClipboard(getRecruitmentPostText("facebook"));
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer,width=650,height=550",
    );
    showToast("Đã mở Facebook & sao chép nội dung tin đăng vào bộ nhớ tạm");
  };

  // Telegram
  const handleShareTelegram = () => {
    const url = getJobUrl("telegram", true);
    const summary = `[Tuyển dụng] ${job.title} (${job.department}) - Lương: ${job.salary || "Thỏa thuận"} | Địa điểm: ${job.location}`;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener,noreferrer,width=600,height=550",
    );
    showToast("Đã mở Telegram với thông tin tuyển dụng");
  };

  // Email
  const handleShareEmail = () => {
    const url = getJobUrl("email", true);
    const subject = `[Cơ hội nghề nghiệp] Vị trí ${job.title} tại VDCD Gia Lai`;
    const body = `Chào bạn,\n\nMình thấy vị trí "${job.title}" tại VDCD Gia Lai rất phù hợp với chuyên môn của bạn:\n\n- Phòng ban: ${job.department}\n- Địa điểm: ${job.location}\n- Mức lương: ${job.salary || "Thỏa thuận"}\n- Kinh nghiệm: ${job.experience}\n${job.deadline ? `- Hạn nộp: ${formatDate(job.deadline)}\n` : ""}\nXem chi tiết và ứng tuyển tại:\n${url}\n\nThân mến!`;

    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showToast("Đã mở ứng dụng Email với nội dung soạn sẵn");
  };

  // Native share
  const handleNativeShare = async () => {
    const url = getJobUrl("native_share", true);
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share({
          title: `[Tuyển dụng] ${job.title} — VDCD Gia Lai`,
          text: `Vị trí: ${job.title} (${job.department}) - Lương: ${job.salary || "Thỏa thuận"}`,
          url,
        });
      } catch (err: unknown) {
        if ((err as Error).name !== "AbortError") {
          console.error("Native share error:", err);
        }
      }
    }
  };

  const hasNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(
    getJobUrl("qr_code", true),
  )}`;

  return (
    <div
      className={`inline-flex items-center relative ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Single Clean Trigger Button ── */}
      {variant === "compact" ? (
        <button
          type="button"
          onClick={() => setIsOpenModal(true)}
          title="Chia sẻ cơ hội việc làm này"
          aria-label="Chia sẻ bài tuyển dụng"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-xs cursor-pointer"
        >
          <ShareNetwork className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>Chia sẻ</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpenModal(true)}
          title="Chia sẻ cơ hội việc làm này"
          aria-label="Chia sẻ cơ hội việc làm này"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors shadow-xs cursor-pointer"
        >
          <ShareNetwork className="w-4 h-4" />
          <span>Chia sẻ cơ hội này</span>
        </button>
      )}

      {/* ── Refined Anti-Slop Modal ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpenModal && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-xs"
                  onClick={() => setIsOpenModal(false)}
                />

                {/* Modal Window */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="relative w-full max-w-[430px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-10 font-sans"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="space-y-0.5 pr-2">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        Chia sẻ vị trí tuyển dụng
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {job.title} • {job.department}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpenModal(false)}
                      className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      aria-label="Đóng"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4">
                    {/* 1. Direct Link Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={getJobUrl("copy_link")}
                        className="flex-1 px-3 py-2 text-xs bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 font-mono select-all focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                      />
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-black dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 transition-colors shadow-xs cursor-pointer"
                      >
                        {copiedLink ? (
                          <>
                            <Check
                              className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600"
                              weight="bold"
                            />
                            <span>Đã chép</span>
                          </>
                        ) : (
                          <>
                            <LinkSimple className="w-3.5 h-3.5" weight="bold" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* 2. Platform Circles (Clean, Refined, No loud backgrounds) */}
                    <div className="pt-1">
                      <div className="flex items-center justify-around gap-2">
                        {/* Messenger */}
                        <button
                          type="button"
                          onClick={handleShareMessenger}
                          className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <MessengerIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            Messenger
                          </span>
                        </button>

                        {/* Zalo */}
                        <button
                          type="button"
                          onClick={handleShareZalo}
                          className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-blue-500 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <ZaloIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            Zalo
                          </span>
                        </button>

                        {/* Facebook */}
                        <button
                          type="button"
                          onClick={handleShareFacebook}
                          className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-[#1877F2] group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <FacebookIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            Facebook
                          </span>
                        </button>

                        {/* Telegram */}
                        <button
                          type="button"
                          onClick={handleShareTelegram}
                          className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-[#229ED9] group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <TelegramIcon className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            Telegram
                          </span>
                        </button>

                        {/* Email */}
                        <button
                          type="button"
                          onClick={handleShareEmail}
                          className="flex flex-col items-center gap-1.5 group cursor-pointer"
                        >
                          <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                            <EnvelopeSimple className="w-5 h-5" />
                          </div>
                          <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                            Email
                          </span>
                        </button>

                        {/* Device / Native */}
                        {hasNativeShare && (
                          <button
                            type="button"
                            onClick={handleNativeShare}
                            className="flex flex-col items-center gap-1.5 group cursor-pointer"
                          >
                            <div className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors">
                              <DeviceMobile className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                              Khác
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* 3. Utilities Bar */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPost}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        {copiedPost ? (
                          <>
                            <Check
                              className="w-3.5 h-3.5 text-emerald-500"
                              weight="bold"
                            />
                            <span className="text-emerald-600 dark:text-emerald-400">
                              Đã chép nội dung tin
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Chép nội dung tóm tắt</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowQr((v) => !v)}
                        className={`inline-flex items-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                          showQr
                            ? "border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                            : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Mã QR</span>
                      </button>
                    </div>

                    {/* 4. Collapsible QR Code Panel */}
                    {showQr && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="p-3.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-xl flex items-center gap-3.5"
                      >
                        <div className="p-1.5 bg-white rounded-lg border border-zinc-200 shadow-2xs shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={qrImageUrl}
                            alt="Mã QR tuyển dụng"
                            width={76}
                            height={76}
                            className="w-19 h-19 object-contain"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                            Quét camera để xem trên điện thoại
                          </p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            Ứng viên có thể mở và nộp CV trực tiếp
                          </p>
                          <a
                            href={qrImageUrl}
                            target="_blank"
                            rel="noreferrer"
                            download={`QR-${job.slug || job.id}.png`}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-900 dark:text-zinc-100 hover:underline pt-0.5"
                          >
                            <DownloadSimple className="w-3 h-3" />
                            <span>Tải ảnh QR</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Subtle Minimal Toast */}
                  <AnimatePresence>
                    {toastMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs flex items-center justify-between"
                      >
                        <span className="truncate">{toastMessage}</span>
                        <button
                          type="button"
                          onClick={() => setToastMessage(null)}
                          className="ml-2 text-zinc-400 hover:text-white dark:hover:text-zinc-900"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
