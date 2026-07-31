"use client";

import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FiChevronDown, FiArrowRight } from "react-icons/fi";
import {
  MEGA_MENU_PROGRAMS,
  MEGA_MENU_SOLUTIONS,
  MEGA_MENU_DEFAULT_SOLUTION_ID,
} from "@/data/mega-menu.data";
import type { MegaMenuSolution } from "@/data/mega-menu.data";
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
}

/* ── Desktop Mega Menu ────────────────────────────────── */

const DesktopMegaMenu = ({
  showSolidHeader,
  pathname,
}: Pick<MegaMenuProps, "showSolidHeader" | "pathname">) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeSolutionId, setActiveSolutionId] = React.useState(
    MEGA_MENU_DEFAULT_SOLUTION_ID,
  );
  const [visibleSolutionId, setVisibleSolutionId] = React.useState(
    MEGA_MENU_DEFAULT_SOLUTION_ID,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeSolution = MEGA_MENU_SOLUTIONS.find(
    (s) => s.id === activeSolutionId,
  );

  /* ── GSAP panel animation ── */
  useEffect(() => {
    if (!panelRef.current) return;

    if (isOpen) {
      gsap.set(panelRef.current, { display: "block" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
      );
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          if (panelRef.current) {
            gsap.set(panelRef.current, { display: "none" });
          }
        },
      });
    }
  }, [isOpen]);

  /* ── Content fade transition ── */
  useEffect(() => {
    // When activeSolution changes, fade out then swap content
    setVisibleSolutionId("");
    const timer = setTimeout(() => {
      setVisibleSolutionId(activeSolutionId);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeSolutionId]);

  /* ── Hover handlers with delay ── */
  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, []);

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
    setIsOpen(false);
  }, [pathname]);

  /* ── Cleanup timer on unmount ── */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleSolutionHover = useCallback((solutionId: string) => {
    setActiveSolutionId(solutionId);
  }, []);

  const handleSolutionClick = useCallback((solutionId: string) => {
    setActiveSolutionId(solutionId);
  }, []);

  const isActiveRoute =
    pathname === "/programs" ||
    pathname.startsWith("/programs/") ||
    pathname === "/solution" ||
    pathname.startsWith("/solution/");

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Trigger ── */}
      <button
        type="button"
        className={`hover:text-accent-red transition-colors cursor-pointer uppercase ${
          isActiveRoute ? "text-accent-red font-semibold" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        Giải pháp
      </button>

      {/* ── Desktop Panel ── */}
      <div
        ref={panelRef}
        role="menu"
        aria-label="Chương trình và Giải pháp"
        style={{ display: "none", opacity: 0 }}
        className="mega-menu-panel fixed left-0 right-0 top-20 z-50"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1.3fr] gap-0 py-6">
            {/* ── Column 1: Chương trình ── */}
            <div className="pr-6" role="none">
              <h3 className="mega-menu-col-header">Chương trình</h3>
              <ul role="menu" aria-label="Chương trình">
                {MEGA_MENU_PROGRAMS.map((program) => (
                  <li key={program.label} role="none">
                    <Link
                      href={program.href}
                      role="menuitem"
                      tabIndex={0}
                      className="mega-menu-program-item block"
                    >
                      {program.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Divider ── */}
            <div className="mega-menu-col-divider" aria-hidden="true" />

            {/* ── Column 2: Giải pháp Selector ── */}
            <div className="px-6" role="none">
              <h3 className="mega-menu-col-header">Giải pháp</h3>
              <ul role="menu" aria-label="Giải pháp">
                {MEGA_MENU_SOLUTIONS.map((solution) => (
                  <li key={solution.id} role="none">
                    <button
                      type="button"
                      role="menuitem"
                      tabIndex={0}
                      className="mega-menu-solution-item w-full text-left font-heading text-sm font-medium"
                      data-active={activeSolutionId === solution.id}
                      onMouseEnter={() => handleSolutionHover(solution.id)}
                      onClick={() => handleSolutionClick(solution.id)}
                      aria-current={
                        activeSolutionId === solution.id ? "true" : undefined
                      }
                    >
                      {solution.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Divider ── */}
            <div className="mega-menu-col-divider" aria-hidden="true" />

            {/* ── Column 3: Detail ── */}
            <div className="pl-6 relative min-h-[200px]" role="none">
              {activeSolution && (
                <SolutionDetail
                  solution={activeSolution}
                  isVisible={visibleSolutionId === activeSolution.id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Solution Detail (Column 3) ───────────────────────── */

const SolutionDetail = ({
  solution,
  isVisible,
}: {
  solution: MegaMenuSolution;
  isVisible: boolean;
}) => {
  return (
    <div
      className="mega-menu-detail-content"
      data-visible={isVisible}
      aria-label={`Chi tiết giải pháp ${solution.name}`}
    >
      <h3 className="mega-menu-col-header">{solution.name}</h3>

      <div className="space-y-4">
        {solution.sections.map((section) => (
          <div key={section.title}>
            <h4 className="mega-menu-section-title">{section.title}</h4>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item} className="mega-menu-section-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link href={solution.cta.href} className="mega-menu-cta">
        {solution.cta.label}
        <FiArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};

/* ── Mobile Mega Menu ─────────────────────────────────── */

const MobileMegaMenu = ({
  onMobileNavigate,
}: Pick<MegaMenuProps, "onMobileNavigate">) => {
  const [isProgramsOpen, setIsProgramsOpen] = React.useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = React.useState(false);
  const [activeSolutionId, setActiveSolutionId] = React.useState<string | null>(
    null,
  );

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
          duration: 0.25,
          ease: "power2.inOut",
        },
      );
    } else {
      gsap.to(programsContentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
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
          duration: 0.25,
          ease: "power2.inOut",
        },
      );
    } else {
      gsap.to(solutionsContentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
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

  const handleSolutionToggle = useCallback((solutionId: string) => {
    setActiveSolutionId((prev) => (prev === solutionId ? null : solutionId));
  }, []);

  return (
    <>
      {/* ── Chương trình Accordion ── */}
      <div className="mega-menu-mobile-section">
        <button
          type="button"
          className="mega-menu-mobile-trigger"
          data-open={isProgramsOpen}
          onClick={handleTogglePrograms}
          aria-expanded={isProgramsOpen}
        >
          Chương trình
          <FiChevronDown className="mega-menu-mobile-trigger-chevron" />
        </button>
        <div
          ref={programsContentRef}
          className="mega-menu-mobile-content overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {MEGA_MENU_PROGRAMS.map((program) => (
            <Link
              key={program.label}
              href={program.href}
              onClick={onMobileNavigate}
              className="block py-1.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-accent-red transition-colors"
            >
              {program.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Giải pháp Accordion ── */}
      <div className="mega-menu-mobile-section">
        <button
          type="button"
          className="mega-menu-mobile-trigger"
          data-open={isSolutionsOpen}
          onClick={handleToggleSolutions}
          aria-expanded={isSolutionsOpen}
        >
          Giải pháp
          <FiChevronDown className="mega-menu-mobile-trigger-chevron" />
        </button>
        <div
          ref={solutionsContentRef}
          className="mega-menu-mobile-content overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          {MEGA_MENU_SOLUTIONS.map((solution) => (
            <div key={solution.id} className="mb-1">
              <button
                type="button"
                className="flex items-center justify-between w-full py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-accent-red transition-colors"
                onClick={() => handleSolutionToggle(solution.id)}
                aria-expanded={activeSolutionId === solution.id}
              >
                {solution.name}
                <FiChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    activeSolutionId === solution.id ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeSolutionId === solution.id && (
                <div className="pl-3 pb-2">
                  {solution.sections.map((section) => (
                    <div key={section.title} className="mb-2">
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        {section.title}
                      </p>
                      {section.items.map((item) => (
                        <p
                          key={item}
                          className="text-sm text-zinc-600 dark:text-zinc-400 py-0.5"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ))}
                  <Link
                    href={solution.cta.href}
                    onClick={onMobileNavigate}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-red mt-1"
                  >
                    {solution.cta.label}
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

/* ── Exported Mega Menu Component ─────────────────────── */

export const MegaMenu = ({
  showSolidHeader,
  pathname,
  onMobileNavigate,
}: MegaMenuProps) => {
  return {
    desktop: (
      <DesktopMegaMenu showSolidHeader={showSolidHeader} pathname={pathname} />
    ),
    mobile: <MobileMegaMenu onMobileNavigate={onMobileNavigate} />,
  };
};

/** Hook-style export for cleaner usage in header */
export const useMegaMenu = (props: MegaMenuProps) => {
  const menu = React.useMemo(
    () => ({
      desktop: (
        <DesktopMegaMenu
          showSolidHeader={props.showSolidHeader}
          pathname={props.pathname}
        />
      ),
      mobile: <MobileMegaMenu onMobileNavigate={props.onMobileNavigate} />,
    }),
    [props.showSolidHeader, props.pathname, props.onMobileNavigate],
  );

  return menu;
};
