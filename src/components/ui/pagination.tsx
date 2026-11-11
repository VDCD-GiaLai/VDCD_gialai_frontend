"use client";

import * as React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export interface PaginationClassNames {
  base?: string;
  wrapper?: string;
  item?: string;
  prev?: string;
  next?: string;
  cursor?: string;
  ellipsis?: string;
}

export interface PaginationProps {
  /** Total number of pages */
  total: number;
  /** Controlled active page (1-indexed) */
  page?: number;
  /** Initial page when uncontrolled (default: 1) */
  initialPage?: number;
  /** Callback fired when active page changes */
  onChange?: (page: number) => void;
  /** Show previous / next arrow buttons */
  showControls?: boolean;
  /** Number of sibling pages around active page (default: 1) */
  siblings?: number;
  /** Number of boundary pages at start and end (default: 1) */
  boundaries?: number;
  /** Number of pages jumped when clicking ellipsis (default: 5) */
  dotsJump?: number;
  /** Wrap around at first / last page */
  loop?: boolean;
  /** Disable all pagination controls */
  isDisabled?: boolean;
  /** Root container className */
  className?: string;
  /** Slot classNames override */
  classNames?: PaginationClassNames;
}

type PageSlot = number | "dots-left" | "dots-right";

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  if (length <= 0) return [];
  return Array.from({ length }, (_, idx) => start + idx);
}

function buildPaginationRange(
  total: number,
  activePage: number,
  siblings: number,
  boundaries: number,
): PageSlot[] {
  const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
  if (total <= totalPageNumbers) {
    return range(1, total);
  }

  const leftSiblingIndex = Math.max(activePage - siblings, boundaries + 1);
  const rightSiblingIndex = Math.min(activePage + siblings, total - boundaries);

  const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
  const shouldShowRightDots = rightSiblingIndex < total - boundaries - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = boundaries + 2 + 2 * siblings;
    return [
      ...range(1, leftItemCount),
      "dots-right",
      ...range(total - boundaries + 1, total),
    ];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = boundaries + 2 + 2 * siblings;
    return [
      ...range(1, boundaries),
      "dots-left",
      ...range(total - rightItemCount + 1, total),
    ];
  }

  return [
    ...range(1, boundaries),
    "dots-left",
    ...range(leftSiblingIndex, rightSiblingIndex),
    "dots-right",
    ...range(total - boundaries + 1, total),
  ];
}

export function Pagination({
  total,
  page,
  initialPage = 1,
  onChange,
  showControls = false,
  siblings = 1,
  boundaries = 1,
  dotsJump = 5,
  loop = false,
  isDisabled = false,
  className,
  classNames,
}: PaginationProps) {
  const safeTotal = Math.max(1, total);
  const [internalPage, setInternalPage] = React.useState(() =>
    Math.min(Math.max(1, initialPage), safeTotal),
  );

  const isControlled = page !== undefined;
  const activePage = Math.min(
    Math.max(1, isControlled ? page : internalPage),
    safeTotal,
  );

  const goToPage = React.useCallback(
    (nextPage: number) => {
      if (isDisabled) return;
      const clamped = Math.min(Math.max(1, nextPage), safeTotal);
      if (clamped === activePage) return;
      if (!isControlled) {
        setInternalPage(clamped);
      }
      onChange?.(clamped);
    },
    [activePage, isControlled, isDisabled, onChange, safeTotal],
  );

  const handlePrevious = () => {
    if (activePage <= 1) {
      if (loop) goToPage(safeTotal);
      return;
    }
    goToPage(activePage - 1);
  };

  const handleNext = () => {
    if (activePage >= safeTotal) {
      if (loop) goToPage(1);
      return;
    }
    goToPage(activePage + 1);
  };

  const slots = React.useMemo(
    () => buildPaginationRange(safeTotal, activePage, siblings, boundaries),
    [safeTotal, activePage, siblings, boundaries],
  );

  const isPrevDisabled = isDisabled || (!loop && activePage <= 1);
  const isNextDisabled = isDisabled || (!loop && activePage >= safeTotal);

  return (
    <nav
      role="navigation"
      aria-label="Phân trang"
      className={cn("flex justify-center", classNames?.base, className)}
    >
      <ul
        className={cn(
          "flex flex-wrap items-center justify-center gap-1.5 list-none m-0 p-0",
          classNames?.wrapper,
        )}
      >
        {showControls && (
          <li>
            <button
              type="button"
              aria-label="Trang trước"
              disabled={isPrevDisabled}
              onClick={handlePrevious}
              className={cn(
                "inline-flex items-center justify-center w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-pure-surface dark:bg-zinc-900 text-on-surface dark:text-zinc-200 hover:border-accent-red/50 hover:text-accent-red dark:hover:border-accent-red/60 dark:hover:text-accent-red transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
                classNames?.prev,
              )}
            >
              <CaretLeft
                weight="regular"
                className="w-4 h-4"
                aria-hidden="true"
              />
            </button>
          </li>
        )}

        {slots.map((slot) => {
          if (slot === "dots-left" || slot === "dots-right") {
            const jumpTarget =
              slot === "dots-left"
                ? Math.max(1, activePage - dotsJump)
                : Math.min(safeTotal, activePage + dotsJump);

            return (
              <li key={slot}>
                <button
                  type="button"
                  disabled={isDisabled}
                  aria-label={
                    slot === "dots-left"
                      ? `Lùi ${dotsJump} trang`
                      : `Tiến ${dotsJump} trang`
                  }
                  onClick={() => goToPage(jumpTarget)}
                  className={cn(
                    "inline-flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium text-secondary dark:text-zinc-400 hover:text-accent-red dark:hover:text-accent-red transition-colors select-none cursor-pointer disabled:opacity-40 disabled:pointer-events-none",
                    classNames?.ellipsis,
                  )}
                >
                  •••
                </button>
              </li>
            );
          }

          const isActive = slot === activePage;

          return (
            <li key={slot}>
              <button
                type="button"
                disabled={isDisabled}
                aria-label={`Trang ${slot}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => goToPage(slot)}
                className={cn(
                  "inline-flex items-center justify-center h-9 min-w-9 px-2.5 rounded-md border text-sm transition-all duration-200 select-none",
                  isActive
                    ? cn(
                        "bg-accent-red border-accent-red text-white font-bold shadow-xs hover:bg-accent-red-hover cursor-default",
                        classNames?.cursor,
                      )
                    : cn(
                        "bg-pure-surface dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-on-surface dark:text-zinc-200 font-medium hover:border-accent-red/50 hover:text-accent-red dark:hover:border-accent-red/60 dark:hover:text-accent-red cursor-pointer",
                        classNames?.item,
                      ),
                  "disabled:opacity-40 disabled:pointer-events-none",
                )}
              >
                {slot}
              </button>
            </li>
          );
        })}

        {showControls && (
          <li>
            <button
              type="button"
              aria-label="Trang sau"
              disabled={isNextDisabled}
              onClick={handleNext}
              className={cn(
                "inline-flex items-center justify-center w-9 h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-pure-surface dark:bg-zinc-900 text-on-surface dark:text-zinc-200 hover:border-accent-red/50 hover:text-accent-red dark:hover:border-accent-red/60 dark:hover:text-accent-red transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed",
                classNames?.next,
              )}
            >
              <CaretRight
                weight="regular"
                className="w-4 h-4"
                aria-hidden="true"
              />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
