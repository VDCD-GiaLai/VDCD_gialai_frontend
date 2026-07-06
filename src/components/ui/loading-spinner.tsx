"use client";

import * as React from "react";
import { Spinner, Skeleton } from "@heroui/react";
import { cn } from "@/lib/utils";

export { Skeleton };

export interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  fullscreen?: boolean;
}

export function LoadingSpinner({
  className,
  size = "md",
  label = "Đang tải dữ liệu...",
  fullscreen = false,
}: LoadingSpinnerProps) {
  const spinnerElement = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <Spinner size={size} color="success" />
      {label && (
        <p className="text-secondary font-mono-label text-sm">{label}</p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-canvas-white/80 dark:bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
}

export function SkeletonCard() {
  return (
    <div className="double-bezel-outer w-full">
      <div className="double-bezel-inner p-6 space-y-4">
        <Skeleton className="rounded-lg w-1/3 h-4" />
        <Skeleton className="rounded-lg w-3/4 h-8" />
        <Skeleton className="rounded-lg w-full h-24" />
        <div className="flex gap-3">
          <Skeleton className="rounded-full w-24 h-10" />
          <Skeleton className="rounded-full w-24 h-10" />
        </div>
      </div>
    </div>
  );
}
