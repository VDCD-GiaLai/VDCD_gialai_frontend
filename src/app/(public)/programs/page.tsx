import type { Metadata } from "next";
import { ProgramsPageContent } from "@/components/programs/programs-page-content";

export const metadata: Metadata = {
  title: "Chương trình Đổi mới Sáng tạo | VDCD Gia Lai",
  description:
    "Khám phá các chương trình chiến lược của VDCD Group — chuyển đổi số nông nghiệp, đô thị thông minh, đào tạo kỹ năng số và năng lượng tái tạo cho Tây Nguyên.",
  keywords: [
    "Chương trình VDCD",
    "Đổi mới sáng tạo",
    "Chuyển đổi số",
    "Gia Lai",
    "Tây Nguyên",
    "Nông nghiệp thông minh",
    "Đô thị thông minh",
  ],
  openGraph: {
    title: "Chương trình Đổi mới Sáng tạo | VDCD Gia Lai",
    description:
      "Khám phá các chương trình chiến lược của VDCD Group — chuyển đổi số, đào tạo kỹ năng số và năng lượng tái tạo.",
    type: "website",
  },
};

export default function ProgramsPage() {
  return <ProgramsPageContent />;
}
