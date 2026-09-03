export interface SolutionItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  thumbnail?: string;
  websiteUrl?: string;
  isPublished?: boolean;
}

export const ALL_MOCK_SOLUTIONS: SolutionItem[] = [
  {
    id: "6e922f73-1e8a-4446-99e2-dbec49419db4",
    title: "Nông nghiệp - Lâm nghiệp",
    slug: "nong-nghiep-lam-nghiep",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/Ban-sao-cua-IMG_2462-1024x768.jpg",
    websiteUrl: "/solution/nong-nghiep-lam-nghiep",
    isPublished: true,
  },
  {
    id: "b7558158-7043-488f-b189-51bc1728035a",
    title: "Máy Bay Việt",
    slug: "may-bay-viet",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/1WUpukaXKpD5fkPMSNblWMSh6WCwXJ6Jj6f9AaF0YHj7OHjPJMzUbLBU1IEVPY2B2vQ-768x432.jpg",
    websiteUrl: "https://maybayviet.com",
    isPublished: true,
  },
  {
    id: "9446a120-855a-4f3c-a028-e3948cfe74b5",
    title: "Trung tâm Bản đồ số",
    slug: "trung-tam-ban-do-so",
    description: "",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2024/03/5-768x431.jpg",
    websiteUrl:
      "https://vietflycam.vn/dich-vu/bay-quet-3d-trac-dia-so-va-thanh-lap-ban-do",
    isPublished: true,
  },
  {
    id: "52a1acf2-6453-4eb5-9226-4a55b4a46b7c",
    title: "Cứu hộ cứu nạn",
    slug: "cuu-ho-cuu-nan-phong-chong-thien-tai",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7908953163351_e6a394ecff68dca617c06ebed9a5ecbc-1024x768.jpg",
    websiteUrl: "/solution/cuu-ho-cuu-nan-phong-chong-thien-tai",
    isPublished: true,
  },
  {
    id: "179fa443-256e-487d-8028-c2fa16567181",
    title: "Khai thác khoáng sản",
    slug: "tai-nguyen-khai-thac-khoang-san",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7903688360376_37c98f8dadd2f5e6419362c107fe4ca4-1-1024x509.jpg",
    websiteUrl: "/solution/tai-nguyen-khai-thac-khoang-san",
    isPublished: true,
  },
  {
    id: "e39bd0a0-1f85-42fb-b9c3-268ad88bcb94",
    title: "Điện - Năng lượng",
    slug: "dien-nang-luong",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/Dien-gio-Quang-Tri-1-1410x720.jpg",
    websiteUrl: "/solution/dien-nang-luong",
    isPublished: true,
  },
  {
    id: "2b1ea734-43ae-48f9-833e-dda1b7df1551",
    title: "Giám sát an ninh",
    slug: "an-ninh-giam-sat-an-ninh",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7896992273679_a63ab25fd7af7b68be795587ac4a41fb-1-1024x683.jpg",
    websiteUrl: "/solution/an-ninh-giam-sat-an-ninh",
    isPublished: true,
  },
  {
    id: "5ebe0e7b-1b5f-44a1-bd8a-d874625e2c7b",
    title: "Trung Tâm Chuyển giao Công Nghệ",
    slug: "trung-tam-chuyen-giao-cong-nghe",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/BOT06612-768x512.jpg",
    websiteUrl: "https://vdcd.vn/services/trung-tam-chuyen-giao-cong-nghe/",
    isPublished: true,
  },
  {
    id: "f9ba2c8b-6f6b-4f4c-b259-f1c718e3544b",
    title: "Trung Tâm Đổi Mới Sáng Tạo Tỉnh",
    slug: "trung-tam-doi-moi-sang-tao-tinh",
    description: "",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2025/11/S3-1-1-768x590.jpg",
    websiteUrl: "https://vdcd.vn/services/trung-tam-doi-moi-sang-tao-tinh/",
    isPublished: true,
  },
  {
    id: "4b124ed2-25ae-4e1d-b408-538f470043ec",
    title: "Trung tâm phần mềm VDCD – Soft",
    slug: "trung-tam-phan-mem-vdcd-soft",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/Untitled-1-01-1-768x768.png",
    websiteUrl: "https://geneat.vn",
    isPublished: true,
  },
  {
    id: "8601ae3f-e0e3-45c5-ba1c-e7de47b20abd",
    title: "Trung Tâm Giám Sát Số",
    slug: "trung-tam-giam-sat-so",
    description: "",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2024/03/3123-768x512.jpg",
    websiteUrl: "https://autotimelapse.com",
    isPublished: true,
  },
  {
    id: "72d9f19f-af32-4233-afe6-4d5e74d91a14",
    title: "Viện Thiết Kế Số",
    slug: "vien-thiet-ke-so",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/picture1_8463e044ab0c465da2d031f6af1a4c5f_master-768x768.png",
    websiteUrl: "https://bimv.vn/",
    isPublished: true,
  },
  {
    id: "7b2d1698-d06a-4002-990d-f3557f027140",
    title: "Trung tâm nghiên cứu và phát triển sản phẩm R&D",
    slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham-rd",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/64576458-768x512.jpg",
    websiteUrl:
      "https://vdcd.vn/services/trung-tam-nghien-cuu-va-phat-trien-san-pham/",
    isPublished: true,
  },
  {
    id: "b6b431e4-4ea6-4908-a38d-ad45e8e00df9",
    title: "Trung tâm phát triển Robot & AI",
    slug: "trung-tam-phat-trien-robot-ai",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/ImageForArticle_702_172159750532-768x432.jpg",
    websiteUrl: "https://vdcd.vn/services/trung-tam-phat-trien-robot-ai/",
    isPublished: true,
  },
  {
    id: "2626ca50-c83c-4712-b055-620cf5996f33",
    title: "Viện Nghiên cứu công nghệ không gian và dưới nước",
    slug: "vien-nghien-cuu-cong-nghe-khong-gian-va-duoi-nuoc",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/Vien-khong-gian-va-duoi-nuoc-BK-768x499.jpg",
    websiteUrl: "https://iig.vn",
    isPublished: true,
  },
  {
    id: "c159272a-0884-4e1a-b664-5f8e0ad78054",
    title: "Trung tâm dữ liệu siêu máy tính và đào tạo AI",
    slug: "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/z7173282299491_651f9e392555944f94acd55dab050480-768x576.jpg",
    websiteUrl:
      "https://vdcd.vn/services/trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai/",
    isPublished: true,
  },
  {
    id: "ae1465ef-94da-46df-b35f-d254f9e5f008",
    title: "Tài nguyên môi trường",
    slug: "quan-ly-tai-nguyen-quan-trac-moi-truong",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/z7913610376494_aabfc4669de386a5916480d8fb3f34cd-1024x490.jpg",
    websiteUrl: "/solution/quan-ly-tai-nguyen-quan-trac-moi-truong",
    isPublished: true,
  },
  {
    id: "e621aa78-097e-4b73-8d2c-8b74c433b100",
    title: "Du lịch thông minh - Số hóa di sản",
    slug: "du-lich-thong-minh-so-hoa-di-san",
    description: "",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2026/06/Lotte-Mall-1-1-1-scaled.jpg",
    websiteUrl: "/solution/du-lich-thong-minh-so-hoa-di-san",
    isPublished: true,
  },
  {
    id: "5c7a3230-66c9-4e2e-beef-9cbf31a2421e",
    title: "Trung Tâm Sản Xuất Phim",
    slug: "trung-tam-san-xuat-phim",
    description: "",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2025/10/75474-768x576.jpg",
    websiteUrl: "https://vietflycam.vn/dich-vu/quay-phim-chup-anh-bang-flycam",
    isPublished: true,
  },
];
