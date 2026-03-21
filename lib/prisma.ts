import { PrismaClient } from "./prisma-client/client";

/**
 * Singleton Prisma Client — pattern recommandé par Next.js pour éviter
 * de créer trop de connexions en mode développement (HMR).
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function withMongoTimeouts(url: string) {
  if (url.includes("serverSelectionTimeoutMS=") || url.includes("connectTimeoutMS=")) {
    return url;
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}serverSelectionTimeoutMS=5000&connectTimeoutMS=5000`;
}

const datasourceUrl = process.env.DATABASE_URL
  ? withMongoTimeouts(process.env.DATABASE_URL)
  : undefined;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: datasourceUrl ? { db: { url: datasourceUrl } } : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
