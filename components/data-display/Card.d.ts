import * as React from 'react';

/** Surface container for listings, service tiles and dashboard panels. */
export interface CardProps {
  /** @default 'elevated' */
  variant?: 'elevated' | 'outline' | 'flat';
  /** @default 'md' */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Cover image URL — renders a full-bleed media slot above the body. */
  image?: string;
  imageAlt?: string;
  /** @default 180 */
  imageHeight?: number;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Overlaid on the image when `image` is set, otherwise above the title. */
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  /** Renders the card as an anchor. */
  href?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Card(props: CardProps): React.JSX.Element;
