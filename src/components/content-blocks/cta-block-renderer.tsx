import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import type { CtaBlock, CtaShape, CtaAlign } from "@/types";

interface CtaBlockRendererProps {
  block: CtaBlock;
}

export function CtaBlockRenderer({ block }: CtaBlockRendererProps) {
  const currentShape: CtaShape = block.shape ?? "square";
  const currentAlign: CtaAlign = block.align ?? "center";
  const currentGap = block.gap ?? (block.layout === "flex" ? 8 : 16);
  const currentVariant = block.variant ?? "solid";
  const currentLayout =
    block.layout ?? (block.align === "between" ? "between" : "flex");
  const hasSecondary = Boolean(block.secondaryLabel);
  const isSpaceBetween =
    currentLayout === "between" || currentAlign === "between";

  const shapeClass = currentShape === "pill" ? "rounded-full" : "rounded-lg";

  const alignClass = (() => {
    switch (currentAlign) {
      case "start":
        return "justify-start";
      case "end":
        return "justify-end";
      case "center":
      default:
        return "justify-center";
    }
  })();

  const spacingStyle: React.CSSProperties = {
    marginTop:
      typeof block.spacing?.marginTop === "number"
        ? `${block.spacing.marginTop}px`
        : undefined,
    marginBottom:
      typeof block.spacing?.marginBottom === "number"
        ? `${block.spacing.marginBottom}px`
        : undefined,
  };

  const renderButton = (
    label: string,
    url: string,
    isSecondary: boolean = false,
  ) => {
    const isExternal = url.startsWith("http");
    const isOutline = isSecondary && currentVariant === "outline";

    const buttonClass = isOutline
      ? `group inline-flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-2.5 px-6 py-2.5 text-sm font-semibold border-2 border-[#ca2a30] bg-white dark:bg-zinc-900 text-[#ca2a30] shadow-xs hover:bg-[#ca2a30] hover:text-white transition-all duration-300 hover:-translate-y-0.5 ${shapeClass}`
      : `group inline-flex flex-shrink-0 whitespace-nowrap items-center justify-center gap-2.5 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#ca2a30]/20 hover:shadow-lg hover:shadow-[#ca2a30]/30 hover:-translate-y-0.5 transition-all duration-300 ${
          isSecondary
            ? "bg-gradient-to-r from-[#b82228] to-[#ca2a30]"
            : "bg-gradient-to-r from-[#d32f2f] via-[#ca2a30] to-[#b82228]"
        } ${shapeClass}`;

    const iconBadgeClass = isOutline
      ? "flex h-5 w-5 items-center justify-center rounded-full bg-[#ca2a30]/10 text-[#ca2a30] group-hover:bg-white/20 group-hover:text-white transition-colors duration-300"
      : "flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white transition-transform group-hover:translate-x-0.5";

    const content = (
      <>
        <span>{label}</span>
        <span className={iconBadgeClass}>
          <ArrowRight className="w-3.5 h-3.5" weight="bold" />
        </span>
      </>
    );

    if (isExternal) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={url} className={buttonClass}>
        {content}
      </Link>
    );
  };

  return (
    <div className="w-full my-6" style={spacingStyle}>
      <div
        className={`flex items-center flex-nowrap overflow-x-auto max-w-full py-1 ${
          isSpaceBetween ? "justify-between w-full" : alignClass
        }`}
        style={{ gap: isSpaceBetween ? undefined : `${currentGap}px` }}
      >
        {/* Nút chính */}
        {renderButton(block.label || "Tìm hiểu thêm", block.url || "#", false)}

        {/* Nút phụ (nếu có) */}
        {hasSecondary &&
          renderButton(
            block.secondaryLabel || "Liên hệ",
            block.secondaryUrl || "#",
            true,
          )}
      </div>
    </div>
  );
}
