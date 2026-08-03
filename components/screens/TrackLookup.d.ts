import * as React from 'react';

export type LookupState = { status: 'idle' } | { status: 'error'; message: string };

export function TrackLookup(props?: {
  action?: (previous: LookupState, formData: FormData) => Promise<LookupState>;
}): React.JSX.Element;
