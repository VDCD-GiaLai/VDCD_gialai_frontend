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
      "Quy định & Điều kiện truy cập và sử dụng dịch vụ trên website doimoisangtaogialai.vn",
    lastUpdated: "30/09/2026",
    content: [
      {
        heading: "Lời mở đầu",
        paragraphs: [
          "Chào mừng Quý khách hàng, đối tác và người dùng đến với website Trung Tâm Đổi Mới Sáng Tạo Gia Lai tại địa chỉ doimoisangtaogialai.vn.",
          "Khi truy cập, sử dụng website và các nội dung, thông tin, dịch vụ được cung cấp trên website, Quý khách được xem là đã đọc, hiểu và đồng ý tuân thủ các Điều khoản sử dụng dưới đây. Vui lòng đọc kỹ các quy định trước khi tiếp tục sử dụng website.",
        ],
      },
      {
        heading: "1. Phạm vi áp dụng",
        paragraphs: [
          "Điều khoản sử dụng này áp dụng đối với tất cả cá nhân, tổ chức truy cập, tìm kiếm thông tin, đăng ký, liên hệ hoặc sử dụng các nội dung và dịch vụ được cung cấp trên website doimoisangtaogialai.vn.",
          "Các điều khoản này nhằm quy định quyền, nghĩa vụ và trách nhiệm của người sử dụng trong quá trình truy cập và sử dụng website.",
        ],
      },
      {
        heading: "2. Chấp nhận điều khoản sử dụng",
        paragraphs: [
          "Khi truy cập website, Quý khách xác nhận rằng:",
          "• Đã đọc và hiểu các nội dung trong Điều khoản sử dụng.",
          "• Đồng ý tuân thủ các quy định được nêu trên website.",
          "• Không sử dụng website cho các mục đích vi phạm pháp luật hoặc xâm phạm quyền, lợi ích hợp pháp của Trung Tâm Đổi Mới Sáng Tạo Gia Lai và bên thứ ba.",
          "• Chịu trách nhiệm về các hành vi phát sinh trong quá trình sử dụng website.",
          "Nếu Quý khách không đồng ý với bất kỳ nội dung nào trong Điều khoản sử dụng, vui lòng ngừng truy cập và sử dụng website.",
        ],
      },
      {
        heading: "3. Quyền và trách nhiệm của người sử dụng",
        paragraphs: [
          "Quý khách được phép truy cập và sử dụng các thông tin được công khai trên website cho mục đích tìm hiểu, tham khảo và sử dụng dịch vụ hợp pháp.",
          "Trong quá trình sử dụng website, Quý khách không được:",
          "• Sử dụng website cho các hoạt động trái quy định pháp luật.",
          "• Can thiệp, phá hoại hoặc gây ảnh hưởng đến hoạt động bình thường của website.",
          "• Sử dụng các công cụ, phần mềm hoặc phương thức nhằm truy cập trái phép vào hệ thống.",
          "• Thu thập, sao chép hoặc khai thác dữ liệu trên website nhằm mục đích thương mại khi chưa được cho phép.",
          "• Đăng tải hoặc truyền tải nội dung có tính chất vi phạm pháp luật, xúc phạm danh dự, uy tín của tổ chức, cá nhân hoặc xâm phạm quyền của bên thứ ba.",
          "• Thực hiện các hành vi có thể gây ảnh hưởng đến tính bảo mật, an toàn hoặc hiệu suất của website.",
        ],
      },
      {
        heading: "4. Quyền sở hữu trí tuệ",
        paragraphs: [
          "Toàn bộ nội dung được đăng tải trên website, bao gồm nhưng không giới hạn ở: Văn bản, bài viết; Hình ảnh, đồ họa, video; Thiết kế giao diện; Logo, nhận diện thương hiệu; Dữ liệu, tài liệu; Các giải pháp, sản phẩm và nội dung công nghệ thuộc quyền sở hữu hoặc quyền sử dụng hợp pháp của Trung Tâm Đổi Mới Sáng Tạo Gia Lai / VDCD Gia Lai hoặc các bên có liên quan.",
          "Quý khách không được tự ý sao chép, chỉnh sửa, phân phối, xuất bản, chuyển giao, khai thác thương mại hoặc sử dụng lại toàn bộ hay một phần nội dung trên website nếu chưa có sự đồng ý bằng văn bản của chủ sở hữu quyền.",
          "Việc sử dụng nội dung của website phải tuân thủ các quy định pháp luật hiện hành về quyền sở hữu trí tuệ.",
        ],
      },
      {
        heading: "5. Nội dung và thông tin trên website",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai nỗ lực cung cấp thông tin chính xác, đầy đủ và được cập nhật nhằm phục vụ nhu cầu tìm hiểu của người dùng.",
          "Tuy nhiên, trong một số trường hợp, thông tin trên website có thể thay đổi theo thời gian hoặc có thể xảy ra sai sót ngoài ý muốn.",
          "Do đó, Quý khách nên kiểm tra và xác nhận lại các thông tin quan trọng trước khi đưa ra quyết định hoặc thực hiện giao dịch dựa trên nội dung được đăng tải trên website.",
        ],
      },
      {
        heading: "6. Liên kết đến website bên thứ ba",
        paragraphs: [
          "Website có thể chứa các đường dẫn hoặc liên kết đến website, nền tảng hoặc dịch vụ của bên thứ ba nhằm cung cấp thêm thông tin và hỗ trợ người dùng.",
          "Các website bên thứ ba hoạt động theo điều khoản và chính sách riêng của họ. Trung Tâm Đổi Mới Sáng Tạo Gia Lai không chịu trách nhiệm về nội dung, tính chính xác, tính bảo mật hoặc hoạt động của các website không thuộc quyền quản lý của Trung Tâm.",
          "Quý khách nên đọc kỹ điều khoản và chính sách của các bên thứ ba trước khi sử dụng dịch vụ.",
        ],
      },
      {
        heading: "7. Giới hạn trách nhiệm",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai nỗ lực duy trì website hoạt động ổn định và cung cấp thông tin chính xác đến người dùng.",
          "Tuy nhiên, chúng tôi không đảm bảo website luôn hoạt động liên tục hoặc không xảy ra lỗi trong mọi thời điểm.",
          "Trung tâm không chịu trách nhiệm đối với các thiệt hại phát sinh do những nguyên nhân nằm ngoài khả năng kiểm soát hợp lý, bao gồm nhưng không giới hạn: Sự cố đường truyền Internet hoặc mạng viễn thông; Lỗi máy chủ hoặc trung tâm dữ liệu; Sự cố kỹ thuật từ nhà cung cấp dịch vụ; Các cuộc tấn công mạng hoặc hành vi truy cập trái phép; Sự cố do thiên tai, hỏa hoạn, mất điện hoặc các sự kiện bất khả kháng khác.",
        ],
      },
      {
        heading: "8. Quyền thay đổi và cập nhật nội dung",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai có quyền thay đổi, cập nhật, bổ sung hoặc lược bỏ một phần hoặc toàn bộ nội dung của Điều khoản sử dụng khi cần thiết.",
          "Những thay đổi có thể được thực hiện nhằm phù hợp với hoạt động của website, dịch vụ cung cấp hoặc các quy định pháp luật hiện hành.",
          "Ngày cập nhật mới nhất sẽ được thể hiện trên trang Điều khoản sử dụng. Việc Quý khách tiếp tục truy cập và sử dụng website sau khi điều khoản được cập nhật đồng nghĩa với việc Quý khách chấp nhận các nội dung đã được thay đổi.",
        ],
      },
      {
        heading: "9. Tạm ngừng hoặc chấm dứt quyền truy cập",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai có quyền tạm ngừng, hạn chế hoặc chấm dứt quyền truy cập của người dùng vào website nếu phát hiện hành vi có dấu hiệu:",
          "• Vi phạm Điều khoản sử dụng.",
          "• Vi phạm quy định pháp luật.",
          "• Xâm phạm quyền và lợi ích hợp pháp của Trung tâm hoặc bên thứ ba.",
          "• Gây ảnh hưởng đến an toàn, bảo mật hoặc hoạt động của website.",
          "Việc áp dụng biện pháp hạn chế hoặc chấm dứt truy cập không làm mất đi các quyền và nghĩa vụ khác theo quy định pháp luật.",
        ],
      },
      {
        heading: "10. Bảo mật thông tin",
        paragraphs: [
          "Việc thu thập, sử dụng và bảo vệ thông tin cá nhân của người dùng được thực hiện theo Chính sách bảo mật được công bố trên website.",
          "Quý khách vui lòng tham khảo Chính sách bảo mật để biết thêm thông tin về cách Trung Tâm Đổi Mới Sáng Tạo Gia Lai tiếp nhận, sử dụng và bảo vệ dữ liệu của người dùng.",
        ],
      },
      {
        heading: "11. Giải quyết tranh chấp",
        paragraphs: [
          "Mọi vấn đề phát sinh liên quan đến việc sử dụng website trước hết sẽ được các bên ưu tiên giải quyết thông qua trao đổi và thiện chí hợp tác.",
          "Trường hợp không thể giải quyết bằng thương lượng, tranh chấp sẽ được xử lý theo quy định của pháp luật Việt Nam.",
        ],
      },
      {
        heading: "12. Thông tin liên hệ",
        paragraphs: [
          "Nếu Quý khách có câu hỏi, yêu cầu hỗ trợ hoặc cần giải thích thêm về Điều khoản sử dụng, vui lòng liên hệ:",
          "• Đơn vị: Trung Tâm Đổi Mới Sáng Tạo Gia Lai (VDCD Gia Lai)",
          "• Địa chỉ: 62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
          "• Hotline: 0373 600 099",
          "• Email: dmstgialai@vdcd.vn",
          "Bộ phận hỗ trợ của Trung Tâm Đổi Mới Sáng Tạo Gia Lai sẵn sàng tiếp nhận và giải đáp các yêu cầu của Quý khách trong quá trình sử dụng website.",
        ],
      },
      {
        heading: "13. Hiệu lực của điều khoản",
        paragraphs: [
          "Điều khoản sử dụng này có hiệu lực kể từ ngày được công bố trên website doimoisangtaogialai.vn.",
          "Việc tiếp tục truy cập và sử dụng website sau thời điểm Điều khoản sử dụng được cập nhật đồng nghĩa với việc Quý khách xác nhận đã đọc, hiểu và đồng ý với các nội dung được công bố.",
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai có quyền cập nhật Điều khoản sử dụng để phù hợp với tình hình hoạt động thực tế và quy định pháp luật hiện hành.",
        ],
      },
    ],
  },

  "chinh-sach-bao-mat": {
    slug: "chinh-sach-bao-mat",
    title: "Chính sách bảo mật",
    subtitle:
      "Cam kết bảo vệ dữ liệu cá nhân & thông tin người dùng theo quy định pháp luật",
    lastUpdated: "30/09/2026",
    content: [
      {
        heading: "Lời mở đầu",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai tôn trọng quyền riêng tư và cam kết bảo vệ thông tin cá nhân của khách truy cập, đối tác, doanh nghiệp, chuyên gia, nhà đầu tư, startup và các tổ chức, cá nhân sử dụng website doimoisangtaogialai.vn.",
          "Chính sách bảo mật này giải thích cách Trung Tâm Đổi Mới Sáng Tạo Gia Lai thu thập, sử dụng, lưu trữ và bảo vệ thông tin mà người dùng cung cấp khi truy cập và sử dụng website.",
        ],
      },
      {
        heading: "1. Phạm vi áp dụng",
        paragraphs: [
          "Chính sách này áp dụng đối với thông tin được thu thập thông qua website doimoisangtaogialai.vn, bao gồm các trang giới thiệu, chương trình, giải pháp công nghệ, dự án, tin tức, tuyển dụng, liên hệ và các biểu mẫu trực tuyến trên website.",
          "Khi truy cập hoặc cung cấp thông tin cho website, người dùng được xem là đã đọc và hiểu các nội dung được quy định trong Chính sách bảo mật này.",
        ],
      },
      {
        heading: "2. Thông tin chúng tôi có thể thu thập",
        paragraphs: [
          "Tùy theo mục đích tương tác với website, Trung Tâm Đổi Mới Sáng Tạo Gia Lai có thể thu thập một số thông tin do người dùng chủ động cung cấp, bao gồm:",
          "• Họ và tên.",
          "• Số điện thoại.",
          "• Địa chỉ email.",
          "• Tên doanh nghiệp hoặc tổ chức.",
          "• Nội dung yêu cầu, câu hỏi hoặc thông tin trao đổi.",
          "• Thông tin liên quan đến nhu cầu tư vấn, hợp tác, chuyển đổi số, đổi mới sáng tạo hoặc các chương trình của Trung tâm.",
          "• Thông tin được cung cấp khi người dùng gửi yêu cầu liên hệ, đăng ký chương trình hoặc ứng tuyển.",
          "Ngoài ra, website có thể tự động ghi nhận một số thông tin kỹ thuật trong quá trình người dùng truy cập, chẳng hạn như địa chỉ IP, loại thiết bị, trình duyệt, hệ điều hành, thời gian truy cập, trang đã xem và các dữ liệu kỹ thuật khác.",
        ],
      },
      {
        heading: "3. Mục đích sử dụng thông tin",
        paragraphs: [
          "Thông tin được thu thập có thể được sử dụng cho các mục đích sau:",
          "• Tiếp nhận và phản hồi yêu cầu liên hệ của người dùng.",
          "• Cung cấp thông tin về chương trình, hoạt động và giải pháp của Trung tâm.",
          "• Tư vấn về các dịch vụ, giải pháp công nghệ và hoạt động chuyển đổi số.",
          "• Liên hệ với doanh nghiệp, tổ chức, chuyên gia, nhà đầu tư và startup khi có yêu cầu hợp tác.",
          "• Tiếp nhận và xử lý thông tin ứng tuyển.",
          "• Cải thiện chất lượng website, nội dung và trải nghiệm người dùng.",
          "• Phân tích hoạt động truy cập nhằm nâng cao hiệu quả vận hành website.",
          "• Phát hiện, ngăn chặn và xử lý các hành vi có dấu hiệu gây ảnh hưởng đến an toàn, bảo mật của website.",
          "• Thực hiện các nghĩa vụ theo quy định của pháp luật khi cần thiết.",
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai chỉ sử dụng thông tin cá nhân cho các mục đích phù hợp với nội dung mà người dùng cung cấp thông tin hoặc các mục đích được pháp luật cho phép.",
        ],
      },
      {
        heading: "4. Phạm vi chia sẻ thông tin",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai không bán, trao đổi hoặc cho thuê thông tin cá nhân của người dùng cho bên thứ ba nhằm mục đích thương mại trái với quy định của pháp luật.",
          "Trong một số trường hợp cần thiết, thông tin có thể được chia sẻ cho các bên liên quan để phục vụ việc cung cấp dịch vụ, xử lý yêu cầu hoặc thực hiện công việc mà người dùng đã yêu cầu.",
          "Việc chia sẻ thông tin có thể được thực hiện trong các trường hợp:",
          "• Có sự đồng ý của người dùng.",
          "• Cần thiết để xử lý yêu cầu hoặc cung cấp dịch vụ cho người dùng.",
          "• Phục vụ hoạt động phối hợp với đối tác, chuyên gia, đơn vị cung cấp dịch vụ hoặc các tổ chức liên quan.",
          "• Theo yêu cầu của cơ quan nhà nước có thẩm quyền.",
          "• Khi cần thiết để bảo vệ quyền, tài sản và lợi ích hợp pháp của Trung tâm hoặc các bên liên quan.",
          "• Các trường hợp khác được pháp luật cho phép.",
          "Các bên được tiếp cận thông tin có trách nhiệm sử dụng thông tin đúng mục đích và thực hiện các biện pháp phù hợp để bảo vệ thông tin.",
        ],
      },
      {
        heading: "5. Bảo mật và lưu trữ thông tin",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai áp dụng các biện pháp phù hợp về kỹ thuật và quản lý nhằm hạn chế nguy cơ mất mát, truy cập trái phép, tiết lộ, thay đổi hoặc sử dụng sai mục đích thông tin cá nhân.",
          "Thông tin được lưu trữ trong khoảng thời gian cần thiết để thực hiện mục đích thu thập, xử lý yêu cầu của người dùng hoặc đáp ứng các nghĩa vụ pháp lý có liên quan.",
          "Khi thông tin không còn cần thiết cho mục đích sử dụng và không có yêu cầu lưu trữ theo quy định pháp luật, Trung tâm có thể tiến hành xóa, hủy hoặc ẩn thông tin theo quy trình phù hợp.",
          "Mặc dù Trung tâm nỗ lực áp dụng các biện pháp bảo mật cần thiết, không có phương thức truyền hoặc lưu trữ dữ liệu nào trên môi trường Internet có thể đảm bảo an toàn tuyệt đối. Người dùng cũng cần chủ động bảo vệ thông tin tài khoản, thiết bị và các thông tin cá nhân của mình.",
        ],
      },
      {
        heading: "6. Cookie và công nghệ theo dõi",
        paragraphs: [
          "Website có thể sử dụng cookie hoặc các công nghệ tương tự để ghi nhớ một số thông tin, hỗ trợ website hoạt động ổn định và cải thiện trải nghiệm của người dùng.",
          "Cookie có thể được sử dụng để: Ghi nhớ một số tùy chọn của người dùng; Hỗ trợ các chức năng của website; Phân tích lưu lượng truy cập; Đánh giá hiệu quả nội dung và hoạt động trên website; Cải thiện trải nghiệm người dùng.",
          "Người dùng có thể điều chỉnh hoặc tắt cookie thông qua cài đặt của trình duyệt. Tuy nhiên, việc tắt cookie có thể khiến một số chức năng của website hoạt động không đầy đủ.",
        ],
      },
      {
        heading: "7. Quyền của người dùng đối với thông tin cá nhân",
        paragraphs: [
          "Tùy theo quy định pháp luật hiện hành, người dùng có thể có các quyền liên quan đến thông tin cá nhân của mình, bao gồm:",
          "• Yêu cầu được biết về việc thông tin cá nhân được thu thập và sử dụng.",
          "• Yêu cầu kiểm tra hoặc cập nhật thông tin cá nhân.",
          "• Yêu cầu chỉnh sửa thông tin không chính xác.",
          "• Yêu cầu xóa thông tin trong trường hợp phù hợp.",
          "• Rút lại sự đồng ý đối với việc xử lý thông tin khi pháp luật cho phép.",
          "• Phản đối hoặc hạn chế việc xử lý thông tin trong những trường hợp được pháp luật quy định.",
          "• Khiếu nại hoặc yêu cầu giải quyết các vấn đề liên quan đến việc bảo vệ thông tin cá nhân.",
          "Để thực hiện các quyền trên, người dùng có thể liên hệ với Trung Tâm Đổi Mới Sáng Tạo Gia Lai thông qua thông tin liên hệ được công bố trên website.",
        ],
      },
      {
        heading: "8. Bảo mật thông tin trẻ em",
        paragraphs: [
          "Website không chủ động thu thập thông tin cá nhân của trẻ em nhằm mục đích riêng biệt.",
          "Trong trường hợp thông tin của trẻ em được cung cấp thông qua các hoạt động, chương trình hoặc biểu mẫu của Trung tâm, việc thu thập và xử lý thông tin sẽ được thực hiện theo quy định pháp luật hiện hành và các yêu cầu về sự đồng ý của người đại diện hợp pháp khi cần thiết.",
        ],
      },
      {
        heading: "9. Liên kết đến website của bên thứ ba",
        paragraphs: [
          "Website có thể chứa các liên kết đến website, nền tảng hoặc dịch vụ của bên thứ ba.",
          "Khi truy cập các liên kết này, người dùng sẽ chịu sự điều chỉnh của chính sách bảo mật và điều khoản sử dụng của bên thứ ba đó. Trung Tâm Đổi Mới Sáng Tạo Gia Lai không chịu trách nhiệm về nội dung, chính sách hoặc hoạt động xử lý dữ liệu của các website bên ngoài mà Trung tâm không trực tiếp quản lý.",
          "Người dùng nên đọc kỹ chính sách bảo mật của các website bên thứ ba trước khi cung cấp thông tin cá nhân.",
        ],
      },
      {
        heading: "10. Trách nhiệm của người dùng",
        paragraphs: [
          "Người dùng có trách nhiệm:",
          "• Cung cấp thông tin chính xác, đầy đủ và hợp pháp khi sử dụng các biểu mẫu trên website.",
          "• Không cung cấp thông tin cá nhân của người khác khi chưa có sự cho phép phù hợp.",
          "• Chủ động bảo vệ thông tin cá nhân, thiết bị và tài khoản của mình.",
          "• Không sử dụng website để thực hiện các hành vi vi phạm pháp luật hoặc gây ảnh hưởng đến hoạt động, an toàn và bảo mật của website.",
        ],
      },
      {
        heading: "11. Thay đổi Chính sách bảo mật",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai có thể cập nhật hoặc điều chỉnh Chính sách bảo mật khi cần thiết nhằm phù hợp với sự thay đổi trong hoạt động của website, phương thức xử lý thông tin hoặc quy định pháp luật.",
          "Khi có thay đổi, phiên bản cập nhật sẽ được đăng tải trên website. Người dùng nên thường xuyên kiểm tra trang Chính sách bảo mật để nắm được những nội dung mới nhất.",
        ],
      },
    ],
  },

  "hinh-thuc-thanh-toan": {
    slug: "hinh-thuc-thanh-toan",
    title: "Hình thức & Chính sách thanh toán",
    subtitle:
      "Phương thức thanh toán dịch vụ công nghệ & chương trình chuyển đổi số tại VDCD Gia Lai",
    lastUpdated: "30/09/2026",
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
    title: "Chính sách vận chuyển, giao nhận và cung cấp dịch vụ",
    subtitle:
      "Phương thức triển khai, bàn giao phần mềm & nghiệm thu dịch vụ công nghệ",
    lastUpdated: "30/09/2026",
    content: [
      {
        heading: "Lời mở đầu & Phạm vi áp dụng",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai (VDCD Gia Lai) xây dựng chính sách vận chuyển, giao nhận và cung cấp dịch vụ nhằm đảm bảo quá trình triển khai, bàn giao sản phẩm và nghiệm thu dịch vụ được thực hiện minh bạch, đúng thỏa thuận với khách hàng.",
          "Chính sách này áp dụng đối với các sản phẩm, giải pháp công nghệ, dịch vụ tư vấn, đào tạo, ươm tạo và các hoạt động chuyển đổi số do VDCD Gia Lai cung cấp.",
        ],
      },
      {
        heading: "1. Phương thức cung cấp & Bàn giao dịch vụ",
        paragraphs: [
          "Tùy theo tính chất của từng sản phẩm hoặc dịch vụ, VDCD Gia Lai sẽ lựa chọn phương thức triển khai phù hợp nhằm đảm bảo tiến độ và chất lượng theo thỏa thuận trong hợp đồng.",
          "• Đối với giải pháp phần mềm và hệ thống công nghệ thông tin: Các giải pháp phần mềm, hệ thống CNTT và dịch vụ chuyển đổi số được triển khai trực tuyến trên hạ tầng Cloud, Server của khách hàng hoặc hạ tầng được hai bên thống nhất. Sau khi hoàn tất quá trình triển khai, khách hàng được cung cấp tài khoản quản trị, tài liệu hướng dẫn sử dụng và các thông tin cần thiết để vận hành hệ thống.",
          "• Đối với dịch vụ tư vấn, đào tạo và ươm tạo: Các chương trình tư vấn, đào tạo và ươm tạo có thể được triển khai trực tiếp tại trụ sở của doanh nghiệp, Trung Tâm Đổi Mới Sáng Tạo Gia Lai hoặc địa điểm khác theo thỏa thuận giữa hai bên.",
        ],
      },
      {
        heading: "2. Quy định về giao nhận và bàn giao",
        paragraphs: [
          "Đối với các dịch vụ có phát sinh tài liệu, hồ sơ, phần mềm hoặc sản phẩm bàn giao, VDCD Gia Lai thực hiện bàn giao theo phương thức được thống nhất với khách hàng.",
          "Việc bàn giao có thể được thực hiện trực tiếp, trực tuyến hoặc thông qua các phương thức điện tử phù hợp với đặc điểm của từng dịch vụ.",
          "Khách hàng có trách nhiệm phối hợp cung cấp đầy đủ thông tin, tài khoản, dữ liệu và các điều kiện kỹ thuật cần thiết để quá trình triển khai được thực hiện đúng tiến độ.",
        ],
      },
      {
        heading: "3. Quy định về nghiệm thu dịch vụ",
        paragraphs: [
          "Sản phẩm và dịch vụ được nghiệm thu dựa trên phạm vi công việc, danh mục tính năng, tiêu chí chất lượng và các chỉ tiêu kỹ thuật đã được hai bên thống nhất trong hợp đồng kinh tế.",
          "Sau khi hoàn thành việc cung cấp hoặc triển khai dịch vụ, VDCD Gia Lai sẽ phối hợp với khách hàng kiểm tra kết quả thực hiện và tiến hành nghiệm thu theo thỏa thuận.",
          "Trường hợp phát hiện nội dung chưa đáp ứng yêu cầu đã thống nhất, hai bên sẽ phối hợp xác định nguyên nhân và thống nhất phương án xử lý phù hợp.",
        ],
      },
      {
        heading: "4. Thời gian cung cấp và triển khai",
        paragraphs: [
          "Thời gian cung cấp, triển khai và bàn giao dịch vụ được xác định dựa trên tính chất, quy mô và yêu cầu cụ thể của từng dự án.",
          "Tiến độ thực hiện sẽ được quy định trong hợp đồng, báo giá, phụ lục hợp đồng hoặc thỏa thuận giữa VDCD Gia Lai và khách hàng.",
          "Trong trường hợp phát sinh yếu tố khách quan ảnh hưởng đến tiến độ, VDCD Gia Lai sẽ chủ động trao đổi với khách hàng để thống nhất phương án xử lý và thời gian thực hiện phù hợp.",
        ],
      },
      {
        heading: "5. Trách nhiệm của khách hàng",
        paragraphs: [
          "Để đảm bảo quá trình cung cấp và triển khai dịch vụ diễn ra thuận lợi, khách hàng có trách nhiệm:",
          "• Cung cấp thông tin và tài liệu cần thiết theo yêu cầu của dự án.",
          "• Đảm bảo điều kiện hạ tầng kỹ thuật theo thỏa thuận.",
          "• Phối hợp với đội ngũ triển khai trong quá trình thực hiện.",
          "• Kiểm tra sản phẩm, dịch vụ và phản hồi trong thời gian nghiệm thu.",
          "• Thực hiện đầy đủ các nghĩa vụ thanh toán theo hợp đồng.",
        ],
      },
      {
        heading: "6. Hỗ trợ khách hàng",
        paragraphs: [
          "Trong quá trình triển khai, bàn giao và nghiệm thu, VDCD Gia Lai luôn sẵn sàng hỗ trợ khách hàng giải đáp các vấn đề liên quan đến dịch vụ.",
          "Khách hàng có thể liên hệ với bộ phận pháp lý và hỗ trợ khách hàng để được tư vấn, hướng dẫn hoặc xử lý các vấn đề phát sinh:",
          "• Hotline tiếp nhận: 0373 600 099",
          "• Email chuyên trách: dmstgialai@vdcd.vn",
          "• Trụ sở trực tiếp: 62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
        ],
      },
    ],
  },

  "chinh-sach-doi-tra": {
    slug: "chinh-sach-doi-tra",
    title: "Chính sách đổi trả & Hoàn tiền",
    subtitle:
      "Quy định về việc điều chỉnh, hủy bỏ dịch vụ và hoàn trả chi phí giải pháp công nghệ",
    lastUpdated: "30/09/2026",
    content: [
      {
        heading: "Lời mở đầu & Phạm vi áp dụng",
        paragraphs: [
          "Trung Tâm Đổi Mới Sáng Tạo Gia Lai (VDCD Gia Lai) cam kết cung cấp sản phẩm, dịch vụ và các giải pháp công nghệ theo đúng nội dung đã thỏa thuận với khách hàng. Chính sách đổi trả và hoàn tiền được xây dựng nhằm đảm bảo quyền lợi của khách hàng, đồng thời tạo cơ sở để hai bên phối hợp xử lý các vấn đề phát sinh trong quá trình cung cấp và sử dụng dịch vụ.",
          "Chính sách này áp dụng đối với khách hàng sử dụng các sản phẩm, dịch vụ, giải pháp công nghệ và các chương trình do Trung Tâm Đổi Mới Sáng Tạo Gia Lai cung cấp.",
        ],
      },
      {
        heading: "1. Các trường hợp được yêu cầu đổi trả hoặc hoàn tiền",
        paragraphs: [
          "Khách hàng có thể yêu cầu tạm dừng, hủy dịch vụ hoặc hoàn tiền trong các trường hợp sau:",
          "• Sản phẩm phần mềm hoặc giải pháp công nghệ được bàn giao phát sinh lỗi hệ thống nghiêm trọng, ảnh hưởng đến khả năng sử dụng và không thể khắc phục sau 3 lần điều chỉnh kỹ thuật.",
          "• Sản phẩm, dịch vụ được cung cấp không phù hợp với nội dung đã được hai bên thống nhất trong hợp đồng hoặc thỏa thuận cung cấp dịch vụ.",
          "• Các trường hợp khác được quy định cụ thể trong hợp đồng hoặc được hai bên thống nhất bằng văn bản.",
        ],
      },
      {
        heading: "2. Các trường hợp không áp dụng hoàn tiền",
        paragraphs: [
          "VDCD Gia Lai có thể từ chối yêu cầu hoàn tiền trong các trường hợp:",
          "• Khách hàng thay đổi nhu cầu sau khi dịch vụ đã được triển khai theo đúng nội dung đã thỏa thuận.",
          "• Sản phẩm, dịch vụ đã được khách hàng nghiệm thu hoặc xác nhận hoàn thành theo hợp đồng.",
          "• Lỗi phát sinh do khách hàng sử dụng sai hướng dẫn, tự ý thay đổi cấu hình hoặc can thiệp vào hệ thống.",
          "• Việc chậm tiến độ xuất phát từ việc khách hàng chậm cung cấp thông tin, tài liệu, dữ liệu hoặc các điều kiện cần thiết để triển khai dịch vụ.",
          "• Trường hợp phát sinh do sự kiện bất khả kháng hoặc nguyên nhân khách quan ngoài khả năng kiểm soát hợp lý của VDCD Gia Lai.",
        ],
      },
      {
        heading: "3. Quy trình yêu cầu đổi trả, hủy dịch vụ và hoàn tiền",
        paragraphs: [
          "Khách hàng thực hiện yêu cầu theo 5 bước sau:",
          "• Bước 1: Gửi yêu cầu – Khách hàng liên hệ với bộ phận hỗ trợ của VDCD Gia Lai qua hotline hoặc email, cung cấp thông tin về hợp đồng, đơn hàng hoặc dịch vụ và lý do yêu cầu đổi trả, hủy dịch vụ hoặc hoàn tiền.",
          "• Bước 2: Tiếp nhận và kiểm tra – VDCD Gia Lai tiếp nhận yêu cầu, kiểm tra tình trạng thực hiện hợp đồng, sản phẩm hoặc dịch vụ và các tài liệu liên quan.",
          "• Bước 3: Trao đổi và thống nhất – Hai bên trao đổi để xác định nguyên nhân, phạm vi trách nhiệm và phương án xử lý phù hợp. Trong trường hợp đủ điều kiện hoàn tiền, hai bên thống nhất số tiền được hoàn trả và các nội dung liên quan.",
          "• Bước 4: Thanh lý hoặc xác nhận – Đối với trường hợp hủy dịch vụ hoặc hoàn tiền theo hợp đồng, hai bên thực hiện biên bản thanh lý hoặc văn bản xác nhận có liên quan.",
          "• Bước 5: Hoàn tiền – Sau khi hoàn tất thủ tục cần thiết, VDCD Gia Lai thực hiện hoàn tiền theo phương thức đã thống nhất với khách hàng.",
        ],
      },
      {
        heading: "4. Phương thức hoàn tiền",
        paragraphs: [
          "Khoản tiền hoàn trả được thực hiện thông qua hình thức chuyển khoản ngân hàng.",
          "Khách hàng có trách nhiệm cung cấp chính xác thông tin tài khoản nhận tiền. VDCD Gia Lai không chịu trách nhiệm đối với trường hợp hoàn tiền chậm hoặc không thành công do khách hàng cung cấp sai thông tin tài khoản.",
        ],
      },
      {
        heading: "5. Trách nhiệm của các bên",
        paragraphs: [
          "Trách nhiệm của khách hàng: Cung cấp đầy đủ thông tin liên quan đến hợp đồng, đơn hàng hoặc dịch vụ; Mô tả rõ vấn đề phát sinh và lý do yêu cầu đổi trả hoặc hoàn tiền; Cung cấp các tài liệu, hình ảnh hoặc thông tin kỹ thuật cần thiết; Phối hợp với VDCD Gia Lai trong quá trình kiểm tra và xác minh vấn đề; Cung cấp chính xác thông tin tài khoản ngân hàng.",
          "Trách nhiệm của VDCD Gia Lai: Tiếp nhận và phản hồi các yêu cầu của khách hàng kịp thời; Kiểm tra, xác minh nguyên nhân phát sinh một cách khách quan; Thông báo cho khách hàng về kết quả xử lý và phương án giải quyết; Thực hiện hoàn tiền đúng thời hạn khi khách hàng đáp ứng đầy đủ điều kiện; Bảo mật các thông tin do khách hàng cung cấp.",
        ],
      },
      {
        heading: "6. Liên hệ hỗ trợ",
        paragraphs: [
          "Nếu có thắc mắc liên quan đến chính sách đổi trả, hủy dịch vụ hoặc hoàn tiền, khách hàng vui lòng liên hệ:",
          "• Đơn vị: Trung Tâm Đổi Mới Sáng Tạo Gia Lai - VDCD Gia Lai",
          "• Hotline: 0373 600 099",
          "• Email: dmstgialai@vdcd.vn",
          "• Địa chỉ: 62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
        ],
      },
    ],
  },

  "tiep-nhan-giai-quyet-khieu-nai": {
    slug: "tiep-nhan-giai-quyet-khieu-nai",
    title: "Phương thức tiếp nhận & giải quyết khiếu nại",
    subtitle:
      "Quy trình xử lý phản ánh, yêu cầu hỗ trợ & giải quyết tranh chấp",
    lastUpdated: "30/09/2026",
    content: [
      {
        heading: "1. Nguyên tắc tiếp nhận và giải quyết khiếu nại",
        paragraphs: [
          "VDCD Gia Lai cam kết tiếp nhận và xử lý các phản ánh, khiếu nại của Khách hàng và Đối tác trên tinh thần minh bạch, thiện chí, công bằng và tôn trọng quyền lợi của các bên. Mọi vấn đề phát sinh trong quá trình sử dụng sản phẩm, dịch vụ hoặc hợp tác sẽ được tiếp nhận và xem xét theo quy trình phù hợp.",
          "Các khiếu nại được tiếp nhận và xử lý dựa trên những nguyên tắc sau:",
          "• Tôn trọng quyền và lợi ích hợp pháp của Khách hàng và Đối tác.",
          "• Tiếp nhận thông tin với thái độ thiện chí, khách quan và cầu thị.",
          "• Bảo đảm tính minh bạch trong quá trình kiểm tra và xử lý.",
          "• Xác minh thông tin dựa trên hồ sơ, chứng từ và các dữ liệu liên quan.",
          "• Phối hợp với các bộ phận có liên quan để đưa ra phương án xử lý phù hợp.",
          "• Ưu tiên giải quyết vấn đề trên tinh thần hợp tác và hạn chế phát sinh tranh chấp.",
          "• Thông báo kết quả xử lý cho Khách hàng hoặc Đối tác trong thời gian phù hợp.",
        ],
      },
      {
        heading: "2. Các phương thức tiếp nhận phản ánh và khiếu nại",
        paragraphs: [
          "Khách hàng và Đối tác có thể gửi phản ánh hoặc khiếu nại thông qua một trong các phương thức sau:",
          "• Hotline tiếp nhận: 0373 600 099",
          "• Email chuyên trách: dmstgialai@vdcd.vn",
          "• Địa chỉ tiếp nhận trực tiếp: 62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
          "Khi gửi khiếu nại, Khách hàng nên cung cấp đầy đủ thông tin liên quan như họ tên, thông tin liên hệ, nội dung vấn đề cần phản ánh, mã đơn hàng hoặc thông tin giao dịch (nếu có), hình ảnh, tài liệu hoặc các bằng chứng liên quan để thuận tiện cho quá trình kiểm tra.",
        ],
      },
      {
        heading: "3. Quy trình giải quyết khiếu nại",
        paragraphs: [
          "• Bước 1: Tiếp nhận và xác minh thông tin – Sau khi nhận được phản ánh hoặc khiếu nại, VDCD Gia Lai tiến hành ghi nhận nội dung và kiểm tra các thông tin do Khách hàng hoặc Đối tác cung cấp. Thông tin sẽ được xác minh trong vòng 24 giờ làm việc kể từ thời điểm tiếp nhận đầy đủ yêu cầu.",
          "• Bước 2: Kiểm tra và đề xuất phương án xử lý – VDCD Gia Lai phối hợp với các bộ phận liên quan kiểm tra nguyên nhân và đánh giá vấn đề. Thời gian kiểm tra và đề xuất phương án giải quyết dự kiến từ 1 - 3 ngày làm việc.",
          "• Bước 3: Thông báo kết quả và thống nhất phương án – VDCD Gia Lai phản hồi kết quả bằng email hoặc văn bản chính thức. Trên cơ sở kết quả xác minh, các bên trao đổi và thống nhất phương án khắc phục hoặc giải quyết phù hợp.",
        ],
      },
      {
        heading: "4. Trường hợp cần bổ sung thông tin",
        paragraphs: [
          "Để quá trình giải quyết khiếu nại được thực hiện nhanh chóng, Khách hàng và Đối tác cần cung cấp thông tin chính xác và đầy đủ theo yêu cầu.",
          "Trong trường hợp thông tin cung cấp chưa đủ cơ sở để xác minh, VDCD Gia Lai có quyền yêu cầu bổ sung tài liệu hoặc thông tin liên quan trước khi đưa ra kết luận xử lý.",
          "Thời gian xử lý có thể được điều chỉnh tương ứng nếu việc giải quyết phụ thuộc vào thông tin, tài liệu hoặc xác nhận từ bên liên quan.",
        ],
      },
      {
        heading: "5. Kết quả giải quyết khiếu nại",
        paragraphs: [
          "Sau khi hoàn tất việc xác minh, VDCD Gia Lai sẽ thông báo kết quả xử lý và phương án giải quyết cho Khách hàng hoặc Đối tác.",
          "Tùy thuộc vào nội dung khiếu nại, phương án xử lý có thể bao gồm giải thích, điều chỉnh, khắc phục vấn đề hoặc áp dụng biện pháp phù hợp khác theo thỏa thuận giữa các bên và quy định có liên quan.",
          "VDCD Gia Lai luôn ưu tiên giải quyết khiếu nại bằng phương thức trao đổi và thống nhất trên tinh thần hợp tác, thiện chí và bảo đảm quyền lợi chính đáng của các bên.",
        ],
      },
      {
        heading: "6. Thông tin hỗ trợ",
        paragraphs: [
          "Nếu cần giải đáp thêm về chính sách hoặc có phản ánh liên quan đến sản phẩm, dịch vụ và quá trình hợp tác, Quý khách vui lòng liên hệ:",
          "• Trung Tâm Đổi Mới Sáng Tạo Gia Lai (VDCD Gia Lai)",
          "• Hotline: 0373 600 099",
          "• Email: dmstgialai@vdcd.vn",
          "• Trụ sở: 62A Diên Hồng, Phường Quy Nhơn, Tỉnh Gia Lai",
        ],
      },
    ],
  },
};
