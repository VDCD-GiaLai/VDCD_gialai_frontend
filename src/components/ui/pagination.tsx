"use client";

import * as React from "react";
import {
  Pagination as HeroPagination,
  PaginationProps as HeroPaginationProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export type PaginationProps = HeroPaginationProps;

export function Pagination({
  className,
  classNames,
  ...props
}: PaginationProps) {
  return (
    <HeroPagination
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
