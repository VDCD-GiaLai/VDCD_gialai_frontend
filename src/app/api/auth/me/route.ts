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
        path: "/api/v1/auth/me",
      },
      { status: 401 },
    );
  }

  // Return user details matching API 4.4 response, wrapped in { statusCode, data }
  return NextResponse.json({
    statusCode: 200,
    data: {
      id: "usr_001",
      username: "admin_user",
      email: "admin@vdcdgroup.vn",
      role: "superadmin",
      isActive: true,
      createdAt: "2024-11-20T00:00:00.000Z",
      updatedAt: "2024-11-20T00:00:00.000Z",
    },
  });
}
