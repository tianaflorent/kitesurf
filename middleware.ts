import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const ACCESS_TOKEN_COOKIE = "admin_session";
const REFRESH_TOKEN_COOKIE = "admin_refresh";

const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes

function getAccessSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET manquant — vérifiez vos variables d'environnement.");
  return new TextEncoder().encode(secret);
}

function getRefreshSecret(): Uint8Array {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET manquant — vérifiez vos variables d'environnement.");
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
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

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  let isAuthenticated = false;
  let payload: any = null;

  if (accessToken) {
    try {
      const { payload: verified } = await jwtVerify(accessToken, getAccessSecret());
      payload = verified;
      isAuthenticated = true;
    } catch {
      // Access token invalid or expired.
    }
  }

  // Si non authentifié via access token, on tente le refresh token
  let shouldSetNewAccessToken = false;
  if (!isAuthenticated && refreshToken) {
    try {
      const { payload: refreshPayload } = await jwtVerify(refreshToken, getRefreshSecret());
      payload = refreshPayload;
      isAuthenticated = true;
      shouldSetNewAccessToken = true;
    } catch {
      // Refresh token invalid or expired
    }
  }

  if (isAuthenticated) {
    const response = NextResponse.next();

    // Si on s'est authentifié via le refresh token, on remet un access token frais
    if (shouldSetNewAccessToken && payload) {
      const newAccessToken = await new SignJWT({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${ACCESS_TOKEN_MAX_AGE}s`)
        .sign(getAccessSecret());

      response.cookies.set({
        name: ACCESS_TOKEN_COOKIE,
        value: newAccessToken,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });
    }

    return response;
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
