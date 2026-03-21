import { PrismaClient } from "./prisma-client/client";

/**
 * Singleton Prisma Client — pattern recommandé par Next.js pour éviter
 * de créer trop de connexions en mode développement (HMR).
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
