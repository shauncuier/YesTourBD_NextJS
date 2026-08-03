import * as React from 'react';
import type { SignInState } from '@/app/admin/login/actions';

export interface LoginFormProps {
  /** Server action; a prop so the form renders in a test without a server. */
  action?: (previous: SignInState, formData: FormData) => Promise<SignInState>;
  /** Where to land after a successful sign-in. Must be an /admin path. */
  next?: string;
}

export function LoginForm(props?: LoginFormProps): React.JSX.Element;
