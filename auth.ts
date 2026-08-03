import { randomBytes } from 'node:crypto';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { hash, verify } from '@node-rs/argon2';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { isStaffRole } from '@/lib/staff-roles';

// Staff sign-in only. Customers will sign in by phone OTP (M2.1) — that is a second
// provider on this same config, not a second auth system.
//
// Sessions are JWTs rather than database rows: there is no session table to keep, and all a
// request needs to know is who you are and whether you are staff.

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

// Verifying against a throwaway hash when the account does not exist keeps a failed sign-in
// the same cost either way; skipping it would let an attacker learn which addresses are real
// from the response time alone. Built once per process, from bytes nobody holds.
let decoyHash: Promise<string> | undefined;
function getDecoyHash() {
  decoyHash ??= hash(randomBytes(32).toString('hex'));
  return decoyHash;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 },
  pages: { signIn: '/admin/login' },
  // Auth.js refuses to build callback URLs from a Host header it does not recognise, and
  // outside Vercel it recognises none — a production build otherwise fails every request
  // with UntrustedHost. Both deployment targets sit behind a proxy that sets Host itself
  // (Vercel, or nginx in front of a Node host), so the header is ours to trust. If this ever
  // runs somewhere the Host header is attacker-controlled, set AUTH_URL instead.
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          select: { id: true, name: true, email: true, role: true, passwordHash: true },
        });

        const passwordMatches = await verify(
          user?.passwordHash ?? (await getDecoyHash()),
          parsed.data.password,
        ).catch(() => false);

        // One indistinguishable failure for unknown address, wrong password, and customer
        // account. The sign-in page says nothing more specific either.
        if (!user?.passwordHash || !passwordMatches || !isStaffRole(user.role)) return null;

        await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.uid = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
