import * as React from 'react';

export interface BadgeProps {
  /** @default 'neutral' */
  tone?: 'neutral' | 'brand' | 'teal' | 'success' | 'warning' | 'danger' | 'gold';
  /** @default 'soft' */
  variant?: 'solid' | 'soft' | 'outline';
  /** @default 'sm' */
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  /** Leading status dot in the current text colour. @default false */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): React.JSX.Element;
