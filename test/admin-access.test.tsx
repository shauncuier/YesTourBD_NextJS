import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initialsOf, isStaffRole } from '@/lib/staff-roles';
import { LoginForm } from '@/components/admin/LoginForm.jsx';
import type { SignInState } from '@/app/admin/login/actions';

describe('staff role check', () => {
  it('admits staff and admin, and nothing else', () => {
    expect(isStaffRole('staff')).toBe(true);
    expect(isStaffRole('admin')).toBe(true);
    // A signed-in customer is the case that matters: they hold a valid session.
    expect(isStaffRole('customer')).toBe(false);
    expect(isStaffRole(undefined)).toBe(false);
    expect(isStaffRole('')).toBe(false);
    expect(isStaffRole('Admin')).toBe(false);
  });
});

describe('staff initials', () => {
  it('takes the first two names, and copes with the awkward cases', () => {
    expect(initialsOf('Sadia Rahman')).toBe('SR');
    expect(initialsOf('  nusrat   jahan  chowdhury ')).toBe('NJ');
    expect(initialsOf('Rakib')).toBe('R');
    expect(initialsOf(null)).toBe('??');
    expect(initialsOf('')).toBe('??');
  });
});

describe('staff sign-in form', () => {
  function renderForm(result: SignInState = { status: 'idle' }, next = '/admin') {
    const action = vi.fn(async (_previous: SignInState, formData: FormData) => {
      void _previous;
      void formData;
      return result;
    });
    render(<LoginForm action={action} next={next} />);
    return action;
  }

  it('posts the credentials and the destination', async () => {
    const user = userEvent.setup();
    const action = renderForm({ status: 'idle' }, '/admin/requests');

    await user.type(screen.getByLabelText(/Work email/), 'ops@yestourbd.com');
    await user.type(screen.getByLabelText(/Password/), 'correct horse battery');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(action).toHaveBeenCalledOnce();
    expect(Object.fromEntries(action.mock.calls[0]![1].entries())).toEqual({
      email: 'ops@yestourbd.com',
      password: 'correct horse battery',
      next: '/admin/requests',
    });
  });

  it('shows a failure without saying which half was wrong', async () => {
    const user = userEvent.setup();
    renderForm({ status: 'invalid', message: 'That email and password do not match a staff account.' });

    // Both fields are `required`, so an empty form never reaches the action.
    await user.type(screen.getByLabelText(/Work email/), 'stranger@example.com');
    await user.type(screen.getByLabelText(/Password/), 'guessing');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('do not match a staff account');
    // Naming the account would tell a stranger which staff addresses exist.
    expect(alert.textContent).not.toMatch(/no such user|unknown email|wrong password/i);
  });
});
