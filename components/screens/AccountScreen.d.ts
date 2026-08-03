import * as React from 'react';
import type { AccountProfile, AccountRequestView } from '@/lib/account';
import type { ProfileState } from '@/app/(site)/account/actions';

export interface AccountScreenProps {
  /** The signed-in customer. Null renders the design system's placeholder identity. */
  profile?: AccountProfile | null;
  /** Their own requests. Null means "not wired to data", which is not the same as none. */
  requests?: AccountRequestView[] | null;
  /** Server action for the profile form. Omitted renders the read-only placeholder. */
  saveAction?: (previous: ProfileState, formData: FormData) => Promise<ProfileState>;
}

export function AccountScreen(props?: AccountScreenProps): React.JSX.Element;
