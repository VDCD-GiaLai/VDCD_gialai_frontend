import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Đăng xuất thành công",
  });

  // Delete cookies by setting maxAge to 0
  response.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });
  response.cookies.set("is_authenticated", "", { maxAge: 0, path: "/" });

  return response;
}
