import * as React from 'react';

export interface AdminStaff {
  name: string;
  role: string;
  initials: string;
}

export interface AdminSidebarProps {
  staff: AdminStaff;
  open?: boolean;
  onClose?: () => void;
  /** Server action; posted by the sign-out button's form. */
  signOutAction?: () => void | Promise<void>;
}
export function AdminSidebar(props: AdminSidebarProps): React.JSX.Element;

export interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onOpenMenu?: () => void;
}
export function AdminTopBar(props: AdminTopBarProps): React.JSX.Element;

export interface StatCardProps {
  icon: string;
  label: string;
  value: React.ReactNode;
  delta?: string;
  /** @default 'teal' */
  tone?: 'teal' | 'gold' | 'navy';
}
export function StatCard(props: StatCardProps): React.JSX.Element;

export interface PanelProps {
  title: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  padding?: string;
}
export function Panel(props: PanelProps): React.JSX.Element;

export const TH: React.CSSProperties;
export const TD: React.CSSProperties;
export const STATUS_TONE: Record<string, string>;
