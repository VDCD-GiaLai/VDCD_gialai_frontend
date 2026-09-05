"use client";

import * as React from "react";
import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { CaretDown } from "@phosphor-icons/react";
import {
  MEGA_MENU_PROGRAMS,
  MEGA_MENU_SOLUTIONS,
  type MegaMenuProgram,
  type MegaMenuSolution,
} from "@/data/mega-menu.data";
import { fetchProgramsFromApi } from "@/services/program.service";
import { fetchSolutionsFromApi } from "@/services/solution.service";
import { gsap } from "@/lib/animations/register-gsap";
import "./mega-menu.css";

/* ── Types ────────────────────────────────────────────── */

interface MegaMenuProps {
  /** Whether the header is in solid (scrolled / non-home) state */
  showSolidHeader: boolean;
  /** Current pathname for active route highlighting */
  pathname: string;
  /** Callback to close mobile menu when navigating */
  onMobileNavigate?: () => void;
  /** Synchronized programs list from backend API / fallback */
  programs?: MegaMenuProgram[];
  /** Synchronized solutions list from backend API / fallback */
  solutions?: MegaMenuSolution[];
}

/* ── Desktop Mega Menu ────────────────────────────────── */

const DesktopMegaMenu = ({
  pathname,
  programs = MEGA_MENU_PROGRAMS,
  solutions = MEGA_MENU_SOLUTIONS,
}: Pick<
  MegaMenuProps,
  "showSolidHeader" | "pathname" | "programs" | "solutions"
>) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Close when clicking outside ── */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  /* ── Keyboard support ── */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  /* ── Close on route change ── */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  /* ── Listen for global open-mega-menu trigger ── */
  useEffect(() => {
    const handleOpenMenu = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-mega-menu", handleOpenMenu);
    return () => window.removeEventListener("open-mega-menu", handleOpenMenu);
  }, []);

  /* ── GSAP panel animation ── */
  useEffect(() => {
    if (!panelRef.current) return;

    if (isOpen) {
      gsap.set(panelRef.current, { display: "block" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -6 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
      );
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.12,
        ease: "power2.in",
        onComplete: () => {
          if (panelRef.current) {
            gsap.set(panelRef.current, { display: "none" });
          }
        },
      });
    }
  }, [isOpen]);

  /* ── Close on route change ── */
  const prevPathnameRef = useRef(pathname);
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      const timer = setTimeout(() => setIsOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const isActiveRoute =
    pathname === "/programs" ||
    pathname.startsWith("/programs/") ||
    pathname === "/solution" ||
    pathname.startsWith("/solution/");

  return (
    <div ref={containerRef} className="relative">
      {/* ── Trigger ── */}
      <button
        type="button"
        className={`hover:text-accent-red transition-colors cursor-pointer uppercase inline-flex items-center gap-1 ${
          isActiveRoute || isOpen ? "text-accent-red font-semibold" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        Giải pháp
        <CaretDown
          weight="bold"
          className={`w-3 h-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ── Desktop Panel (Minimalist 2-column layout) ── */}
      <div
        ref={panelRef}
        role="menu"
        aria-label="Hoạt động và Giải pháp"
        style={{ display: "none", opacity: 0 }}
        className="mega-menu-panel fixed left-0 right-0 top-20 z-50 bg-white/98 dark:bg-zinc-950/98 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 shadow-xl"
      >
        <div className="max-w-5xl mx-auto px-6 py-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* ── Cột 1: Hoạt động ── */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/programs"
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-bold text-xs uppercase tracking-widest text-accent-red transition-colors"
                >
                  Hoạt động
                </Link>
                <Link
                  href="/programs"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-mono-label font-medium text-zinc-400 hover:text-accent-red transition-colors"
                >
                  Tất cả chương trình →
                </Link>
              </div>

              <ul className="space-y-1">
                {programs.map((program) => (
                  <li key={program.label}>
                    <Link
                      href={program.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-2.5 rounded text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors uppercase tracking-wider font-heading"
                    >
                      {program.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Cột 2: 6 Giải pháp chính ── */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/solution"
                  onClick={() => setIsOpen(false)}
                  className="font-heading font-bold text-xs uppercase tracking-widest text-accent-red transition-colors"
                >
                  Giải pháp
                </Link>
                <Link
                  href="/solution"
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] font-mono-label font-medium text-zinc-400 hover:text-accent-red transition-colors"
                >
                  Tất cả giải pháp →
                </Link>
              </div>

              <ul className="space-y-1">
                {solutions.map((solution) => (
                  <li key={solution.id}>
                    <Link
                      href={solution.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline justify-between py-2 px-2.5 rounded text-xs text-zinc-700 dark:text-zinc-300 hover:text-accent-red hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <span className="font-heading font-bold uppercase tracking-wider group-hover:text-accent-red transition-colors">
                        {solution.name}
                      </span>
                      <span className="text-[11px] font-normal text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                        {solution.tagline}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Mobile Mega Menu ─────────────────────────────────── */

const MobileMegaMenu = ({
  onMobileNavigate,
  programs = MEGA_MENU_PROGRAMS,
  solutions = MEGA_MENU_SOLUTIONS,
}: Pick<MegaMenuProps, "onMobileNavigate" | "programs" | "solutions">) => {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const programsContentRef = useRef<HTMLDivElement>(null);
  const solutionsContentRef = useRef<HTMLDivElement>(null);

  /* ── GSAP accordion toggle ── */
  useEffect(() => {
    if (!programsContentRef.current) return;
    if (isProgramsOpen) {
      gsap.fromTo(
        programsContentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
      );
    } else {
      gsap.to(programsContentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, [isProgramsOpen]);

  useEffect(() => {
    if (!solutionsContentRef.current) return;
    if (isSolutionsOpen) {
      gsap.fromTo(
        solutionsContentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.2,
          ease: "power2.inOut",
        },
      );
    } else {
      gsap.to(solutionsContentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  }, [isSolutionsOpen]);

  const handleTogglePrograms = useCallback(() => {
    setIsProgramsOpen((prev) => !prev);
  }, []);

  const handleToggleSolutions = useCallback(() => {
    setIsSolutionsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* ── Hoạt động Accordion ── */}
      <div className="mega-menu-mobile-section">
        <button
          type="button"
          className="mega-menu-mobile-trigger text-accent-red"
          data-open={isProgramsOpen}
          onClick={handleTogglePrograms}
          aria-expanded={isProgramsOpen}
        >
          Hoạt động
          <CaretDown
            className="mega-menu-mobile-trigger-chevron"
            weight="thin"
          />
        </button>
        <div
          ref={programsContentRef}
          className="mega-menu-mobile-content overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {programs.map((program) => (
            <Link
              key={program.label}
              href={program.href}
              onClick={onMobileNavigate}
              className="block py-2 text-xs uppercase font-medium text-zinc-600 dark:text-zinc-400 hover:text-accent-red transition-colors"
            >
              {program.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── 6 Giải pháp Accordion ── */}
      <div className="mega-menu-mobile-section">
        <button
          type="button"
          className="mega-menu-mobile-trigger text-accent-red"
          data-open={isSolutionsOpen}
          onClick={handleToggleSolutions}
          aria-expanded={isSolutionsOpen}
        >
          Giải pháp
          <CaretDown
            className="mega-menu-mobile-trigger-chevron"
            weight="thin"
          />
        </button>
        <div
          ref={solutionsContentRef}
          className="mega-menu-mobile-content overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {solutions.map((solution) => (
            <Link
              key={solution.id}
              href={solution.href}
              onClick={onMobileNavigate}
              className="flex items-center justify-between py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:text-accent-red transition-colors"
            >
              <span className="font-bold uppercase font-heading text-zinc-800 dark:text-zinc-200">
                {solution.name}
              </span>
              <span className="text-[11px] text-zinc-400">
                {solution.tagline}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

/* ── Custom Hook for Synchronized Backend & Fallback ── */

/**
 * Hook quản lý trạng thái đồng bộ giữa Backend API và Mock Data
 */
export const useMegaMenu = (props: MegaMenuProps) => {
  const [programs, setPrograms] =
    useState<MegaMenuProgram[]>(MEGA_MENU_PROGRAMS);
  const [solutions, setSolutions] =
    useState<MegaMenuSolution[]>(MEGA_MENU_SOLUTIONS);

  useEffect(() => {
    let isMounted = true;

    // 1. Đồng bộ Hoạt động (Programs) từ Backend API
    fetchProgramsFromApi({ page: 1, limit: 10 })
      .then((res) => {
        if (!isMounted) return;
        if (res && res.items && res.items.length > 0) {
          const apiPrograms = res.items
            .filter((p) => p.isPublished !== false)
            .slice(0, 5)
            .map((p) => ({
              label: p.title,
              href: `/programs/${p.slug}`,
            }));
          if (apiPrograms.length > 0) {
            setPrograms(apiPrograms);
          }
        }
      })
      .catch(() => {
        // Fallback sang mock data
      });

    // 2. Đồng bộ 6 Giải pháp chính từ Backend API
    fetchSolutionsFromApi(50)
      .then((items) => {
        if (!isMounted) return;
        if (items && items.length > 0) {
          const synced = MEGA_MENU_SOLUTIONS.map((s) => {
            const match = items.find(
              (it) => it.slug === s.slug || it.id === s.id,
            );
            if (match) {
              return {
                id: match.id || s.id,
                name: s.name,
                slug: match.slug || s.slug,
                tagline: match.description
                  ? match.description.slice(0, 45) +
                    (match.description.length > 45 ? "..." : "")
                  : s.tagline,
                href: `/solution/${match.slug || s.slug}`,
              };
            }
            return s;
          });
          setSolutions(synced);
        }
      })
      .catch(() => {
        // Fallback sang mock data
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const menu = React.useMemo(
    () => ({
      desktop: (
        <DesktopMegaMenu
          showSolidHeader={props.showSolidHeader}
          pathname={props.pathname}
          programs={programs}
          solutions={solutions}
        />
      ),
      mobile: (
        <MobileMegaMenu
          onMobileNavigate={props.onMobileNavigate}
          programs={programs}
          solutions={solutions}
        />
      ),
    }),
    [
      props.showSolidHeader,
      props.pathname,
      props.onMobileNavigate,
      programs,
      solutions,
    ],
  );

  return menu;
};

/* ── Exported Mega Menu Component ─────────────────────── */

export const MegaMenu = (props: MegaMenuProps) => {
  return useMegaMenu(props);
};
