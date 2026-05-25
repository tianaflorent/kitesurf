import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { TokenPayload, ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE, getAccessSecret, getRefreshSecret, ACCESS_TOKEN_MAX_AGE } from "@/lib/auth-edge";
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { i18n } from "./i18n-config";

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  )

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- 1. Gestion de l'authentification Admin ---
  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname.startsWith("/admin/login");
  const isLoginApi = pathname.startsWith("/api/admin/login");

  if (isAdminPage || isAdminApi) {
    if (isLoginPage || isLoginApi) {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    let isAuthenticated = false;
    let payload: TokenPayload | null = null;

    if (accessToken) {
      try {
        const { payload: verified } = await jwtVerify(accessToken, getAccessSecret());
        payload = verified as TokenPayload;
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
        payload = refreshPayload as TokenPayload;
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

  // --- 2. Gestion i18n ---
  // Exclure les requêtes qui ne doivent pas être localisées
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname.includes('.') // fichiers statiques (ex: favicon.ico, sitemap.xml)
  ) {
    return NextResponse.next();
  }

  // Vérifier si un locale supporté est déjà présent dans l'URL
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Rediriger s'il manque la locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // e.g. incoming request is /cours
    // The new URL is now /fr/cours
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

  return NextResponse.next();
}

export const config = {
  // Matcher tout sauf les ressources statiques basiques pour optimiser
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
