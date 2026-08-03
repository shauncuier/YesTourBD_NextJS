import * as React from 'react';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
  /** Submitted as this key when the box sits inside a form. */
  name?: string;
  /** Value submitted when ticked. @default 'on' */
  value?: string;
}
export function Checkbox(props: CheckboxProps): React.JSX.Element;
