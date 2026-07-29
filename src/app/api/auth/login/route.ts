import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Create a mock user response matching API 4.1 docs
    const mockUser = {
      id: "usr_001",
      username: email === "admin@vdcdgroup.vn" ? "admin_user" : "partner_user",
      email: email || "admin@vdcdgroup.vn",
      role: email === "admin@vdcdgroup.vn" ? "superadmin" : "editor",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Generating mock JWTs
    const mockAccessToken =
      "mock-access-token-" + Math.random().toString(36).substring(2);
    const mockRefreshToken =
      "mock-refresh-token-" + Math.random().toString(36).substring(2);

    // Response wrapped in { statusCode, data } per API docs
    const response = NextResponse.json(
      {
        statusCode: 201,
        data: {
          accessToken: mockAccessToken,
          refreshToken: mockRefreshToken,
          user: mockUser,
        },
      },
      { status: 201 },
    );

    response.cookies.set("refresh_token", mockRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Also set a temporary access token cookie for the proxy to easily check auth
    response.cookies.set("is_authenticated", "true", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        statusCode: 400,
        message: "Đăng nhập không thành công",
        timestamp: new Date().toISOString(),
        path: "/api/v1/auth/login",
      },
      { status: 400 },
    );
  }
}
