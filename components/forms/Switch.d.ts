import * as React from 'react';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (e: { target: { checked: boolean } }, checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: React.CSSProperties;
  id?: string;
}
export function Switch(props: SwitchProps & {
  /** Submits the switch's state as this key when it sits inside a form. */
  name?: string;
}): React.JSX.Element;
