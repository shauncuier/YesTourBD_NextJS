import * as React from 'react';

export interface SelectOption { label: string; value: string; }
export interface SelectProps {
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  /** Use `light` for labels sitting on a navy/dark band. @default 'default' */
  labelColor?: 'default' | 'light';
  style?: React.CSSProperties;
  id?: string;
  /** Submitted as this key when the select sits inside a form. */
  name?: string;
}
export function Select(props: SelectProps): React.JSX.Element;
