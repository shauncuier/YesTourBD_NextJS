import * as React from 'react';

export type RequestActionState = { status: 'idle' } | { status: 'error'; message: string };

type Action = (previous: RequestActionState, formData: FormData) => Promise<RequestActionState>;

export interface StatusOption {
  value: string;
  label: string;
  /** Renders as the filled button — the step a coordinator most likely wants next. */
  primary?: boolean;
}

export function StatusActions(props: {
  refId: string;
  current: string;
  options: StatusOption[];
  action?: Action;
}): React.JSX.Element;

export function AssignmentAction(props: {
  refId: string;
  assignedToMe: boolean;
  assigneeName: string | null;
  action?: Action;
}): React.JSX.Element;

export function NoteForm(props: { refId: string; action?: Action }): React.JSX.Element;
