import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Create a mock user response
    const mockUser = {
      id: "usr_001",
      email: email || "admin@vdcdgroup.vn",
      name: email === "admin@vdcdgroup.vn" ? "Quản Trị Viên" : "Đối Tác VDCD",
      role: email === "admin@vdcdgroup.vn" ? "admin" : "user",
      avatarUrl: "https://lh3.googleusercontent.com/a/default-user",
      createdAt: new Date().toISOString(),
    };

    // Generating mock JWTs
    const mockAccessToken =
      "mock-access-token-" + Math.random().toString(36).substring(2);
    const mockRefreshToken =
      "mock-refresh-token-" + Math.random().toString(36).substring(2);

    // Set refresh token in httpOnly cookie
    const response = NextResponse.json({
      user: mockUser,
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });

    response.cookies.set("refresh_token", mockRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Also set a temporary access token cookie for the middleware to easily check auth
    response.cookies.set("is_authenticated", "true", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Đăng nhập không thành công" },
      { status: 400 },
    );
  }
}
