import type { Article } from "@/types";

/* ── Category constants ─────────────────────────────────── */

export const NEWS_CATEGORIES = [
  "Tất cả",
  "Tin tức",
  "Sự kiện",
  "Công nghệ",
  "Dự án",
  "Chuyển đổi số",
] as const;

/* ── Mock articles for development ──────────────────────── */

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    title:
      "VDCD Gia Lai ra mắt Trung tâm Đổi mới Sáng tạo phục vụ phát triển Tây Nguyên",
    slug: "vdcd-gia-lai-ra-mat-trung-tam-doi-moi-sang-tao",
    content: `
      <p>Ngày 15/07/2026, VDCD Group chính thức khai trương Trung tâm Đổi mới Sáng tạo tại TP. Pleiku, Gia Lai — đánh dấu bước tiến quan trọng trong chiến lược mở rộng hệ sinh thái công nghệ tại khu vực Tây Nguyên.</p>
      <h2>Sứ mệnh của Trung tâm</h2>
      <p>Trung tâm Đổi mới Sáng tạo Gia Lai được thành lập với mục tiêu trở thành cầu nối giữa chính quyền, doanh nghiệp, và cộng đồng startup trong hệ sinh thái đổi mới sáng tạo tỉnh.</p>
      <h2>Các lĩnh vực hoạt động chính</h2>
      <ul>
        <li>Tư vấn và chuyển giao công nghệ số</li>
        <li>Hỗ trợ khởi nghiệp và đổi mới sáng tạo</li>
        <li>Đào tạo nguồn nhân lực công nghệ cao</li>
        <li>Triển khai giải pháp chuyển đổi số cho doanh nghiệp</li>
      </ul>
      <p>Với đội ngũ chuyên gia giàu kinh nghiệm và cơ sở vật chất hiện đại, Trung tâm kỳ vọng sẽ hỗ trợ hơn 100 doanh nghiệp và tổ chức trong năm đầu tiên hoạt động.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-1/800/500",
    category: "Tin tức",
    tags: "đổi mới sáng tạo, Gia Lai, Tây Nguyên, VDCD",
    metaTitle: "VDCD Gia Lai ra mắt Trung tâm Đổi mới Sáng tạo | VDCD Group",
    metaDescription:
      "VDCD Group khai trương Trung tâm Đổi mới Sáng tạo tại Gia Lai, phục vụ phát triển hệ sinh thái công nghệ Tây Nguyên.",
    isPublished: true,
    publishedAt: "2026-07-15T09:00:00.000Z",
    createdAt: "2026-07-14T08:00:00.000Z",
    updatedAt: "2026-07-15T09:00:00.000Z",
  },
  {
    id: "2",
    title:
      "Ứng dụng AutoTimelapse trong giám sát thi công đường cao tốc Bắc – Nam",
    slug: "ung-dung-autotimelapse-giam-sat-duong-cao-toc-bac-nam",
    content: `
      <p>Hệ thống giám sát AutoTimelapse của VDCD được triển khai thành công trên nhiều gói thầu quan trọng của dự án đường cao tốc Bắc – Nam, mang lại hiệu quả vượt trội trong quản lý tiến độ thi công.</p>
      <h2>Công nghệ AutoTimelapse</h2>
      <p>AutoTimelapse là giải pháp giám sát công trình tự động 24/7 sử dụng camera thông minh kết hợp AI, cho phép theo dõi tiến độ thi công theo thời gian thực.</p>
      <p>Hệ thống tự động tạo video timelapse, so sánh tiến độ thực tế với kế hoạch, và cảnh báo sớm các sai lệch.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-2/800/500",
    category: "Công nghệ",
    tags: "AutoTimelapse, giám sát công trình, cao tốc, AI",
    metaTitle: "AutoTimelapse giám sát cao tốc Bắc – Nam | VDCD Group",
    metaDescription:
      "Triển khai hệ thống giám sát AutoTimelapse trên dự án đường cao tốc Bắc – Nam, tối ưu quản lý tiến độ thi công.",
    isPublished: true,
    publishedAt: "2026-07-10T14:00:00.000Z",
    createdAt: "2026-07-09T10:00:00.000Z",
    updatedAt: "2026-07-10T14:00:00.000Z",
  },
  {
    id: "3",
    title:
      "Hội thảo Chuyển đổi số nông nghiệp Tây Nguyên — Cơ hội và thách thức",
    slug: "hoi-thao-chuyen-doi-so-nong-nghiep-tay-nguyen",
    content: `
      <p>VDCD Gia Lai phối hợp Sở Khoa học và Công nghệ tỉnh Gia Lai tổ chức Hội thảo "Chuyển đổi số nông nghiệp Tây Nguyên — Cơ hội và thách thức" với sự tham gia của hơn 200 đại biểu.</p>
      <h2>Nội dung chính</h2>
      <p>Hội thảo tập trung vào 3 chủ đề lớn: ứng dụng IoT trong canh tác thông minh, hệ thống quản lý chuỗi cung ứng nông sản, và giải pháp truy xuất nguồn gốc sản phẩm bằng blockchain.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-3/800/500",
    category: "Sự kiện",
    tags: "chuyển đổi số, nông nghiệp, Tây Nguyên, hội thảo",
    metaTitle: "Hội thảo Chuyển đổi số nông nghiệp Tây Nguyên | VDCD Group",
    metaDescription:
      "Hội thảo chuyển đổi số nông nghiệp Tây Nguyên do VDCD Gia Lai tổ chức, thu hút hơn 200 đại biểu tham dự.",
    isPublished: true,
    publishedAt: "2026-07-05T08:30:00.000Z",
    createdAt: "2026-07-04T06:00:00.000Z",
    updatedAt: "2026-07-05T08:30:00.000Z",
  },
  {
    id: "4",
    title: "VDCD triển khai hệ thống GIS quản lý hạ tầng đô thị tại TP. Pleiku",
    slug: "vdcd-trien-khai-gis-quan-ly-ha-tang-do-thi-pleiku",
    content: `
      <p>Thành phố Pleiku chính thức vận hành hệ thống GIS (Geographic Information System) do VDCD xây dựng, phục vụ quản lý toàn diện hạ tầng đô thị bao gồm giao thông, cấp thoát nước, và quy hoạch.</p>
      <h2>Tính năng nổi bật</h2>
      <ul>
        <li>Bản đồ số hóa toàn bộ hạ tầng kỹ thuật đô thị</li>
        <li>Giám sát và cảnh báo sự cố theo thời gian thực</li>
        <li>Hỗ trợ ra quyết định quy hoạch dựa trên dữ liệu</li>
      </ul>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-4/800/500",
    category: "Dự án",
    tags: "GIS, hạ tầng đô thị, Pleiku, bản đồ số",
    metaTitle: "Hệ thống GIS quản lý hạ tầng đô thị Pleiku | VDCD Group",
    metaDescription:
      "VDCD triển khai hệ thống GIS quản lý hạ tầng đô thị toàn diện tại TP. Pleiku, Gia Lai.",
    isPublished: true,
    publishedAt: "2026-06-28T10:00:00.000Z",
    createdAt: "2026-06-27T08:00:00.000Z",
    updatedAt: "2026-06-28T10:00:00.000Z",
  },
  {
    id: "5",
    title:
      "Đào tạo 500 cán bộ quản lý về chuyển đổi số tại các tỉnh Tây Nguyên",
    slug: "dao-tao-500-can-bo-chuyen-doi-so-tay-nguyen",
    content: `
      <p>VDCD Gia Lai hoàn thành chương trình đào tạo chuyển đổi số cho 500 cán bộ quản lý cấp tỉnh, huyện tại 5 tỉnh Tây Nguyên, nâng cao năng lực ứng dụng công nghệ trong quản lý nhà nước.</p>
      <h2>Chương trình đào tạo</h2>
      <p>Khóa đào tạo kéo dài 3 tháng với các module chuyên sâu về chính phủ điện tử, quản lý dữ liệu, và an toàn thông tin.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-5/800/500",
    category: "Chuyển đổi số",
    tags: "đào tạo, chuyển đổi số, cán bộ, Tây Nguyên",
    metaTitle: "Đào tạo chuyển đổi số cho 500 cán bộ Tây Nguyên | VDCD Group",
    metaDescription:
      "VDCD hoàn thành đào tạo chuyển đổi số cho 500 cán bộ quản lý tại 5 tỉnh Tây Nguyên.",
    isPublished: true,
    publishedAt: "2026-06-20T09:00:00.000Z",
    createdAt: "2026-06-19T07:00:00.000Z",
    updatedAt: "2026-06-20T09:00:00.000Z",
  },
  {
    id: "6",
    title:
      "VDCD ký kết hợp tác chiến lược với Đại học Bách khoa TP.HCM về nghiên cứu ứng dụng",
    slug: "vdcd-ky-ket-hop-tac-dai-hoc-bach-khoa-tphcm",
    content: `
      <p>VDCD Group và Đại học Bách khoa TP.HCM ký kết thỏa thuận hợp tác chiến lược trong lĩnh vực nghiên cứu ứng dụng công nghệ, chuyển giao tri thức và phát triển nguồn nhân lực.</p>
      <h2>Nội dung hợp tác</h2>
      <p>Hai bên sẽ cùng triển khai các dự án nghiên cứu ứng dụng trong lĩnh vực AI, IoT và drone khảo sát, đồng thời tạo cơ hội thực tập và việc làm cho sinh viên.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-6/800/500",
    category: "Tin tức",
    tags: "hợp tác, Đại học Bách khoa, nghiên cứu, nhân lực",
    metaTitle: "VDCD hợp tác chiến lược với ĐH Bách khoa TP.HCM | VDCD Group",
    metaDescription:
      "VDCD Group ký kết hợp tác chiến lược với Đại học Bách khoa TP.HCM về nghiên cứu ứng dụng và phát triển nhân lực.",
    isPublished: true,
    publishedAt: "2026-06-15T10:00:00.000Z",
    createdAt: "2026-06-14T08:00:00.000Z",
    updatedAt: "2026-06-15T10:00:00.000Z",
  },
  {
    id: "7",
    title: "Giải pháp drone khảo sát 3D phục vụ bảo tồn di sản văn hóa",
    slug: "giai-phap-drone-khao-sat-3d-bao-ton-di-san",
    content: `
      <p>VDCD tiên phong ứng dụng công nghệ drone kết hợp photogrammetry để tạo mô hình 3D chi tiết phục vụ bảo tồn các di sản văn hóa tại khu vực Tây Nguyên.</p>
      <h2>Ứng dụng thực tế</h2>
      <p>Công nghệ đã được triển khai tại nhiều di tích lịch sử và công trình kiến trúc cổ, giúp lưu trữ dữ liệu 3D chính xác đến từng millimeter.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-news-7/800/500",
    category: "Công nghệ",
    tags: "drone, 3D, bảo tồn, di sản, photogrammetry",
    metaTitle: "Drone khảo sát 3D bảo tồn di sản văn hóa | VDCD Group",
    metaDescription:
      "Ứng dụng drone và photogrammetry tạo mô hình 3D chi tiết phục vụ bảo tồn di sản văn hóa Tây Nguyên.",
    isPublished: true,
    publishedAt: "2026-06-08T08:00:00.000Z",
    createdAt: "2026-06-07T06:00:00.000Z",
    updatedAt: "2026-06-08T08:00:00.000Z",
  },
];

/** Get a mock article by slug */
export const getMockArticleBySlug = (slug: string): Article | undefined =>
  MOCK_ARTICLES.find((a) => a.slug === slug);
