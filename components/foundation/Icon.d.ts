import * as React from 'react';

export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. `map-pin`, `bed-double`, `car-front`. */
  name: string;
  /** Rendered box in px. @default 20 */
  size?: number;
  /** Any CSS colour, including `var(--teal-600)`. Inherits the parent's colour when omitted. */
  color?: string;
  /** @default 2 */
  strokeWidth?: number;
  /** Fills the glyph with the current colour — used for active star ratings only. @default false */
  filled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}
export function Icon(props: IconProps): React.JSX.Element;
