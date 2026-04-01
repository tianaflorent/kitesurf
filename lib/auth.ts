import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
import { 
  ACCESS_TOKEN_COOKIE, 
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  TokenPayload,
  UserRole,
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken 
} from "./auth-edge";

// Re-export shared types and constants
export type { TokenPayload, UserRole };
export { 
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};

/* ──────────────────────── Password hashing ──────────────────────── */

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/* ──────────────────────── Cookie helpers ──────────────────────── */

const isProduction = process.env.NODE_ENV === "production";

export function setAuthCookies(
  accessToken: string,
  refreshToken: string,
  responseCookies: {
    set: (options: {
      name: string;
      value: string;
      httpOnly: boolean;
      sameSite: "lax" | "strict" | "none";
      secure: boolean;
      path: string;
      maxAge: number;
    }) => void;
  }
) {
  responseCookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: accessToken,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  responseCookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: refreshToken,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

export function clearAuthCookies(responseCookies: {
  set: (options: {
    name: string;
    value: string;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none";
    secure: boolean;
    path: string;
    maxAge: number;
  }) => void;
}) {
  responseCookies.set({
    name: ACCESS_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  });

  responseCookies.set({
    name: REFRESH_TOKEN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 0,
  });
}

/* ──────────────────────── Server-side session extraction ──────────────────────── */

/**
 * Extraire l'utilisateur connecté depuis les cookies (pour les API Routes / Server Components).
 * Retourne le payload du token ou null si non authentifié.
 */
export async function getSessionUser(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) return payload;
  }

  // L'access token est expiré — tenter le refresh
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) return null;

  const refreshPayload = await verifyRefreshToken(refreshToken);
  if (!refreshPayload) return null;

  // Le refresh token est valide, on ne peut pas set les cookies ici
  // (les cookies sont read-only dans les Server Components)
  // mais on retourne le payload pour que l'API route puisse rafraîchir
  return refreshPayload;
}

/**
 * Vérifier que l'utilisateur a un des rôles requis.
 * Retourne le payload si OK, null sinon.
 */
export async function requireRole(
  ...allowedRoles: UserRole[]
): Promise<TokenPayload | null> {
  const user = await getSessionUser();
  if (!user) return null;
  if (!allowedRoles.includes(user.role)) return null;
  return user;
}


