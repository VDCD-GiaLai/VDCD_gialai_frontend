import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_ROUTES } from "@/lib/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated =
    request.cookies.get("is_authenticated")?.value === "true";

  // Check if route is a dashboard/protected route
  const isDashboardRoute = pathname.startsWith(APP_ROUTES.DASHBOARD);
  // Check if route is auth/login page
  const isAuthRoute = pathname === APP_ROUTES.LOGIN;

  if (isDashboardRoute && !isAuthenticated) {
    // Redirect to login if accessing dashboard without session
    const loginUrl = new URL(APP_ROUTES.LOGIN, request.url);
    // Remember current path to redirect after successful login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    // Redirect to dashboard if logged in and trying to access login page
    return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
