import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Không được phép truy cập" },
      { status: 401 },
    );
  }

  // Return user details
  return NextResponse.json({
    id: "usr_001",
    email: "admin@vdcdgroup.vn",
    name: "Quản Trị Viên",
    role: "admin",
    avatarUrl: "https://lh3.googleusercontent.com/a/default-user",
    createdAt: "2024-11-20T00:00:00.000Z",
  });
}
