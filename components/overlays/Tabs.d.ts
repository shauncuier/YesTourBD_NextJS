import * as React from 'react';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** Trailing count pill. */
  count?: number;
}
export interface TabsProps {
  items: TabItem[];
  /** Active tab id; falls back to the first item. */
  value?: string;
  onChange?: (id: string) => void;
  /** @default 'underline' */
  variant?: 'underline' | 'pill';
  /** @default false */
  fullWidth?: boolean;
  style?: React.CSSProperties;
}
export function Tabs(props: TabsProps): React.JSX.Element;
