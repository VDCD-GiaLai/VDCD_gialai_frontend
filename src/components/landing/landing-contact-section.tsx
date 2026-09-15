"use client";

import * as React from "react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

export function LandingContactSection() {
  return (
    <CommonCtaSection
      id="contact"
      badge="Năng lực chuyển đổi số"
      title="Sẵn sàng để đột phá?"
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
      className="border-t border-whisper-border/30 bg-canvas-white dark:bg-zinc-950 transition-colors duration-300"
    />
  );
}
