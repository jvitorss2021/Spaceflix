import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("user");
  const user = userCookie?.value ? userCookie.value : null;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/catalog") ||
    request.nextUrl.pathname.startsWith("/content");

  console.log(
    `Path: ${request.nextUrl.pathname}, User: ${user ? "Logged" : "Not logged"}`
  );

  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/catalog", request.url));
  }

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/catalog/:path*", "/content/:path*", "/login", "/signup"],
};
