import type { Program, OperationField } from "@/types";

/* ── Mock Operation Fields ────────────────────────────── */

export const MOCK_OPERATION_FIELDS: OperationField[] = [
  {
    id: "field-1",
    name: "Nông nghiệp thông minh",
    slug: "nong-nghiep-thong-minh",
    icon: "mdi:sprout",
    shortDescription:
      "Ứng dụng công nghệ IoT, AI và dữ liệu lớn vào sản xuất nông nghiệp bền vững.",
    order: 1,
  },
  {
    id: "field-2",
    name: "Chuyển đổi số",
    slug: "chuyen-doi-so",
    icon: "mdi:cloud-sync",
    shortDescription:
      "Tư vấn và triển khai giải pháp chuyển đổi số toàn diện cho doanh nghiệp và chính quyền.",
    order: 2,
  },
  {
    id: "field-3",
    name: "Đô thị thông minh",
    slug: "do-thi-thong-minh",
    icon: "mdi:city-variant",
    shortDescription:
      "Xây dựng hạ tầng đô thị số, quản lý thành phố thông minh và dịch vụ công trực tuyến.",
    order: 3,
  },
  {
    id: "field-4",
    name: "Giáo dục & Đào tạo",
    slug: "giao-duc-dao-tao",
    icon: "mdi:school",
    shortDescription:
      "Chương trình đào tạo kỹ năng số, khởi nghiệp sáng tạo và phát triển nguồn nhân lực.",
    order: 4,
  },
  {
    id: "field-5",
    name: "Năng lượng tái tạo",
    slug: "nang-luong-tai-tao",
    icon: "mdi:solar-power",
    shortDescription:
      "Phát triển và triển khai các giải pháp năng lượng sạch, bền vững cho khu vực Tây Nguyên.",
    order: 5,
  },
];

/* ── Mock Programs ────────────────────────────────────── */

export const MOCK_PROGRAMS: Program[] = [
  {
    id: "prog-1",
    title: "Chương trình Chuyển đổi số Nông nghiệp Tây Nguyên",
    slug: "chuyen-doi-so-nong-nghiep-tay-nguyen",
    shortDescription:
      "Ứng dụng công nghệ IoT, dữ liệu lớn và trí tuệ nhân tạo vào quản lý chuỗi cung ứng nông sản, giám sát canh tác và tối ưu hóa năng suất cho nông hộ tại Gia Lai và các tỉnh Tây Nguyên.",
    content: `<h2>Giới thiệu chương trình</h2>
<p>Chương trình Chuyển đổi số Nông nghiệp Tây Nguyên là sáng kiến chiến lược của VDCD Group nhằm đưa công nghệ hiện đại vào lĩnh vực nông nghiệp — ngành kinh tế trọng điểm của khu vực Tây Nguyên.</p>
<h2>Mục tiêu</h2>
<ul>
<li>Triển khai hệ thống IoT giám sát môi trường canh tác tại 50+ nông hộ</li>
<li>Xây dựng nền tảng dữ liệu nông nghiệp tập trung cho tỉnh Gia Lai</li>
<li>Đào tạo kỹ năng số cho 200+ nông dân và kỹ thuật viên nông nghiệp</li>
</ul>
<h2>Kết quả dự kiến</h2>
<p>Tăng năng suất 15-20%, giảm chi phí vật tư 10-15%, và xây dựng mô hình nông nghiệp thông minh có thể nhân rộng ra toàn khu vực.</p>`,
    thumbnail: "https://picsum.photos/seed/prog1/800/500",
    field: MOCK_OPERATION_FIELDS[0],
    metaTitle: "Chuyển đổi số Nông nghiệp Tây Nguyên | VDCD Group",
    metaDescription:
      "Chương trình ứng dụng IoT, AI vào nông nghiệp Tây Nguyên — nâng cao năng suất, giảm chi phí cho nông hộ Gia Lai.",
    isPublished: true,
    createdAt: "2026-03-15T08:00:00.000Z",
    updatedAt: "2026-07-20T10:30:00.000Z",
  },
  {
    id: "prog-2",
    title: "Đề án Đô thị Thông minh Pleiku 2030",
    slug: "de-an-do-thi-thong-minh-pleiku-2030",
    shortDescription:
      "Quy hoạch và triển khai hạ tầng đô thị số cho thành phố Pleiku, bao gồm hệ thống quản lý giao thông, dịch vụ công trực tuyến và giám sát môi trường đô thị.",
    content: `<h2>Tổng quan đề án</h2>
<p>Đề án Đô thị Thông minh Pleiku 2030 hướng đến xây dựng một thành phố hiện đại, bền vững, lấy công nghệ làm nền tảng phát triển kinh tế-xã hội.</p>
<h2>Các hạng mục chính</h2>
<ul>
<li>Hệ thống camera giám sát giao thông thông minh</li>
<li>Cổng dịch vụ công trực tuyến mức độ 4</li>
<li>Trung tâm điều hành đô thị thông minh (IOC)</li>
<li>Mạng cảm biến môi trường đô thị</li>
</ul>`,
    thumbnail: "https://picsum.photos/seed/prog2/800/500",
    field: MOCK_OPERATION_FIELDS[2],
    metaTitle: "Đề án Đô thị Thông minh Pleiku 2030 | VDCD Group",
    metaDescription:
      "Quy hoạch hạ tầng đô thị số Pleiku — giao thông thông minh, dịch vụ công trực tuyến, giám sát môi trường.",
    isPublished: true,
    createdAt: "2026-02-01T08:00:00.000Z",
    updatedAt: "2026-07-18T14:00:00.000Z",
  },
  {
    id: "prog-3",
    title: "Chương trình Đào tạo Kỹ năng số cho Thanh niên",
    slug: "dao-tao-ky-nang-so-thanh-nien",
    shortDescription:
      "Khóa đào tạo kỹ năng lập trình, phân tích dữ liệu và thiết kế số dành cho thanh niên 18-30 tuổi tại các tỉnh Tây Nguyên, nhằm phát triển nguồn nhân lực công nghệ tại chỗ.",
    content: `<h2>Mục tiêu chương trình</h2>
<p>Trang bị kỹ năng số thiết yếu cho thế hệ trẻ Tây Nguyên, tạo nguồn nhân lực chất lượng cao phục vụ chuyển đổi số địa phương.</p>
<h2>Nội dung đào tạo</h2>
<ul>
<li>Lập trình web cơ bản (HTML, CSS, JavaScript)</li>
<li>Phân tích dữ liệu với Python</li>
<li>Thiết kế đồ họa và UI/UX</li>
<li>Kỹ năng khởi nghiệp sáng tạo</li>
</ul>`,
    thumbnail: "https://picsum.photos/seed/prog3/800/500",
    field: MOCK_OPERATION_FIELDS[3],
    metaTitle: "Đào tạo Kỹ năng số cho Thanh niên | VDCD Group",
    metaDescription:
      "Khóa đào tạo lập trình, phân tích dữ liệu và kỹ năng số cho thanh niên Tây Nguyên.",
    isPublished: true,
    createdAt: "2026-04-10T08:00:00.000Z",
    updatedAt: "2026-07-22T09:00:00.000Z",
  },
  {
    id: "prog-4",
    title: "Chương trình Năng lượng Xanh cho Tây Nguyên",
    slug: "nang-luong-xanh-tay-nguyen",
    shortDescription:
      "Triển khai giải pháp năng lượng mặt trời và biomass cho các vùng nông thôn Tây Nguyên, hỗ trợ phát triển kinh tế bền vững và giảm phát thải carbon.",
    content: `<h2>Bối cảnh</h2>
<p>Tây Nguyên sở hữu tiềm năng năng lượng tái tạo lớn với lượng bức xạ mặt trời trung bình 5-6 kWh/m²/ngày và nguồn biomass dồi dào từ phế phẩm nông nghiệp.</p>
<h2>Phạm vi triển khai</h2>
<ul>
<li>Lắp đặt hệ thống điện mặt trời áp mái cho 100 hộ gia đình</li>
<li>Xây dựng 5 trạm sạc năng lượng mặt trời cộng đồng</li>
<li>Triển khai 3 hệ thống biomass xử lý phế phẩm nông nghiệp</li>
</ul>`,
    thumbnail: "https://picsum.photos/seed/prog4/800/500",
    field: MOCK_OPERATION_FIELDS[4],
    metaTitle: "Năng lượng Xanh cho Tây Nguyên | VDCD Group",
    metaDescription:
      "Giải pháp năng lượng mặt trời và biomass cho vùng nông thôn Tây Nguyên — phát triển kinh tế bền vững.",
    isPublished: true,
    createdAt: "2026-05-20T08:00:00.000Z",
    updatedAt: "2026-07-15T16:00:00.000Z",
  },
  {
    id: "prog-5",
    title: "Chương trình Hỗ trợ Doanh nghiệp Chuyển đổi số",
    slug: "ho-tro-doanh-nghiep-chuyen-doi-so",
    shortDescription:
      "Tư vấn chiến lược và hỗ trợ triển khai chuyển đổi số cho doanh nghiệp vừa và nhỏ tại Gia Lai, bao gồm số hóa quy trình, quản lý khách hàng và thương mại điện tử.",
    content: `<h2>Đối tượng</h2>
<p>Các doanh nghiệp vừa và nhỏ (SME) tại tỉnh Gia Lai muốn ứng dụng công nghệ để nâng cao hiệu quả hoạt động và mở rộng thị trường.</p>
<h2>Gói hỗ trợ</h2>
<ul>
<li>Đánh giá mức độ sẵn sàng chuyển đổi số</li>
<li>Tư vấn lộ trình chuyển đổi số phù hợp</li>
<li>Triển khai phần mềm quản lý (ERP, CRM)</li>
<li>Đào tạo nhân sự vận hành hệ thống</li>
</ul>`,
    thumbnail: "https://picsum.photos/seed/prog5/800/500",
    field: MOCK_OPERATION_FIELDS[1],
    metaTitle: "Hỗ trợ Doanh nghiệp Chuyển đổi số | VDCD Group",
    metaDescription:
      "Tư vấn và triển khai chuyển đổi số cho doanh nghiệp SME tại Gia Lai — ERP, CRM, thương mại điện tử.",
    isPublished: true,
    createdAt: "2026-01-10T08:00:00.000Z",
    updatedAt: "2026-07-10T11:00:00.000Z",
  },
  {
    id: "prog-6",
    title: "Chương trình Khởi nghiệp Sáng tạo Gia Lai",
    slug: "khoi-nghiep-sang-tao-gia-lai",
    shortDescription:
      "Vườn ươm khởi nghiệp dành cho các startup công nghệ tại Gia Lai, cung cấp không gian làm việc, mentoring, kết nối nhà đầu tư và hỗ trợ pháp lý.",
    content: `<h2>Giới thiệu</h2>
<p>Chương trình Khởi nghiệp Sáng tạo Gia Lai là nền tảng hỗ trợ toàn diện cho các dự án khởi nghiệp công nghệ, từ ý tưởng đến hiện thực hóa sản phẩm.</p>
<h2>Quyền lợi tham gia</h2>
<ul>
<li>Không gian co-working miễn phí 6 tháng</li>
<li>Mentoring từ chuyên gia công nghệ và kinh doanh</li>
<li>Kết nối với quỹ đầu tư và nhà đầu tư thiên thần</li>
<li>Hỗ trợ đăng ký kinh doanh và sở hữu trí tuệ</li>
</ul>`,
    thumbnail: "https://picsum.photos/seed/prog6/800/500",
    field: MOCK_OPERATION_FIELDS[3],
    metaTitle: "Khởi nghiệp Sáng tạo Gia Lai | VDCD Group",
    metaDescription:
      "Vườn ươm khởi nghiệp công nghệ Gia Lai — co-working, mentoring, kết nối đầu tư.",
    isPublished: true,
    createdAt: "2026-06-01T08:00:00.000Z",
    updatedAt: "2026-07-25T08:00:00.000Z",
  },
];

/* ── Category list for filter UI ──────────────────────── */

export const PROGRAM_CATEGORIES = [
  "Tất cả",
  ...MOCK_OPERATION_FIELDS.map((f) => f.name),
];

/* ── Helpers ──────────────────────────────────────────── */

export const getMockProgramBySlug = (slug: string): Program | undefined =>
  MOCK_PROGRAMS.find((p) => p.slug === slug);
