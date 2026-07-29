import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("is_authenticated")?.value;

  if (!isAuthenticated) {
    return NextResponse.json(
      {
        statusCode: 401,
        message: "Không được phép truy cập",
        timestamp: new Date().toISOString(),
        path: "/api/v1/admin/users",
      },
      { status: 401 },
    );
  }

  // Return a paginated list of admin users matching API 5.1 docs
  const mockUsers = [
    {
      id: "usr_001",
      username: "admin_user",
      email: "admin@vdcdgroup.vn",
      role: "superadmin",
      isActive: true,
      createdAt: "2024-11-20T00:00:00.000Z",
      updatedAt: "2024-11-20T00:00:00.000Z",
    },
    {
      id: "usr_002",
      username: "le_nguyen",
      email: "le.nguyen@vdcdgroup.vn",
      role: "editor",
      isActive: true,
      createdAt: "2024-11-21T08:30:00.000Z",
      updatedAt: "2024-11-21T08:30:00.000Z",
    },
    {
      id: "usr_003",
      username: "tran_bich",
      email: "tran.thi.b@vdcdgroup.vn",
      role: "editor",
      isActive: true,
      createdAt: "2024-11-22T09:15:00.000Z",
      updatedAt: "2024-11-22T09:15:00.000Z",
    },
    {
      id: "usr_004",
      username: "pham_tuan",
      email: "pham.anh.tuan@vdcdgroup.vn",
      role: "viewer",
      isActive: true,
      createdAt: "2024-11-23T14:45:00.000Z",
      updatedAt: "2024-11-23T14:45:00.000Z",
    },
    {
      id: "usr_005",
      username: "nguyen_hoang",
      email: "nguyen.hoang@vdcdgroup.vn",
      role: "viewer",
      isActive: false,
      createdAt: "2024-11-24T16:20:00.000Z",
      updatedAt: "2024-11-24T16:20:00.000Z",
    },
  ];

  return NextResponse.json({
    statusCode: 200,
    data: {
      items: mockUsers,
      total: mockUsers.length,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  });
}
