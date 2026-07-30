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
      "Trung tâm Đổi mới Sáng tạo Gia Lai ký kết hợp tác chiến lược với Vietedge thúc đẩy chuyển đổi số",
    slug: "trung-tam-dmst-gia-lai-ky-ket-vietedge",
    content: `
      <p>Tháng 7/2026, Công ty Cổ phần Trung tâm Đổi mới Sáng tạo Gia Lai (thành viên VDCD Group) chính thức ký kết Biên bản ghi nhớ hợp tác (MOU) với Vietedge — đơn vị tiên phong trong lĩnh vực công nghệ và đầu tư số tại Việt Nam.</p>
      <h2>Nội dung hợp tác</h2>
      <p>Hai bên sẽ phối hợp triển khai các hoạt động trọng điểm bao gồm:</p>
      <ul>
        <li>Thúc đẩy hệ sinh thái công nghệ và đổi mới sáng tạo tại tỉnh Gia Lai</li>
        <li>Xúc tiến thương mại, kết nối đầu tư vào các dự án công nghệ số</li>
        <li>Phát triển nguồn nhân lực số chất lượng cao cho khu vực Tây Nguyên</li>
        <li>Chuyển giao công nghệ và ứng dụng giải pháp AI, IoT, dữ liệu lớn</li>
      </ul>
      <h2>Ý nghĩa chiến lược</h2>
      <p>Sự hợp tác này đánh dấu bước tiến quan trọng trong việc mở rộng hệ sinh thái đổi mới sáng tạo từ vùng kinh tế trọng điểm đến các tỉnh Tây Nguyên, biến Gia Lai trở thành điểm sáng chuyển đổi số cấp tỉnh.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-vietedge/800/500",
    category: "Tin tức",
    tags: "hợp tác, Vietedge, đổi mới sáng tạo, chuyển đổi số, Gia Lai",
    metaTitle:
      "VDCD Gia Lai ký kết hợp tác chiến lược với Vietedge | VDCD Group",
    metaDescription:
      "Trung tâm Đổi mới Sáng tạo Gia Lai và Vietedge ký kết MOU thúc đẩy hệ sinh thái công nghệ, chuyển đổi số tại Tây Nguyên.",
    isPublished: true,
    publishedAt: "2026-07-18T09:00:00.000Z",
    createdAt: "2026-07-17T08:00:00.000Z",
    updatedAt: "2026-07-18T09:00:00.000Z",
  },
  {
    id: "2",
    title:
      'Xã Tây Sơn trở thành "Xã hạt nhân số" đầu tiên của tỉnh Gia Lai — Khi chuyển đổi số bắt đầu từ cấp cơ sở',
    slug: "xa-tay-son-xa-hat-nhan-so-dau-tien-gia-lai",
    content: `
      <p>Xã Tây Sơn (huyện An Khê, Gia Lai) được UBND tỉnh lựa chọn làm đơn vị thí điểm xây dựng mô hình "Xã hạt nhân về khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số", với sự phối hợp của Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD).</p>
      <h2>Kết quả đạt được sau 6 tháng triển khai</h2>
      <ul>
        <li>100% thủ tục hành chính xử lý trực tuyến — thời gian đăng ký hộ kinh doanh giảm từ 3 ngày xuống 3 giờ</li>
        <li>Tỷ lệ hài lòng của người dân đạt 100%</li>
        <li>Triển khai mô hình "chợ số" — tiểu thương thanh toán không dùng tiền mặt</li>
        <li>Tỷ lệ phủ sóng 5G đạt 99,3% dân số</li>
        <li>Phát động phong trào "Bình dân học vụ số" hỗ trợ người dân cài đặt ứng dụng iGiaLai</li>
      </ul>
      <h2>Định hướng nhân rộng</h2>
      <p>Kết quả từ xã Tây Sơn sẽ làm cơ sở thực tiễn để tỉnh Gia Lai nhân rộng mô hình ra 30 xã khác trên toàn tỉnh, hướng đến xây dựng chính quyền số, kinh tế số và xã hội số từ cấp cơ sở.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-xa-hat-nhan/800/500",
    category: "Chuyển đổi số",
    tags: "xã hạt nhân số, Tây Sơn, chuyển đổi số, chính quyền số, Gia Lai",
    metaTitle: "Xã Tây Sơn — Xã hạt nhân số đầu tiên tỉnh Gia Lai | VDCD Group",
    metaDescription:
      "Mô hình xã hạt nhân số tại Tây Sơn giảm thời gian TTHC từ 3 ngày xuống 3 giờ, phủ sóng 5G 99,3% dân số.",
    isPublished: true,
    publishedAt: "2026-07-12T14:00:00.000Z",
    createdAt: "2026-07-11T10:00:00.000Z",
    updatedAt: "2026-07-12T14:00:00.000Z",
  },
  {
    id: "3",
    title:
      "VDCD Group ký MOU với Trường Đại học Quy Nhơn — Xây dựng hệ sinh thái khởi nghiệp trong môi trường đại học",
    slug: "vdcd-ky-mou-dai-hoc-quy-nhon",
    content: `
      <p>Ngày 18/05/2026, Trường Đại học Quy Nhơn và Công ty Cổ phần Trung tâm Đổi mới Sáng tạo Gia Lai (thành viên VDCD Group) chính thức ký kết Bản thỏa thuận hợp tác (MOU), mở ra chương mới trong việc kết nối đào tạo — nghiên cứu — doanh nghiệp.</p>
      <h2>Nội dung hợp tác trọng tâm</h2>
      <ul>
        <li>Xây dựng hệ sinh thái khởi nghiệp đổi mới sáng tạo trong môi trường đại học</li>
        <li>Chuyển giao công nghệ và ứng dụng kết quả nghiên cứu vào thực tiễn doanh nghiệp</li>
        <li>Đào tạo nguồn nhân lực chất lượng cao trong các lĩnh vực AI, IoT, GIS, UAV</li>
        <li>Tạo cơ hội thực tập và việc làm cho sinh viên tại hệ sinh thái VDCD</li>
      </ul>
      <p>Đây là bước đi chiến lược nằm trong kế hoạch mở rộng hệ sinh thái đổi mới sáng tạo do doanh nghiệp làm chủ của VDCD Group, kết nối chặt chẽ giữa học thuật và thực tiễn.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-quy-nhon/800/500",
    category: "Sự kiện",
    tags: "Đại học Quy Nhơn, hợp tác, khởi nghiệp, đào tạo, nhân lực",
    metaTitle: "VDCD Group ký MOU với Đại học Quy Nhơn | VDCD Group",
    metaDescription:
      "VDCD Group ký kết hợp tác với Đại học Quy Nhơn xây dựng hệ sinh thái khởi nghiệp, chuyển giao công nghệ và phát triển nhân lực.",
    isPublished: true,
    publishedAt: "2026-05-20T08:30:00.000Z",
    createdAt: "2026-05-19T06:00:00.000Z",
    updatedAt: "2026-05-20T08:30:00.000Z",
  },
  {
    id: "4",
    title:
      "Khánh thành hạ tầng Data Center và 6 phòng Lab chuyên ngành tại Trung tâm ĐMST Gia Lai",
    slug: "khanh-thanh-data-center-phong-lab-trung-tam-dmst-gia-lai",
    content: `
      <p>Trung tâm Đổi mới Sáng tạo Gia Lai chính thức đưa vào vận hành hệ thống hạ tầng công nghệ hiện đại, bao gồm Data Center, siêu máy tính AI và 6 phòng lab chuyên ngành — phục vụ doanh nghiệp, startup và cộng đồng nghiên cứu khu vực Tây Nguyên.</p>
      <h2>6 phòng Lab chuyên ngành</h2>
      <ul>
        <li><strong>Lab UAV (Drone):</strong> Bay chụp, khảo sát địa hình, lập bản đồ 3D</li>
        <li><strong>Lab AI:</strong> Xử lý ảnh, nhận diện, chatbot, phân tích dữ liệu</li>
        <li><strong>Lab GIS:</strong> Hệ thống thông tin địa lý, bản đồ số, quy hoạch</li>
        <li><strong>Lab Nông nghiệp công nghệ cao:</strong> IoT cảm biến, tưới tự động, giám sát sinh trưởng</li>
        <li><strong>Lab Công nghệ sinh học:</strong> Nuôi cấy mô, phân tích mẫu, nghiên cứu giống</li>
        <li><strong>Lab STEM:</strong> Giáo dục STEM cho học sinh, sinh viên khu vực</li>
      </ul>
      <h2>Năng lực phục vụ</h2>
      <p>Hạ tầng được thiết kế phục vụ đồng thời cho các hoạt động: thử nghiệm giải pháp, đào tạo nhân lực, nghiên cứu ứng dụng và ươm tạo doanh nghiệp khởi nghiệp.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-data-center/800/500",
    category: "Tin tức",
    tags: "Data Center, phòng lab, AI, UAV, GIS, hạ tầng, Gia Lai",
    metaTitle:
      "Khánh thành Data Center và 6 Lab chuyên ngành tại ĐMST Gia Lai | VDCD",
    metaDescription:
      "VDCD đưa vào vận hành Data Center, siêu máy tính AI và 6 phòng lab chuyên ngành UAV, AI, GIS, Nông nghiệp, STEM.",
    isPublished: true,
    publishedAt: "2026-06-25T10:00:00.000Z",
    createdAt: "2026-06-24T08:00:00.000Z",
    updatedAt: "2026-06-25T10:00:00.000Z",
  },
  {
    id: "5",
    title:
      "Ứng dụng UAV/Drone trong đo đạc, lập bản đồ địa chính — VDCD triển khai thành công tại Hà Tĩnh",
    slug: "ung-dung-uav-drone-do-dac-ban-do-dia-chinh-ha-tinh",
    content: `
      <p>VDCD Group đã triển khai thành công công nghệ bay không người lái (UAV/Drone) trong công tác đo đạc, lập bản đồ địa chính và quy chủ sử dụng đất tại xã Đồng Tiến, tỉnh Hà Tĩnh — mở ra hướng đi mới cho việc số hóa dữ liệu tài nguyên đất đai.</p>
      <h2>Quy trình triển khai</h2>
      <ul>
        <li>Bay chụp ảnh hàng không bằng drone chuyên dụng</li>
        <li>Xử lý ảnh, tạo bản đồ trực ảnh độ phân giải cao</li>
        <li>Chiết xuất dữ liệu ranh giới thửa đất, so sánh với hồ sơ địa chính</li>
        <li>Cung cấp bản đồ số phục vụ công tác quản lý đất đai</li>
      </ul>
      <h2>Hiệu quả</h2>
      <p>So với phương pháp đo đạc truyền thống, giải pháp UAV giúp giảm 70% thời gian khảo sát, tăng độ chính xác lên gấp 3 lần và giảm đáng kể chi phí nhân lực. Dữ liệu số hóa được tích hợp trực tiếp vào hệ thống GIS quản lý đất đai của địa phương.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-uav-drone/800/500",
    category: "Công nghệ",
    tags: "UAV, drone, đo đạc, bản đồ, địa chính, GIS, Hà Tĩnh",
    metaTitle: "UAV/Drone lập bản đồ địa chính tại Hà Tĩnh | VDCD Group",
    metaDescription:
      "VDCD triển khai công nghệ drone đo đạc, lập bản đồ địa chính tại Hà Tĩnh — giảm 70% thời gian, tăng gấp 3 độ chính xác.",
    isPublished: true,
    publishedAt: "2026-06-15T09:00:00.000Z",
    createdAt: "2026-06-14T07:00:00.000Z",
    updatedAt: "2026-06-15T09:00:00.000Z",
  },
  {
    id: "6",
    title:
      "Sở KH&CN An Giang, Hiệp hội Doanh nghiệp tỉnh và VDCD Group ký kết hợp tác phát triển hệ sinh thái khởi nghiệp",
    slug: "so-khcn-an-giang-hiep-hoi-dn-vdcd-ky-ket-khoi-nghiep",
    content: `
      <p>Ngày 28/07/2026, tại TP. Long Xuyên, Sở Khoa học và Công nghệ tỉnh An Giang, Hiệp hội Doanh nghiệp tỉnh An Giang và VDCD Group chính thức ký kết hợp tác ba bên nhằm phát triển hệ sinh thái khởi nghiệp, thúc đẩy chuyển đổi số và kết nối đầu tư.</p>
      <h2>Mô hình Trung tâm ĐMST do doanh nghiệp làm chủ</h2>
      <p>VDCD Group đề xuất xây dựng Trung tâm Đổi mới Sáng tạo và Chuyển đổi số tỉnh An Giang theo hình thức xã hội hóa — 100% vốn doanh nghiệp, không sử dụng ngân sách nhà nước. Trung tâm sẽ là "phòng lab mở" hỗ trợ doanh nghiệp và startup thử nghiệm giải pháp công nghệ.</p>
      <h2>Quy trình hỗ trợ doanh nghiệp</h2>
      <p>VDCD áp dụng quy trình 5 bước: Khảo sát nhu cầu → Tư vấn giải pháp → Demo thử nghiệm → Triển khai thực tế → Đào tạo vận hành.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-an-giang/800/500",
    category: "Sự kiện",
    tags: "An Giang, Sở KH&CN, khởi nghiệp, hệ sinh thái, ký kết",
    metaTitle:
      "Sở KH&CN An Giang và VDCD Group ký kết phát triển khởi nghiệp | VDCD",
    metaDescription:
      "VDCD Group ký kết 3 bên với Sở KH&CN và Hiệp hội DN An Giang phát triển hệ sinh thái khởi nghiệp, chuyển đổi số.",
    isPublished: true,
    publishedAt: "2026-07-28T10:00:00.000Z",
    createdAt: "2026-07-28T08:00:00.000Z",
    updatedAt: "2026-07-28T10:00:00.000Z",
  },
  {
    id: "7",
    title:
      "VDCD Group mở rộng mô hình Trung tâm ĐMST tại Quảng Ninh, Cao Bằng và Hưng Yên",
    slug: "vdcd-mo-rong-mo-hinh-dmst-quang-ninh-cao-bang-hung-yen",
    content: `
      <p>Trong năm 2026, VDCD Group tiếp tục mở rộng mô hình "Trung tâm Đổi mới sáng tạo do doanh nghiệp làm chủ" ra nhiều tỉnh thành trên cả nước, với các buổi làm việc và đề xuất đầu tư tại Quảng Ninh, Cao Bằng, Hưng Yên và Lạng Sơn.</p>
      <h2>Tiến độ triển khai</h2>
      <ul>
        <li><strong>Lạng Sơn (02/2026):</strong> Sở KH&CN họp xem xét đề án thành lập Trung tâm ĐMST và Chuyển đổi số</li>
        <li><strong>Hưng Yên (03/2026):</strong> Làm việc với lãnh đạo tỉnh về phương án đầu tư trung tâm</li>
        <li><strong>Quảng Ninh (03/2026):</strong> Đề xuất thành lập Trung tâm ĐMST phục vụ kinh tế biển và du lịch số</li>
        <li><strong>Cao Bằng (07/2026):</strong> UBND tỉnh họp cho ý kiến về đề án đầu tư của VDCD Group</li>
      </ul>
      <h2>Hệ sinh thái 12 trung tâm nghiên cứu</h2>
      <p>VDCD Group hiện sở hữu hệ sinh thái với 12 trung tâm nghiên cứu chuyên sâu, tập trung vào AI, Robot, dữ liệu, bản đồ số, GIS, và các giải pháp số hóa toàn diện.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-mo-rong/800/500",
    category: "Tin tức",
    tags: "mở rộng, Quảng Ninh, Cao Bằng, Hưng Yên, Lạng Sơn, ĐMST",
    metaTitle:
      "VDCD mở rộng ĐMST tại Quảng Ninh, Cao Bằng, Hưng Yên | VDCD Group",
    metaDescription:
      "VDCD Group mở rộng mô hình Trung tâm ĐMST do doanh nghiệp làm chủ tại nhiều tỉnh thành trên cả nước trong 2026.",
    isPublished: true,
    publishedAt: "2026-07-05T08:30:00.000Z",
    createdAt: "2026-07-04T06:00:00.000Z",
    updatedAt: "2026-07-05T08:30:00.000Z",
  },
  {
    id: "8",
    title:
      "AutoTimelapse — Giải pháp giám sát công trình thông minh 24/7 của VDCD Group",
    slug: "autotimelapse-giai-phap-giam-sat-cong-trinh-thong-minh",
    content: `
      <p>AutoTimelapse là một trong các bộ giải pháp công nghệ thông minh do VDCD Group phát triển, chuyên dùng để giám sát trực quan các công trình xây dựng 24/7, tự động cảnh báo và dựng phim timelapse chất lượng cao phục vụ quản lý tiến độ và an ninh dự án.</p>
      <h2>Tính năng nổi bật</h2>
      <ul>
        <li>Camera thông minh kết hợp AI — giám sát 24/7, phân tích hình ảnh theo thời gian thực</li>
        <li>Tự động tạo video timelapse, so sánh tiến độ thực tế với kế hoạch</li>
        <li>Cảnh báo sớm các sai lệch về tiến độ, an toàn lao động</li>
        <li>Dashboard quản lý trực quan — truy cập từ xa qua web và mobile</li>
      </ul>
      <h2>Triển khai thực tế</h2>
      <p>Hệ thống AutoTimelapse đã được triển khai thành công trên nhiều gói thầu quan trọng của các dự án hạ tầng lớn trên cả nước, giúp chủ đầu tư và nhà thầu nắm bắt toàn cảnh tiến độ thi công mà không cần có mặt tại hiện trường.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-autotimelapse/800/500",
    category: "Công nghệ",
    tags: "AutoTimelapse, giám sát công trình, AI, camera thông minh, timelapse",
    metaTitle: "AutoTimelapse — Giám sát công trình 24/7 | VDCD Group",
    metaDescription:
      "AutoTimelapse — giải pháp giám sát trực quan công trình 24/7 bằng AI, tự động tạo timelapse và cảnh báo sớm.",
    isPublished: true,
    publishedAt: "2026-06-01T08:00:00.000Z",
    createdAt: "2026-05-31T06:00:00.000Z",
    updatedAt: "2026-06-01T08:00:00.000Z",
  },
  {
    id: "9",
    title:
      "Hội thảo truyền thông chính sách khởi nghiệp sáng tạo — VDCD giới thiệu mô hình ĐMST do doanh nghiệp làm chủ",
    slug: "hoi-thao-truyen-thong-chinh-sach-khoi-nghiep-sang-tao-gia-lai",
    content: `
      <p>Tháng 5/2026, Sở Khoa học và Công nghệ tỉnh Gia Lai tổ chức Hội thảo truyền thông chính sách khởi nghiệp sáng tạo, với sự tham gia của các sở, ban, ngành, doanh nghiệp và cộng đồng startup địa phương.</p>
      <h2>VDCD trình bày mô hình ĐMST</h2>
      <p>Tại hội thảo, Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD) đã giới thiệu mô hình trung tâm đổi mới sáng tạo do doanh nghiệp làm chủ — hoạt động bằng 100% vốn doanh nghiệp, không sử dụng ngân sách nhà nước, đóng vai trò "phòng lab mở" cho cộng đồng.</p>
      <h2>Các giải pháp được giới thiệu</h2>
      <ul>
        <li>Hạ tầng dữ liệu số và bản đồ số cho quản lý đô thị</li>
        <li>Ứng dụng AI trong nông nghiệp thông minh</li>
        <li>Giải pháp UAV/Drone cho khảo sát và giám sát</li>
        <li>Chương trình hỗ trợ chuyển đổi số cho doanh nghiệp SME</li>
      </ul>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-hoi-thao/800/500",
    category: "Sự kiện",
    tags: "hội thảo, khởi nghiệp, Sở KH&CN, Gia Lai, chính sách",
    metaTitle:
      "Hội thảo khởi nghiệp sáng tạo Gia Lai — Mô hình ĐMST VDCD | VDCD Group",
    metaDescription:
      "VDCD giới thiệu mô hình Trung tâm ĐMST do doanh nghiệp làm chủ tại Hội thảo chính sách khởi nghiệp Gia Lai.",
    isPublished: true,
    publishedAt: "2026-05-10T09:00:00.000Z",
    createdAt: "2026-05-09T07:00:00.000Z",
    updatedAt: "2026-05-10T09:00:00.000Z",
  },
  {
    id: "10",
    title:
      'Phong trào "Bình dân học vụ số" tại Gia Lai — VDCD đồng hành cùng Tổ công nghệ số cộng đồng',
    slug: "binh-dan-hoc-vu-so-gia-lai-vdcd-to-cong-nghe-so",
    content: `
      <p>Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD) phối hợp cùng các Tổ công nghệ số cộng đồng triển khai phong trào "Bình dân học vụ số" — hỗ trợ người dân từ vùng nông thôn đến đô thị cài đặt, sử dụng ứng dụng số trong đời sống hàng ngày.</p>
      <h2>Nội dung hỗ trợ</h2>
      <ul>
        <li>Hướng dẫn cài đặt và sử dụng ứng dụng iGiaLai — cổng dịch vụ công trực tuyến</li>
        <li>Đăng ký tài khoản định danh điện tử (VNeID)</li>
        <li>Sử dụng thanh toán không dùng tiền mặt qua ví điện tử, QR Code</li>
        <li>Bảo mật thông tin cá nhân trên không gian mạng</li>
      </ul>
      <h2>Kết quả</h2>
      <p>Phong trào đã tiếp cận hơn 2.000 người dân trong 3 tháng đầu, với tỷ lệ cài đặt ứng dụng thành công đạt trên 85%. Đặc biệt, nhiều bà con dân tộc thiểu số đã lần đầu tiên sử dụng dịch vụ công trực tuyến, mở ra cánh cửa hòa nhập số cho cộng đồng.</p>
    `,
    thumbnail: "https://picsum.photos/seed/vdcd-binh-dan-hoc-vu/800/500",
    category: "Chuyển đổi số",
    tags: "bình dân học vụ số, iGiaLai, công dân số, cộng đồng, Gia Lai",
    metaTitle: "Bình dân học vụ số tại Gia Lai — VDCD đồng hành | VDCD Group",
    metaDescription:
      "VDCD hỗ trợ hơn 2.000 người dân Gia Lai cài đặt ứng dụng số, sử dụng dịch vụ công trực tuyến qua phong trào Bình dân học vụ số.",
    isPublished: true,
    publishedAt: "2026-04-20T08:00:00.000Z",
    createdAt: "2026-04-19T06:00:00.000Z",
    updatedAt: "2026-04-20T08:00:00.000Z",
  },
];

/** Get a mock article by slug */
export const getMockArticleBySlug = (slug: string): Article | undefined =>
  MOCK_ARTICLES.find((a) => a.slug === slug);
