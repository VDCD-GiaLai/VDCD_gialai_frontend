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
  /* ──────────────────────────────────────────────────────────
   *  6 CÔNG NGHỆ CỐT LÕI (Hiển thị đầu tiên tại Home & Solutions)
   * ────────────────────────────────────────────────────────── */
  {
    id: "sol-core-1",
    title: "UAV - Khảo sát địa hình & Đo đạc trắc địa số",
    slug: "uav",
    description:
      "Ứng dụng công nghệ UAV trong đo đạc trắc địa, thành lập bản đồ số 2D/3D, hỗ trợ thiết kế san lấp và số hóa hiện trạng.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_khao_sat_dia_hinh_bang_flycam.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/uav",
    isPublished: true,
  },
  {
    id: "sol-core-2",
    title: "AI - Trung tâm Phát triển Robot & AI",
    slug: "ai",
    description:
      "Nghiên cứu và ứng dụng công nghệ robot thông minh tích hợp trí tuệ nhân tạo trong giáo dục, sản xuất, logistics và dịch vụ.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/ai",
    isPublished: true,
  },
  {
    id: "sol-core-3",
    title: "AutoTimelapse - Giám sát thông minh 24/7",
    slug: "autotimelapse",
    description:
      "Hệ thống Timelapse tự động hóa giám sát tiến độ công trình, nông nghiệp và môi trường, lưu trữ và chia sẻ dữ liệu trực tuyến.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/autotimelapse",
    isPublished: true,
  },
  {
    id: "sol-core-4",
    title: "VR360 - Không gian số trực quan & Scan 3D",
    slug: "vr360",
    description:
      "Số hóa không gian thực tế 360 độ kết hợp quét laser 3D phục vụ quản lý hiện trường, xúc tiến du lịch và bảo tồn di sản.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/scan_3d.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/vr360",
    isPublished: true,
  },
  {
    id: "sol-core-5",
    title: "SmartScale - Trạm cân thông minh",
    slug: "smartscale",
    description:
      "Số hóa quy trình cân xe, tự động nhận diện biển số, ghi nhận trọng lượng và quản lý dữ liệu tập trung chống gian lận.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/smart_scale_can_dien_tu.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/smartscale",
    isPublished: true,
  },
  {
    id: "sol-core-6",
    title: "Data Center - Siêu máy tính & Đào tạo AI",
    slug: "data-center",
    description:
      "Hạ tầng tính toán hiệu năng cao HPC, nghiên cứu AI, đào tạo nhân lực và dịch vụ Colocation cho doanh nghiệp vùng.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/data-center",
    isPublished: true,
  },

  /* ──────────────────────────────────────────────────────────
   *  12 TRUNG TÂM CHUYÊN SÂU TRỰC THUỘC HỆ SINH THÁI VDCD
   * ────────────────────────────────────────────────────────── */
  {
    id: "center-1",
    title: "Trung tâm Bản đồ số",
    slug: "trung-tam-ban-do-so",
    description:
      "Cung cấp các dịch vụ bay quét 3D, trắc địa số hóa và thành lập bản đồ địa hình độ chính xác cao bằng máy bay không người lái.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/quet_3d.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/trung-tam-ban-do-so",
    isPublished: true,
  },
  {
    id: "center-2",
    title: "Viện Thiết Kế Số",
    slug: "vien-thiet-ke-so",
    description:
      "Nghiên cứu, phát triển ứng dụng mô hình thông tin công trình (BIM) và các giải pháp thiết kế số trong lĩnh vực xây dựng, kiến trúc.",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/picture1_8463e044ab0c465da2d031f6af1a4c5f_master-768x768.png",
    websiteUrl: "/solution/vien-thiet-ke-so",
    isPublished: true,
  },
  {
    id: "center-3",
    title: "Trung Tâm Giám Sát Số",
    slug: "trung-tam-giam-sat-so",
    description:
      "Cung cấp hệ thống Auto Timelapse giám sát thông minh tiến độ xây dựng công trình, nông nghiệp và môi trường một cách tự động, trực quan.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/auto_timelapse_camera.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/trung-tam-giam-sat-so",
    isPublished: true,
  },
  {
    id: "center-4",
    title: "Trung tâm Dữ liệu Siêu máy tính và Đào tạo AI",
    slug: "trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai",
    description:
      "Xây dựng hạ tầng tính toán hiệu năng cao (HPC) và tổ chức các chương trình đào tạo trí tuệ nhân tạo chuyên sâu phục vụ chuyển đổi số doanh nghiệp.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/data_center_viet_nam.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/trung-tam-du-lieu-sieu-may-tinh-va-dao-tao-ai",
    isPublished: true,
  },
  {
    id: "center-5",
    title: "Viện Nghiên cứu Công nghệ Không gian và Dưới nước",
    slug: "vien-nghien-cuu-cong-nghe-khong-gian-va-duoi-nuoc",
    description:
      "Nghiên cứu và ứng dụng các công nghệ tiên tiến trong không gian vũ trụ và thám hiểm, đo đạc môi trường dưới nước.",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/Vien-khong-gian-va-duoi-nuoc-BK-768x499.jpg",
    websiteUrl: "/solution/vien-nghien-cuu-cong-nghe-khong-gian-va-duoi-nuoc",
    isPublished: true,
  },
  {
    id: "center-6",
    title: "Trung tâm Phần mềm VDCD – Soft",
    slug: "trung-tam-phan-mem-vdcd-soft",
    description:
      "Phát triển các phần mềm quản lý doanh nghiệp, giải pháp chuyển đổi số chuyên sâu phục vụ hệ sinh thái kinh tế vùng và cả nước.",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/Untitled-1-01-1-768x768.png",
    websiteUrl: "/solution/trung-tam-phan-mem-vdcd-soft",
    isPublished: true,
  },
  {
    id: "center-7",
    title: "Trung Tâm Đổi Mới Sáng Tạo Tỉnh",
    slug: "trung-tam-doi-moi-sang-tao-tinh",
    description:
      "Hỗ trợ ươm tạo khởi nghiệp, phát triển ý tưởng sáng tạo và thúc đẩy chuyển giao công nghệ tại địa phương.",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2025/11/S3-1-1-768x590.jpg",
    websiteUrl: "/solution/trung-tam-doi-moi-sang-tao-tinh",
    isPublished: true,
  },
  {
    id: "center-8",
    title: "Trung Tâm Chuyển Giao Công Nghệ",
    slug: "trung-tam-chuyen-giao-cong-nghe",
    description:
      "Cầu nối chuyển giao các công nghệ tiên tiến từ viện nghiên cứu, trường đại học đến các doanh nghiệp địa phương ứng dụng thực tiễn.",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2025/10/BOT06612-768x512.jpg",
    websiteUrl: "/solution/trung-tam-chuyen-giao-cong-nghe",
    isPublished: true,
  },
  {
    id: "center-9",
    title: "Máy Bay Việt",
    slug: "may-bay-viet",
    description:
      "Đơn vị cung cấp giải pháp máy bay không người lái phục vụ nông nghiệp thông minh, khảo sát công nghiệp và quay chụp chuyên nghiệp.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/uav_dich_vu_khao_sat_dia_hinh.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/may-bay-viet",
    isPublished: true,
  },
  {
    id: "center-10",
    title: "Trung tâm Phát triển Robot & AI",
    slug: "trung-tam-phat-trien-robot-ai",
    description:
      "Nghiên cứu chế tạo các hệ thống cánh tay robot tự động hóa, xe tự hành (AGV) kết hợp trí tuệ nhân tạo nhận diện hình ảnh và tối ưu vận hành.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/hd_images/ai_thong_minh.png?tr=w-800,q-85,f-auto",
    websiteUrl: "/solution/trung-tam-phat-trien-robot-ai",
    isPublished: true,
  },
  {
    id: "center-11",
    title: "Trung Tâm Sản Xuất Phim",
    slug: "trung-tam-san-xuat-phim",
    description:
      "Sản xuất video clip giới thiệu dự án, quay phim khảo sát, flycam sự kiện chuyên nghiệp với trang thiết bị hiện đại hàng đầu.",
    thumbnail: "https://vdcd.vn/wp-content/uploads/2025/10/75474-768x576.jpg",
    websiteUrl: "/solution/trung-tam-san-xuat-phim",
    isPublished: true,
  },
  {
    id: "center-12",
    title: "Trung tâm Nghiên cứu và Phát triển Sản phẩm R&D",
    slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham",
    description:
      "Đội ngũ chuyên gia chuyên nghiên cứu phát triển các sản phẩm phần cứng và giải pháp công nghệ mới bắt kịp xu hướng thế giới.",
    thumbnail:
      "https://vdcd.vn/wp-content/uploads/2024/03/64576458-768x512.jpg",
    websiteUrl: "/solution/trung-tam-nghien-cuu-va-phat-trien-san-pham",
    isPublished: true,
  },
];
