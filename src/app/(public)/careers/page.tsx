import type { Metadata } from "next";
import { CareersPageContent } from "@/components/careers/careers-page-content";
import { OPEN_POSITIONS } from "@/data/careers.data";

interface CareersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: CareersPageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const jobId =
    typeof resolvedParams.job === "string" ? resolvedParams.job : undefined;

  const targetJob = jobId
    ? OPEN_POSITIONS.find((j) => j.id === jobId || j.slug === jobId)
    : null;

  if (targetJob) {
    const title = `[Tuyển dụng] ${targetJob.title} — VDCD Gia Lai`;
    const description = `Vị trí: ${targetJob.title} | Phòng ban: ${targetJob.department} | Địa điểm: ${targetJob.location} | Mức lương: ${targetJob.salary || "Thỏa thuận"}. Xem chi tiết mô tả công việc & nộp CV trực tuyến ngay!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://doimoisangtaogialai.vn/careers?job=${targetJob.id}`,
        siteName: "VDCD Gia Lai",
        images: [
          {
            url: "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-1200,h-630,fo-auto",
            width: 1200,
            height: 630,
            alt: targetJob.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [
          "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-1200,h-630,fo-auto",
        ],
      },
    };
  }

  return {
    title: "Tuyển dụng | VDCD Gia Lai — Cơ hội nghề nghiệp & Chuyển đổi số",
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
    openGraph: {
      title: "Tuyển dụng | VDCD Gia Lai — Cơ hội nghề nghiệp & Chuyển đổi số",
      description:
        "Gia nhập đội ngũ tiên phong công nghệ, cùng VDCD xây dựng hệ sinh thái số tại Gia Lai và khu vực Tây Nguyên.",
      url: "https://doimoisangtaogialai.vn/careers",
      siteName: "VDCD Gia Lai",
      images: [
        {
          url: "https://ik.imagekit.io/huy01040104/vdcd/images/IMG_9666.JPG?tr=w-1200,h-630,fo-auto",
          width: 1200,
          height: 630,
          alt: "Tuyển dụng VDCD Gia Lai",
        },
      ],
    },
  };
}

export default function CareersPage() {
  return <CareersPageContent />;
}
