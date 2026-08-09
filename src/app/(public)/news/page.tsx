import type { Metadata } from "next";
import { NewsPageContent } from "@/components/news/news-page-content";

export const metadata: Metadata = {
  title: "Tin tức & Bài viết | VDCD Gia Lai — Đổi mới sáng tạo",
  description:
    "Cập nhật tin tức, sự kiện và câu chuyện đổi mới sáng tạo từ VDCD Group — nơi công nghệ gặp gỡ phát triển bền vững.",
  keywords: [
    "Tin tức VDCD",
    "VDCD Gia Lai",
    "Đổi mới sáng tạo",
    "Chuyển đổi số",
    "Tây Nguyên",
    "Công nghệ",
    "Sự kiện",
  ],
  openGraph: {
    title: "Tin tức & Bài viết | VDCD Gia Lai — Đổi mới sáng tạo",
    description:
      "Theo dõi tin tức, sự kiện và những câu chuyện đổi mới sáng tạo từ VDCD — nơi công nghệ gặp gỡ phát triển bền vững.",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsPageContent />;
}
