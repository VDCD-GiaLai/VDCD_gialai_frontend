import type { Metadata } from "next";
import { CareersPageContent } from "@/components/careers/careers-page-content";

export const metadata: Metadata = {
  title: "Tuyển dụng | VDCD Gia Lai — Cơ hội nghề nghiệp",
  description:
    "Khám phá các cơ hội nghề nghiệp tại VDCD Gia Lai. Gia nhập đội ngũ tiên phong chuyển đổi số, xây dựng hệ sinh thái công nghệ tại Tây Nguyên.",
  keywords: [
    "Tuyển dụng VDCD",
    "Việc làm Gia Lai",
    "Tuyển dụng công nghệ",
    "VDCD Group careers",
    "Việc làm Tây Nguyên",
    "Chuyển đổi số",
  ],
};

export default function CareersPage() {
  return <CareersPageContent />;
}
