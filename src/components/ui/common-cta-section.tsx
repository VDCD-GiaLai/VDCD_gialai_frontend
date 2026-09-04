"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Envelope,
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Phone,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export type CtaIconType =
  "envelope" | "arrow-up-right" | "arrow-right" | "arrow-down" | "phone";

export interface CommonCtaButton {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: CtaIconType | React.ReactNode;
  variant?: "primary" | "secondary";
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
}

export interface CommonCtaSectionProps {
  /** Eyebrow tag với chấm đỏ animate-pulse (Mặc định: "Năng lực chuyển đổi số") */
  badge?: string;
  /** Tiêu đề chính (Mặc định: "Hơn 100+ Công trình Trọng điểm trên Toàn Quốc") */
  title?: React.ReactNode;
  /** Mô tả phụ */
  description?: string;
  /** Nút chính bên trái (Mặc định: "Liên hệ tư vấn giải pháp" -> /contact) */
  primaryButton?: CommonCtaButton | null;
  /** Nút phụ bên phải (Mặc định: "Khám phá giải pháp" -> mở Mega Menu) */
  secondaryButton?: CommonCtaButton | null;
  /** ID phần tử HTML (cho anchor navigation như #contact) */
  id?: string;
  /** CSS class cho khối ngoài cùng */
  className?: string;
  /** CSS class cho container bên trong */
  containerClassName?: string;
  /** Có bọc trong thẻ section + container max-w-7xl không? (Mặc định: true) */
  standalone?: boolean;
}

function renderIcon(
  icon: CtaIconType | React.ReactNode | undefined,
  defaultIcon: React.ReactNode,
) {
  if (!icon) return defaultIcon;
  if (typeof icon !== "string") return icon;
  switch (icon) {
    case "envelope":
      return <Envelope className="w-4 h-4" weight="thin" />;
    case "arrow-up-right":
      return <ArrowUpRight className="w-4 h-4" weight="thin" />;
    case "arrow-right":
      return <ArrowRight className="w-4 h-4" weight="thin" />;
    case "arrow-down":
      return <ArrowDown className="w-4 h-4" weight="thin" />;
    case "phone":
      return <Phone className="w-4 h-4" weight="thin" />;
    default:
      return defaultIcon;
  }
}

function CtaButtonComponent({
  button,
  variant,
}: {
  button: CommonCtaButton;
  variant: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";
  const defaultIcon = isPrimary ? (
    <Envelope className="w-4 h-4" weight="thin" />
  ) : (
    <ArrowUpRight className="w-4 h-4" weight="thin" />
  );

  const innerContent = (
    <>
      <span>{button.label}</span>
      <span
        className={cn(
          "w-8 h-8 flex items-center justify-center text-inherit transition-colors shrink-0",
          isPrimary
            ? "bg-white/10 dark:bg-black/10 group-hover:bg-white/20 dark:group-hover:bg-black/20"
            : "bg-zinc-100 dark:bg-white/10 group-hover:bg-accent-red/10 dark:group-hover:bg-white/20",
        )}
      >
        {renderIcon(button.icon, defaultIcon)}
      </span>
    </>
  );

  const classes = isPrimary
    ? cn(
        "inline-flex items-center gap-3 pl-6 pr-4 py-3 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white dark:hover:bg-accent-red dark:hover:text-white transition-all duration-300 shadow-lg group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer",
        button.className,
      )
    : cn(
        "inline-flex items-center gap-3 pl-6 pr-4 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold uppercase tracking-widest hover:border-accent-red hover:text-accent-red dark:hover:border-accent-red dark:hover:text-accent-red transition-all duration-300 backdrop-blur-sm group focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:outline-none cursor-pointer",
        button.className,
      );

  if (button.onClick || !button.href) {
    return (
      <button
        type="button"
        onClick={button.onClick}
        className={classes}
        aria-label={button.ariaLabel || button.label}
      >
        {innerContent}
      </button>
    );
  }

  const isExternal =
    button.href.startsWith("http") ||
    button.href.startsWith("mailto:") ||
    button.href.startsWith("tel:") ||
    button.href.startsWith("#");

  if (isExternal) {
    return (
      <a
        href={button.href}
        className={classes}
        target={button.target}
        rel={
          button.rel ||
          (button.target === "_blank" ? "noopener noreferrer" : undefined)
        }
        aria-label={button.ariaLabel || button.label}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <Link
      href={button.href}
      className={classes}
      target={button.target}
      rel={button.rel}
      aria-label={button.ariaLabel || button.label}
    >
      {innerContent}
    </Link>
  );
}

export function CommonCtaSection({
  badge = "Năng lực chuyển đổi số",
  title = "Hơn 100+ Công trình Trọng điểm trên Toàn Quốc",
  description = "Hãy liên hệ để kết nối công nghệ, chuyên gia và hệ sinh thái, cùng đưa chuyển đổi số vào thực tiễn.",
  primaryButton,
  secondaryButton,
  id,
  className,
  containerClassName,
  standalone = true,
}: CommonCtaSectionProps) {
  // Default primary button if undefined (not null)
  const resolvedPrimary: CommonCtaButton | null =
    primaryButton === undefined
      ? {
          label: "Liên hệ tư vấn giải pháp",
          href: "/contact",
          icon: "envelope",
          variant: "primary",
        }
      : primaryButton;

  // Default secondary button if undefined (not null)
  const resolvedSecondary: CommonCtaButton | null =
    secondaryButton === undefined
      ? {
          label: "Khám phá giải pháp",
          onClick: () => {
            window.dispatchEvent(new CustomEvent("open-mega-menu"));
          },
          icon: "arrow-up-right",
          variant: "secondary",
        }
      : secondaryButton;

  const content = (
    <motion.div
      className="relative text-center w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 md:p-16 space-y-6 relative overflow-hidden transition-all duration-300">
        {/* Eyebrow badge */}
        {badge && (
          <div className="flex items-center justify-center gap-2 text-accent-red font-mono text-xs font-bold uppercase tracking-widest mb-1">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            {badge}
          </div>
        )}

        {/* Headline */}
        {title && (
          <h3 className="text-2xl md:text-4xl font-bold font-heading tracking-tight uppercase max-w-4xl mx-auto leading-tight text-zinc-950 dark:text-white transition-colors duration-300">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed pb-4 transition-colors duration-300 font-sans">
            {description}
          </p>
        )}

        {/* Dual Action Buttons */}
        {(resolvedPrimary || resolvedSecondary) && (
          <div className="flex flex-wrap justify-center gap-4 pt-2 relative z-10">
            {resolvedPrimary && (
              <CtaButtonComponent button={resolvedPrimary} variant="primary" />
            )}
            {resolvedSecondary && (
              <CtaButtonComponent
                button={resolvedSecondary}
                variant="secondary"
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (!standalone) {
    return (
      <div id={id} className={className}>
        {content}
      </div>
    );
  }

  return (
    <section
      id={id}
      className={cn("w-full py-12 md:py-16", className)}
      aria-label={typeof badge === "string" ? badge : "Kêu gọi hành động"}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName,
        )}
      >
        {content}
      </div>
    </section>
  );
}
