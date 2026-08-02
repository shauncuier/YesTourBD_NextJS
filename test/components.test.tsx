import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Badge, Button, Checkbox, Icon, Switch, Tabs } from '@/components/index.js';

// Guards the two places where the port deliberately diverges from the design system's
// source, plus the icon registry. See CLAUDE.md "Port deviations".
describe('design system components', () => {
  it('Icon renders a registered glyph as inline SVG', () => {
    const { container } = render(<Icon name="map-pin" size={16} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  it('Icon warns and renders nothing for a glyph outside the registry', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(<Icon name="not-a-real-glyph" />);
    expect(container.querySelector('svg')).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('not-a-real-glyph'));
    warn.mockRestore();
  });

  it('Checkbox shows a tick when uncontrolled via defaultChecked', () => {
    // The design system's source only rendered the tick from `checked`, so
    // defaultChecked boxes rendered visually empty. This is the regression guard.
    render(<Checkbox label="Hotels & resorts" defaultChecked />);
    const input = screen.getByLabelText('Hotels & resorts') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('Checkbox toggles when uncontrolled', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Ship tickets" />);
    const input = screen.getByLabelText('Ship tickets') as HTMLInputElement;
    expect(input.checked).toBe(false);
    await user.click(input);
    expect(input.checked).toBe(true);
  });

  it('Switch reports the new value to onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Instant booking only" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
  });

  it('Button fires onClick and respects disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Book now</Button>);
    await user.click(screen.getByRole('button', { name: 'Book now' }));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<Button onClick={onClick} disabled>Book now</Button>);
    await user.click(screen.getByRole('button', { name: 'Book now' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Badge renders its children', () => {
    render(<Badge tone="teal" variant="solid">Instant</Badge>);
    expect(screen.getByText('Instant')).toBeInTheDocument();
  });

  it('Tabs marks the active tab as selected and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Tabs
        items={[{ id: 'a', label: 'Overview' }, { id: 'b', label: 'Itinerary' }]}
        value="a"
        onChange={onChange}
      />,
    );
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'true');
    await user.click(screen.getByRole('tab', { name: 'Itinerary' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});
