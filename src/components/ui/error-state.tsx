"use client";

import * as React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Đã xảy ra lỗi",
  message = "Hệ thống gặp sự cố tải dữ liệu. Vui lòng thử lại sau hoặc liên hệ quản trị viên.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-12 border border-danger/20 rounded-xl bg-danger/5",
        className,
      )}
    >
      <div className="mb-4 w-16 h-16 rounded-full bg-danger/10 flex items-center justify-center">
        <FiAlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-danger-500 max-w-sm text-sm mb-6 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button
          color="danger"
          className="font-mono-label text-sm uppercase"
          onClick={onRetry}
        >
          Thử lại
        </Button>
      )}
    </div>
  );
}
