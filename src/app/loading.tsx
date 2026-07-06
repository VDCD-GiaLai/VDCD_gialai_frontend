"use client";

import * as React from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <LoadingSpinner size="lg" label="Đang tải dữ liệu, vui lòng đợi..." />
    </div>
  );
}
