export interface PolicyDocument {
  slug: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  content: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const POLICIES: Record<string, PolicyDocument> = {
  "dieu-khoan-su-dung": {
    slug: "dieu-khoan-su-dung",
    title: "Điều khoản sử dụng",
    subtitle:
      "Quy định & Điều kiện truy cập và sử dụng dịch vụ trên nền tảng VDCD Gia Lai",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Quy định chung",
        paragraphs: [
          "Khi truy cập và sử dụng website trungtamdoimoisangtao.com, Quý khách hàng mặc nhiên đồng ý tuân thủ các quy định và điều khoản được nêu tại đây.",
          "VDCD Gia Lai có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong Điều khoản sử dụng này vào bất kỳ lúc nào mà không cần thông báo trước.",
        ],
      },
      {
        heading: "2. Quyền sở hữu trí tuệ",
        paragraphs: [
          "Toàn bộ tài nguyên, nội dung, thiết kế, hình ảnh, văn bản và giải pháp công nghệ đăng tải trên trang web thuộc quyền sở hữu trí tuệ của VDCD Gia Lai.",
          "Mọi hành vi sao chép, trích dẫn hoặc sử dụng lại thương mại mà chưa được sự chấp thuận bằng văn bản của VDCD Gia Lai đều vi phạm pháp luật.",
        ],
      },
      {
        heading: "3. Tuyên bố miễn trừ trách nhiệm",
        paragraphs: [
          "VDCD Gia Lai cam kết cung cấp thông tin chính xác và cập nhật nhất. Tuy nhiên, chúng tôi không chịu trách nhiệm đối với các gián đoạn kỹ thuật do sự cố mạng viễn thông ngoài tầm kiểm soát.",
        ],
      },
    ],
  },

  "chinh-sach-bao-mat": {
    slug: "chinh-sach-bao-mat",
    title: "Chính sách bảo mật thông tin",
    subtitle:
      "Cam kết bảo vệ dữ liệu cá nhân & thông tin doanh nghiệp theo Nghị định 13/2023/NĐ-CP",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Mục đích thu thập thông tin cá nhân",
        paragraphs: [
          "Trung tâm Đổi mới Sáng tạo Gia Lai (VDCD Gia Lai) thu thập thông tin của Quý khách hàng và Doanh nghiệp nhằm mục đích tư vấn, cung cấp dịch vụ công nghệ, ươm tạo khởi nghiệp và hỗ trợ chuyển đổi số.",
          "Các thông tin thu thập bao gồm: Họ tên, Số điện thoại, Email, Tên tổ chức/Doanh nghiệp, Nhu cầu hợp tác và Tệp hồ sơ đính kèm (nếu có).",
        ],
      },
      {
        heading: "2. Phạm vi sử dụng thông tin",
        paragraphs: [
          "Thông tin thu thập chỉ được sử dụng trong nội bộ VDCD Gia Lai để phản hồi yêu cầu tư vấn, cung cấp giải pháp công nghệ và gửi các thông tin chương trình hỗ trợ mới nhất.",
          "Tuyệt đối không mua bán, chia sẻ hoặc tiết lộ thông tin của khách hàng cho bên thứ ba khi chưa có sự đồng ý bằng văn bản của Quý khách, trừ trường hợp có yêu cầu từ cơ quan pháp luật có thẩm quyền.",
        ],
      },
      {
        heading: "3. Thời gian lưu trữ thông tin",
        paragraphs: [
          "Dữ liệu thông tin của Quý khách sẽ được lưu trữ trên hệ thống máy chủ an toàn của VDCD Gia Lai cho đến khi có yêu cầu hủy bỏ từ phía khách hàng hoặc tổ chức.",
        ],
      },
      {
        heading: "4. Cam kết an toàn & Bảo mật dữ liệu",
        paragraphs: [
          "Hệ thống CNTT của VDCD Gia Lai áp dụng các tiêu chuẩn bảo mật dữ liệu tiên tiến (Mã hóa SSL/TLS, tường lửa bảo vệ 2 lớp) tuân thủ đúng Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.",
        ],
      },
    ],
  },

  "hinh-thuc-thanh-toan": {
    slug: "hinh-thuc-thanh-toan",
    title: "Hình thức & Chính sách thanh toán",
    subtitle:
      "Phương thức thanh toán dịch vụ công nghệ & chương trình chuyển đổi số tại VDCD Gia Lai",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Các hình thức thanh toán được hỗ trợ",
        paragraphs: [
          "Quý khách hàng và Doanh nghiệp hợp tác với VDCD Gia Lai có thể lựa chọn các phương thức thanh toán sau:",
          "a) Chuyển khoản ngân hàng trực tiếp vào tài khoản công ty của VDCD Gia Lai.",
          "b) Thanh toán theo tiến độ nghiệm thu hợp đồng dịch vụ công nghệ / chuyển giao giải pháp.",
        ],
      },
      {
        heading: "2. Thông tin tài khoản thanh toán chính thức",
        paragraphs: [
          "Tên tài khoản: TRUNG TÂM ĐỔI MỚI SÁNG TẠO GIA LAI",
          "Số tài khoản: 0373600099 (Ngân hàng TMCP Quân Đội - MBBank)",
          "Cú pháp chuyển khoản: [Tên Doanh Nghiệp / Họ Tên] - [Mã Hợp Đồng / Số Điện Thoại]",
        ],
      },
      {
        heading: "3. Quy định về chứng từ & Hóa đơn",
        paragraphs: [
          "Mọi giao dịch thanh toán thành công đều được VDCD Gia Lai xuất hóa đơn điện tử (VAT) hợp pháp gửi tới email của Quý khách theo quy định của Tổng cục Thuế.",
        ],
      },
    ],
  },

  "van-chuyen-giao-nhan-cung-cap-dich-vu": {
    slug: "van-chuyen-giao-nhan-cung-cap-dich-vu",
    title: "Vận chuyển, giao nhận & Cung cấp dịch vụ",
    subtitle:
      "Phương thức triển khai, bàn giao phần mềm & nghiệm thu dịch vụ công nghệ",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Phương thức cung cấp & Bàn giao dịch vụ",
        paragraphs: [
          "Đối với các giải pháp phần mềm, hệ thống CNTT và chuyển đổi số: VDCD Gia Lai thực hiện triển khai trực tuyến trên hạ tầng Cloud / Server của Khách hàng, kèm tài liệu hướng dẫn và tài khoản quản trị.",
          "Đối với hoạt động tư vấn, đào tạo và ươm tạo: Triển khai trực tiếp tại trụ sở doanh nghiệp hoặc trụ sở Trung tâm theo đúng thỏa thuận hợp đồng.",
        ],
      },
      {
        heading: "2. Quy định về nghiệm thu & Bàn giao",
        paragraphs: [
          "Sản phẩm / Dịch vụ được nghiệm thu theo danh mục tính năng và chỉ tiêu kỹ thuật thống nhất trong hợp đồng kinh tế.",
        ],
      },
    ],
  },

  "chinh-sach-doi-tra": {
    slug: "chinh-sach-doi-tra",
    title: "Chính sách đổi trả & Hoàn tiền",
    subtitle:
      "Quy định về việc điều chỉnh, hủy bỏ dịch vụ và hoàn trả chi phí giải pháp công nghệ",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Điều kiện áp dụng hoàn tiền / hủy dịch vụ",
        paragraphs: [
          "Khách hàng có quyền yêu cầu tạm dừng hoặc hủy bỏ dịch vụ trong trường hợp VDCD Gia Lai vi phạm tiến độ bàn giao cam kết quá 30 ngày mà không có lý do bất khả kháng hợp lệ.",
          "Sản phẩm phần mềm / dịch vụ bàn giao bị lỗi hệ thống nghiêm trọng không thể khắc phục sau 3 lần điều chỉnh kỹ thuật.",
        ],
      },
      {
        heading: "2. Quy trình & Thời gian hoàn tiền",
        paragraphs: [
          "Số tiền hoàn trả sẽ được chuyển khoản trực tiếp về tài khoản ngân hàng của Khách hàng trong vòng 7-10 ngày làm việc sau khi hai bên ký biên bản thanh lý hợp đồng.",
        ],
      },
    ],
  },

  "tiep-nhan-giai-quyet-khieu-nai": {
    slug: "tiep-nhan-giai-quyet-khieu-nai",
    title: "Phương thức tiếp nhận & giải quyết khiếu nại",
    subtitle:
      "Quy trình xử lý phản ánh, yêu cầu hỗ trợ & giải quyết tranh chấp",
    lastUpdated: "01/01/2026",
    content: [
      {
        heading: "1. Nguyên tắc giải quyết",
        paragraphs: [
          "VDCD Gia Lai luôn đề cao tinh thần hợp tác, minh bạch và tôn trọng quyền lợi của Khách hàng & Đối tác. Mọi khiếu nại đều được tiếp nhận và xử lý nhanh chóng, công bằng.",
        ],
      },
      {
        heading: "2. Các kênh tiếp nhận phản ánh & khiếu nại",
        paragraphs: [
          "Quý khách có thể gửi phản ánh / khiếu nại qua các kênh sau:",
          "• Hotline tiếp nhận: 0373600099",
          "• Email chuyên trách: dmstgialai@vdcd.vn",
          "• Trụ sở trực tiếp: 226 Đống Đa, Pleiku, Gia Lai",
        ],
      },
      {
        heading: "3. Quy trình & Thời hạn xử lý khiếu nại",
        paragraphs: [
          "Bước 1: Tiếp nhận yêu cầu và xác minh thông tin (Trong vòng 24 giờ làm việc).",
          "Bước 2: Phối hợp các bộ phận liên quan kiểm tra và đề xuất phương án giải quyết (Từ 1 - 3 ngày làm việc).",
          "Bước 3: Phản hồi bằng văn bản / email và thống nhất giải pháp khắc phục với Khách hàng.",
        ],
      },
    ],
  },
};
