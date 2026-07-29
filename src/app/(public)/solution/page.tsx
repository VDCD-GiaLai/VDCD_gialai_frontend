"use client";

import React, { useEffect, useRef } from "react";
import { ServiceCard } from "@/components/ui/service-card";
import { CAPABILITY_SOLUTIONS } from "@/data/solution/solutions";
import { gsap } from "@/lib/animations/register-gsap";

export default function SolutionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".sol-header", ".sol-card"], { autoAlpha: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Header entrance */
        gsap.from(".sol-header", {
          autoAlpha: 0,
          y: 15,
          duration: 0.6,
          ease: "power3.out",
        });

        /* Staggered card reveal on mount */
        gsap.from(".sol-card", {
          autoAlpha: 0,
          y: 20,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.2,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="w-full min-h-screen bg-canvas-white dark:bg-zinc-950 transition-colors duration-300 pt-28 pb-20"
    >
      {/* Banner / Header Zone */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-12">
        <div className="border-b border-zinc-100 dark:border-zinc-900 pb-8 mb-12">
          <div className="sol-header">
            <span className="font-mono-label text-xs font-bold text-accent-red mb-3 tracking-widest uppercase block">
              giải pháp
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4 uppercase">
              GIẢI PHÁP THEO LĨNH VỰC
            </h1>
            <p className="text-secondary dark:text-zinc-400 max-w-2xl text-sm md:text-base leading-relaxed">
              Khám phá các giải pháp công nghệ toàn diện của chúng tôi, mang lại
              giá trị bền vững và hiệu quả tối ưu cho từng lĩnh vực hoạt động.
            </p>
          </div>
        </div>

        {/* Grid of ServiceCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {CAPABILITY_SOLUTIONS.map((sol) => (
            <div key={sol.title} className="sol-card h-full">
              <ServiceCard
                title={sol.title}
                href={sol.href}
                imageUrl={sol.imageUrl}
                iconUrl={sol.iconUrl}
                description={sol.description}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
