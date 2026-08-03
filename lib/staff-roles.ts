// Pure helpers, deliberately free of imports: auth.ts, proxy.ts, the admin guards and the
// tests all need these, and only the first three can pull in next-auth.

export const STAFF_ROLES = ['staff', 'admin'] as const;

export function isStaffRole(role: string | undefined | null): boolean {
  return role === 'staff' || role === 'admin';
}

/** Initials for the sidebar avatar: "Sadia Rahman" → "SR". */
export function initialsOf(name: string | null | undefined): string {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? '').join('') || '??';
}
