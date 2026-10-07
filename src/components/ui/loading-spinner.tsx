"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
  fullscreen?: boolean;
}

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
      {...props}
    />
  );
}

export function LoadingSpinner({
  className,
  size = "md",
  label = "Đang tải dữ liệu...",
  fullscreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const spinnerElement = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full border-solid border-accent-red border-t-transparent animate-spin",
          sizeClasses[size] || sizeClasses.md,
        )}
        role="status"
        aria-label="Loading"
      />
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
