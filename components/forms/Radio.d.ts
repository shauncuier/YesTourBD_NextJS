import * as React from 'react';

export interface RadioProps {
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
}
export function Radio(props: RadioProps): React.JSX.Element;
