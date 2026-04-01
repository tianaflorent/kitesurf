import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/* ──────────────────────── Types ──────────────────────── */

export type UserRole = "ADMIN" | "MODERATOR";

export interface TokenPayload extends JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
}

/* ──────────────────────── Constants ──────────────────────── */

export const ACCESS_TOKEN_COOKIE = "admin_session";
export const REFRESH_TOKEN_COOKIE = "admin_refresh";

export const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 jours

/* ──────────────────────── Secrets ──────────────────────── */

export function getAccessSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET manquant côté serveur.");
  return new TextEncoder().encode(secret);
}

export function getRefreshSecret(): Uint8Array {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET manquant côté serveur.");
  return new TextEncoder().encode(secret);
}

/* ──────────────────────── JWT helpers (Edge Compatible) ──────────────────────── */

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
