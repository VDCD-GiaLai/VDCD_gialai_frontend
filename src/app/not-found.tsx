"use client";

import * as React from "react";
import Link from "next/link";
import { FiCompass } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-canvas-white dark:bg-zinc-950">
      <div className="mb-6 w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
        <FiCompass className="w-10 h-10 text-accent-red animate-pulse" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tighter">
        404 - Không Tìm Thấy Trang
      </h1>
      <p className="text-secondary max-w-md text-body-md mb-8 leading-relaxed">
        Đường dẫn bạn yêu cầu không tồn tại hoặc đã bị di dời. Vui lòng kiểm tra
        lại địa chỉ URL.
      </p>
      <Link href={APP_ROUTES.HOME}>
        <Button
          color="success"
          className="font-mono-label text-sm uppercase tracking-wide px-8 py-6 rounded-full"
        >
          Quay lại Trang Chủ
        </Button>
      </Link>{" "}
    </div>
  );
}
