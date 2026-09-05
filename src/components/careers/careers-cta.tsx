"use client";

import * as React from "react";
import { CommonCtaSection } from "@/components/ui/common-cta-section";

export function CareersCta() {
  return (
    <CommonCtaSection
      badge="Gia nhập đội ngũ"
      title="KIẾN TẠO TƯƠNG LAI CÔNG NGHỆ SỐ TẠI GIA LAI"
      description="Đồng hành cùng chúng tôi phát triển hệ sinh thái công nghệ tiên phong và tạo ra giá trị bền vững cho cộng đồng."
      primaryButton={{
        label: "Xem vị trí tuyển dụng",
        href: "#positions",
        icon: "arrow-down",
      }}
      secondaryButton={{
        label: "Tìm hiểu về VDCD",
        href: "/about-us",
        icon: "arrow-right",
      }}
      className="py-12 md:py-16"
    />
  );
}
