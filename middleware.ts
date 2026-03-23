import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");

  const isLoginPage = pathname.startsWith("/admin/login");
  const isLoginApi = pathname.startsWith("/api/admin/login");

  if (!(isAdminPage || isAdminApi)) {
    return NextResponse.next();
  }

  if (isLoginPage || isLoginApi) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get(ADMIN_COOKIE)?.value === "1";

  if (hasSession) {
    return NextResponse.next();
  }

  if (isAdminApi) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
