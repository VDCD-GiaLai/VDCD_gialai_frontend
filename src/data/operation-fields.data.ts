export interface OperationFieldItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  shortDescription?: string;
  order: number;
}

export const MOCK_OPERATION_FIELDS: OperationFieldItem[] = [
  {
    id: "e20f8cfa-92dd-4302-a746-fe50562e19b4",
    name: "Nông nghiệp công nghệ cao",
    slug: "nong-nghiep-cong-nghe-cao",
    shortDescription:
      "Lĩnh vực Nông nghiệp công nghệ cao – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "leaf",
    order: 0,
  },
  {
    id: "5292c9c5-7499-4353-9430-11aa730c63d8",
    name: "Chuyển đổi số",
    slug: "chuyen-doi-so",
    shortDescription:
      "Lĩnh vực Chuyển đổi số – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "cpu",
    order: 1,
  },
  {
    id: "e1760c66-386b-4de3-8490-5d71680649cf",
    name: "Giáo dục & Đào tạo",
    slug: "giao-duc-dao-tao",
    shortDescription:
      "Lĩnh vực Giáo dục & Đào tạo – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "graduation-cap",
    order: 2,
  },
  {
    id: "5192c2da-2ca6-4c81-bbaa-fb0e9d4e02ae",
    name: "Y tế & Sức khỏe",
    slug: "y-te-suc-khoe",
    shortDescription:
      "Lĩnh vực Y tế & Sức khỏe – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "heart-pulse",
    order: 3,
  },
  {
    id: "8cf42e59-62b2-44f9-9ab6-9adfa4ff12a7",
    name: "Du lịch thông minh",
    slug: "du-lich-thong-minh",
    shortDescription:
      "Lĩnh vực Du lịch thông minh – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "map",
    order: 4,
  },
  {
    id: "65bcaab7-d62c-481c-b264-2e0581503c78",
    name: "Năng lượng tái tạo",
    slug: "nang-luong-tai-tao",
    shortDescription:
      "Lĩnh vực Năng lượng tái tạo – thúc đẩy đổi mới sáng tạo và ứng dụng công nghệ hiện đại.",
    icon: "zap",
    order: 5,
  },
];
