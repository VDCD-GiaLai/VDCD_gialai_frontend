import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";
import { fetchOrganizationInfoFromApi } from "@/services/hero.service";

export const metadata: Metadata = {
  title: "Liên hệ | VDCD Gia Lai — Kết nối hợp tác",
  description:
    "Liên hệ với VDCD Gia Lai để được tư vấn giải pháp chuyển đổi số, hợp tác dự án và đổi mới sáng tạo tại Tây Nguyên. Hotline, email và biểu mẫu liên hệ trực tuyến.",
  keywords: [
    "Liên hệ VDCD",
    "VDCD Gia Lai",
    "Tư vấn chuyển đổi số",
    "Hợp tác dự án Gia Lai",
    "VDCD Group contact",
    "Đổi mới sáng tạo Tây Nguyên",
  ],
};

export default async function ContactPage() {
  const orgInfo = await fetchOrganizationInfoFromApi();
  return <ContactPageContent orgInfo={orgInfo} />;
}
