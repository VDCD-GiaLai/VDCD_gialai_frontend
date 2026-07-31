import { API_BASE_URL, USE_MOCK_DATA } from "@/config/env";
import type { PageBannerData, PageKey } from "@/types/banner";

/* ──────────────────────────────────────────────────────────
   Mock / fallback banner data per page.
   Used in development mode or when the API is unavailable.
   Images use picsum.photos (already in next.config.ts
   remotePatterns) for lightweight, cache-friendly placeholders.
   ────────────────────────────────────────────────────────── */

export const MOCK_PAGE_BANNERS: Record<PageKey, PageBannerData> = {
  projects: {
    image:
      "https://vdcd.vn/wp-content/uploads/2025/11/z6246976510436_a1885eca27bd88117afc251ceab774be-edited-768x576.jpg",
    title: "Những công trình\nkiến tạo giá trị",
    subtitle:
      "Mỗi dự án là một hành trình đồng hành cùng khách hàng — từ khảo sát thực địa đến giám sát thi công, chuyển đổi số hóa và bàn giao giải pháp bền vững.",
    tag: "Dự án tiêu biểu",
    ctaButtons: [
      {
        label: "Xem dự án",
        href: "#gallery",
        variant: "primary",
        ariaLabel: "Xem các dự án tiêu biểu",
      },
      {
        label: "Liên hệ hợp tác",
        href: "/contact",
        variant: "secondary",
        ariaLabel: "Liên hệ hợp tác dự án",
      },
    ],
  },
  programs: {
    image: "https://picsum.photos/id/1015/1920/1080",
    title: "Chương trình\nđổi mới sáng tạo",
    subtitle:
      "Khám phá các chương trình chiến lược của VDCD — từ chuyển đổi số nông nghiệp, đô thị thông minh đến đào tạo nguồn nhân lực và năng lượng tái tạo cho Tây Nguyên.",
    tag: "Chương trình",
    ctaButtons: [
      {
        label: "Khám phá chương trình",
        href: "#programs-grid",
        variant: "primary",
        ariaLabel: "Xem danh sách chương trình",
      },
      {
        label: "Liên hệ tư vấn",
        href: "/contact",
        variant: "secondary",
        ariaLabel: "Liên hệ tư vấn chương trình",
      },
    ],
  },
  news: {
    image: "https://picsum.photos/id/180/1920/1080",
    title: "Cập nhật mới nhất\ntừ VDCD Group",
    subtitle:
      "Theo dõi tin tức, sự kiện và những câu chuyện đổi mới sáng tạo từ VDCD — nơi công nghệ gặp gỡ phát triển bền vững.",
    tag: "Tin tức & Bài viết",
    ctaButtons: [
      {
        label: "Đọc tin mới",
        href: "#news-grid",
        variant: "primary",
        ariaLabel: "Xem danh sách bài viết",
      },
      {
        label: "Về chúng tôi",
        href: "/about-us",
        variant: "secondary",
        ariaLabel: "Tìm hiểu về VDCD Group",
      },
    ],
  },
  contact: {
    image: "https://picsum.photos/id/368/1920/1080",
    title: "Kết nối cùng\nVDCD Group",
    subtitle:
      "Hãy liên hệ với chúng tôi để được tư vấn về các giải pháp chuyển đổi số, hợp tác dự án, hoặc bất kỳ thông tin nào bạn cần. Đội ngũ VDCD luôn sẵn sàng hỗ trợ.",
    tag: "Liên hệ",
    ctaButtons: [
      {
        label: "Gửi tin nhắn",
        href: "#contact-form",
        variant: "primary",
        ariaLabel: "Gửi tin nhắn cho chúng tôi",
      },
      {
        label: "Gọi ngay",
        href: "tel:02693000000",
        variant: "secondary",
        ariaLabel: "Gọi hotline VDCD",
      },
    ],
  },
  careers: {
    image: "https://picsum.photos/id/1/1920/1080",
    title: "Kiến tạo tương lai\nchuyển đổi số tại Gia Lai",
    subtitle:
      "Gia nhập VDCD Group để cùng xây dựng hệ sinh thái công nghệ tiên phong, đưa các giải pháp đổi mới sáng tạo vào phục vụ phát triển kinh tế bền vững tại khu vực Tây Nguyên.",
    tag: "Tuyển dụng",
    ctaButtons: [
      {
        label: "Xem vị trí",
        href: "#positions",
        variant: "primary",
        ariaLabel: "Xem các vị trí tuyển dụng",
      },
      {
        label: "Về chúng tôi",
        href: "/about-us",
        variant: "secondary",
        ariaLabel: "Tìm hiểu về VDCD Group",
      },
    ],
  },
  about: {
    image: "https://picsum.photos/id/367/1920/1080",
    title: "KIẾN TẠO\nTƯƠNG LAI SỐ",
    subtitle:
      "VDCD Group là hệ sinh thái công nghệ hàng đầu tại Việt Nam, tiên phong cung cấp các giải pháp đổi mới sáng tạo, chuyển đổi số toàn diện và chế tạo thiết bị công nghệ cao phục vụ phát triển kinh tế vùng bền vững.",
    tag: "Về chúng tôi",
    ctaButtons: [
      {
        label: "Tìm hiểu thêm",
        href: "#brand-story",
        variant: "primary",
        ariaLabel: "Tìm hiểu thêm về VDCD Group",
      },
      {
        label: "Liên hệ",
        href: "/contact",
        variant: "secondary",
        ariaLabel: "Liên hệ với VDCD Group",
      },
    ],
  },
  solutions: {
    image: "https://picsum.photos/id/201/1920/1080",
    title: "Giải pháp\ntheo lĩnh vực",
    subtitle:
      "Khám phá các giải pháp công nghệ toàn diện của chúng tôi, mang lại giá trị bền vững và hiệu quả tối ưu cho từng lĩnh vực hoạt động.",
    tag: "Giải pháp",
    ctaButtons: [
      {
        label: "Xem giải pháp",
        href: "#solutions-grid",
        variant: "primary",
        ariaLabel: "Xem các giải pháp",
      },
      {
        label: "Liên hệ tư vấn",
        href: "/contact",
        variant: "secondary",
        ariaLabel: "Liên hệ tư vấn giải pháp",
      },
    ],
  },
};

/* ──────────────────────────────────────────────────────────
   Fetch page banner data.
   In development mode, returns mock data.
   In production, attempts to fetch from API first.
   ────────────────────────────────────────────────────────── */

export const fetchPageBannerFromApi = async (
  pageKey: PageKey,
): Promise<PageBannerData> => {
  const fallback = MOCK_PAGE_BANNERS[pageKey];

  if (USE_MOCK_DATA) {
    return fallback;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/page-banners/${pageKey}`, {
      cache: "no-store",
    });

    if (res.ok) {
      const body = await res.json();
      const data = body.data || body;

      if (data && data.imageUrl) {
        return {
          image: data.imageUrl || fallback.image,
          title: data.title || fallback.title,
          subtitle: data.subtitle || fallback.subtitle,
          tag: data.tag || fallback.tag,
          ctaButtons: data.ctaButtons || fallback.ctaButtons,
        };
      }
    }
  } catch (err) {
    console.warn(
      `Failed to fetch banner for page '${pageKey}', fallback to mock:`,
      err,
    );
  }

  return fallback;
};
