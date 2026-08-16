import type { Metadata } from "next";
import { LeadershipContent } from "@/components/leadership/leadership-content";

export const metadata: Metadata = {
  title: "Đội ngũ lãnh đạo | Trung tâm Đổi mới Sáng tạo Gia Lai",
  description:
    "Đội ngũ lãnh đạo Trung tâm Đổi mới Sáng tạo Gia Lai — những người dẫn dắt chiến lược đổi mới sáng tạo và chuyển đổi số cho tỉnh Gia Lai và khu vực Tây Nguyên.",
};

export default function LeadershipPage() {
  return <LeadershipContent />;
}
