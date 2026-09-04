"use client";

import * as React from "react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

export function LandingContactSection() {
  return (
    <CommonCtaSection
      id="contact"
      badge="Khởi động chuyển đổi số"
      title="SẴN SÀNG ĐỂ ĐỘT PHÁ?"
      description="Hãy kết nối với chúng tôi để cùng lên kế hoạch và hiện thực hóa mục tiêu số hóa của tổ chức bạn."
      primaryButton={{
        label: "Liên hệ tư vấn giải pháp",
        href: "/contact",
        icon: "envelope",
      }}
      secondaryButton={{
        label: "Khám phá giải pháp",
        onClick: () => {
          window.dispatchEvent(new CustomEvent("open-mega-menu"));
        },
        icon: "arrow-up-right",
      }}
      className="py-16 md:py-24 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 transition-colors duration-300"
    />
  );
}
