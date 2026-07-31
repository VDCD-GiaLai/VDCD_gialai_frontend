import type { Metadata } from "next";
import { RecruitmentApplyPageContent } from "@/components/careers/recruitment-apply-page-content";

export const metadata: Metadata = {
  title: "Ứng tuyển | VDCD Gia Lai — Nộp hồ sơ trực tuyến",
  description:
    "Nộp hồ sơ ứng tuyển trực tuyến tại VDCD Gia Lai. Điền thông tin cá nhân, đính kèm CV và gửi hồ sơ nhanh chóng.",
  keywords: [
    "Ứng tuyển VDCD",
    "Nộp hồ sơ tuyển dụng",
    "VDCD Gia Lai careers",
    "Việc làm Gia Lai",
  ],
};

export default function RecruitmentApplyPage() {
  return <RecruitmentApplyPageContent />;
}
