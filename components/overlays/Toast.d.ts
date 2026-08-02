import * as React from 'react';

export interface ToastProps {
  /** @default 'info' */
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  message?: React.ReactNode;
  /** Leading glyph, tinted to the tone colour. */
  icon?: React.ReactNode;
  /** Optional inline action (usually a ghost/sm Button). */
  action?: React.ReactNode;
  /** Omit to render a non-dismissable toast. */
  onClose?: () => void;
  style?: React.CSSProperties;
}
export function Toast(props: ToastProps): React.JSX.Element;
