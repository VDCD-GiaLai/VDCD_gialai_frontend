"use client";

import * as React from "react";
import {
  Pagination as HeroPagination,
  PaginationProps as HeroPaginationProps,
  PaginationItemType,
  PaginationItemRenderProps,
} from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "@/lib/utils";

export type PaginationProps = HeroPaginationProps;

function renderItem({
  ref,
  key,
  value,
  isActive,
  onNext,
  onPrevious,
  setPage,
  className,
}: PaginationItemRenderProps) {
  if (value === PaginationItemType.NEXT) {
    return (
      <button
        key={key}
        aria-label="Trang sau"
        className={cn(
          className,
          "flex items-center justify-center w-9 h-9 rounded-md border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50 hover:bg-pure-surface dark:hover:bg-zinc-800 transition-colors",
        )}
        onClick={onNext}
      >
        <FiChevronRight className="w-4 h-4" />
      </button>
    );
  }

  if (value === PaginationItemType.PREV) {
    return (
      <button
        key={key}
        aria-label="Trang trước"
        className={cn(
          className,
          "flex items-center justify-center w-9 h-9 rounded-md border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50 hover:bg-pure-surface dark:hover:bg-zinc-800 transition-colors",
        )}
        onClick={onPrevious}
      >
        <FiChevronLeft className="w-4 h-4" />
      </button>
    );
  }

  if (value === PaginationItemType.DOTS) {
    return (
      <button key={key} className={className}>
        ...
      </button>
    );
  }

  return (
    <button
      key={key}
      ref={ref}
      className={cn(
        className,
        isActive && "bg-accent-red text-white font-bold border-accent-red",
      )}
      onClick={() => setPage(value)}
    >
      {value}
    </button>
  );
}

export function Pagination({
  className,
  classNames,
  ...props
}: PaginationProps) {
  return (
    <HeroPagination
      renderItem={renderItem}
      classNames={{
        ...classNames,
        cursor: cn("bg-accent-red text-white font-bold", classNames?.cursor),
        item: cn(
          "hover:bg-pure-surface dark:hover:bg-zinc-800 transition-colors border border-whisper-border bg-pure-surface/50 dark:bg-zinc-900/50",
          classNames?.item,
        ),
      }}
      className={cn("flex justify-center", className)}
      {...props}
    />
  );
}
