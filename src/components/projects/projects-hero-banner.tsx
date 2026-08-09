"use client";

import * as React from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { fetchPageBannerFromApi } from "@/services/banner.service";
import type { PageBannerData } from "@/types/banner";
import { MOCK_PAGE_BANNERS } from "@/services/banner.service";

/* ── Props ───────────────────────────────────────────── */

interface ProjectsHeroBannerProps {
  categories: string[];
  locations: string[];
  searchQuery: string;
  selectedCategory: string;
  selectedLocation: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onLocationChange: (v: string) => void;
}

/* ── Component ──────────────────────────────────────── */

export function ProjectsHeroBanner({
  categories,
  locations,
  searchQuery,
  selectedCategory,
  selectedLocation,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: ProjectsHeroBannerProps) {
  const [banner, setBanner] = React.useState<PageBannerData>(
    MOCK_PAGE_BANNERS["projects"],
  );

  /* Local draft state for filters */
  const [localQuery, setLocalQuery] = React.useState(searchQuery);
  const [localCategory, setLocalCategory] = React.useState(selectedCategory);
  const [localLocation, setLocalLocation] = React.useState(selectedLocation);

  const [prevProps, setPrevProps] = React.useState({
    searchQuery,
    selectedCategory,
    selectedLocation,
  });
  if (
    prevProps.searchQuery !== searchQuery ||
    prevProps.selectedCategory !== selectedCategory ||
    prevProps.selectedLocation !== selectedLocation
  ) {
    setPrevProps({ searchQuery, selectedCategory, selectedLocation });
    setLocalQuery(searchQuery);
    setLocalCategory(selectedCategory);
    setLocalLocation(selectedLocation);
  }

  React.useEffect(() => {
    let cancelled = false;
    fetchPageBannerFromApi("projects")
      .then((data) => {
        if (!cancelled) setBanner(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleApplyFilters = () => {
    onSearchChange(localQuery);
    onCategoryChange(localCategory);
    onLocationChange(localLocation);
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={banner.image}
          alt={banner.title}
          fill
          priority
          sizes="100vw"
          className="object-cover transition-opacity duration-1000"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </div>

      {/* Filter — center-bottom, responsive across all devices */}
      <div className="absolute inset-x-0 bottom-6 sm:bottom-8 md:bottom-12 z-10">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-4 md:gap-5 w-full">
            {/* Row 1: Search input — always full-width */}
            <div className="relative w-full">
              <MagnifyingGlass
                weight="bold"
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70"
              />
              <input
                type="text"
                placeholder="Tìm theo tên dự án"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                className="w-full h-12 sm:h-14 pl-11 sm:pl-4 pr-4 bg-black/50 backdrop-blur-[10px] border border-white/40 text-white placeholder-white/60 text-sm tracking-wide focus:outline-none focus:border-white/70 transition-all rounded-md"
              />
            </div>

            {/* Row 2: Selects + Button — stacks on mobile, inline from sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 sm:gap-4 items-center w-full">
              {/* Category */}
              <select
                value={localCategory}
                onChange={(e) => setLocalCategory(e.target.value)}
                className="w-full h-10 px-1 bg-transparent border-0 border-b border-white/30 text-white text-[13px] uppercase tracking-wider focus:outline-none focus:border-white/60 transition-all cursor-pointer appearance-none rounded-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 4px center",
                }}
              >
                <option value="" className="bg-zinc-900 text-white">
                  LĨNH VỰC
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-zinc-900 text-white"
                  >
                    {cat}
                  </option>
                ))}
              </select>

              {/* Location */}
              <select
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                className="w-full h-10 px-1 bg-transparent border-0 border-b border-white/30 text-white text-[13px] uppercase tracking-wider focus:outline-none focus:border-white/60 transition-all cursor-pointer appearance-none rounded-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 4px center",
                }}
              >
                <option value="" className="bg-zinc-900 text-white">
                  TỈNH / THÀNH
                </option>
                {locations.map((loc) => (
                  <option
                    key={loc}
                    value={loc}
                    className="bg-zinc-900 text-white"
                  >
                    {loc}
                  </option>
                ))}
              </select>

              {/* Search button */}
              <button
                type="button"
                onClick={handleApplyFilters}
                className="w-full sm:w-auto h-10 px-8 text-white text-xs font-bold uppercase tracking-[0.1em] bg-primary hover:bg-primary/80 active:scale-[0.98] transition-all"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
