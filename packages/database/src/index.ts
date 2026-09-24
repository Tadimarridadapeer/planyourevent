import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

export * from '@prisma/client';

let globalPrisma: PrismaClient | undefined;

function ensureDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    if (process.env.VERCEL) {
      const tmpDb = '/tmp/dev.db';
      process.env.DATABASE_URL = `file:${tmpDb}`;
      try {
        if (!fs.existsSync(tmpDb)) {
          const seedDb = path.resolve(__dirname, '../prisma/seed-data.db');
          if (fs.existsSync(seedDb)) {
            fs.copyFileSync(seedDb, tmpDb);
          }
        }
      } catch (e) {
        console.error('Failed to copy seed database to /tmp:', e);
      }
    } else {
      process.env.DATABASE_URL = 'file:./dev.db';
    }
  } else if (process.env.VERCEL && process.env.DATABASE_URL.startsWith('file:')) {
    const dbPath = process.env.DATABASE_URL.replace('file:', '');
    try {
      if (!fs.existsSync(dbPath)) {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        const seedDb = path.resolve(__dirname, '../prisma/seed-data.db');
        if (fs.existsSync(seedDb)) {
          fs.copyFileSync(seedDb, dbPath);
        }
      }
    } catch (e) {
      console.error('Failed to initialize SQLite file on Vercel:', e);
    }
  }
}

export const getPrismaClient = (): PrismaClient => {
  ensureDatabaseUrl();
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  }
  if (!globalPrisma) {
    globalPrisma = new PrismaClient();
  }
  return globalPrisma;
};

export const prisma = getPrismaClient();
