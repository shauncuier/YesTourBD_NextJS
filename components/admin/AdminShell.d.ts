import * as React from 'react';
import type { AdminStaff } from './chrome';

export interface AdminShellProps {
  staff: AdminStaff;
  /** Server action posted by the sidebar's sign-out button. */
  signOutAction?: () => void | Promise<void>;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function AdminShell(props: AdminShellProps): React.JSX.Element;
