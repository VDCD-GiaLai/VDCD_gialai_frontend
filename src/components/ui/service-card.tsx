"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  href: string;
  imageUrl: string;
  iconUrl: string;
  description?: string;
  className?: string;
}

export function ServiceCard({
  title,
  href,
  imageUrl,
  iconUrl,
  description,
  className,
}: ServiceCardProps) {
  // Determine if it's an external link or internal route
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className={cn("grid-item w-full", className)}>
      <div className="service-item service-style-5 group relative h-full flex flex-col bg-white dark:bg-zinc-950 border border-whisper-border dark:border-zinc-900 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 rounded-none">
        <LinkComponent
          {...(linkProps as any)}
          className="service-inner flex flex-col h-full cursor-pointer"
        >
          {/* Service Image (Thumbnail) */}
          <div className="service-post-thumbnail relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {/* Service Content */}
          <div className="service-content flex-1 p-6 flex flex-col relative">
            {/* Title */}
            <h3 className="service-title omega text-xl font-bold tracking-tight text-black dark:text-white mt-1 mb-2 font-heading leading-snug group-hover:text-accent-red transition-colors duration-300 line-clamp-2 h-14">
              {title}
            </h3>

            {/* Optional Description */}
            {description && (
              <p className="text-secondary dark:text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {description}
              </p>
            )}

            {/* Read More Link */}
            <div className="service-more-link-wrap style-link mt-auto pt-4 flex items-center border-t border-zinc-50 dark:border-zinc-900/60">
              <span className="service-more-link inline-flex items-center gap-1 text-xs font-mono-label font-bold text-secondary dark:text-zinc-400 uppercase tracking-widest group-hover:text-accent-red transition-colors duration-300">
                Tìm Hiểu Thêm
                <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        </LinkComponent>
      </div>
    </div>
  );
}
