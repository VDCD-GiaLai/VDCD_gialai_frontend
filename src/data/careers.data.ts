import type {
  JobPosition,
  Benefit,
  RecruitmentStep,
  EmployeeStory,
  FaqItem,
} from "@/types";

/* ── Statistics ──────────────────────────────────────────── */

export const CAREERS_STATS = [
  { numericValue: 1500, suffix: "+", label: "Nhân sự" },
  { numericValue: 12, suffix: "", label: "Phòng ban" },
  { numericValue: 18, suffix: "", label: "Vị trí tuyển dụng" },
  { numericValue: 120, suffix: "h", label: "Đào tạo / năm" },
  { numericValue: 3, suffix: "", label: "Văn phòng" },
] as const;

/* ── Benefits ────────────────────────────────────────────── */

export const BENEFITS: Benefit[] = [
  {
    icon: "FiTrendingUp",
    title: "Phát triển chuyên môn",
    description:
      "Lộ trình thăng tiến rõ ràng, cơ hội tiếp cận công nghệ mới và đào tạo chuyên sâu từ chuyên gia đầu ngành.",
  },
  {
    icon: "FiMonitor",
    title: "Môi trường hiện đại",
    description:
      "Văn phòng thiết kế theo chuẩn quốc tế, trang bị thiết bị công nghệ tiên tiến, không gian sáng tạo mở.",
  },
  {
    icon: "FiBookOpen",
    title: "Đào tạo liên tục",
    description:
      "Chương trình đào tạo nội bộ 120+ giờ/năm, hỗ trợ học tập trực tuyến và chứng chỉ chuyên ngành quốc tế.",
  },
  {
    icon: "FiAward",
    title: "Đãi ngộ cạnh tranh",
    description:
      "Mức lương hấp dẫn, thưởng hiệu suất, bảo hiểm sức khỏe toàn diện và nhiều phúc lợi đặc biệt.",
  },
  {
    icon: "FiGlobe",
    title: "Tác động cộng đồng",
    description:
      "Trực tiếp đóng góp vào sự phát triển số hóa tại Gia Lai và khu vực Tây Nguyên, tạo giá trị thực tiễn.",
  },
  {
    icon: "FiHeart",
    title: "Cân bằng cuộc sống",
    description:
      "Chế độ làm việc linh hoạt, hoạt động team-building thường xuyên, chăm sóc sức khỏe tinh thần nhân viên.",
  },
];

/* ── Filter Options ──────────────────────────────────────── */

export const DEPARTMENTS = [
  "Tất cả",
  "Công nghệ",
  "Hành chính",
  "Dịch vụ số",
  "Tài chính",
  "Nhân sự",
  "Khảo sát & Đo đạc",
  "Nghiên cứu & Phát triển",
] as const;

export const LOCATIONS = [
  "Tất cả",
  "TP. Pleiku, Gia Lai",
  "TP. Hồ Chí Minh",
  "Hà Nội",
] as const;

export const EMPLOYMENT_TYPES = [
  "Tất cả",
  "Toàn thời gian",
  "Bán thời gian",
  "Thực tập",
  "Hợp đồng",
] as const;

/* ── Open Positions ──────────────────────────────────────── */

export const OPEN_POSITIONS: JobPosition[] = [
  {
    id: "pos-001",
    title: "Kỹ sư phần mềm Full-stack",
    department: "Công nghệ",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "15 - 25 triệu",
    postedDate: "2026-07-20",
    description:
      "Thiết kế và phát triển các ứng dụng web, API và hệ thống quản lý nội bộ phục vụ chuyển đổi số cho các cơ quan và doanh nghiệp.",
    experience: "2 - 4 năm",
    tags: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "pos-002",
    title: "Chuyên viên AI & Machine Learning",
    department: "Nghiên cứu & Phát triển",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "20 - 35 triệu",
    postedDate: "2026-07-18",
    description:
      "Nghiên cứu và triển khai các mô hình AI/ML phục vụ nhận diện hình ảnh, phân tích dữ liệu địa lý và nông nghiệp thông minh.",
    experience: "3 - 5 năm",
    tags: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"],
  },
  {
    id: "pos-003",
    title: "Kỹ sư DevOps & Cloud",
    department: "Công nghệ",
    location: "TP. Hồ Chí Minh",
    employmentType: "Toàn thời gian",
    salary: "18 - 30 triệu",
    postedDate: "2026-07-15",
    description:
      "Quản lý hạ tầng cloud, CI/CD pipeline, container orchestration và giám sát hiệu năng hệ thống cho các dự án chuyển đổi số.",
    experience: "2 - 4 năm",
    tags: ["Docker", "Kubernetes", "AWS", "Terraform"],
  },
  {
    id: "pos-004",
    title: "Thiết kế UI/UX",
    department: "Dịch vụ số",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "12 - 20 triệu",
    postedDate: "2026-07-22",
    description:
      "Thiết kế giao diện người dùng cho các sản phẩm số, ứng dụng di động và nền tảng web phục vụ chính quyền và doanh nghiệp.",
    experience: "1 - 3 năm",
    tags: ["Figma", "Design System", "Prototyping", "User Research"],
  },
  {
    id: "pos-005",
    title: "Chuyên viên Hành chính - Nhân sự",
    department: "Nhân sự",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "10 - 15 triệu",
    postedDate: "2026-07-25",
    description:
      "Quản lý hồ sơ nhân sự, tuyển dụng, đào tạo phát triển nhân viên và xây dựng văn hóa doanh nghiệp.",
    experience: "1 - 2 năm",
    tags: ["Tuyển dụng", "Đào tạo", "C&B", "Luật lao động"],
  },
  {
    id: "pos-006",
    title: "Kỹ sư Khảo sát UAV/Drone",
    department: "Khảo sát & Đo đạc",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "14 - 22 triệu",
    postedDate: "2026-07-12",
    description:
      "Vận hành và bảo trì thiết bị bay không người lái phục vụ khảo sát địa hình, lập bản đồ và giám sát tự động.",
    experience: "1 - 3 năm",
    tags: ["UAV", "GIS", "Photogrammetry", "AutoCAD"],
  },
  {
    id: "pos-007",
    title: "Thực tập sinh Phát triển phần mềm",
    department: "Công nghệ",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Thực tập",
    postedDate: "2026-07-28",
    description:
      "Tham gia phát triển các dự án thực tế, được đào tạo và mentoring bởi đội ngũ kỹ sư giàu kinh nghiệm.",
    experience: "Sinh viên năm cuối",
    tags: ["JavaScript", "React", "Git", "Agile"],
  },
  {
    id: "pos-008",
    title: "Kế toán tổng hợp",
    department: "Tài chính",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "10 - 16 triệu",
    postedDate: "2026-07-10",
    description:
      "Thực hiện nghiệp vụ kế toán tổng hợp, báo cáo tài chính, quản lý thuế và công nợ cho hệ thống doanh nghiệp.",
    experience: "2 - 4 năm",
    tags: ["Kế toán", "Thuế", "SAP", "Báo cáo tài chính"],
  },
  {
    id: "pos-009",
    title: "Chuyên viên Quản lý dự án CNTT",
    department: "Dịch vụ số",
    location: "TP. Hồ Chí Minh",
    employmentType: "Toàn thời gian",
    salary: "18 - 28 triệu",
    postedDate: "2026-07-19",
    description:
      "Lập kế hoạch, điều phối và giám sát các dự án chuyển đổi số, đảm bảo tiến độ và chất lượng triển khai.",
    experience: "3 - 5 năm",
    tags: ["PMP", "Agile", "Scrum", "JIRA"],
  },
  {
    id: "pos-010",
    title: "Chuyên viên IoT & Embedded",
    department: "Nghiên cứu & Phát triển",
    location: "TP. Pleiku, Gia Lai",
    employmentType: "Toàn thời gian",
    salary: "15 - 25 triệu",
    postedDate: "2026-07-14",
    description:
      "Phát triển firmware và phần cứng IoT cho các hệ thống giám sát môi trường, nông nghiệp thông minh và đô thị số.",
    experience: "2 - 4 năm",
    tags: ["C/C++", "ESP32", "MQTT", "PCB Design"],
  },
];

/* ── Recruitment Process ─────────────────────────────────── */

export const RECRUITMENT_STEPS: RecruitmentStep[] = [
  {
    step: 1,
    title: "Ứng tuyển",
    description: "Nộp hồ sơ trực tuyến qua hệ thống tuyển dụng",
  },
  {
    step: 2,
    title: "Sàng lọc CV",
    description: "Đội ngũ HR đánh giá hồ sơ trong 3-5 ngày",
  },
  {
    step: 3,
    title: "Phỏng vấn",
    description: "Phỏng vấn trực tiếp hoặc trực tuyến với đội ngũ",
  },
  {
    step: 4,
    title: "Đánh giá",
    description: "Bài kiểm tra kỹ năng chuyên môn thực tế",
  },
  {
    step: 5,
    title: "Thư mời",
    description: "Gửi offer và thương lượng điều kiện làm việc",
  },
  {
    step: 6,
    title: "Onboarding",
    description: "Chào đón và hội nhập văn hóa doanh nghiệp",
  },
];

/* ── Employee Stories ────────────────────────────────────── */

export const EMPLOYEE_STORIES: EmployeeStory[] = [
  {
    id: "story-01",
    name: "Nguyễn Minh Tuấn",
    department: "Phòng Công nghệ",
    avatar: "",
    quote:
      "Tại VDCD, tôi được làm việc với những công nghệ mới nhất và đóng góp trực tiếp vào sự phát triển của quê hương Gia Lai. Đó là điều không phải nơi nào cũng có được.",
  },
  {
    id: "story-02",
    name: "Trần Thị Hồng Nhung",
    department: "Phòng Dịch vụ số",
    avatar: "",
    quote:
      "Môi trường làm việc cởi mở, đồng nghiệp hỗ trợ nhau tận tình. Tôi thực sự cảm thấy mình đang tạo ra những giá trị có ý nghĩa cho cộng đồng.",
  },
  {
    id: "story-03",
    name: "Lê Văn Hoàng",
    department: "Phòng Khảo sát & Đo đạc",
    avatar: "",
    quote:
      "Từ một kỹ sư đo đạc truyền thống, VDCD đã giúp tôi trở thành chuyên gia về công nghệ UAV và GIS hiện đại chỉ trong 2 năm đào tạo.",
  },
  {
    id: "story-04",
    name: "Phạm Thanh Lan",
    department: "Phòng Nhân sự",
    avatar: "",
    quote:
      "Chế độ phúc lợi ở đây thực sự cạnh tranh so với các công ty công nghệ tại TP.HCM. Cân bằng công việc và cuộc sống là điều tôi trân trọng nhất.",
  },
];

/* ── FAQ ─────────────────────────────────────────────────── */

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Làm thế nào để ứng tuyển?",
    answer:
      "Bạn có thể ứng tuyển trực tiếp qua trang Tuyển dụng của chúng tôi. Chọn vị trí phù hợp, nhấn 'Ứng tuyển ngay' và điền đầy đủ thông tin hồ sơ. Đội ngũ HR sẽ liên hệ lại trong vòng 3-5 ngày làm việc.",
  },
  {
    question: "Sinh viên mới ra trường có thể ứng tuyển không?",
    answer:
      "Chắc chắn rồi! VDCD có chương trình thực tập sinh và vị trí dành cho sinh viên mới ra trường. Chúng tôi chú trọng vào tinh thần học hỏi, khả năng giải quyết vấn đề và sự phù hợp văn hóa hơn là số năm kinh nghiệm.",
  },
  {
    question: "Cần chuẩn bị những giấy tờ gì?",
    answer:
      "Hồ sơ ứng tuyển cơ bản bao gồm: CV/Resume cập nhật, thư giới thiệu bản thân (Cover Letter), bằng cấp và chứng chỉ liên quan, portfolio hoặc link dự án (nếu có). Các giấy tờ bổ sung sẽ được yêu cầu khi vào vòng phỏng vấn.",
  },
  {
    question: "Quy trình tuyển dụng mất bao lâu?",
    answer:
      "Thông thường quy trình tuyển dụng kéo dài từ 2-4 tuần, bao gồm: sàng lọc hồ sơ (3-5 ngày), phỏng vấn (1-2 vòng trong tuần thứ 2), đánh giá kỹ năng và gửi thư mời (tuần thứ 3-4).",
  },
  {
    question: "Chính sách làm việc từ xa như thế nào?",
    answer:
      "VDCD áp dụng mô hình làm việc linh hoạt (hybrid) cho một số vị trí phù hợp. Nhân viên có thể làm việc từ xa 1-2 ngày/tuần sau thời gian thử việc, tùy theo tính chất công việc và sự đồng ý của quản lý trực tiếp.",
  },
  {
    question: "Có chính sách đào tạo và phát triển không?",
    answer:
      "VDCD đầu tư mạnh vào phát triển nhân sự với chương trình đào tạo nội bộ 120+ giờ/năm, hỗ trợ chi phí thi chứng chỉ quốc tế, mentoring 1-on-1, và cơ hội tham gia các hội thảo công nghệ trong nước và quốc tế.",
  },
];
