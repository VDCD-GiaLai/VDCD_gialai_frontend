"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { SOLUTIONS } from "@/data/solution/solutions";
import {
  fetchSolutionsFromApi,
  type SolutionItem,
} from "@/services/solution.service";
import { gsap, ScrollTrigger } from "@/lib/animations/register-gsap";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/* ── Accent colors for each card (rotated) ──────────────────── */
const ACCENT_COLORS = [
  { ring: "ring-rose-500/20", dot: "bg-rose-500", glow: "shadow-rose-500/10" },
  {
    ring: "ring-amber-500/20",
    dot: "bg-amber-500",
    glow: "shadow-amber-500/10",
  },
  {
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-500",
    glow: "shadow-emerald-500/10",
  },
  { ring: "ring-sky-500/20", dot: "bg-sky-500", glow: "shadow-sky-500/10" },
  {
    ring: "ring-violet-500/20",
    dot: "bg-violet-500",
    glow: "shadow-violet-500/10",
  },
  {
    ring: "ring-orange-500/20",
    dot: "bg-orange-500",
    glow: "shadow-orange-500/10",
  },
];

interface EcoItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

/* ── Single ecosystem card ──────────────────────────────────── */
function EcosystemCard({ item, index }: { item: EcoItem; index: number }) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const isExternal =
    item.href.startsWith("http://") || item.href.startsWith("https://");
  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: item.href };

  return (
    <LinkComponent
      {...(linkProps as any)}
      className={`eco-card group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/40 transition-all duration-500 hover:border-accent-red/30 dark:hover:border-accent-red/40 hover:shadow-xl ${accent.glow} ring-1 ${accent.ring}`}
    >
      {/* Image */}
      <div className="relative h-40 md:h-44 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Index badge */}
        <span
          className={`absolute top-3 left-3 w-7 h-7 rounded-full ${accent.dot} flex items-center justify-center text-[10px] font-bold text-white shadow-md`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Arrow */}
        <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <FiArrowUpRight className="w-3.5 h-3.5 text-white" />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 md:p-5">
        <h3 className="text-sm md:text-[15px] font-bold text-black dark:text-white mb-2 leading-snug font-heading group-hover:text-accent-red transition-colors duration-300 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-secondary dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        {/* Bottom connector line */}
        <div className="mt-4 pt-3 border-t border-zinc-50 dark:border-zinc-800/40 flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${accent.dot} animate-pulse`}
          />
          <span className="text-[10px] font-mono-label text-secondary dark:text-zinc-500 uppercase tracking-widest">
            VDCD Ecosystem
          </span>
        </div>
      </div>
    </LinkComponent>
  );
}

/* ── Hub visual (center of the ecosystem) ───────────────────── */
function HubVisual() {
  return (
    <div className="relative flex items-center justify-center py-8 md:py-0">
      {/* Outer pulsing ring */}
      <div className="absolute w-40 h-40 md:w-52 md:h-52 rounded-full border border-dashed border-accent-red/15 animate-spin [animation-duration:60s]" />
      <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full border border-accent-red/10 animate-spin [animation-duration:30s] [animation-direction:reverse]" />

      {/* Center logo area */}
      <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-accent-red/20 flex flex-col items-center justify-center shadow-xl shadow-accent-red/5">
        <span className="text-accent-red font-heading font-black text-lg md:text-xl tracking-tight">
          VDCD
        </span>
        <span className="text-[8px] md:text-[9px] font-mono-label text-secondary dark:text-zinc-400 uppercase tracking-[0.15em] mt-0.5">
          Group
        </span>
        <span className="absolute -inset-1.5 rounded-2xl border border-accent-red/10 animate-pulse [animation-duration:3s]" />
      </div>

      {/* Orbiting dots (decorative) */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <span
          key={deg}
          className="absolute w-2 h-2 rounded-full bg-accent-red/30"
          style={{
            transform: `rotate(${deg}deg) translateX(72px) rotate(-${deg}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Main export ────────────────────────────────────────────── */
export function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
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

  /* GSAP scroll-reveal for header, hub, and CTA */
  const headerRef = useScrollReveal({
    targets: ".eco-header-reveal",
    options: { y: 28, blur: 4, duration: 0.7 },
  });

  /* GSAP batch reveal for the card grid */
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
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(232,0,2,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,0,2,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div
        ref={headerRef}
        className="relative max-w-[1600px] mx-auto px-4 md:px-8 py-12 md:py-16"
      >
        {/* ── Header + Hub ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-20">
          {/* Text */}
          <div className="eco-header-reveal lg:col-span-7">
            <span className="inline-block font-mono-label text-xs font-bold text-accent-red tracking-widest uppercase mb-4">
              Hệ sinh thái VDCD Group
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tighter text-black dark:text-white mb-5 leading-[1.15] font-heading">
              12 đơn vị chuyên biệt,
              <br className="hidden md:block" />
              một hệ sinh thái đồng bộ
            </h2>
            <p className="text-secondary dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">
              Mỗi trung tâm và viện nghiên cứu trong hệ sinh thái đều đảm nhận
              một mắt xích chiến lược — từ khảo sát bản đồ số, thiết kế BIM,
              giám sát IoT, đến phát triển AI và sản xuất nội dung số — tạo
              thành chuỗi giá trị công nghệ khép kín.
            </p>
          </div>

          {/* Hub visual */}
          <div className="eco-header-reveal hidden lg:flex lg:col-span-5 justify-center">
            <HubVisual />
          </div>
        </div>

        {/* ── Ecosystem Grid ────────────────────────── */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {items.map((sol, i) => (
            <EcosystemCard key={sol.title} item={sol} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ────────────────────────────── */}
        <div className="eco-header-reveal mt-14 md:mt-20 text-center">
          <Link
            href="/solution"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-accent-red/20 text-accent-red font-mono-label text-xs font-bold uppercase tracking-widest hover:bg-accent-red hover:text-white transition-all duration-300 group"
          >
            Khám phá tất cả Giải pháp
            <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
