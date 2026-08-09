"use client";

import { useEffect, useRef } from "react";

interface PdfViewerProps {
  url: string;
  title: string;
}

/**
 * iOS Safari cannot scroll PDFs inside iframes.
 * On iOS → redirect to PDF URL directly (Safari's native PDF viewer).
 * On desktop → render iframe as normal.
 */
export function PdfViewer({ url, title }: PdfViewerProps) {
  const redirected = useRef(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (ios && !redirected.current) {
      redirected.current = true;
      window.location.replace(url);
    }
  }, [url]);

  return (
    <main className="flex-1 relative">
      <div className="absolute inset-0 pointer-events-none z-10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]" />
      <iframe
        src={url}
        title={title}
        className="w-full h-[calc(100dvh-56px)] border-0"
        loading="lazy"
      />
    </main>
  );
}
