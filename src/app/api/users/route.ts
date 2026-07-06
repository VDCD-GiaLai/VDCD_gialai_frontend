import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Không được phép truy cập" },
      { status: 401 },
    );
  }

  // Return a list of users for dashboard demo
  const mockUsers = [
    {
      id: "usr_001",
      email: "admin@vdcdgroup.vn",
      name: "Quản Trị Viên",
      role: "admin",
      createdAt: "2024-11-20T00:00:00.000Z",
    },
    {
      id: "usr_002",
      email: "le.nguyen@vdcdgroup.vn",
      name: "Lê Văn Nguyên",
      role: "user",
      createdAt: "2024-11-21T08:30:00.000Z",
    },
    {
      id: "usr_003",
      email: "tran.thi.b@vdcdgroup.vn",
      name: "Trần Thị Bích",
      role: "user",
      createdAt: "2024-11-22T09:15:00.000Z",
    },
    {
      id: "usr_004",
      email: "pham.anh.tuan@vdcdgroup.vn",
      name: "Phạm Anh Tuấn",
      role: "user",
      createdAt: "2024-11-23T14:45:00.000Z",
    },
    {
      id: "usr_005",
      email: "nguyen.hoang@vdcdgroup.vn",
      name: "Nguyễn Minh Hoàng",
      role: "user",
      createdAt: "2024-11-24T16:20:00.000Z",
    },
  ];

  return NextResponse.json(mockUsers);
}
