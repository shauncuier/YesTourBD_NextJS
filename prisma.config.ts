// Prisma 7 configures itself from this file rather than from package.json. DATABASE_URL is
// not loaded automatically, hence the dotenv import.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env['DATABASE_URL'],
    // Only `prisma migrate dev` needs this: it replays the migration history into a scratch
    // database to check it still produces the current schema. `npx prisma dev` runs one on
    // its own port; Neon wants a second database on the project. Unset is fine everywhere
    // else, including CI, which only ever runs `migrate deploy`.
    shadowDatabaseUrl: process.env['SHADOW_DATABASE_URL'],
  },
});
