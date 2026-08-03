import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

// Local-only: reads back the most recent code sent to a number. Only ever finds anything on
// the console transport — with a real gateway the body is stored redacted.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }),
});

async function main() {
  const to = process.argv[2] as string;
  if (process.argv[3] === '--count-users') {
    console.log(await prisma.user.count({ where: { phone: to } }));
    return;
  }
  const row = await prisma.smsMessage.findFirst({ where: { to }, orderBy: { createdAt: 'desc' } });
  console.log(row?.body?.match(/\d{6}/)?.[0] ?? 'none');
}

main().finally(() => prisma.$disconnect());
