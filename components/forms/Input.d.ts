import * as React from 'react';

export interface InputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  /** Error message — shown in place of helperText and switches the border red. */
  error?: string;
  disabled?: boolean;
  /** @default 'text' */
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft?: React.ReactNode;
  required?: boolean;
  /** Use `light` for labels sitting on a navy/dark band. @default 'default' */
  labelColor?: 'default' | 'light';
  style?: React.CSSProperties;
  id?: string;
  /** Submitted as this key when the input sits inside a form. */
  name?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}
export function Input(props: InputProps): React.JSX.Element;
