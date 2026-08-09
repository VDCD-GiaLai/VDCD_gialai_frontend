"use client";

import { useState, useCallback } from "react";
import { FiDownload } from "react-icons/fi";

interface DownloadPdfButtonProps {
  url: string;
  filename?: string;
}

/**
 * Downloads a cross-origin PDF by fetching as blob.
 * The native `<a download>` attribute does NOT work for cross-origin URLs.
 */
export function DownloadPdfButton({
  url,
  filename = "HSNL-VDCD-Group.pdf",
}: DownloadPdfButtonProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }, 100);
    } catch {
      // Fallback: open in new tab
      window.open(url, "_blank");
    } finally {
      setDownloading(false);
    }
  }, [url, filename, downloading]);

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center cursor-pointer justify-center gap-1.5 h-8 px-3.5 text-[12px] font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-accent-red dark:hover:bg-accent-red dark:hover:text-white active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
      aria-label="Tải xuống hồ sơ năng lực PDF"
    >
      {downloading ? (
        <div className="w-3.5 h-3.5 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
      ) : (
        <FiDownload className="w-3.5 h-3.5" />
      )}
      <span className="hidden md:inline">
        {downloading ? "Đang tải..." : "Tải xuống"}
      </span>
    </button>
  );
}
