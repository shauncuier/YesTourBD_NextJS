import * as React from 'react';
import type { SignInState } from '@/app/(site)/signin/actions';

type Action = (previous: SignInState, formData: FormData) => Promise<SignInState>;

export function SignInScreen(props?: {
  requestAction?: Action;
  verifyAction?: Action;
  /** Where to land after signing in. Must be a path on this site. */
  next?: string;
}): React.JSX.Element;
