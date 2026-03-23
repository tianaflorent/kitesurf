import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";

/* ──────────────────────── Types ──────────────────────── */

export type UserRole = "ADMIN" | "MODERATOR";

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/* ──────────────────────── Constants ──────────────────────── */

const ACCESS_TOKEN_COOKIE = "admin_session";
const REFRESH_TOKEN_COOKIE = "admin_refresh";

const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 jours

/* ──────────────────────── Secrets ──────────────────────── */

function getAccessSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET manquant côté serveur.");
  return new TextEncoder().encode(secret);
}

function getRefreshSecret(): Uint8Array {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET manquant côté serveur.");
  return new TextEncoder().encode(secret);
}

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

/* ──────────────────────── JWT helpers ──────────────────────── */

export async function signAccessToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_MAX_AGE}s`)
    .sign(getAccessSecret());
}

export async function signRefreshToken(payload: {
  userId: string;
  email: string;
  role: UserRole;
}): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_TOKEN_MAX_AGE}s`)
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getAccessSecret());
    return payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return payload as TokenPayload;
  } catch {
    return null;
  }
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

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE };
