import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function withDbFallback<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.warn("Database unavailable, using fallback content:", error);
    return fallback;
  }
}
