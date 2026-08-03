import * as React from 'react';
import type { AccountProfile, AccountRequestView } from '@/lib/account';

export interface AccountScreenProps {
  /** The signed-in customer. Null renders the design system's placeholder identity. */
  profile?: AccountProfile | null;
  /** Their own requests. Null means "not wired to data", which is not the same as none. */
  requests?: AccountRequestView[] | null;
}

export function AccountScreen(props?: AccountScreenProps): React.JSX.Element;
