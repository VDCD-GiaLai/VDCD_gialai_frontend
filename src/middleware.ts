import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_ROUTES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get("is_authenticated")?.value === "true";

  // Check if route is auth/login page
  const isAuthRoute = pathname === APP_ROUTES.LOGIN;

  if (isAuthRoute && isAuthenticated) {
    // Redirect to homepage if logged in and trying to access login page
    return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/login"],
};
