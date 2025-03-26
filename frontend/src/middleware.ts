import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const userCookie = request.cookies.get("user");
  let user = null;

  try {
    user = userCookie?.value ? JSON.parse(userCookie.value) : null;
  } catch (e) {
    console.error("Erro ao analisar cookie do usuário:", e);
  }

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/catalog") ||
    request.nextUrl.pathname.startsWith("/content/");

  const redirectedFrom = request.headers.get("x-redirected-from");
  if (redirectedFrom === request.nextUrl.pathname) {
    console.warn(
      "Detectado possível loop de redirecionamento. Permitindo acesso à página:",
      request.nextUrl.pathname
    );
    return NextResponse.next();
  }

  if (isAuthPage && user) {
    const response = NextResponse.redirect(new URL("/catalog", request.url));
    response.headers.set("x-redirected-from", request.nextUrl.pathname);
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );
    return response;
  }

  if (isProtectedRoute && !user) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.headers.set("x-redirected-from", request.nextUrl.pathname);
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );
    return response;
  }

  if (isProtectedRoute) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Vary", "Cookie");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/catalog",
    "/catalog/:path*",
    "/content/:path*",
    "/login",
    "/signup",
    "/((?!_next/static|_next/image|favicon.ico|images).*)",
  ],
};
