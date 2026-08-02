import * as React from 'react';

export interface IconButtonProps {
  icon: React.ReactNode;
  /** @default 'ghost' */
  variant?: 'solid' | 'outline' | 'ghost';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  /** Required for accessibility since there is no visible label. */
  'aria-label': string;
  style?: React.CSSProperties;
}
export function IconButton(props: IconButtonProps): React.JSX.Element;
