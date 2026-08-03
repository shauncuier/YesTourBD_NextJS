import * as React from 'react';

export type QuotationState =
  | { status: 'idle' }
  | { status: 'sent'; total: number }
  | { status: 'invalid'; problems: { field: string; message: string }[] }
  | { status: 'error'; message: string };

export interface QuotationBuilderProps {
  refId: string;
  /** ISO date (yyyy-mm-dd) prefilled into "Valid until". */
  defaultValidUntil: string;
  action?: (previous: QuotationState, formData: FormData) => Promise<QuotationState>;
}

export function QuotationBuilder(props: QuotationBuilderProps): React.JSX.Element;
