import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

// Prisma 7 talks to Postgres through a driver adapter rather than its own engine binary.
const createClient = () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set — copy .env.example to .env');

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
};

// One client per process. Next's dev server re-evaluates modules on every edit, and a fresh
// client each time exhausts the database's connection limit within a few saves — so in
// development the instance is parked on globalThis and reused.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
