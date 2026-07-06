"use client";

import * as React from "react";
import { FiDatabase } from "react-icons/fi";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title = "Không có dữ liệu",
  description = "Hiện tại chưa có thông tin nào để hiển thị ở đây.",
  icon = <FiDatabase className="w-12 h-12 text-secondary opacity-60" />,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 border border-dashed border-whisper-border rounded-xl bg-pure-surface/20 dark:bg-zinc-900/10",
        className,
      )}
    >
      <div className="mb-4 w-16 h-16 rounded-full bg-secondary/5 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-secondary max-w-sm text-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          color="success"
          variant="flat"
          className="font-mono-label text-sm uppercase"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
