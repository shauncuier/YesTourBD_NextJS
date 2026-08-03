import 'dotenv/config';
import { hash } from '@node-rs/argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

// Creates or updates a staff account. Credentials come from the environment, never from a
// committed file — a seeded default password is a published one.
//
//   STAFF_EMAIL=ops@yestourbd.com STAFF_PASSWORD='…' STAFF_NAME='Sadia Rahman' \
//   STAFF_PHONE=01712345678 npm run staff:create
//
// Re-running with the same email resets that account's password, which is the recovery path
// until there is a real one.

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set — copy .env.example to .env');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  const email = process.env.STAFF_EMAIL?.trim().toLowerCase();
  const password = process.env.STAFF_PASSWORD;
  const name = process.env.STAFF_NAME?.trim() || 'Staff';
  const phone = process.env.STAFF_PHONE?.trim();
  const role = process.env.STAFF_ROLE === 'admin' ? 'admin' : 'staff';

  if (!email || !password) throw new Error('STAFF_EMAIL and STAFF_PASSWORD are both required');
  if (password.length < 12) throw new Error('Use a password of at least 12 characters');
  if (!phone) throw new Error('STAFF_PHONE is required — phone is the identity column');

  const passwordHash = await hash(password);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role, name },
    create: { email, phone, name, role, passwordHash },
    select: { id: true, email: true, role: true },
  });

  console.log(`${user.email} is now ${user.role} (${user.id})`);
}

main()
  .catch((error) => {
    console.error(String(error instanceof Error ? error.message : error));
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
