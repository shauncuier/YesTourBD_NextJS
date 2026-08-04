import * as React from 'react';
import type { SupportState } from '@/app/(site)/contact/actions';

export function ContactScreen(props?: {
  action?: (previous: SupportState, formData: FormData) => Promise<SupportState>;
}): React.JSX.Element;
