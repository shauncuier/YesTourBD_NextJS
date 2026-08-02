import * as React from 'react';

export interface TooltipProps {
  /** Short hint text — a few words, no sentences. */
  label: React.ReactNode;
  /** @default 'top' */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** The trigger element. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tooltip(props: TooltipProps): React.JSX.Element;
