"use client";

import * as React from "react";
import { ErrorState } from "@/components/ui/error-state";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Application error boundary caught error:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center p-6">
      <ErrorState
        title="Hệ thống đã xảy ra sự cố"
        message={
          error?.message || "Đã xảy ra lỗi không mong muốn khi tải trang này."
        }
        onRetry={reset}
      />
    </div>
  );
}
