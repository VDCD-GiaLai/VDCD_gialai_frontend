import type { Program, OperationField } from "@/types";

/* ── Operation Fields (Matching Google Docs Activities) ────────────────────── */

export const MOCK_OPERATION_FIELDS: OperationField[] = [
  {
    id: "field-uom-tao",
    name: "Ươm tạo khởi nghiệp",
    slug: "uom-tao-khoi-nghiep",
    icon: "mdi:rocket-launch",
    shortDescription:
      "Hỗ trợ các dự án đổi mới sáng tạo từ ý tưởng đến mô hình thử nghiệm và thương mại hóa.",
    order: 1,
  },
  {
    id: "field-dao-tao",
    name: "Đào tạo công nghệ",
    slug: "dao-tao-cong-nghe",
    icon: "mdi:school",
    shortDescription:
      "Chương trình đào tạo thực chiến về chuyển đổi số, UAV, AI, GIS và BIM cho doanh nghiệp và chính quyền.",
    order: 2,
  },
  {
    id: "field-ket-noi",
    name: "Kết nối chuyên gia",
    slug: "ket-noi-chuyen-gia",
    icon: "mdi:handshake",
    shortDescription:
      "Kết nối doanh nghiệp, tổ chức với mạng lưới chuyên gia công nghệ, viện nghiên cứu và trường đại học.",
    order: 3,
  },
  {
    id: "field-tu-van",
    name: "Tư vấn chuyển đổi số",
    slug: "tu-van-chuyen-doi-so",
    icon: "mdi:lightbulb-on",
    shortDescription:
      "Tư vấn chiến lược và xây dựng lộ trình chuyển đổi số thực chất, khả thi cấp tỉnh và doanh nghiệp.",
    order: 4,
  },
  {
    id: "field-su-kien",
    name: "Hội thảo & Sự kiện",
    slug: "hoi-thao-su-kien",
    icon: "mdi:bullhorn",
    shortDescription:
      "Diễn đàn kết nối tri thức, chia sẻ xu hướng công nghệ mới và xúc tiến đổi mới sáng tạo.",
    order: 5,
  },
];

/* ── Mock Programs (5 Google Docs Activities) ────────────────────────────── */

export const MOCK_PROGRAMS: Program[] = [
  {
    id: "prog-uom-tao",
    title: "Ươm tạo khởi nghiệp sáng tạo",
    slug: "uom-tao-khoi-nghiep-sang-tao",
    shortDescription:
      "Từ ý tưởng đến mô hình có thể thử nghiệm và thương mại hóa. Hỗ trợ dự án trả lời câu hỏi cốt lõi, hoàn thiện MVP và kết nối nguồn lực phát triển bền vững.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1200,q-80,f-auto",
    field: {
      id: "field-uom-tao",
      name: "Ươm tạo khởi nghiệp",
      slug: "uom-tao-khoi-nghiep",
      icon: "mdi:rocket-launch",
      shortDescription:
        "Hỗ trợ các dự án đổi mới sáng tạo từ ý tưởng đến mô hình thử nghiệm và thương mại hóa.",
      order: 1,
    },
    metaTitle: "Ươm tạo khởi nghiệp sáng tạo | VDCD Gia Lai",
    metaDescription:
      "Chương trình ươm tạo khởi nghiệp sáng tạo — đồng hành cùng startup từ ý tưởng đến sản phẩm thử nghiệm MVP và kết nối quỹ đầu tư.",
    isPublished: true,
    createdAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
    content:
      '\n<h2>1. Từ ý tưởng đến mô hình có thể thử nghiệm và thương mại hóa</h2>\n<p>Mục tiêu của chương trình không chỉ là hoàn thiện một bản kế hoạch, mà giúp dự án trả lời được những câu hỏi quan trọng: <strong>Sản phẩm giải quyết vấn đề gì? Ai sẵn sàng sử dụng? Mô hình có khả thi không? Và cần làm gì tiếp theo để đưa sản phẩm vào thực tế?</strong></p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image110.png?tr=w-1200,q-80,f-auto" alt="Ông Trần Tuấn Cường đang nêu những khó khăn đang gặp phải tại Gia Lai" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Ông Trần Tuấn Cường đang nêu những khó khăn thực tế đang gặp phải tại Gia Lai</p>\n</div>\n\n<h2>2. Đối tượng tham gia chương trình ươm tạo</h2>\n<ul>\n  <li><strong>Cá nhân và nhóm có ý tưởng:</strong> Đã có định hướng giải pháp nhưng cần hoàn thiện mô hình và kiểm chứng thị trường.</li>\n  <li><strong>Sinh viên và nhóm nghiên cứu:</strong> Mong muốn đưa kết quả đề tài khoa học hoặc đồ án ra ứng dụng thực tiễn.</li>\n  <li><strong>Doanh nghiệp khởi sự / Startup giai đoạn đầu:</strong> Đã có sản phẩm mẫu hoặc dịch vụ ban đầu, cần tối ưu quy trình và mở rộng quy mô.</li>\n</ul>\n\n<h2>3. Hành trình ươm tạo 6 giai đoạn chuẩn hóa</h2>\n<ol>\n  <li><strong>01. Tiếp nhận và đánh giá sơ bộ:</strong> Xem xét mức độ phù hợp của ý tưởng với định hướng đổi mới sáng tạo.</li>\n  <li><strong>02. Làm rõ bài toán và giá trị cốt lõi:</strong> Xác định chính xác đối tượng khách hàng mục tiêu và vấn đề cần giải quyết.</li>\n  <li><strong>03. Xây dựng phiên bản thử nghiệm (MVP):</strong> Hỗ trợ hoàn thiện sản phẩm khả dụng tối thiểu để thử nghiệm thực tế.</li>\n  <li><strong>04. Kiểm chứng thị trường:</strong> Thu thập phản hồi từ người dùng thực tế để điều chỉnh tính năng và mô hình giá.</li>\n  <li><strong>05. Hoàn thiện phương án kinh doanh:</strong> Xây dựng kế hoạch tài chính, vận hành và chiến lược tiếp cận thị trường.</li>\n  <li><strong>06. Trình bày và kết nối nguồn lực:</strong> Tham gia Pitching Day kết nối trực tiếp với các nhà đầu tư và quỹ hỗ trợ khởi nghiệp.</li>\n</ol>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image115.png?tr=w-1200,q-80,f-auto" alt="Tư vấn trực tiếp cho các doanh nghiệp địa phương" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Chuyên gia VDCD Group trực tiếp tư vấn chiến lược cho các doanh nghiệp địa phương</p>\n</div>\n\n<h2>4. Nguồn lực hỗ trợ từ Hệ sinh thái VDCD Group</h2>\n<ul>\n  <li><strong>Không gian làm việc chung (Co-working Space):</strong> Môi trường làm việc sáng tạo, đầy đủ tiện ích và phòng họp hiện đại.</li>\n  <li><strong>Hạ tầng công nghệ và máy chủ GPU:</strong> Tiếp cận nền tảng tính toán hiệu năng cao phục vụ nghiên cứu và phát triển AI, xử lý dữ liệu.</li>\n  <li><strong>Đội ngũ chuyên gia cố vấn:</strong> Mentoring 1-on-1 từ các chuyên gia đầu ngành trong lĩnh vực công nghệ và quản trị kinh doanh.</li>\n</ul>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto" alt="Startup trao đổi về ý tưởng mới tại hội thảo" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Các Startup trao đổi và hoàn thiện ý tưởng công nghệ mới tại hội thảo ươm tạo</p>\n</div>\n',
  },
  {
    id: "prog-dao-tao",
    title: "Đào tạo công nghệ và chuyển đổi số",
    slug: "dao-tao-cong-nghe-va-chuyen-doi-so",
    shortDescription:
      "Chương trình đào tạo theo nhu cầu thực tế về chuyển đổi số, UAV, AI, GIS, BIM và quản trị dữ liệu số cho doanh nghiệp và các sở ban ngành.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1200,q-80,f-auto",
    field: {
      id: "field-dao-tao",
      name: "Đào tạo công nghệ",
      slug: "dao-tao-cong-nghe",
      icon: "mdi:school",
      shortDescription:
        "Chương trình đào tạo thực chiến về chuyển đổi số, UAV, AI, GIS và BIM cho doanh nghiệp và chính quyền.",
      order: 2,
    },
    metaTitle: "Đào tạo công nghệ và chuyển đổi số | VDCD Gia Lai",
    metaDescription:
      "Chương trình đào tạo công nghệ thực chiến — UAV, AI, GIS, BIM và kỹ năng chuyển đổi số cho cơ quan quản lý và doanh nghiệp tại Gia Lai.",
    isPublished: true,
    createdAt: "2026-03-05T08:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
    content:
      '\n<h2>1. Đào tạo theo nhu cầu thực tế — Thực học, thực hành</h2>\n<p>Chương trình đào tạo tại Trung tâm Đổi mới Sáng tạo Gia Lai được thiết kế theo định hướng thực chiến, kết hợp kiến thức nền tảng, tình huống thực tế và hoạt động thực hành trực tiếp trên thiết bị, công cụ chuyên dụng.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image57.png?tr=w-1200,q-80,f-auto" alt="Ông Dương Đức Cảnh - Phó Giám đốc Trung tâm Đào tạo và Chuyển giao Công nghệ" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Ông Dương Đức Cảnh - Phó Viện trưởng Viện Thiết kế số, Phó Giám đốc Trung tâm Đào tạo và Chuyển giao Công nghệ chia sẻ tại khóa học</p>\n</div>\n\n<h2>2. Các nhóm chủ đề đào tạo trọng tâm</h2>\n<ul>\n  <li><strong>Chuyển đổi số và Quản trị dữ liệu:</strong> Nâng cao nhận thức về chuyển đổi số, an toàn thông tin và khai thác dữ liệu trong công tác chỉ đạo điều hành.</li>\n  <li><strong>Công nghệ Bay quét UAV & Trắc địa số:</strong> Kiến thức an toàn bay, kỹ thuật bay quét 3D, xử lý ảnh trực giao Orthomosaic và bình sai lưới khống chế trắc địa.</li>\n  <li><strong>Ứng dụng Trí tuệ Nhân tạo (AI):</strong> Ứng dụng AI trong phân tích hình ảnh, thị giác máy tính và tự động hóa quy trình sản xuất.</li>\n  <li><strong>Hệ thống Thông tin Địa lý (GIS) & Mô hình BIM:</strong> Chuẩn hóa dữ liệu không gian, quản lý quy hoạch xây dựng và kiểm soát xung đột công trình.</li>\n</ul>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image62.png?tr=w-1200,q-80,f-auto" alt="Đào tạo BIM cho các nhân sự doanh nghiệp địa phương" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Khóa đào tạo mô hình thông tin công trình (BIM) cho nhân sự các doanh nghiệp tại địa phương</p>\n</div>\n\n<h2>3. Quy mô và Hiệu quả đào tạo thực tế</h2>\n<p>Trung tâm đã tổ chức thành công nhiều khóa đào tạo chuyên sâu với sự tham gia của hơn <strong>600+ học viên</strong> đến từ các sở, ban, ngành, ủy ban nhân dân các cấp và cộng đồng doanh nghiệp trên địa bàn tỉnh Gia Lai.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1200,q-80,f-auto" alt="Hơn 600+ học viên tham dự buổi đào tạo" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Hơn 600+ học viên đến từ các sở ban ngành tham dự buổi đào tạo công nghệ và chuyển đổi số</p>\n</div>\n\n<h2>4. Đội ngũ Giảng viên & Chuyên gia đầu ngành</h2>\n<p>Chương trình quy tụ đội ngũ chuyên gia, nhà khoa học giàu kinh nghiệm thực tế, sẵn sàng giải đáp và tháo gỡ các vướng mắc trong quá trình áp dụng công nghệ tại cơ quan, đơn vị.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image107.png?tr=w-1200,q-80,f-auto" alt="Chuyên gia đào tạo cho nhân sự mới ra trường" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Chuyên gia hướng dẫn thực hành chuyên sâu cho lực lượng kỹ sư và nhân sự trẻ</p>\n</div>\n',
  },
  {
    id: "prog-ket-noi",
    title: "Kết nối chuyên gia và hệ sinh thái",
    slug: "ket-noi-chuyen-gia-va-he-sinh-thai",
    shortDescription:
      "Kết nối đúng chuyên môn – Tháo gỡ đúng nút thắt – Mở rộng cơ hội hợp tác giữa chính quyền, doanh nghiệp, viện nghiên cứu và trường đại học.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1200,q-80,f-auto",
    field: {
      id: "field-ket-noi",
      name: "Kết nối chuyên gia",
      slug: "ket-noi-chuyen-gia",
      icon: "mdi:handshake",
      shortDescription:
        "Kết nối doanh nghiệp, tổ chức với mạng lưới chuyên gia công nghệ, viện nghiên cứu và trường đại học.",
      order: 3,
    },
    metaTitle: "Kết nối chuyên gia và hệ sinh thái | VDCD Gia Lai",
    metaDescription:
      "Mạng lưới kết nối chuyên gia công nghệ, doanh nghiệp và các trường đại học hàng đầu — thúc đẩy hợp tác chiến lược và chuyển giao công nghệ.",
    isPublished: true,
    createdAt: "2026-03-10T08:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
    content:
      '\n<h2>1. Kết nối đúng chuyên môn — Tháo gỡ đúng nút thắt</h2>\n<p>Một vấn đề công nghệ chỉ có thể được giải quyết hiệu quả khi đơn vị tiếp cận đúng người có chuyên môn phù hợp. Trung tâm Đổi mới Sáng tạo Gia Lai đóng vai trò cầu nối tin cậy giữa các bên có nhu cầu và mạng lưới chuyên gia đầu ngành.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image105.png?tr=w-1200,q-80,f-auto" alt="Ký kết hợp tác chiến lược với Vietadge" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Lễ ký kết hợp tác chiến lược giữa Trung tâm Đổi mới Sáng tạo Gia Lai và đối tác công nghệ</p>\n</div>\n\n<h2>2. Lĩnh vực chuyên gia kết nối trọng điểm</h2>\n<ul>\n  <li><strong>Hạ tầng công nghệ & Trung tâm dữ liệu:</strong> Tư vấn thiết kế, vận hành Data Center, giải pháp lưu trữ và an toàn an ninh mạng.</li>\n  <li><strong>Tự động hóa & Thị giác máy tính AI:</strong> Xây dựng các hệ thống giám sát thông minh, nhận diện hình ảnh và điều khiển robot.</li>\n  <li><strong>Dữ liệu không gian 3D GIS & Trắc địa số:</strong> Hỗ trợ triển khai bài toán quản lý đất đai, lâm nghiệp, quy hoạch và đô thị thông minh.</li>\n  <li><strong>Tư vấn chiến lược & Sở hữu trí tuệ:</strong> Hỗ trợ hoàn thiện hồ sơ dự án, đăng ký bản quyền sáng chế và tiếp cận các nguồn vốn đầu tư.</li>\n</ul>\n\n<h2>3. Hợp tác chiến lược cùng các Viện - Trường Đại học</h2>\n<p>Trung tâm đã ký kết thỏa thuận hợp tác đào tạo và nghiên cứu khoa học (MOU) với các trường đại học hàng đầu trong khu vực nhằm tạo nguồn nhân lực bền vững và thúc đẩy các đề tài nghiên cứu ứng dụng.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image114.png?tr=w-1200,q-80,f-auto" alt="Ký kết MOU với Trường Đại học Quy Nhơn" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Lễ ký kết biên bản ghi nhớ hợp tác (MOU) với Trường Đại học Quy Nhơn</p>\n</div>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image103.png?tr=w-1200,q-80,f-auto" alt="Ký kết MOU với Trường Đại học FPT Quy Nhơn" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Ký kết hợp tác toàn diện về đào tạo nhân lực AI với Trường Đại học FPT Quy Nhơn</p>\n</div>\n',
  },
  {
    id: "prog-tu-van",
    title: "Tư vấn chuyển đổi số cấp tỉnh",
    slug: "tu-van-chuyen-doi-so-cap-tinh",
    shortDescription:
      "Tư vấn chuyển đổi số từ bài toán thực tế đến lộ trình khả thi. Khảo sát hiện trạng, xây dựng danh mục ưu tiên và dashboard giám sát toàn diện cho địa phương.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1200,q-80,f-auto",
    field: {
      id: "field-tu-van",
      name: "Tư vấn chuyển đổi số",
      slug: "tu-van-chuyen-doi-so",
      icon: "mdi:lightbulb-on",
      shortDescription:
        "Tư vấn chiến lược và xây dựng lộ trình chuyển đổi số thực chất, khả thi cấp tỉnh và doanh nghiệp.",
      order: 4,
    },
    metaTitle: "Tư vấn chuyển đổi số cấp tỉnh | VDCD Gia Lai",
    metaDescription:
      "Dịch vụ tư vấn chuyển đổi số cấp tỉnh — đồng hành cùng chính quyền và doanh nghiệp xây dựng lộ trình số hóa thiết thực, đo lường bằng kết quả.",
    isPublished: true,
    createdAt: "2026-03-15T08:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
    content:
      '\n<h2>1. Chuyển đổi số nên bắt đầu từ đâu?</h2>\n<p>Nhiều cơ quan, địa phương gặp khó khăn khi triển khai chuyển đổi số: quy trình còn phụ thuộc nhiều vào thao tác thủ công, dữ liệu phân tán, thiếu liên kết hoặc khó mở rộng. Trung tâm Đổi mới Sáng tạo Gia Lai hỗ trợ phân tích bài toán thực tế để đưa ra lộ trình khả thi nhất.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image4.png?tr=w-1200,q-80,f-auto" alt="Dashboard quản lý toàn bộ dự án thuộc Gia Lai" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Hệ thống Dashboard điều hành và giám sát tiến độ toàn bộ các dự án thuộc tỉnh Gia Lai</p>\n</div>\n\n<h2>2. Quy trình tư vấn 5 bước chuẩn hóa</h2>\n<ol>\n  <li><strong>01. Khảo sát hiện trạng:</strong> Đánh giá quy trình vận hành, dữ liệu hiện có, hạ tầng phần cứng, phần mềm và năng lực nhân sự.</li>\n  <li><strong>02. Xác định bài toán trọng tâm:</strong> Lựa chọn các vấn đề cấp thiết cần tháo gỡ (đất đai, giao thông, môi trường, nông nghiệp).</li>\n  <li><strong>03. Xây dựng danh mục ưu tiên:</strong> Lập lộ trình triển khai theo từng giai đoạn, xác định rõ tiêu chí đánh giá kết quả (KPIs).</li>\n  <li><strong>04. Triển khai thử nghiệm (Pilot):</strong> Vận hành thử nghiệm trong phạm vi hẹp để đánh giá hiệu quả trước khi nhân rộng.</li>\n  <li><strong>05. Bàn giao & Theo dõi mở rộng:</strong> Chuyển giao công nghệ, hướng dẫn cán bộ vận hành và liên tục nâng cấp hệ thống.</li>\n</ol>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image109.png?tr=w-1200,q-80,f-auto" alt="Tham dự tư vấn chuyển đổi số tại UBND xã Tây Sơn" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Đội ngũ chuyên gia trực tiếp tham gia buổi tư vấn chuyển đổi số tại UBND cấp xã</p>\n</div>\n\n<h2>3. Đề xuất giải pháp công nghệ thế hệ mới</h2>\n<p>Tích hợp sức mạnh của các nền tảng công nghệ lõi trong hệ sinh thái VDCD: UAV trắc địa số, Camera AI giám sát biên, AutoTimelapse theo dõi công trình và Trung tâm dữ liệu Data Center an toàn.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image111.png?tr=w-1200,q-80,f-auto" alt="Chủ tịch HĐQT VDCD Group đề xuất các công nghệ chuyển đổi số" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Chủ tịch HĐQT VDCD Group đại diện trình bày các giải pháp công nghệ chuyển đổi số trọng điểm</p>\n</div>\n',
  },
  {
    id: "prog-su-kien",
    title: "Hội thảo, sự kiện đổi mới sáng tạo",
    slug: "hoi-thao-su-kien",
    shortDescription:
      "Diễn đàn chia sẻ tri thức công nghệ, kết nối mạng lưới doanh nghiệp, nhà khoa học và xúc tiến các chương trình đổi mới sáng tạo toàn diện.",
    thumbnail:
      "https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto",
    field: {
      id: "field-su-kien",
      name: "Hội thảo & Sự kiện",
      slug: "hoi-thao-su-kien",
      icon: "mdi:bullhorn",
      shortDescription:
        "Diễn đàn kết nối tri thức, chia sẻ xu hướng công nghệ mới và xúc tiến đổi mới sáng tạo.",
      order: 5,
    },
    metaTitle: "Hội thảo, sự kiện đổi mới sáng tạo | VDCD Gia Lai",
    metaDescription:
      "Các sự kiện, diễn đàn và hội thảo công nghệ thường niên do Trung tâm Đổi mới Sáng tạo Gia Lai phối hợp tổ chức.",
    isPublished: true,
    createdAt: "2026-03-20T08:00:00.000Z",
    updatedAt: "2026-08-31T09:00:00.000Z",
    content:
      '\n<h2>1. Diễn đàn chia sẻ tri thức và Kết nối công nghệ</h2>\n<p>Trung tâm Đổi mới Sáng tạo Gia Lai thường xuyên chủ trì và phối hợp tổ chức các buổi hội thảo khoa học, diễn đàn công nghệ và sự kiện kết nối đầu tư nhằm lan tỏa tinh thần khởi nghiệp đổi mới sáng tạo đến cộng đồng.</p>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image101.png?tr=w-1200,q-80,f-auto" alt="Hội thảo kết nối startup và chuyên gia công nghệ" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Toàn cảnh buổi hội thảo kết nối chuyên gia, nhà đầu tư và cộng đồng khởi nghiệp</p>\n</div>\n\n<h2>2. Các hoạt động sự kiện chính</h2>\n<ul>\n  <li><strong>Diễn đàn Chuyển đổi số thường niên:</strong> Nơi cập nhật các xu hướng công nghệ mới nhất về AI, UAV, IoT và dữ liệu lớn.</li>\n  <li><strong>Hội thảo chuyên đề theo ngành:</strong> Giải pháp công nghệ cho Nông nghiệp thông minh, Quản lý tài nguyên, Đô thị thông minh và Năng lượng sạch.</li>\n  <li><strong>Ngày hội Khởi nghiệp Đổi mới Sáng tạo (TechFest Gia Lai):</strong> Sân chơi kết nối các ý tưởng sáng tạo với các quỹ đầu tư mạo hiểm.</li>\n  <li><strong>Triển lãm Demo Day & Trưng bày sản phẩm:</strong> Trực tiếp trải nghiệm các giải pháp Robot tự hành, Drone trắc địa và ứng dụng thực tế ảo VR360.</li>\n</ul>\n\n<div class="my-8 rounded-xl overflow-hidden shadow-lg">\n  <img src="https://ik.imagekit.io/po0s6zxoj/vdcd/solutions/doc_images/solution_image112.png?tr=w-1200,q-80,f-auto" alt="Sự kiện thu hút đông đảo đại biểu và doanh nghiệp tham gia" class="w-full h-auto object-cover" />\n  <p class="text-xs text-center text-zinc-500 mt-2 italic">Sự kiện thu hút đông đảo đại biểu các sở ban ngành, hiệp hội doanh nghiệp và cơ quan báo chí</p>\n</div>\n',
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
