import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

let globalPrisma: PrismaClient | undefined;

export const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  }
  if (!globalPrisma) {
    globalPrisma = new PrismaClient();
  }
  return globalPrisma;
};

export const prisma = getPrismaClient();
