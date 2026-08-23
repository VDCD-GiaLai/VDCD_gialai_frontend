import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects/projects-page-content";

export const metadata: Metadata = {
  title: "Dự án tiêu biểu | VDCD Group – Giám sát & Chuyển đổi số công trình",
  description:
    "Khám phá những dự án trọng điểm VDCD đã triển khai trên toàn quốc — từ sân bay quốc tế, khu kinh tế chiến lược đến bảo tồn di sản văn hóa.",
  keywords: [
    "Dự án VDCD",
    "AutoTimelapse",
    "Giám sát công trình",
    "Chuyển đổi số",
    "BIM",
    "GIS",
    "Drone khảo sát",
  ],
  openGraph: {
    title: "Dự án tiêu biểu | VDCD Group – Giám sát & Chuyển đổi số công trình",
    description:
      "Hơn 100+ công trình trọng điểm trên khắp Việt Nam — từ hạ tầng giao thông, khu kinh tế đến bảo tồn di sản.",
    type: "website",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
