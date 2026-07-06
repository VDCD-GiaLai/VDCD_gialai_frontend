"use client";

import * as React from "react";
import {
  Table as HeroTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  TableProps as HeroTableProps,
} from "@heroui/react";
import { LoadingSpinner } from "./loading-spinner";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";

export { TableHeader, TableColumn, TableBody, TableRow, TableCell };

export interface TableProps extends HeroTableProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function Table({
  children,
  className,
  classNames,
  isLoading = false,
  isEmpty = false,
  emptyTitle,
  emptyDescription,
  ...props
}: TableProps) {
  return (
    <HeroTable
      aria-label="Data Table"
      classNames={{
        ...classNames,
        base: cn(
          "border border-whisper-border rounded-xl bg-pure-surface/50 dark:bg-zinc-900/50 overflow-hidden shadow-sm",
          classNames?.base,
        ),
        th: cn(
          "bg-secondary/5 text-secondary font-mono-label font-bold text-xs uppercase tracking-wider border-b border-whisper-border",
          classNames?.th,
        ),
        td: cn(
          "py-4 text-sm font-body-md border-b border-whisper-border/40",
          classNames?.td,
        ),
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </HeroTable>
  );
}
