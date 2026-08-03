import * as React from 'react';

export interface ButtonProps {
  /** @default 'primary' */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Stretches to fill its container. @default false */
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** @default 'button' */
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** Submitted with the form when this button is the one that submitted it. */
  name?: string;
  value?: string;
}
export function Button(props: ButtonProps): React.JSX.Element;
