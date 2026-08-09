"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { SOLUTIONS } from "@/data/solution/solutions";
import {
  fetchSolutionsFromApi,
  type SolutionItem,
} from "@/services/solution.service";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/* ────────────────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────────────────── */

interface EcoItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

/* ────────────────────────────────────────────────────────
   CARD — Sun Group-inspired: image bg + overlay + title + number watermark
   ──────────────────────────────────────────────────────── */

function EcosystemCard({ item, index }: { item: EcoItem; index: number }) {
  const isExternal =
    item.href.startsWith("http://") || item.href.startsWith("https://");
  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: item.href };
  const num = String(index + 1);

  return (
    <div className="eco-card group relative flex flex-col justify-between overflow-hidden bg-zinc-900 w-[85vw] sm:w-[50vw] lg:w-[25vw] h-[420px] md:h-[480px] shrink-0 select-none snap-start">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          transformation={[{ width: 600, quality: 80, format: "auto" }]}
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/95 transition-all duration-500" />

      {/* Top Left: Clear & Compact Number Badge */}
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-20 px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono text-sm md:text-base font-bold tracking-wider shadow-md">
        {num}
      </div>

      <div className="relative z-10 p-5"></div>

      {/* Bottom: Title + Description + CTA Link */}
      <div className="relative z-10 p-5 md:p-6 flex flex-col gap-3">
        <h3 className="text-base md:text-lg font-bold text-white leading-snug font-heading line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2 opacity-90 group-hover:opacity-100 transition-all duration-300">
          {item.description}
        </p>
        <LinkComponent
          {...(linkProps as any)}
          className="inline-flex items-center gap-1.5 text-accent-red hover:text-white font-bold font-mono-label text-xs uppercase tracking-wider transition-colors duration-300 w-fit cursor-pointer pt-1"
        >
          Tìm Hiểu Thêm <ArrowUpRight className="w-3.5 h-3.5" weight="bold" />
        </LinkComponent>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────── */

export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [items, setItems] = React.useState<EcoItem[]>(
    SOLUTIONS.map((s) => ({
      id: s.href || s.title,
      title: s.title,
      description: s.description,
      imageUrl: s.imageUrl,
      href: s.href,
    })),
  );

  React.useEffect(() => {
    fetchSolutionsFromApi(50).then((data) => {
      if (data && data.length > 0) {
        setItems(
          SOLUTIONS.map((s) => {
            const apiMatch = data.find(
              (sol) =>
                sol.title.toLowerCase() === s.title.toLowerCase() ||
                sol.slug === s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            );
            return {
              id: s.href || s.title,
              title: s.title,
              description: apiMatch?.description || s.description,
              imageUrl: apiMatch?.thumbnail || s.imageUrl,
              href: apiMatch?.websiteUrl || s.href,
            };
          }),
        );
      }
    });
  }, []);

  /* ── Scroll state tracking ── */
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState, items]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    /* Scroll by 1 card width — matches lg:w-[25vw] */
    const cardWidth =
      el.querySelector(".eco-card")?.clientWidth ?? el.clientWidth / 4;
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  /* GSAP scroll-reveal for header */
  const headerRef = useScrollReveal({
    targets: ".eco-header-reveal",
    options: { y: 28, blur: 4, duration: 0.7 },
  });

  /* GSAP batch reveal for cards */
  useEffect(() => {
    if (!sectionRef.current || items.length === 0) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      gsap.set(".eco-card", {
        autoAlpha: 0,
        y: 20,
        scale: 0.97,
      });

      ScrollTrigger.batch(".eco-card", {
        start: "top 85%",
        once: true,
        onEnter: (elements) =>
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.06,
          }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={sectionRef}
      id="ecosystem"
      className="relative border-t border-whisper-border/30 bg-pure-surface dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      <div
        ref={headerRef}
        className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-5 md:py-8"
      >
        {/* ── Header row: title ── */}
        <div className="eco-header-reveal max-w-xl mb-10 md:mb-14">
          <span className="inline-block font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase mb-3">
            VDCD Group
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tighter text-black dark:text-white leading-[1.15] font-heading">
            Đơn vị thành viên
          </h2>
          <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed mt-3 max-w-lg">
            12 đơn vị chuyên biệt, một hệ sinh thái đồng bộ — từ khảo sát, thiết
            kế, giám sát đến AI và sản xuất nội dung số.
          </p>
        </div>

        {/* ── Horizontal Scroll Track with Side Nav Buttons ── */}
        <div className="relative group/track">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-accent-red text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-110"
            aria-label="Slide trước"
          >
            <ArrowLeft className="w-5 h-5" weight="bold" aria-hidden="true" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-accent-red text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 shadow-xl disabled:opacity-0 disabled:pointer-events-none cursor-pointer hover:scale-110"
            aria-label="Slide sau"
          >
            <ArrowRight className="w-5 h-5" weight="bold" aria-hidden="true" />
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {items.map((sol, i) => (
              <EcosystemCard key={sol.title} item={sol} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
