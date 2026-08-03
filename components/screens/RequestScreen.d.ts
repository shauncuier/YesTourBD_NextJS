import * as React from 'react';
import type { QuoteRequestState } from '@/app/(site)/request/actions';

export interface RequestScreenProps {
  /**
   * The server action the form posts to. A prop rather than an import so the screen can be
   * rendered without a server; defaults to a no-op that leaves the form idle.
   */
  action?: (previous: QuoteRequestState, formData: FormData) => Promise<QuoteRequestState>;
}

export function RequestScreen(props?: RequestScreenProps): React.JSX.Element;
