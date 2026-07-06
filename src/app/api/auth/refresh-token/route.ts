import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Phiên đăng nhập hết hạn hoặc không hợp lệ" },
      { status: 401 },
    );
  }

  // Issue a new mock access token
  const newAccessToken =
    "mock-access-token-refreshed-" + Math.random().toString(36).substring(2);

  return NextResponse.json({
    accessToken: newAccessToken,
  });
}
