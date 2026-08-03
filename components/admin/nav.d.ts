export interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  count?: number;
}

export interface AdminNavGroup {
  title: string;
  items: AdminNavItem[];
}

export const NAV_GROUPS: AdminNavGroup[];
