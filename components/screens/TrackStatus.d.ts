import * as React from 'react';

export type DecisionState = { status: 'idle' } | { status: 'error'; message: string };
type Action = (previous: DecisionState, formData: FormData) => Promise<DecisionState>;

export interface TrackRequestView {
  ref: string;
  destinations: string;
  paxBand: string;
  submitted: string;
  statusLabel: string;
  statusBlurb: string;
}

export interface TrackQuotationView {
  status: string;
  lines: { description: string; quantity: number; unitPriceLabel: string; amountLabel: string }[];
  discountLabel: string | null;
  totalLabel: string;
  depositPercent: number;
  depositLabel: string;
  balanceLabel: string;
  validUntil: string;
  notes: string | null;
}

export function TrackStatus(props: {
  request: TrackRequestView;
  quotation: TrackQuotationView | null;
  acceptAction?: Action;
  changesAction?: Action;
}): React.JSX.Element;
