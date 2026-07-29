import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        statusCode: 401,
        message: "Phiên đăng nhập hết hạn hoặc không hợp lệ",
        timestamp: new Date().toISOString(),
        path: "/api/v1/auth/refresh",
      },
      { status: 401 },
    );
  }

  // API 4.2: Returns { success: true }, new accessToken is set via cookie
  return NextResponse.json(
    {
      statusCode: 201,
      data: { success: true },
    },
    { status: 201 },
  );
}
