// Seeds the twelve-service catalogue from the brief. The source of truth is still
// lib/site-data.js — the same array the front end rendered before there was a database — so
// seeded rows and existing UI ids cannot drift apart.
//
// Idempotent: upserts on slug, so running it twice changes nothing and re-running after an
// edit to site-data updates the row rather than duplicating it.
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';
import { SERVICES } from '../lib/site-data.js';

type SeedService = {
  id: string;
  icon: string;
  label: string;
  mode: 'instant' | 'request';
  blurb: string;
};

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set — copy .env.example to .env');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const services = SERVICES as SeedService[];

  for (const [sort, service] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: service.id },
      update: {
        name: service.label,
        icon: service.icon,
        mode: service.mode,
        summary: service.blurb,
        sort,
      },
      create: {
        slug: service.id,
        name: service.label,
        icon: service.icon,
        mode: service.mode,
        summary: service.blurb,
        sort,
      },
    });
  }

  const count = await prisma.service.count();
  console.log(`seeded ${services.length} services (${count} rows in table)`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
