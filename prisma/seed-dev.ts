import 'dotenv/config';
import { hash } from '@node-rs/argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';

// Sample data for local work: staff to sign in as, customers, and a spread of quote requests
// old enough to exercise the queue's SLA colouring. Separate from prisma/seed.ts, which seeds
// the real service catalogue and is safe to run anywhere.
//
//   npm run db:seed:dev
//
// Everything it writes is tagged so `npm run db:seed:dev -- --clean` can take it back out.

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL as string }),
});

// Refuses to touch a production database. The flag is there for the day someone genuinely
// wants sample rows in staging, and makes that an explicit decision.
if (process.env.NODE_ENV === 'production' && process.env.ALLOW_DEV_SEED !== 'true') {
  console.error('Refusing to seed sample data with NODE_ENV=production (set ALLOW_DEV_SEED=true to override).');
  process.exit(1);
}

const DEV_PASSWORD = process.env.DEV_PASSWORD ?? 'devpassword1234';
const TAG = '[dev-seed]';

const STAFF = [
  { email: 'sadia@yestourbd.test', name: 'Sadia Rahman', phone: '01711000001', role: 'admin' as const },
  { email: 'rafi@yestourbd.test', name: 'Rafiul Karim', phone: '01711000002', role: 'staff' as const },
  { email: 'mim@yestourbd.test', name: 'Mim Chowdhury', phone: '01711000003', role: 'staff' as const },
];

const CUSTOMERS = [
  { email: 'nusrat@example.test', name: 'Nusrat Jahan', phone: '01811000001' },
  { email: 'tanvir@example.test', name: 'Tanvir Hasan', phone: '01811000002' },
  { email: 'farhana@example.test', name: 'Farhana Akter', phone: '01811000003' },
  { email: 'imran@example.test', name: 'Imran Hossain', phone: '01811000004' },
  { email: 'sumaiya@example.test', name: 'Sumaiya Islam', phone: '01811000005' },
];

const HOURS = 60 * 60 * 1000;
const ago = (hours: number) => new Date(Date.now() - hours * HOURS);

// Ages are chosen against the 09:00–22:00 Dhaka desk day: a few inside the two-hour promise,
// a few well past it, and answered ones that should not be flagged however old they are.
const REQUESTS = [
  { customer: 0, requestType: 'corporate' as const, destinations: 'Cox’s Bazar', paxBand: '25-49', nights: 2, budgetBand: '5k-15k', org: 'Beximco', needs: ['Need transport', 'Need hotel'], notes: 'Dealer meet, conference room for 40 on the second morning.', contactPref: 'whatsapp' as const, status: 'submitted' as const, hoursAgo: 1 },
  { customer: 1, requestType: 'group' as const, destinations: 'Sylhet + Sreemangal', paxBand: '10-24', nights: 3, budgetBand: 'under-5k', org: 'BUET Photography Club', needs: ['Need transport', 'Need meals'], notes: 'Student group, AC bus from Dhaka on Thursday night.', contactPref: 'call' as const, status: 'submitted' as const, hoursAgo: 30 },
  { customer: 2, requestType: 'visa' as const, destinations: 'Thailand', paxBand: '1-9', nights: null, budgetBand: null, org: null, needs: [], notes: 'Tourist visa for two, appointment help needed.', contactPref: 'email' as const, status: 'reviewing' as const, hoursAgo: 52 },
  { customer: 3, requestType: 'package' as const, destinations: 'Bandarban', paxBand: '1-9', nights: 4, budgetBand: '15k-plus', org: null, needs: ['Need hotel', 'Need guide'], notes: 'Honeymoon, quiet resort preferred.', contactPref: 'whatsapp' as const, status: 'quoted' as const, hoursAgo: 96 },
  { customer: 4, requestType: 'car' as const, destinations: 'Dhaka → Kuakata', paxBand: '1-9', nights: 2, budgetBand: '5k-15k', org: null, needs: ['Need transport'], notes: 'Microbus with driver, Friday to Sunday.', contactPref: 'call' as const, status: 'negotiating' as const, hoursAgo: 120 },
  { customer: 0, requestType: 'corporate' as const, destinations: 'Saint Martin', paxBand: '50+', nights: 3, budgetBand: '15k-plus', org: 'Grameenphone', needs: ['Need transport', 'Need hotel', 'Need event setup'], notes: 'Annual retreat, 60 people, ship tickets included.', contactPref: 'email' as const, status: 'accepted' as const, hoursAgo: 200 },
  { customer: 1, requestType: 'group' as const, destinations: 'Rangamati', paxBand: '25-49', nights: 2, budgetBand: 'under-5k', org: 'Notre Dame College', needs: ['Need meals'], notes: 'School trip; parents want a full itinerary first.', contactPref: 'whatsapp' as const, status: 'lost' as const, hoursAgo: 400 },
];

async function clean() {
  const requests = await prisma.quoteRequest.deleteMany({ where: { notes: { contains: TAG } } });
  const users = await prisma.user.deleteMany({ where: { email: { endsWith: '.test' } } });
  console.log(`removed ${requests.count} sample requests and ${users.count} sample users`);
}

async function seed() {
  const passwordHash = await hash(DEV_PASSWORD);

  for (const person of STAFF) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { name: person.name, role: person.role, passwordHash },
      create: { ...person, passwordHash },
    });
  }

  const customerIds: string[] = [];
  for (const person of CUSTOMERS) {
    const user = await prisma.user.upsert({
      where: { email: person.email },
      update: { name: person.name },
      create: { ...person, role: 'customer' },
      select: { id: true },
    });
    customerIds.push(user.id);
  }

  // Requests are keyed on the customer's phone so re-running updates rather than duplicates.
  for (const request of REQUESTS) {
    const customer = CUSTOMERS[request.customer]!;
    const existing = await prisma.quoteRequest.findFirst({
      where: { phone: customer.phone, destinations: request.destinations, notes: { contains: TAG } },
      select: { id: true },
    });

    const data = {
      userId: customerIds[request.customer]!,
      requestType: request.requestType,
      destinations: request.destinations,
      paxBand: request.paxBand,
      startDate: new Date(Date.now() + 21 * 24 * HOURS),
      nights: request.nights,
      budgetBand: request.budgetBand,
      org: request.org,
      needs: request.needs,
      notes: `${request.notes} ${TAG}`,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      contactPref: request.contactPref,
      status: request.status,
      createdAt: ago(request.hoursAgo),
    };

    if (existing) await prisma.quoteRequest.update({ where: { id: existing.id }, data });
    else await prisma.quoteRequest.create({ data });
  }

  const overdue = REQUESTS.filter((r) => ['submitted', 'reviewing'].includes(r.status) && r.hoursAgo > 12).length;
  console.log(`seeded ${STAFF.length} staff, ${CUSTOMERS.length} customers, ${REQUESTS.length} quote requests`);
  console.log(`  ${overdue} of them should show as past the two-hour reply`);
  console.log(`  sign in as ${STAFF[0]!.email} / ${DEV_PASSWORD}`);
  console.log('  every sample address ends in .test — `npm run db:seed:dev -- --clean` removes them');
}

const run = process.argv.includes('--clean') ? clean : seed;

run()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
