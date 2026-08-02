import * as React from 'react';

export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  /** Supporting line under the title. */
  description?: React.ReactNode;
  /** @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** @default true */
  showClose?: boolean;
  /** Fired by the close button, the scrim and Escape. */
  onClose?: () => void;
  /** Right-aligned action row on a sunken footer bar. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Dialog(props: DialogProps): React.JSX.Element | null;
