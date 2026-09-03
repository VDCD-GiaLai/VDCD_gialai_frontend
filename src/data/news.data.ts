import type { Article } from "@/types";

export const NEWS_CATEGORIES = [
  "Tất cả",
  "Tin tức",
  "Sự kiện",
  "Công nghệ",
  "Dự án",
  "Chuyển đổi số",
] as const;

export const MOCK_ARTICLES: Article[] = [
  {
    id: "45894c54-3fb4-4727-8616-27092bcd1eb6",
    title:
      "Sở KH&CN An Giang, Hiệp hội Doanh nghiệp tỉnh và VDCD Group ký kết hợp tác phát triển hệ sinh thái khởi nghiệp",
    slug: "so-khcn-an-giang-hiep-hoi-dn-vdcd-ky-ket-khoi-nghiep",
    content:
      "<p>Ngày 28/07/2026, tại TP. Long Xuyên, Sở Khoa học và Công nghệ tỉnh An Giang, Hiệp hội Doanh nghiệp tỉnh An Giang và VDCD Group chính thức ký kết hợp tác ba bên.</p><h2>Mô hình Trung tâm ĐMST</h2><p>VDCD Group đề xuất xây dựng Trung tâm Đổi mới Sáng tạo tỉnh An Giang theo hình thức xã hội hóa — 100% vốn doanh nghiệp, không sử dụng ngân sách nhà nước.</p><h2>Quy trình hỗ trợ</h2><p>Khảo sát nhu cầu → Tư vấn giải pháp → Demo thử nghiệm → Triển khai thực tế → Đào tạo vận hành.</p>",
    thumbnail:
      "https://picsum.photos/seed/so-khcn-an-giang-hiep-hoi-dn-vdcd-ky-ket-khoi-nghiep/800/500",
    category: "Sự kiện",
    tags: "An Giang,Sở KH&CN,khởi nghiệp,hệ sinh thái,ký kết",
    thumbnailFileId:
      "article-thumb-so-khcn-an-giang-hiep-hoi-dn-vdcd-ky-ket-khoi-nghiep",
    metaTitle:
      "Sở KH&CN An Giang, Hiệp hội Doanh nghiệp tỉnh và VDCD Group ký kết hợp tác phát triển hệ sinh thái khởi nghiệp | VDCD",
    metaDescription:
      "VDCD Group ký kết 3 bên với Sở KH&CN và Hiệp hội DN An Giang phát triển hệ sinh thái khởi nghiệp.",
    isPublished: true,
    publishedAt: "2026-07-28T10:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "78543435-99dd-4420-b6b1-c811e3ad8a7f",
    title:
      "Trung tâm Đổi mới Sáng tạo Gia Lai ký kết hợp tác chiến lược với Vietedge thúc đẩy chuyển đổi số",
    slug: "trung-tam-dmst-gia-lai-ky-ket-vietedge",
    content:
      "<p>Tháng 7/2026, Công ty Cổ phần Trung tâm Đổi mới Sáng tạo Gia Lai (thành viên VDCD Group) chính thức ký kết Biên bản ghi nhớ hợp tác (MOU) với Vietedge — đơn vị tiên phong trong lĩnh vực công nghệ và đầu tư số tại Việt Nam.</p><h2>Nội dung hợp tác</h2><ul><li>Thúc đẩy hệ sinh thái công nghệ và đổi mới sáng tạo tại tỉnh Gia Lai</li><li>Xúc tiến thương mại, kết nối đầu tư vào các dự án công nghệ số</li><li>Phát triển nguồn nhân lực số chất lượng cao cho khu vực Tây Nguyên</li><li>Chuyển giao công nghệ và ứng dụng giải pháp AI, IoT, dữ liệu lớn</li></ul>",
    thumbnail:
      "https://picsum.photos/seed/trung-tam-dmst-gia-lai-ky-ket-vietedge/800/500",
    category: "Tin tức",
    tags: "hợp tác,Vietedge,đổi mới sáng tạo,chuyển đổi số,Gia Lai",
    thumbnailFileId: "article-thumb-trung-tam-dmst-gia-lai-ky-ket-vietedge",
    metaTitle:
      "Trung tâm Đổi mới Sáng tạo Gia Lai ký kết hợp tác chiến lược với Vietedge thúc đẩy chuyển đổi số | VDCD",
    metaDescription:
      "Trung tâm Đổi mới Sáng tạo Gia Lai và Vietedge ký kết MOU thúc đẩy hệ sinh thái công nghệ, chuyển đổi số tại Tây Nguyên.",
    isPublished: true,
    publishedAt: "2026-07-18T09:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "150af21c-a54f-4882-b5ed-4ba351ba9cc4",
    title: 'Xã Tây Sơn trở thành "Xã hạt nhân số" đầu tiên của tỉnh Gia Lai',
    slug: "xa-tay-son-xa-hat-nhan-so-dau-tien-gia-lai",
    content:
      '<p>Xã Tây Sơn (huyện An Khê, Gia Lai) được UBND tỉnh lựa chọn làm đơn vị thí điểm xây dựng mô hình "Xã hạt nhân về khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số", với sự phối hợp của Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD).</p><h2>Kết quả đạt được</h2><ul><li>100% thủ tục hành chính xử lý trực tuyến — thời gian đăng ký hộ kinh doanh giảm từ 3 ngày xuống 3 giờ</li><li>Tỷ lệ hài lòng của người dân đạt 100%</li><li>Triển khai mô hình "chợ số" — tiểu thương thanh toán không dùng tiền mặt</li><li>Tỷ lệ phủ sóng 5G đạt 99,3% dân số</li></ul>',
    thumbnail:
      "https://picsum.photos/seed/xa-tay-son-xa-hat-nhan-so-dau-tien-gia-lai/800/500",
    category: "Chuyển đổi số",
    tags: "xã hạt nhân số,Tây Sơn,chuyển đổi số,chính quyền số,Gia Lai",
    thumbnailFileId: "article-thumb-xa-tay-son-xa-hat-nhan-so-dau-tien-gia-lai",
    metaTitle:
      'Xã Tây Sơn trở thành "Xã hạt nhân số" đầu tiên của tỉnh Gia Lai | VDCD',
    metaDescription:
      "Mô hình xã hạt nhân số tại Tây Sơn giảm thời gian TTHC từ 3 ngày xuống 3 giờ, phủ sóng 5G 99,3% dân số.",
    isPublished: true,
    publishedAt: "2026-07-12T14:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "35b8fd1a-bab2-4292-a18c-c68995395a74",
    title:
      "VDCD Group mở rộng mô hình Trung tâm ĐMST tại Quảng Ninh, Cao Bằng và Hưng Yên",
    slug: "vdcd-mo-rong-mo-hinh-dmst-quang-ninh-cao-bang-hung-yen",
    content:
      '<p>Trong năm 2026, VDCD Group tiếp tục mở rộng mô hình "Trung tâm Đổi mới sáng tạo do doanh nghiệp làm chủ" ra nhiều tỉnh thành trên cả nước.</p><h2>Tiến độ triển khai</h2><ul><li><strong>Lạng Sơn (02/2026):</strong> Sở KH&CN họp xem xét đề án thành lập</li><li><strong>Hưng Yên (03/2026):</strong> Làm việc về phương án đầu tư</li><li><strong>Quảng Ninh (03/2026):</strong> Đề xuất thành lập phục vụ kinh tế biển và du lịch số</li><li><strong>Cao Bằng (07/2026):</strong> UBND tỉnh họp cho ý kiến về đề án</li></ul><p>VDCD Group hiện sở hữu hệ sinh thái với 12 trung tâm nghiên cứu chuyên sâu.</p>',
    thumbnail:
      "https://picsum.photos/seed/vdcd-mo-rong-mo-hinh-dmst-quang-ninh-cao-bang-hung-yen/800/500",
    category: "Tin tức",
    tags: "mở rộng,Quảng Ninh,Cao Bằng,Hưng Yên,Lạng Sơn,ĐMST",
    thumbnailFileId:
      "article-thumb-vdcd-mo-rong-mo-hinh-dmst-quang-ninh-cao-bang-hung-yen",
    metaTitle:
      "VDCD Group mở rộng mô hình Trung tâm ĐMST tại Quảng Ninh, Cao Bằng và Hưng Yên | VDCD",
    metaDescription:
      "VDCD Group mở rộng mô hình Trung tâm ĐMST do doanh nghiệp làm chủ tại nhiều tỉnh thành trên cả nước.",
    isPublished: true,
    publishedAt: "2026-07-05T08:30:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "241de565-78be-4e38-8e83-43224eb9a174",
    title:
      "Khánh thành hạ tầng Data Center và 6 phòng Lab chuyên ngành tại Trung tâm ĐMST Gia Lai",
    slug: "khanh-thanh-data-center-phong-lab-trung-tam-dmst-gia-lai",
    content:
      "<p>Trung tâm Đổi mới Sáng tạo Gia Lai chính thức đưa vào vận hành hệ thống hạ tầng công nghệ hiện đại, bao gồm Data Center, siêu máy tính AI và 6 phòng lab chuyên ngành.</p><h2>6 phòng Lab chuyên ngành</h2><ul><li><strong>Lab UAV:</strong> Bay chụp, khảo sát địa hình, lập bản đồ 3D</li><li><strong>Lab AI:</strong> Xử lý ảnh, nhận diện, chatbot, phân tích dữ liệu</li><li><strong>Lab GIS:</strong> Hệ thống thông tin địa lý, bản đồ số, quy hoạch</li><li><strong>Lab Nông nghiệp công nghệ cao:</strong> IoT cảm biến, tưới tự động</li><li><strong>Lab Công nghệ sinh học:</strong> Nuôi cấy mô, phân tích mẫu</li><li><strong>Lab STEM:</strong> Giáo dục STEM cho học sinh, sinh viên</li></ul>",
    thumbnail:
      "https://picsum.photos/seed/khanh-thanh-data-center-phong-lab-trung-tam-dmst-gia-lai/800/500",
    category: "Tin tức",
    tags: "Data Center,phòng lab,AI,UAV,GIS,hạ tầng,Gia Lai",
    thumbnailFileId:
      "article-thumb-khanh-thanh-data-center-phong-lab-trung-tam-dmst-gia-lai",
    metaTitle:
      "Khánh thành hạ tầng Data Center và 6 phòng Lab chuyên ngành tại Trung tâm ĐMST Gia Lai | VDCD",
    metaDescription:
      "VDCD đưa vào vận hành Data Center, siêu máy tính AI và 6 phòng lab chuyên ngành UAV, AI, GIS, Nông nghiệp, STEM.",
    isPublished: true,
    publishedAt: "2026-06-25T10:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "c798a7bf-9038-41a8-8c80-3a025b0df0ce",
    title:
      "Ứng dụng UAV/Drone trong đo đạc, lập bản đồ địa chính — VDCD triển khai thành công tại Hà Tĩnh",
    slug: "ung-dung-uav-drone-do-dac-ban-do-dia-chinh-ha-tinh",
    content:
      "<p>VDCD Group đã triển khai thành công công nghệ bay không người lái (UAV/Drone) trong công tác đo đạc, lập bản đồ địa chính tại xã Đồng Tiến, tỉnh Hà Tĩnh.</p><h2>Quy trình triển khai</h2><ul><li>Bay chụp ảnh hàng không bằng drone chuyên dụng</li><li>Xử lý ảnh, tạo bản đồ trực ảnh độ phân giải cao</li><li>Chiết xuất dữ liệu ranh giới thửa đất</li><li>Cung cấp bản đồ số phục vụ quản lý đất đai</li></ul><h2>Hiệu quả</h2><p>Giảm 70% thời gian khảo sát, tăng độ chính xác gấp 3 lần so với phương pháp truyền thống.</p>",
    thumbnail:
      "https://picsum.photos/seed/ung-dung-uav-drone-do-dac-ban-do-dia-chinh-ha-tinh/800/500",
    category: "Công nghệ",
    tags: "UAV,drone,đo đạc,bản đồ,địa chính,GIS,Hà Tĩnh",
    thumbnailFileId:
      "article-thumb-ung-dung-uav-drone-do-dac-ban-do-dia-chinh-ha-tinh",
    metaTitle:
      "Ứng dụng UAV/Drone trong đo đạc, lập bản đồ địa chính — VDCD triển khai thành công tại Hà Tĩnh | VDCD",
    metaDescription:
      "VDCD triển khai công nghệ drone đo đạc, lập bản đồ địa chính tại Hà Tĩnh — giảm 70% thời gian khảo sát.",
    isPublished: true,
    publishedAt: "2026-06-15T09:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "25f0be1e-789a-449a-86a7-aca8781acf59",
    title:
      "AutoTimelapse — Giải pháp giám sát công trình thông minh 24/7 của VDCD Group",
    slug: "autotimelapse-giai-phap-giam-sat-cong-trinh-thong-minh",
    content:
      "<p>AutoTimelapse là giải pháp giám sát trực quan công trình 24/7 do VDCD Group phát triển.</p><h2>Tính năng nổi bật</h2><ul><li>Camera thông minh kết hợp AI — giám sát 24/7</li><li>Tự động tạo video timelapse, so sánh tiến độ thực tế với kế hoạch</li><li>Cảnh báo sớm các sai lệch về tiến độ, an toàn lao động</li><li>Dashboard quản lý trực quan — truy cập từ xa qua web và mobile</li></ul><p>Hệ thống đã được triển khai thành công trên nhiều gói thầu quan trọng của các dự án hạ tầng lớn trên cả nước.</p>",
    thumbnail:
      "https://picsum.photos/seed/autotimelapse-giai-phap-giam-sat-cong-trinh-thong-minh/800/500",
    category: "Công nghệ",
    tags: "AutoTimelapse,giám sát công trình,AI,camera thông minh,timelapse",
    thumbnailFileId:
      "article-thumb-autotimelapse-giai-phap-giam-sat-cong-trinh-thong-minh",
    metaTitle:
      "AutoTimelapse — Giải pháp giám sát công trình thông minh 24/7 của VDCD Group | VDCD",
    metaDescription:
      "AutoTimelapse — giải pháp giám sát trực quan công trình 24/7 bằng AI, tự động tạo timelapse và cảnh báo sớm.",
    isPublished: true,
    publishedAt: "2026-06-01T08:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "8f25d11f-0a0a-4017-85b0-059d82407cae",
    title:
      "VDCD Group ký MOU với Trường Đại học Quy Nhơn — Xây dựng hệ sinh thái khởi nghiệp trong môi trường đại học",
    slug: "vdcd-ky-mou-dai-hoc-quy-nhon",
    content:
      "<p>Ngày 18/05/2026, Trường Đại học Quy Nhơn và Công ty Cổ phần Trung tâm Đổi mới Sáng tạo Gia Lai (thành viên VDCD Group) chính thức ký kết Bản thỏa thuận hợp tác (MOU).</p><h2>Nội dung hợp tác trọng tâm</h2><ul><li>Xây dựng hệ sinh thái khởi nghiệp đổi mới sáng tạo trong môi trường đại học</li><li>Chuyển giao công nghệ và ứng dụng kết quả nghiên cứu vào thực tiễn doanh nghiệp</li><li>Đào tạo nguồn nhân lực chất lượng cao trong các lĩnh vực AI, IoT, GIS, UAV</li></ul>",
    thumbnail:
      "https://picsum.photos/seed/vdcd-ky-mou-dai-hoc-quy-nhon/800/500",
    category: "Sự kiện",
    tags: "Đại học Quy Nhơn,hợp tác,khởi nghiệp,đào tạo,nhân lực",
    thumbnailFileId: "article-thumb-vdcd-ky-mou-dai-hoc-quy-nhon",
    metaTitle:
      "VDCD Group ký MOU với Trường Đại học Quy Nhơn — Xây dựng hệ sinh thái khởi nghiệp trong môi trường đại học | VDCD",
    metaDescription:
      "VDCD Group ký kết hợp tác với Đại học Quy Nhơn xây dựng hệ sinh thái khởi nghiệp, chuyển giao công nghệ.",
    isPublished: true,
    publishedAt: "2026-05-20T08:30:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "9012572f-07d9-45d5-927c-367696cd1051",
    title:
      "Hội thảo truyền thông chính sách khởi nghiệp sáng tạo — VDCD giới thiệu mô hình ĐMST do doanh nghiệp làm chủ",
    slug: "hoi-thao-truyen-thong-chinh-sach-khoi-nghiep-sang-tao-gia-lai",
    content:
      "<p>Tháng 5/2026, Sở Khoa học và Công nghệ tỉnh Gia Lai tổ chức Hội thảo truyền thông chính sách khởi nghiệp sáng tạo.</p><h2>Các giải pháp được giới thiệu</h2><ul><li>Hạ tầng dữ liệu số và bản đồ số cho quản lý đô thị</li><li>Ứng dụng AI trong nông nghiệp thông minh</li><li>Giải pháp UAV/Drone cho khảo sát và giám sát</li><li>Chương trình hỗ trợ chuyển đổi số cho doanh nghiệp SME</li></ul>",
    thumbnail:
      "https://picsum.photos/seed/hoi-thao-truyen-thong-chinh-sach-khoi-nghiep-sang-tao-gia-lai/800/500",
    category: "Sự kiện",
    tags: "hội thảo,khởi nghiệp,Sở KH&CN,Gia Lai,chính sách",
    thumbnailFileId:
      "article-thumb-hoi-thao-truyen-thong-chinh-sach-khoi-nghiep-sang-tao-gia-lai",
    metaTitle:
      "Hội thảo truyền thông chính sách khởi nghiệp sáng tạo — VDCD giới thiệu mô hình ĐMST do doanh nghiệp làm chủ | VDCD",
    metaDescription:
      "VDCD giới thiệu mô hình Trung tâm ĐMST do doanh nghiệp làm chủ tại Hội thảo chính sách khởi nghiệp Gia Lai.",
    isPublished: true,
    publishedAt: "2026-05-10T09:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
  {
    id: "7e21a3c4-3c12-49b2-a23b-417f95ff0785",
    title:
      'Phong trào "Bình dân học vụ số" tại Gia Lai — VDCD đồng hành cùng Tổ công nghệ số cộng đồng',
    slug: "binh-dan-hoc-vu-so-gia-lai-vdcd-to-cong-nghe-so",
    content:
      '<p>Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD) phối hợp cùng các Tổ công nghệ số cộng đồng triển khai phong trào "Bình dân học vụ số".</p><h2>Nội dung hỗ trợ</h2><ul><li>Hướng dẫn cài đặt và sử dụng ứng dụng iGiaLai</li><li>Đăng ký tài khoản định danh điện tử (VNeID)</li><li>Sử dụng thanh toán không dùng tiền mặt qua ví điện tử, QR Code</li><li>Bảo mật thông tin cá nhân trên không gian mạng</li></ul><p>Phong trào đã tiếp cận hơn 2.000 người dân trong 3 tháng đầu, với tỷ lệ cài đặt ứng dụng thành công đạt trên 85%.</p>',
    thumbnail:
      "https://picsum.photos/seed/binh-dan-hoc-vu-so-gia-lai-vdcd-to-cong-nghe-so/800/500",
    category: "Chuyển đổi số",
    tags: "bình dân học vụ số,iGiaLai,công dân số,cộng đồng,Gia Lai",
    thumbnailFileId:
      "article-thumb-binh-dan-hoc-vu-so-gia-lai-vdcd-to-cong-nghe-so",
    metaTitle:
      'Phong trào "Bình dân học vụ số" tại Gia Lai — VDCD đồng hành cùng Tổ công nghệ số cộng đồng | VDCD',
    metaDescription:
      "VDCD hỗ trợ hơn 2.000 người dân Gia Lai cài đặt ứng dụng số qua phong trào Bình dân học vụ số.",
    isPublished: true,
    publishedAt: "2026-04-20T08:00:00.000Z",
    createdAt: "2026-08-31T20:04:50.107Z",
    updatedAt: "2026-08-31T20:04:50.107Z",
  },
];

export const getMockArticleBySlug = (slug: string): Article | undefined =>
  MOCK_ARTICLES.find((a) => a.slug === slug);
