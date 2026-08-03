'use client';

import React from 'react';
import { Button, Icon } from '../index.js';
import c from './admin.module.css';

const IDLE = { status: 'idle' };

function ActionError({ state }) {
  if (state.status !== 'error') return null;
  return (
    <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'rgba(220,38,38,.06)', color: 'var(--color-danger)', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)' }}>
      <Icon name="alert-circle" size={16} />
      <span>{state.message}</span>
    </div>
  );
}

/**
 * The transitions this request may make, as buttons. The server re-checks every one — these
 * are what is *offered*, not what is *permitted*.
 */
export function StatusActions({ refId, current, options, action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);

  if (!options.length) {
    return (
      <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        {current} is final — nothing follows it.
      </p>
    );
  }

  return (
    <form action={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <input type="hidden" name="ref" value={refId} />
      <label htmlFor="transition-note" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--gray-700)' }}>
        Why (optional — goes on the record, not to the customer)
      </label>
      <textarea
        id="transition-note"
        name="note"
        rows={2}
        placeholder="Quoted ৳4,200 per head including transport."
        style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', padding: '9px 11px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical', background: 'var(--color-bg-surface)' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((option) => (
          <Button key={option.value} type="submit" name="to" value={option.value} size="sm" variant={option.primary ? 'primary' : 'outline'} disabled={pending}>
            {option.label}
          </Button>
        ))}
      </div>
      <ActionError state={state} />
    </form>
  );
}

export function AssignmentAction({ refId, assignedToMe, assigneeName, action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);

  return (
    <form action={submit} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
      <input type="hidden" name="ref" value={refId} />
      <input type="hidden" name="release" value={assignedToMe ? 'true' : 'false'} />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        {assigneeName ? `Owned by ${assigneeName}` : 'Nobody has claimed this'}
      </span>
      <Button type="submit" size="sm" variant={assignedToMe ? 'ghost' : 'outline'} disabled={pending}>
        {assignedToMe ? 'Release' : 'Assign to me'}
      </Button>
      <ActionError state={state} />
    </form>
  );
}

export function NoteForm({ refId, action = async () => IDLE }) {
  const [state, submit, pending] = React.useActionState(action, IDLE);
  const formRef = React.useRef(null);

  // Clear the box once the note has landed, so a second thought does not append to the first.
  React.useEffect(() => {
    if (state.status === 'idle' && formRef.current) formRef.current.reset();
  }, [state]);

  return (
    <form ref={formRef} action={submit} className={c.noteForm}>
      <input type="hidden" name="ref" value={refId} />
      <label htmlFor="internal-note" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Internal note</label>
      <textarea
        id="internal-note"
        name="body"
        rows={2}
        placeholder="Called, no answer. Trying WhatsApp this evening."
        style={{ flex: 1, minWidth: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', padding: '9px 11px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', resize: 'vertical', background: 'var(--color-bg-surface)' }}
      />
      <Button type="submit" variant="outline" disabled={pending}>{pending ? 'Saving…' : 'Add note'}</Button>
      <ActionError state={state} />
    </form>
  );
}
