import * as React from 'react';

export interface TagProps {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  /** Filled navy state for an applied filter. @default false */
  selected?: boolean;
  /** Shows a trailing dismiss button. @default false */
  removable?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): React.JSX.Element;
