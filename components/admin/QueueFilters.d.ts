import * as React from 'react';

export interface QueueFiltersProps {
  status: string;
  sort: string;
  search: string;
}

export function QueueFilters(props: QueueFiltersProps): React.JSX.Element;
