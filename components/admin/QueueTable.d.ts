import * as React from 'react';

export interface QueueTableRow {
  id: string;
  ref: string;
  name: string;
  phone: string;
  requestType: string;
  paxBand: string | null;
  destinations: string | null;
  /** ISO date string, or null when the customer gave no start date. */
  startDate: string | null;
  nights: number | null;
  status: string;
  /** Preformatted desk-hours age, e.g. "3h 12m". */
  waiting: string;
  overdue: boolean;
  /** Name of the coordinator who claimed it, or null when nobody has. */
  assignee: string | null;
}

export function QueueTable(props: { rows: QueueTableRow[] }): React.JSX.Element;
