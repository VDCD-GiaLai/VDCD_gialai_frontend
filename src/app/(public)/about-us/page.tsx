import type { Metadata } from "next";
import {
  fetchOrganizationInfoFromApi,
  DEFAULT_ORGANIZATION_INFO,
} from "@/services/hero.service";
import { AboutPageContent } from "@/components/about/about-page-content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Về chúng tôi | Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
  description:
    "Tìm hiểu về sứ mệnh, tầm nhìn, năng lực công nghệ và hệ sinh thái Đổi mới Sáng tạo Gia Lai.",
  openGraph: {
    title: "Về chúng tôi | Trung Tâm Đổi Mới Sáng Tạo Gia Lai",
    description:
      "Tìm hiểu về sứ mệnh, tầm nhìn, năng lực công nghệ và hệ sinh thái Đổi mới Sáng tạo Gia Lai.",
    type: "website",
  },
};

export default async function AboutPage() {
  const orgInfo = await fetchOrganizationInfoFromApi().catch(
    () => DEFAULT_ORGANIZATION_INFO,
  );

  return <AboutPageContent initialOrgInfo={orgInfo} />;
}
