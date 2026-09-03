import type { PageBannerData, PageKey } from "@/types/banner";

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
        href: "#gallery",
        label: "Xem dự án",
        variant: "primary",
        ariaLabel: "Xem các dự án tiêu biểu",
      },
      {
        href: "/contact",
        label: "Liên hệ hợp tác",
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
        href: "#programs-grid",
        label: "Khám phá chương trình",
        variant: "primary",
        ariaLabel: "Xem danh sách chương trình",
      },
      {
        href: "/contact",
        label: "Liên hệ tư vấn",
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
        href: "#news-grid",
        label: "Đọc tin mới",
        variant: "primary",
        ariaLabel: "Xem danh sách bài viết",
      },
      {
        href: "/about-us",
        label: "Về chúng tôi",
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
        href: "#contact-form",
        label: "Gửi tin nhắn",
        variant: "primary",
        ariaLabel: "Gửi tin nhắn cho chúng tôi",
      },
      {
        href: "tel:0373600099",
        label: "Gọi ngay",
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
        href: "#positions",
        label: "Xem vị trí",
        variant: "primary",
        ariaLabel: "Xem các vị trí tuyển dụng",
      },
      {
        href: "/about-us",
        label: "Về chúng tôi",
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
        href: "#brand-story",
        label: "Tìm hiểu thêm",
        variant: "primary",
        ariaLabel: "Tìm hiểu thêm về VDCD Group",
      },
      {
        href: "/contact",
        label: "Liên hệ",
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
        href: "#solutions-grid",
        label: "Xem giải pháp",
        variant: "primary",
        ariaLabel: "Xem các giải pháp",
      },
      {
        href: "/contact",
        label: "Liên hệ tư vấn",
        variant: "secondary",
        ariaLabel: "Liên hệ tư vấn giải pháp",
      },
    ],
  },
};
