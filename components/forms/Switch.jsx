'use client';

import React from 'react';

/** On/off toggle — instant preferences, notification settings, availability flags. */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label, style, id }) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const switchId = id || reactId;
  // `htmlFor` only names labelable form elements, and this switch is a <span role="switch">
  // — so the wrapping <label> gives it no accessible name at all. Point at the label text
  // explicitly instead.
  const labelId = `${switchId}-label`;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!isOn);
    if (onChange) onChange({ target: { checked: !isOn } }, !isOn);
  };
  return (
    <label htmlFor={switchId} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)', ...style }}>
      <span
        id={switchId} role="switch" aria-checked={isOn} aria-disabled={disabled || undefined}
        aria-labelledby={label ? labelId : undefined} tabIndex={disabled ? -1 : 0}
        onClick={toggle} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          position: 'relative', width: 40, height: 24, borderRadius: 'var(--radius-full)', flex: '0 0 auto',
          background: isOn ? 'var(--color-brand-secondary)' : 'var(--gray-300)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none', transition: `background var(--duration-fast) var(--ease-standard)`,
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: isOn ? 19 : 3, width: 18, height: 18, borderRadius: 'var(--radius-full)',
          background: '#fff', boxShadow: 'var(--shadow-sm)', transition: `left var(--duration-fast) var(--ease-standard)`,
        }} />
      </span>
      {label && <span id={labelId} style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>{label}</span>}
    </label>
  );
}
