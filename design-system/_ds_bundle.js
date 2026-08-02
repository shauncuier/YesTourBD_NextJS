/* @ds-bundle: {"format":4,"namespace":"YesTourBDDesignSystem_fa3831","components":[{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Tag","sourcePath":"components/data-display/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Icon","sourcePath":"components/foundation/Icon.jsx"},{"name":"Dialog","sourcePath":"components/overlays/Dialog.jsx"},{"name":"Tabs","sourcePath":"components/overlays/Tabs.jsx"},{"name":"Toast","sourcePath":"components/overlays/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip.jsx"}],"sourceHashes":{"components/data-display/Badge.jsx":"97f3135672a2","components/data-display/Card.jsx":"7fea48ee4f2e","components/data-display/Tag.jsx":"2276a4b671a8","components/forms/Button.jsx":"7859ba87b347","components/forms/Checkbox.jsx":"d60090897037","components/forms/IconButton.jsx":"e3d65cf8ea11","components/forms/Input.jsx":"ef637edd1f91","components/forms/Radio.jsx":"d3306af9b8f8","components/forms/Select.jsx":"e8bca8609b69","components/forms/Switch.jsx":"46a071cb9fa1","components/foundation/Icon.jsx":"02848d312baa","components/overlays/Dialog.jsx":"0fd60841f985","components/overlays/Tabs.jsx":"3f92b340b7e7","components/overlays/Toast.jsx":"b8eb69bd6cad","components/overlays/Tooltip.jsx":"a477008ee167","ui_kits/admin/BookingsScreen.jsx":"d1421c04073f","ui_kits/admin/DashboardScreen.jsx":"f62a30db0b70","ui_kits/admin/RequestsScreen.jsx":"a27ffd34b8d1","ui_kits/admin/ServicesScreen.jsx":"0aaa89b94d8c","ui_kits/admin/admin-chrome.jsx":"719c4d7b7cfd","ui_kits/admin/admin-data.js":"be6b66879089","ui_kits/website/AccountScreen.jsx":"d4bfafd88ff3","ui_kits/website/DetailScreen.jsx":"96dfb564e511","ui_kits/website/HomeScreen.jsx":"2ef05b491769","ui_kits/website/RequestScreen.jsx":"53f4c79e712d","ui_kits/website/SearchScreen.jsx":"5ae1f8defeda","ui_kits/website/site-chrome.jsx":"84f2da41b09b","ui_kits/website/site-data.js":"128a3b3ddd69"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.YesTourBDDesignSystem_fa3831 = window.YesTourBDDesignSystem_fa3831 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    solid: ['var(--gray-700)', '#fff'],
    soft: ['var(--gray-100)', 'var(--gray-700)'],
    border: 'var(--gray-300)'
  },
  brand: {
    solid: ['var(--color-brand-primary)', '#fff'],
    soft: ['var(--navy-50)', 'var(--navy-700)'],
    border: 'var(--navy-200)'
  },
  teal: {
    solid: ['var(--color-brand-secondary)', '#fff'],
    soft: ['var(--teal-50)', 'var(--teal-700)'],
    border: 'var(--teal-200)'
  },
  success: {
    solid: ['var(--color-success)', '#fff'],
    soft: ['var(--color-success-bg)', 'var(--teal-800)'],
    border: 'var(--teal-200)'
  },
  warning: {
    solid: ['var(--color-warning)', '#fff'],
    soft: ['var(--color-warning-bg)', 'var(--gold-700)'],
    border: 'var(--gold-300)'
  },
  danger: {
    solid: ['var(--color-danger)', '#fff'],
    soft: ['var(--color-danger-bg)', 'var(--red-700)'],
    border: 'var(--red-100)'
  },
  gold: {
    solid: ['var(--color-accent-gold)', '#fff'],
    soft: ['var(--gold-100)', 'var(--gold-700)'],
    border: 'var(--gold-300)'
  }
};
const SIZES = {
  sm: {
    fontSize: 'var(--text-xs)',
    padding: '2px 8px',
    gap: 4
  },
  md: {
    fontSize: 'var(--text-sm)',
    padding: '4px 10px',
    gap: 5
  }
};

/** Small status / metadata label — booking state, promo flags, availability. */
function Badge({
  tone = 'neutral',
  variant = 'soft',
  size = 'sm',
  icon,
  dot = false,
  children,
  style
}) {
  const t = TONES[tone] || TONES.neutral;
  const s = SIZES[size] || SIZES.sm;
  const look = variant === 'solid' ? {
    background: t.solid[0],
    color: t.solid[1],
    border: '1px solid transparent'
  } : variant === 'outline' ? {
    background: 'transparent',
    color: t.soft[1],
    border: `1px solid ${t.border}`
  } : {
    background: t.soft[0],
    color: t.soft[1],
    border: '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontFamily: 'var(--font-body)',
      fontSize: s.fontSize,
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1.4,
      borderRadius: 'var(--radius-full)',
      whiteSpace: 'nowrap',
      letterSpacing: 'var(--tracking-wide)',
      ...look,
      ...style
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor',
      flex: '0 0 auto'
    }
  }) : null, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
const PADS = {
  none: 0,
  sm: 'var(--space-4)',
  md: 'var(--space-5)',
  lg: 'var(--space-6)'
};

/** Surface container for listings, service tiles, dashboard panels. */
function Card({
  variant = 'elevated',
  padding = 'md',
  image,
  imageAlt = '',
  imageHeight = 180,
  title,
  subtitle,
  badge,
  footer,
  onClick,
  href,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = Boolean(onClick || href);
  const base = {
    elevated: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      boxShadow: hover && interactive ? 'var(--shadow-lg)' : 'var(--shadow-sm)'
    },
    outline: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-strong)',
      boxShadow: 'none'
    },
    flat: {
      background: 'var(--color-bg-sunken)',
      border: '1px solid transparent',
      boxShadow: 'none'
    }
  }[variant] || {};
  const Tag = href ? 'a' : 'div';
  const pad = PADS[padding] ?? PADS.md;
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg)',
      textDecoration: 'none',
      color: 'inherit',
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box',
      cursor: interactive ? 'pointer' : 'default',
      transform: hover && interactive ? 'translateY(-2px)' : 'none',
      transition: 'transform var(--duration-normal) var(--ease-standard), box-shadow var(--duration-normal) var(--ease-standard)',
      ...base,
      ...style
    }
  }, image ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: imageHeight,
      flex: '0 0 auto',
      overflow: 'hidden',
      background: 'var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transform: hover && interactive ? 'scale(1.04)' : 'none',
      transition: 'transform var(--duration-slow) var(--ease-out)'
    }
  }), badge ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'var(--space-3)',
      left: 'var(--space-3)'
    }
  }, badge) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      padding: pad,
      flex: 1
    }
  }, !image && badge ? /*#__PURE__*/React.createElement("div", null, badge) : null, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-md)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, subtitle) : null, children), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: pad,
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--color-border)',
      marginTop: 'auto'
    }
  }, footer) : null);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Tag.jsx
try { (() => {
/** Interactive chip — filters, selected facets, removable inputs. */
function Tag({
  label,
  icon,
  selected = false,
  removable = false,
  onClick,
  onRemove,
  disabled = false,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const content = children ?? label;
  const interactive = Boolean(onClick) && !disabled;
  return /*#__PURE__*/React.createElement("span", {
    onClick: interactive ? onClick : undefined,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '6px 12px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      borderRadius: 'var(--radius-full)',
      boxSizing: 'border-box',
      userSelect: 'none',
      cursor: interactive ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      transition: 'all var(--duration-fast) var(--ease-standard)',
      background: selected ? 'var(--navy-800)' : hover && interactive ? 'var(--gray-100)' : 'var(--color-bg-surface)',
      color: selected ? 'var(--color-text-inverse)' : 'var(--color-text-primary)',
      border: `1px solid ${selected ? 'var(--navy-800)' : 'var(--color-border-strong)'}`,
      ...style
    }
  }, icon, content, removable ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove && onRemove(e);
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 16,
      height: 16,
      marginLeft: 2,
      marginRight: -4,
      padding: 0,
      border: 'none',
      borderRadius: '50%',
      background: selected ? 'rgba(255,255,255,.2)' : 'var(--gray-200)',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: 11,
      lineHeight: 1,
      fontFamily: 'var(--font-body)'
    }
  }, "\u2715") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
const SIZES = {
  sm: {
    padding: '6px 14px',
    fontSize: 'var(--text-sm)',
    gap: 6,
    height: 34
  },
  md: {
    padding: '10px 18px',
    fontSize: 'var(--text-base)',
    gap: 8,
    height: 44
  },
  lg: {
    padding: '13px 24px',
    fontSize: 'var(--text-md)',
    gap: 8,
    height: 52
  }
};
function variantStyle(variant, {
  hover,
  active
}) {
  switch (variant) {
    case 'secondary':
      return {
        background: active ? 'var(--teal-700)' : hover ? 'var(--color-brand-secondary-hover)' : 'var(--color-brand-secondary)',
        color: 'var(--color-text-inverse)',
        border: '1px solid transparent'
      };
    case 'outline':
      return {
        background: active ? 'var(--navy-100)' : hover ? 'var(--navy-50)' : 'transparent',
        color: 'var(--color-brand-primary)',
        border: '1px solid var(--color-border-strong)'
      };
    case 'ghost':
      return {
        background: active ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent',
        color: 'var(--color-brand-primary)',
        border: '1px solid transparent'
      };
    case 'danger':
      return {
        background: active ? 'var(--red-700)' : hover ? 'var(--red-600)' : 'var(--color-danger)',
        color: '#fff',
        border: '1px solid transparent'
      };
    default:
      return {
        background: active ? 'var(--navy-950)' : hover ? 'var(--color-brand-primary-hover)' : 'var(--color-brand-primary)',
        color: 'var(--color-text-inverse)',
        border: '1px solid transparent'
      };
  }
}

/** Primary interactive control — CTAs, form submits, toolbar actions. */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  type = 'button',
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const vs = variantStyle(variant, {
    hover,
    active
  });
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: fullWidth ? '100%' : 'auto',
      gap: s.gap,
      padding: s.padding,
      fontSize: s.fontSize,
      height: s.height,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--weight-semibold)',
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: `all var(--duration-fast) var(--ease-standard)`,
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      boxSizing: 'border-box',
      ...vs,
      ...style
    }
  }, iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};
function variantStyle(variant, {
  hover,
  active
}) {
  switch (variant) {
    case 'outline':
      return {
        background: active ? 'var(--navy-100)' : hover ? 'var(--navy-50)' : 'transparent',
        color: 'var(--color-brand-primary)',
        border: '1px solid var(--color-border-strong)'
      };
    case 'solid':
      return {
        background: active ? 'var(--navy-950)' : hover ? 'var(--color-brand-primary-hover)' : 'var(--color-brand-primary)',
        color: '#fff',
        border: '1px solid transparent'
      };
    default:
      return {
        background: active ? 'var(--gray-200)' : hover ? 'var(--gray-100)' : 'transparent',
        color: 'var(--color-text-secondary)',
        border: '1px solid transparent'
      };
  }
}

/** Icon-only button — pair with an accessible `aria-label`. */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const dim = SIZES[size] || SIZES.md;
  const vs = variantStyle(variant, {
    hover,
    active
  });
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: `all var(--duration-fast) var(--ease-standard)`,
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      boxSizing: 'border-box',
      padding: 0,
      ...vs,
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
/** Single-line text input with label, helper text, error state, and optional icon. */
function Input({
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  type = 'text',
  value,
  defaultValue,
  onChange,
  iconLeft,
  required = false,
  labelColor = 'default',
  style,
  id
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId?.() || label;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%',
      boxSizing: 'border-box',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: labelColor === 'light' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-danger)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      display: 'flex',
      color: 'var(--color-text-muted)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", {
    id: inputId,
    type: type,
    placeholder: placeholder,
    disabled: disabled,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      padding: iconLeft ? '10px 12px 10px 38px' : '10px 12px',
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)',
      background: disabled ? 'var(--color-bg-sunken)' : 'var(--color-bg-surface)',
      border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--teal-500)' : 'var(--color-border)'}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: `all var(--duration-fast) var(--ease-standard)`
    }
  })), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--color-danger)' : 'var(--color-text-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio button with label — single choice within a group (seat class, payment method). */
function Radio({
  label,
  checked,
  onChange,
  name,
  value,
  disabled = false,
  style,
  id
}) {
  const [focus, setFocus] = React.useState(false);
  const radioId = id || `${name}-${value}`;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: radioId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: 20,
      height: 20,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: radioId,
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${checked ? 'var(--color-brand-secondary)' : 'var(--color-border-strong)'}`,
      background: 'var(--color-bg-surface)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: `all var(--duration-fast) var(--ease-standard)`
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 'var(--radius-full)',
      background: 'var(--color-brand-secondary)'
    }
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** On/off toggle — instant preferences, notification settings, availability flags. */
function Switch({
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  label,
  style,
  id
}) {
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internal;
  const [focus, setFocus] = React.useState(false);
  const switchId = id || label;
  const toggle = e => {
    if (disabled) return;
    if (!isControlled) setInternal(!isOn);
    onChange && onChange({
      target: {
        checked: !isOn
      }
    }, !isOn);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: switchId,
    role: "switch",
    "aria-checked": isOn,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(e);
      }
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'relative',
      width: 40,
      height: 24,
      borderRadius: 'var(--radius-full)',
      flex: '0 0 auto',
      background: isOn ? 'var(--color-brand-secondary)' : 'var(--gray-300)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: `background var(--duration-fast) var(--ease-standard)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: isOn ? 19 : 3,
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)',
      transition: `left var(--duration-fast) var(--ease-standard)`
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/foundation/Icon.jsx
try { (() => {
// Newer lucide UMD builds renamed several icons; keep the familiar names working.
const ALIASES = {
  CheckCircle: 'CircleCheck',
  AlertCircle: 'CircleAlert',
  XCircle: 'CircleX',
  PlusCircle: 'CirclePlus',
  MinusCircle: 'CircleMinus',
  HelpCircle: 'CircleHelp',
  MoreHorizontal: 'Ellipsis',
  MoreVertical: 'EllipsisVertical'
};
function lookup(name) {
  const L = window.lucide;
  if (!L || !L.icons || !name) return null;
  const pascal = String(name).replace(/(^[a-z]|-[a-z0-9])/g, m => m.replace('-', '').toUpperCase());
  return L.icons[pascal] || (ALIASES[pascal] ? L.icons[ALIASES[pascal]] : null) || L.icons[name] || null;
}
function attrs(a) {
  return Object.keys(a || {}).map(k => k + '="' + String(a[k]).replace(/"/g, '&quot;') + '"').join(' ');
}
function nodeToString(node) {
  if (!Array.isArray(node)) return '';
  const tag = node[0];
  const kids = Array.isArray(node[2]) ? node[2].map(nodeToString).join('') : '';
  return '<' + tag + ' ' + attrs(node[1]) + '>' + kids + '</' + tag + '>';
}
function toSvg(icon, size, strokeWidth, filled) {
  if (!icon) return '';
  const fill = filled ? 'currentColor' : 'none';
  if (typeof icon.toSvg === 'function') {
    return icon.toSvg({
      width: size,
      height: size,
      stroke: 'currentColor',
      fill,
      'stroke-width': strokeWidth
    });
  }
  const children = Array.isArray(icon) && icon[0] === 'svg' ? icon[2] || [] : icon;
  const body = (children || []).map(nodeToString).join('');
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 24 24"' + ' fill="' + fill + '" stroke="currentColor" stroke-width="' + strokeWidth + '"' + ' stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
}

/**
 * Thin wrapper around the Lucide icon set (loaded from CDN — see Icon.prompt.md).
 * Colour is applied to the wrapper as CSS `color`, so `var(--…)` tokens work;
 * the SVG itself always strokes `currentColor`.
 */
function Icon({
  name,
  size = 20,
  color,
  strokeWidth = 2,
  filled = false,
  style,
  className
}) {
  const [, bump] = React.useState(0);
  React.useEffect(() => {
    if (window.lucide && window.lucide.icons) return undefined;
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      if (window.lucide && window.lucide.icons || n > 60) {
        clearInterval(t);
        bump(v => v + 1);
      }
    }, 50);
    return () => clearInterval(t);
  }, []);
  const svg = toSvg(lookup(name), size, strokeWidth, filled);
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    "aria-hidden": "true",
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      flex: '0 0 auto',
      lineHeight: 0,
      color,
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: svg
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/foundation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox with label — trip add-ons, terms acceptance, filter facets. */
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  style,
  id
}) {
  const [focus, setFocus] = React.useState(false);
  const boxId = id || label;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: 20,
      height: 20,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("input", {
    id: boxId,
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0,
      margin: 0,
      cursor: 'inherit'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: `1px solid ${checked ? 'var(--color-brand-secondary)' : 'var(--color-border-strong)'}`,
      background: checked ? 'var(--color-brand-secondary)' : 'var(--color-bg-surface)',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: `all var(--duration-fast) var(--ease-standard)`
    }
  }, checked && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    color: "#fff",
    strokeWidth: 3
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/** Native styled select — dropdowns for city, service type, sort order, passenger count. */
function Select({
  label,
  helperText,
  error,
  disabled = false,
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder,
  required = false,
  labelColor = 'default',
  style,
  id
}) {
  const [focus, setFocus] = React.useState(false);
  const selectId = id || label;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      width: '100%',
      boxSizing: 'border-box',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selectId,
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: labelColor === 'light' ? 'var(--color-text-inverse)' : 'var(--color-text-primary)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-danger)'
    }
  }, " *")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selectId,
    disabled: disabled,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      appearance: 'none',
      fontFamily: 'var(--font-body)',
      padding: '10px 38px 10px 12px',
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)',
      background: disabled ? 'var(--color-bg-sunken)' : 'var(--color-bg-surface)',
      border: `1px solid ${error ? 'var(--color-danger)' : focus ? 'var(--teal-500)' : 'var(--color-border)'}`,
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: focus ? 'var(--shadow-focus)' : 'none',
      transition: `all var(--duration-fast) var(--ease-standard)`
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: required
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      display: 'flex',
      pointerEvents: 'none',
      color: 'var(--color-text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))), (helperText || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--color-danger)' : 'var(--color-text-muted)'
    }
  }, error || helperText));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Dialog.jsx
try { (() => {
const WIDTHS = {
  sm: 400,
  md: 520,
  lg: 720
};

/** Modal surface — booking confirmation, quotation forms, destructive confirms. */
function Dialog({
  open = false,
  title,
  description,
  size = 'md',
  showClose = true,
  onClose,
  footer,
  children,
  style
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
      background: 'rgba(5,30,61,.55)',
      backdropFilter: 'blur(3px)',
      fontFamily: 'var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width: '100%',
      maxWidth: WIDTHS[size] || WIDTHS.md,
      maxHeight: '86vh',
      overflow: 'auto',
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      boxSizing: 'border-box',
      animation: 'ytb-dialog-in var(--duration-normal) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes ytb-dialog-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}'), title || showClose ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-4)',
      padding: 'var(--space-6)',
      paddingBottom: description ? 'var(--space-3)' : 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--color-text-primary)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, description) : null), showClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close",
    onClick: onClose,
    style: {
      flex: '0 0 auto',
      width: 32,
      height: 32,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      cursor: 'pointer',
      fontSize: 14,
      lineHeight: 1
    }
  }, "\u2715") : null) : null, children ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--space-6) var(--space-6)'
    }
  }, children) : null, footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--space-3)',
      padding: 'var(--space-4) var(--space-6)',
      borderTop: '1px solid var(--color-border)',
      background: 'var(--gray-50)',
      borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
    }
  }, footer) : null));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Tabs.jsx
try { (() => {
/** Horizontal section switcher — service categories, admin detail panes. */
function Tabs({
  items = [],
  value,
  onChange,
  variant = 'underline',
  fullWidth = false,
  style
}) {
  const [hoverId, setHoverId] = React.useState(null);
  const active = value ?? (items[0] && items[0].id);
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: variant === 'pill' ? 6 : 'var(--space-6)',
      fontFamily: 'var(--font-body)',
      boxSizing: 'border-box',
      borderBottom: variant === 'underline' ? '1px solid var(--color-border)' : 'none',
      background: variant === 'pill' ? 'var(--color-bg-sunken)' : 'transparent',
      padding: variant === 'pill' ? 4 : 0,
      borderRadius: variant === 'pill' ? 'var(--radius-full)' : 0,
      ...style
    }
  }, items.map(it => {
    const on = it.id === active;
    const hovered = hoverId === it.id;
    const pill = variant === 'pill';
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it.id),
      onMouseEnter: () => setHoverId(it.id),
      onMouseLeave: () => setHoverId(null),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        flex: fullWidth ? 1 : '0 0 auto',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 'var(--text-sm)',
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        padding: pill ? '8px 16px' : '12px 2px',
        borderRadius: pill ? 'var(--radius-full)' : 0,
        background: pill ? on ? 'var(--color-bg-surface)' : hovered ? 'rgba(255,255,255,.55)' : 'transparent' : 'transparent',
        boxShadow: pill && on ? 'var(--shadow-sm)' : 'none',
        color: on ? 'var(--color-brand-primary)' : hovered ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        borderBottom: pill ? 'none' : `2px solid ${on ? 'var(--color-brand-secondary)' : 'transparent'}`,
        marginBottom: pill ? 0 : -1,
        transition: 'all var(--duration-fast) var(--ease-standard)',
        whiteSpace: 'nowrap'
      }
    }, it.icon, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-semibold)',
        padding: '1px 7px',
        borderRadius: 'var(--radius-full)',
        background: on ? 'var(--navy-50)' : 'var(--gray-100)',
        color: on ? 'var(--navy-700)' : 'var(--color-text-secondary)'
      }
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Toast.jsx
try { (() => {
const TONES = {
  info: {
    bar: 'var(--color-brand-secondary)',
    bg: 'var(--color-bg-surface)',
    text: 'var(--color-text-primary)'
  },
  success: {
    bar: 'var(--color-success)',
    bg: 'var(--color-bg-surface)',
    text: 'var(--color-text-primary)'
  },
  warning: {
    bar: 'var(--color-warning)',
    bg: 'var(--color-bg-surface)',
    text: 'var(--color-text-primary)'
  },
  danger: {
    bar: 'var(--color-danger)',
    bg: 'var(--color-bg-surface)',
    text: 'var(--color-text-primary)'
  }
};

/** Transient confirmation / error notice, anchored bottom-right by default. */
function Toast({
  tone = 'info',
  title,
  message,
  icon,
  action,
  onClose,
  style
}) {
  const t = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-3)',
      minWidth: 280,
      maxWidth: 420,
      padding: 'var(--space-4)',
      paddingLeft: 'var(--space-4)',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-body)',
      background: t.bg,
      color: t.text,
      border: '1px solid var(--color-border)',
      borderLeft: `4px solid ${t.bar}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.bar,
      display: 'inline-flex',
      flex: '0 0 auto',
      marginTop: 1
    }
  }, icon) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, title ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 'var(--leading-snug)'
    }
  }, title) : null, message ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, message) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, action) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Dismiss",
    onClick: onClose,
    style: {
      flex: '0 0 auto',
      border: 'none',
      background: 'transparent',
      color: 'var(--color-text-muted)',
      cursor: 'pointer',
      fontSize: 13,
      lineHeight: 1,
      padding: 2
    }
  }, "\u2715") : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Tooltip.jsx
try { (() => {
const OFFSET = 8;

/** Small hover/focus hint for icon-only controls and truncated values. */
function Tooltip({
  label,
  placement = 'top',
  children,
  style
}) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginBottom: OFFSET
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: OFFSET
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginRight: OFFSET
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      marginLeft: OFFSET
    }
  }[placement] || {};
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
    onFocus: () => setOpen(true),
    onBlur: () => setOpen(false)
  }, children, open && label ? /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      padding: '6px 10px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1.4,
      background: 'var(--navy-900)',
      color: 'var(--color-text-inverse)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-md)',
      ...pos,
      ...style
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/BookingsScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Tabs,
  Input,
  Select,
  Checkbox,
  Dialog,
  Toast,
  Tooltip,
  Tag
} = window.YesTourBDDesignSystem_fa3831;
function BookingsScreen({
  go
}) {
  const {
    TH,
    TD,
    STATUS_TONE,
    Panel
  } = window;
  const [tab, setTab] = React.useState('all');
  const [open, setOpen] = React.useState(null);
  const [toast, setToast] = React.useState(false);
  const rows = window.ADMIN_BOOKINGS.filter(b => tab === 'all' || b.status === tab);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--space-8) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'all',
      label: 'All',
      count: window.ADMIN_BOOKINGS.length
    }, {
      id: 'confirmed',
      label: 'Confirmed'
    }, {
      id: 'pending',
      label: 'Payment pending'
    }, {
      id: 'completed',
      label: 'Completed'
    }, {
      id: 'cancelled',
      label: 'Cancelled'
    }],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    })
  }, "Export CSV"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    })
  }, "Add manual booking"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      padding: 'var(--space-4)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Search",
    placeholder: "Ref, name or phone",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 190
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Service",
    placeholder: "All services",
    options: window.ADMIN_SERVICES.slice(0, 6).map(s => ({
      label: s.name,
      value: s.name
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Channel",
    placeholder: "All channels",
    options: [{
      label: 'Website',
      value: 'w'
    }, {
      label: 'WhatsApp',
      value: 'wa'
    }, {
      label: 'Call',
      value: 'c'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Travel date from",
    type: "date"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "To",
    type: "date"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md"
  }, "Reset")), /*#__PURE__*/React.createElement(Panel, {
    title: `${rows.length} bookings`,
    padding: "0",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)'
      }
    }, "Updated a minute ago")
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...TH,
      width: 40
    }
  }, /*#__PURE__*/React.createElement(Checkbox, null)), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Ref"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Customer"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Service"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Travel date"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Pax"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Amount"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Payment"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Channel"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Status"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(b => /*#__PURE__*/React.createElement("tr", {
    key: b.ref
  }, /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Checkbox, null)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-700)'
    }
  }, b.ref), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-900)'
    }
  }, b.customer), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, b.phone)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      color: 'var(--color-text-secondary)',
      maxWidth: 200
    }
  }, b.service), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      whiteSpace: 'nowrap'
    }
  }, b.date), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, b.pax), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontWeight: 'var(--weight-semibold)',
      whiteSpace: 'nowrap'
    }
  }, "\u09F3", b.amount.toLocaleString('en-US')), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: b.pay === 'Awaiting' ? 'warning' : b.pay === 'Refunded' ? 'neutral' : 'teal'
  }, b.pay)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      color: 'var(--color-text-secondary)'
    }
  }, b.channel), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS_TONE[b.status],
    dot: true
  }, b.status)), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "View"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      size: 16
    }),
    "aria-label": "View",
    variant: "ghost",
    size: "sm",
    onClick: () => setOpen(b)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Message"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "message-circle",
      size: 16
    }),
    "aria-label": "Message",
    variant: "ghost",
    size: "sm"
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-4) var(--space-5)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Showing 1\u2013", rows.length, " of 248"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    disabled: true
  }, "Previous"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Next")))), /*#__PURE__*/React.createElement(Dialog, {
    open: Boolean(open),
    onClose: () => setOpen(null),
    size: "lg",
    title: open ? open.service : '',
    description: open ? `${open.ref} · ${open.customer} · ${open.date}` : '',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setOpen(null)
    }, "Close"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => {
        setOpen(null);
        setToast(true);
      }
    }, "Cancel booking"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setOpen(null);
        setToast(true);
      }
    }, "Mark confirmed"))
  }, open ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, [['Guests', String(open.pax)], ['Amount', '৳' + open.amount.toLocaleString('en-US')], ['Payment', open.pay], ['Channel', open.channel], ['Phone', open.phone], ['Status', open.status]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: 'var(--space-3)',
      background: 'var(--gray-50)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)',
      letterSpacing: 'var(--tracking-wide)',
      textTransform: 'uppercase'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-900)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-900)'
    }
  }, "Activity"), [['Booking created via ' + open.channel, '12 Mar, 09:14'], ['Payment authorised — ' + open.pay, '12 Mar, 09:15'], ['Voucher emailed to customer', '12 Mar, 09:15']].map(([t, when]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-600)',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      color: 'var(--gray-800)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, when)))), /*#__PURE__*/React.createElement(Input, {
    label: "Internal note",
    placeholder: "Visible to staff only"
  })) : null), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    }),
    title: "Booking updated",
    message: "The customer has been notified on WhatsApp.",
    onClose: () => setToast(false)
  })) : null);
}
Object.assign(window, {
  BookingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/BookingsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/DashboardScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Tabs,
  Tooltip
} = window.YesTourBDDesignSystem_fa3831;
function RevenueChart() {
  const data = window.REVENUE_SERIES;
  const max = Math.max(...data.map(d => d.instant + d.request));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'var(--space-4)',
      height: 180
    }
  }, data.map(d => {
    const total = d.instant + d.request;
    return /*#__PURE__*/React.createElement("div", {
      key: d.label,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        height: '100%',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)'
      }
    }, "\u09F3", total, "k"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxWidth: 46,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: `${total / max * 100}%`,
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: `${d.request / total * 100}%`,
        background: 'var(--navy-600)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: `${d.instant / total * 100}%`,
        background: 'var(--teal-400)'
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-secondary)'
      }
    }, d.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: 'var(--teal-400)'
    }
  }), "Instant bookings"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: 'var(--navy-600)'
    }
  }), "Request based")));
}
function DashboardScreen({
  go
}) {
  const [range, setRange] = React.useState('7d');
  const bookings = window.ADMIN_BOOKINGS.slice(0, 5);
  const requests = window.ADMIN_REQUESTS.slice(0, 4);
  const {
    TH,
    TD,
    STATUS_TONE,
    StatCard,
    Panel
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      padding: 'var(--space-6) var(--space-8) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    icon: "ticket",
    label: "Bookings this week",
    value: "248",
    delta: "+12.4%"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "banknote",
    label: "Revenue collected",
    value: "\u09F318.4L",
    delta: "+8.1%",
    tone: "gold"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "message-square-quote",
    label: "Open requests",
    value: "17",
    delta: "-4.0%",
    tone: "navy"
  }), /*#__PURE__*/React.createElement(StatCard, {
    icon: "clock",
    label: "Avg. quote time",
    value: "1h 42m",
    delta: "+6.0%",
    tone: "navy"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Revenue by booking type",
    action: /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      items: [{
        id: '7d',
        label: '7 days'
      }, {
        id: '30d',
        label: '30 days'
      }, {
        id: 'ytd',
        label: 'YTD'
      }],
      value: range,
      onChange: setRange
    })
  }, /*#__PURE__*/React.createElement(RevenueChart, null)), /*#__PURE__*/React.createElement(Panel, {
    title: "Bookings by service",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('reports')
    }, "Report")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, [['Hotels & resorts', 84, 'teal'], ['Ship tickets', 62, 'navy'], ['Houseboat tours', 41, 'teal'], ['Air tickets', 33, 'navy'], ['Attractions', 28, 'teal']].map(([label, v, tone]) => /*#__PURE__*/React.createElement("div", {
    key: label,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-700)'
    }
  }, label), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy-900)'
    }
  }, v)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 7,
      borderRadius: 'var(--radius-full)',
      background: 'var(--gray-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v / 84 * 100}%`,
      height: '100%',
      background: tone === 'teal' ? 'var(--teal-400)' : 'var(--navy-600)',
      borderRadius: 'var(--radius-full)'
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.35fr 1fr',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Latest bookings",
    padding: "0",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('bookings'),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "All bookings")
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Ref"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Customer"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Service"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Amount"), /*#__PURE__*/React.createElement("th", {
    style: TH
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, bookings.map(b => /*#__PURE__*/React.createElement("tr", {
    key: b.ref
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-700)'
    }
  }, b.ref), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, b.customer), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      color: 'var(--color-text-secondary)'
    }
  }, b.service), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontWeight: 'var(--weight-semibold)',
      whiteSpace: 'nowrap'
    }
  }, "\u09F3", b.amount.toLocaleString('en-US')), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS_TONE[b.status],
    dot: true
  }, b.status))))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Requests waiting on us",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => go('requests')
    }, "Open queue")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, requests.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.ref,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-3)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      background: r.status === 'new' ? 'var(--gold-100)' : 'var(--color-bg-surface)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.customer), /*#__PURE__*/React.createElement(Badge, {
    tone: STATUS_TONE[r.status]
  }, r.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)'
    }
  }, r.type, " \xB7 ", r.pax, " pax \xB7 ", r.dest, " \xB7 ", r.age, " ago")), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: r.status === 'new' ? 'primary' : 'outline',
    onClick: () => go('requests')
  }, r.status === 'new' ? 'Claim' : 'Open')))))));
}
Object.assign(window, {
  DashboardScreen,
  RevenueChart
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/RequestsScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Tabs,
  Input,
  Select,
  Dialog,
  Toast,
  Tooltip,
  Tag,
  Switch
} = window.YesTourBDDesignSystem_fa3831;
const COLUMNS = [{
  id: 'new',
  label: 'New',
  tone: 'warning'
}, {
  id: 'quoted',
  label: 'Quoted',
  tone: 'brand'
}, {
  id: 'negotiating',
  label: 'Negotiating',
  tone: 'gold'
}, {
  id: 'won',
  label: 'Won',
  tone: 'success'
}];
function RequestCard({
  r,
  onOpen
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onOpen(r),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 'var(--space-4)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      cursor: 'pointer',
      transform: hover ? 'translateY(-1px)' : 'none',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-700)'
    }
  }, r.ref), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, r.age, " ago")), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-900)'
    }
  }, r.customer), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, r.type, " \xB7 ", r.pax, " pax", /*#__PURE__*/React.createElement("br", null), r.dest, " \xB7 ", r.when), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 2
    }
  }, r.owner ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'var(--navy-50)',
      color: 'var(--navy-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 'var(--weight-semibold)'
    }
  }, r.owner[0]), r.owner) : /*#__PURE__*/React.createElement(Badge, {
    tone: "warning",
    dot: true
  }, "Unassigned"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 15
  }))));
}
function RequestsScreen({
  go
}) {
  const {
    Panel
  } = window;
  const [open, setOpen] = React.useState(null);
  const [toast, setToast] = React.useState(false);
  const [view, setView] = React.useState('board');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--space-8) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: [{
      id: 'board',
      label: 'Board'
    }, {
      id: 'list',
      label: 'List'
    }],
    value: view,
    onChange: setView
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 180
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "All request types",
    options: [{
      label: 'Corporate tour',
      value: 'c'
    }, {
      label: 'Group tour',
      value: 'g'
    }, {
      label: 'Visa assistance',
      value: 'v'
    }, {
      label: 'Custom package',
      value: 'p'
    }, {
      label: 'Rent a car',
      value: 'r'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150
    }
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "All owners",
    options: [{
      label: 'Sadia',
      value: 's'
    }, {
      label: 'Rafi',
      value: 'r'
    }, {
      label: 'Unassigned',
      value: 'u'
    }]
  })), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    })
  }, "Log a phone request"))), view === 'board' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, COLUMNS.map(c => {
    const items = window.ADMIN_REQUESTS.filter(r => r.status === c.id);
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-3)',
        background: 'var(--gray-100)',
        borderRadius: 'var(--radius-lg)',
        minHeight: 220
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2px 4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-semibold)',
        color: 'var(--navy-900)'
      }
    }, c.label, /*#__PURE__*/React.createElement(Badge, {
      tone: c.tone
    }, items.length)), /*#__PURE__*/React.createElement(IconButton, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "more-horizontal",
        size: 16
      }),
      "aria-label": "Column options",
      variant: "ghost",
      size: "sm"
    })), items.map(r => /*#__PURE__*/React.createElement(RequestCard, {
      key: r.ref,
      r: r,
      onOpen: setOpen
    })), !items.length ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-5)',
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)'
      }
    }, "Nothing here") : null);
  })) : /*#__PURE__*/React.createElement(Panel, {
    title: `${window.ADMIN_REQUESTS.length} requests`,
    padding: "0"
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Ref', 'Customer', 'Type', 'Pax', 'Destination', 'When', 'Waiting', 'Owner', 'Status', ''].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: window.TH
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, window.ADMIN_REQUESTS.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.ref
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...window.TD,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-700)'
    }
  }, r.ref), /*#__PURE__*/React.createElement("td", {
    style: {
      ...window.TD,
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-900)'
    }
  }, r.customer), /*#__PURE__*/React.createElement("td", {
    style: {
      ...window.TD,
      color: 'var(--color-text-secondary)'
    }
  }, r.type), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, r.pax), /*#__PURE__*/React.createElement("td", {
    style: {
      ...window.TD,
      color: 'var(--color-text-secondary)'
    }
  }, r.dest), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, r.when), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, r.age), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, r.owner || /*#__PURE__*/React.createElement(Badge, {
    tone: "warning"
  }, "Unassigned")), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: window.STATUS_TONE[r.status],
    dot: true
  }, r.status)), /*#__PURE__*/React.createElement("td", {
    style: window.TD
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    onClick: () => setOpen(r)
  }, "Open"))))))), /*#__PURE__*/React.createElement(Dialog, {
    open: Boolean(open),
    onClose: () => setOpen(null),
    size: "lg",
    title: open ? `${open.type} — ${open.customer}` : '',
    description: open ? `${open.ref} · submitted ${open.age} ago · reply on WhatsApp` : '',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setOpen(null)
    }, "Close"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => setOpen(null)
    }, "Assign to me"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setOpen(null);
        setToast(true);
      }
    }, "Send quotation"))
  }, open ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-3)'
    }
  }, [['Travellers', String(open.pax)], ['Destination', open.dest], ['Dates', open.when], ['Contact', open.contact]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      padding: 'var(--space-3)',
      background: 'var(--gray-50)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, k), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-900)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      background: 'var(--navy-50)',
      border: '1px solid var(--navy-100)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-800)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "\u201CTwo nights, AC bus from Dhaka on Thursday night, one conference room for 40 on Friday morning, all meals. Budget is flexible if the hotel is good.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Quoted total (\u09F3)",
    placeholder: "0"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Valid until",
    type: "date"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Owner",
    defaultValue: "s",
    options: [{
      label: 'Sadia',
      value: 's'
    }, {
      label: 'Rafi',
      value: 'r'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ['Transport', 'Hotel', 'Meals', 'Event setup', 'Guide'].map(x => /*#__PURE__*/React.createElement(Tag, {
    key: x,
    label: x,
    onClick: () => {}
  }))), /*#__PURE__*/React.createElement(Switch, {
    label: "Also send this quotation by email",
    defaultChecked: true
  })) : null), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 24,
      bottom: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 18
    }),
    title: "Quotation sent",
    message: "WhatsApp delivered. The request moved to Quoted.",
    onClose: () => setToast(false)
  })) : null);
}
Object.assign(window, {
  RequestsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/RequestsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/ServicesScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Tabs,
  Input,
  Select,
  Switch,
  Tooltip,
  Card,
  Dialog
} = window.YesTourBDDesignSystem_fa3831;
function ServicesScreen({
  go
}) {
  const {
    Panel,
    TH,
    TD
  } = window;
  const [editing, setEditing] = React.useState(null);
  const [mode, setMode] = React.useState('all');
  const rows = window.ADMIN_SERVICES.filter(s => mode === 'all' || s.mode.toLowerCase() === mode);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6) var(--space-8) var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(window.StatCard, {
    icon: "layers",
    label: "Services live",
    value: "11 / 12"
  }), /*#__PURE__*/React.createElement(window.StatCard, {
    icon: "zap",
    label: "Instant inventory items",
    value: "391",
    tone: "navy"
  }), /*#__PURE__*/React.createElement(window.StatCard, {
    icon: "message-square-quote",
    label: "Request-only services",
    value: "4",
    tone: "gold"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'all',
      label: 'All services',
      count: 12
    }, {
      id: 'instant',
      label: 'Instant booking',
      count: 8
    }, {
      id: 'request',
      label: 'Request based',
      count: 4
    }],
    value: mode,
    onChange: setMode
  }), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15
    })
  }, "Add service")), /*#__PURE__*/React.createElement(Panel, {
    title: "Service catalogue",
    padding: "0",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)'
      }
    }, "Order controls the homepage grid")
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['', 'Service', 'Booking mode', 'Inventory', 'Last updated', 'Live', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: TH
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.name
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      width: 34,
      color: 'var(--gray-400)',
      cursor: 'grab'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip-vertical",
    size: 16
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontWeight: 'var(--weight-medium)',
      color: 'var(--navy-900)'
    }
  }, s.name), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: s.mode === 'Instant' ? 'teal' : 'brand',
    variant: s.mode === 'Instant' ? 'solid' : 'outline'
  }, s.mode)), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, s.items ? `${s.items} items` : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-muted)'
    }
  }, "API supplied")), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      color: 'var(--color-text-secondary)'
    }
  }, s.updated), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: s.live
  })), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    label: "Edit"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 16
    }),
    "aria-label": "Edit",
    variant: "ghost",
    size: "sm",
    onClick: () => setEditing(s)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Duplicate"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "copy",
      size: 16
    }),
    "aria-label": "Duplicate",
    variant: "ghost",
    size: "sm"
  }))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Panel, {
    title: "Homepage banner",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Manage banners")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70",
    alt: "",
    style: {
      width: 140,
      height: 92,
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success",
    dot: true
  }, "Live until 20 Mar"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-900)'
    }
  }, "Eid offer \u2014 25% off Cox\u2019s Bazar resorts"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, "Slot 1 of 3 \xB7 links to /offers/eid-2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "Replace image"), /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "ghost"
  }, "Unpublish"))))), /*#__PURE__*/React.createElement(Panel, {
    title: "Offers & promotions",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 14
      })
    }, "New offer")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, [['EID25', '25% off resorts', 'Ends 20 Mar', 'success'], ['HOUSEBOAT20', '20% off day tour', 'Ends 31 Mar', 'success'], ['STUDENT10', '10% group discount', 'Draft', 'neutral']].map(([code, desc, when, tone]) => /*#__PURE__*/React.createElement("div", {
    key: code,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-3)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--gray-100)',
      color: 'var(--navy-800)'
    }
  }, code), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--gray-800)'
    }
  }, desc), /*#__PURE__*/React.createElement(Badge, {
    tone: tone,
    dot: true
  }, when), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    }),
    "aria-label": "Edit offer",
    variant: "ghost",
    size: "sm"
  })))))), /*#__PURE__*/React.createElement(Dialog, {
    open: Boolean(editing),
    onClose: () => setEditing(null),
    title: editing ? `Edit — ${editing.name}` : '',
    description: "Changes go live on the website immediately.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setEditing(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setEditing(null)
    }, "Save service"))
  }, editing ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Service name",
    defaultValue: editing.name
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Booking mode",
    defaultValue: editing.mode,
    options: [{
      label: 'Instant',
      value: 'Instant'
    }, {
      label: 'Request',
      value: 'Request'
    }],
    helperText: "Request mode hides the pay button."
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Display order",
    type: "number",
    defaultValue: "1"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Short description (homepage tile)",
    defaultValue: "340+ properties in Cox\u2019s Bazar, Sylhet, Bandarban"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Show on homepage service grid",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Accept online payment",
    defaultChecked: editing.mode === 'Instant'
  })) : null));
}
Object.assign(window, {
  ServicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/ServicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-chrome.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Input,
  Tooltip
} = window.YesTourBDDesignSystem_fa3831;
const NAV_GROUPS = [{
  title: 'Overview',
  items: [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard'
  }, {
    id: 'reports',
    label: 'Reports & analytics',
    icon: 'chart-column'
  }]
}, {
  title: 'Operations',
  items: [{
    id: 'bookings',
    label: 'Bookings',
    icon: 'ticket',
    count: 24
  }, {
    id: 'requests',
    label: 'Requests',
    icon: 'message-square-quote',
    count: 5
  }, {
    id: 'customers',
    label: 'Customers',
    icon: 'users'
  }, {
    id: 'payments',
    label: 'Payments',
    icon: 'credit-card'
  }]
}, {
  title: 'Catalogue',
  items: [{
    id: 'services',
    label: 'Manage services',
    icon: 'layers'
  }, {
    id: 'offers',
    label: 'Offers & promotions',
    icon: 'percent'
  }]
}, {
  title: 'Content',
  items: [{
    id: 'banners',
    label: 'Content & banners',
    icon: 'image'
  }, {
    id: 'blog',
    label: 'Blog',
    icon: 'newspaper'
  }]
}, {
  title: 'Admin',
  items: [{
    id: 'staff',
    label: 'Users & staff',
    icon: 'shield'
  }]
}];
function AdminSidebar({
  route,
  go
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 244,
      flex: '0 0 auto',
      background: 'var(--navy-950)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: 'var(--space-5)',
      borderBottom: '1px solid rgba(255,255,255,.09)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "",
    style: {
      width: 30,
      height: 30,
      objectFit: 'contain',
      borderRadius: 6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 15,
      color: '#fff'
    }
  }, "YesTour", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-400)'
    }
  }, "BD")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 10.5,
      letterSpacing: 'var(--tracking-wide)',
      color: 'var(--navy-300)',
      textTransform: 'uppercase'
    }
  }, "Admin panel"))), /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 'var(--space-4) var(--space-3)'
    }
  }, NAV_GROUPS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title,
    style: {
      marginBottom: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 10px 8px',
      fontFamily: 'var(--font-body)',
      fontSize: 10.5,
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--navy-400)'
    }
  }, g.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, g.items.map(it => /*#__PURE__*/React.createElement(NavItem, {
    key: it.id,
    it: it,
    on: it.id === route,
    go: go
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      borderTop: '1px solid rgba(255,255,255,.09)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--teal-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "SR"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: '#fff'
    }
  }, "Sadia Rahman"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-300)'
    }
  }, "Operations lead")), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "log-out",
      size: 16
    }),
    "aria-label": "Sign out",
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--navy-300)'
    }
  })));
}
function NavItem({
  it,
  on,
  go
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => go(it.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '9px 10px',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-regular)',
      color: on ? '#fff' : hover ? '#fff' : 'var(--navy-200)',
      background: on ? 'rgba(40,177,161,.16)' : hover ? 'rgba(255,255,255,.06)' : 'transparent',
      boxShadow: on ? 'inset 2px 0 0 var(--teal-400)' : 'none',
      transition: 'all var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: on ? 'var(--teal-300)' : 'inherit',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 17
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, it.label), it.count ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 'var(--weight-semibold)',
      padding: '1px 7px',
      borderRadius: 'var(--radius-full)',
      background: on ? 'var(--teal-500)' : 'rgba(255,255,255,.12)',
      color: '#fff'
    }
  }, it.count) : null);
}
function AdminTopBar({
  title,
  subtitle,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'rgba(255,255,255,.94)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--color-border)',
      padding: 'var(--space-5) var(--space-8)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)',
      letterSpacing: 'var(--tracking-tight)',
      whiteSpace: 'nowrap'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 3,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      flex: '0 1 260px',
      minWidth: 140
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Search ref, phone, customer",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Notifications"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    }),
    "aria-label": "Notifications",
    variant: "outline"
  })), actions);
}
function StatCard({
  icon,
  label,
  value,
  delta,
  tone = 'teal'
}) {
  const up = delta && delta.startsWith('+');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: tone === 'teal' ? 'var(--teal-50)' : tone === 'gold' ? 'var(--gold-100)' : 'var(--navy-50)',
      color: tone === 'teal' ? 'var(--teal-600)' : tone === 'gold' ? 'var(--gold-700)' : 'var(--navy-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--navy-900)',
      lineHeight: 1
    }
  }, value), delta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: up ? 'var(--teal-700)' : 'var(--color-danger)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: up ? 'trending-up' : 'trending-down',
    size: 14
  }), delta, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-muted)'
    }
  }, "vs last week")) : null);
}
function Panel({
  title,
  action,
  children,
  padding = 'var(--space-5)'
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-5)',
      borderBottom: '1px solid var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, title), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
const TH = {
  textAlign: 'left',
  padding: '10px 14px',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-xs)',
  fontWeight: 'var(--weight-semibold)',
  letterSpacing: 'var(--tracking-wide)',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  borderBottom: '1px solid var(--color-border)',
  whiteSpace: 'nowrap'
};
const TD = {
  padding: '13px 14px',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--text-sm)',
  color: 'var(--gray-800)',
  borderBottom: '1px solid var(--color-border)',
  verticalAlign: 'middle'
};
const STATUS_TONE = {
  confirmed: 'success',
  completed: 'teal',
  pending: 'warning',
  cancelled: 'danger',
  new: 'warning',
  quoted: 'brand',
  negotiating: 'gold',
  won: 'success'
};
Object.assign(window, {
  AdminSidebar,
  AdminTopBar,
  StatCard,
  Panel,
  TH,
  TD,
  STATUS_TONE,
  NAV_GROUPS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/admin-data.js
try { (() => {
const ADMIN_BOOKINGS = [{
  ref: 'YTB-8H2K41',
  customer: 'Nusrat Jahan',
  phone: '+880 1712-345678',
  service: 'Houseboat Day Tour',
  date: '12 Mar 2026',
  pax: 2,
  amount: 6520,
  status: 'confirmed',
  pay: 'bKash',
  channel: 'Website'
}, {
  ref: 'YTB-8H2K38',
  customer: 'Rakib Hasan',
  phone: '+880 1811-220034',
  service: 'Saint Martin Ship — Bay One',
  date: '13 Mar 2026',
  pax: 4,
  amount: 13600,
  status: 'confirmed',
  pay: 'Card',
  channel: 'Website'
}, {
  ref: 'YTB-8H2K31',
  customer: 'Farhana Akter',
  phone: '+880 1912-778821',
  service: 'Sayeman Beach Resort — 2N',
  date: '12–14 Mar 2026',
  pax: 2,
  amount: 17800,
  status: 'pending',
  pay: 'Awaiting',
  channel: 'WhatsApp'
}, {
  ref: 'YTB-8H2K22',
  customer: 'Imran Chowdhury',
  phone: '+880 1611-903112',
  service: 'Air ticket DAC → CXB',
  date: '15 Mar 2026',
  pax: 1,
  amount: 5400,
  status: 'confirmed',
  pay: 'Nagad',
  channel: 'Website'
}, {
  ref: 'YTB-8H2K19',
  customer: 'Sabbir Rahman',
  phone: '+880 1533-664412',
  service: 'Marine Drive Tour',
  date: '11 Mar 2026',
  pax: 6,
  amount: 14400,
  status: 'cancelled',
  pay: 'Refunded',
  channel: 'Call'
}, {
  ref: 'YTB-8H2K09',
  customer: 'Tania Islam',
  phone: '+880 1722-110098',
  service: 'Radiant Fish World Entry',
  date: '10 Mar 2026',
  pax: 3,
  amount: 2100,
  status: 'completed',
  pay: 'bKash',
  channel: 'Website'
}];
const ADMIN_REQUESTS = [{
  ref: 'REQ-2261',
  customer: 'Beacon Pharmaceuticals',
  contact: 'Tanvir Ahmed',
  type: 'Corporate tour',
  pax: 34,
  dest: 'Sylhet + Sreemangal',
  when: 'Apr 2026',
  age: '18 min',
  status: 'new',
  owner: null
}, {
  ref: 'REQ-2258',
  customer: 'Nadia Sultana',
  contact: 'Nadia Sultana',
  type: 'Visa assistance',
  pax: 2,
  dest: 'Thailand',
  when: 'May 2026',
  age: '2 hours',
  status: 'quoted',
  owner: 'Sadia'
}, {
  ref: 'REQ-2254',
  customer: 'BUET Civil ’21',
  contact: 'Mahin Sarker',
  type: 'Group tour',
  pax: 48,
  dest: 'Bandarban',
  when: 'Mar 2026',
  age: '5 hours',
  status: 'negotiating',
  owner: 'Rafi'
}, {
  ref: 'REQ-2249',
  customer: 'Grameen IT',
  contact: 'Shahriar Kabir',
  type: 'Event management',
  pax: 120,
  dest: 'Cox’s Bazar',
  when: 'Jun 2026',
  age: '1 day',
  status: 'quoted',
  owner: 'Sadia'
}, {
  ref: 'REQ-2241',
  customer: 'Rezaul Karim',
  contact: 'Rezaul Karim',
  type: 'Rent a car',
  pax: 7,
  dest: 'Sajek (Chader Gari)',
  when: '20 Mar 2026',
  age: '2 days',
  status: 'won',
  owner: 'Rafi'
}];
const ADMIN_SERVICES = [{
  name: 'Hotel & Resort Booking',
  mode: 'Instant',
  items: 342,
  live: true,
  updated: '2 days ago'
}, {
  name: 'Houseboat Tour Booking',
  mode: 'Instant',
  items: 28,
  live: true,
  updated: 'Today'
}, {
  name: 'Saint Martin Ship Ticketing',
  mode: 'Instant',
  items: 6,
  live: true,
  updated: 'Today'
}, {
  name: 'Cox’s Bazar Houseboat Day Tour',
  mode: 'Instant',
  items: 4,
  live: true,
  updated: 'Yesterday'
}, {
  name: 'Marine Drive Tour',
  mode: 'Instant',
  items: 9,
  live: true,
  updated: '4 days ago'
}, {
  name: 'Rent a Car (Chader Gari)',
  mode: 'Request',
  items: 12,
  live: true,
  updated: '1 week ago'
}, {
  name: 'Radiant Fish World Ticketing',
  mode: 'Instant',
  items: 2,
  live: true,
  updated: '3 days ago'
}, {
  name: 'Air Ticket Booking',
  mode: 'Instant',
  items: 0,
  live: true,
  updated: 'Today'
}, {
  name: 'Bus Ticket Booking',
  mode: 'Instant',
  items: 0,
  live: false,
  updated: '2 weeks ago'
}, {
  name: 'Package Tour Booking',
  mode: 'Request',
  items: 17,
  live: true,
  updated: 'Yesterday'
}, {
  name: 'Corporate Tour & Event Management',
  mode: 'Request',
  items: 5,
  live: true,
  updated: '5 days ago'
}, {
  name: 'Visa Assistance',
  mode: 'Request',
  items: 14,
  live: true,
  updated: '1 week ago'
}];
const REVENUE_SERIES = [{
  label: 'Mon',
  instant: 148,
  request: 62
}, {
  label: 'Tue',
  instant: 176,
  request: 44
}, {
  label: 'Wed',
  instant: 132,
  request: 90
}, {
  label: 'Thu',
  instant: 208,
  request: 71
}, {
  label: 'Fri',
  instant: 286,
  request: 118
}, {
  label: 'Sat',
  instant: 254,
  request: 96
}, {
  label: 'Sun',
  instant: 198,
  request: 58
}];
Object.assign(window, {
  ADMIN_BOOKINGS,
  ADMIN_REQUESTS,
  ADMIN_SERVICES,
  REVENUE_SERIES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/admin-data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/AccountScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Card,
  Tabs,
  Input,
  Switch,
  Tooltip
} = window.YesTourBDDesignSystem_fa3831;
const STATUS = {
  confirmed: {
    tone: 'success',
    label: 'Confirmed'
  },
  paid: {
    tone: 'success',
    label: 'Paid'
  },
  request: {
    tone: 'warning',
    label: 'Awaiting quotation'
  },
  cancelled: {
    tone: 'danger',
    label: 'Cancelled'
  }
};
function BookingRow({
  b,
  go
}) {
  const s = STATUS[b.status] || STATUS.confirmed;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr auto',
      gap: 'var(--space-5)',
      padding: 'var(--space-4)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: b.img,
    alt: "",
    style: {
      width: '100%',
      height: 84,
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: s.tone,
    dot: true
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, b.ref)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, b.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 14
  }), b.date), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 14
  }), b.pax))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 10
    }
  }, b.total != null ? /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      color: 'var(--navy-900)'
    }
  }, "\u09F3", b.total.toLocaleString('en-US')) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-muted)'
    }
  }, "Quote pending"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, b.total != null ? /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    })
  }, "Voucher") : /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    variant: "outline"
  }, "View request"), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Chat about this booking"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "message-circle",
      size: 17
    }),
    "aria-label": "Chat",
    variant: "ghost",
    size: "sm"
  })))));
}
function AccountScreen({
  go
}) {
  const [tab, setTab] = React.useState('upcoming');
  const upcoming = window.BOOKINGS.filter(b => b.status !== 'request');
  const requests = window.BOOKINGS.filter(b => b.status === 'request');
  const shown = tab === 'requests' ? requests : tab === 'past' ? [] : upcoming;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-page)',
      minHeight: '100vh',
      paddingBottom: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy-900)',
      padding: 'var(--space-10) 0 var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: 'var(--teal-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "NJ"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--weight-semibold)',
      color: '#fff',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Nusrat Jahan"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-200)'
    }
  }, "nusrat@example.com \xB7 +880 1712-345678 \xB7 Member since 2024")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('home')
  }, "Book something new"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '-32px auto 0',
      padding: '0 var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'upcoming',
      label: 'Upcoming',
      count: upcoming.length
    }, {
      id: 'past',
      label: 'Past trips'
    }, {
      id: 'requests',
      label: 'Requests',
      count: requests.length
    }],
    value: tab,
    onChange: setTab
  }), shown.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, shown.map(b => /*#__PURE__*/React.createElement(BookingRow, {
    key: b.ref,
    b: b,
    go: go
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-16) 0',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "luggage",
    size: 40
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      color: 'var(--navy-900)'
    }
  }, "No past trips yet"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      maxWidth: 320,
      lineHeight: 'var(--leading-normal)'
    }
  }, "Once a trip is over it moves here with its invoice and photos."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => go('search')
  }, "Browse tours"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--navy-900)'
    }
  }, "Traveller profile"), /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    defaultValue: "Nusrat Jahan"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "NID / Passport",
    defaultValue: "A0123456",
    helperText: "Needed for ship and air tickets."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Save changes")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--navy-900)'
    }
  }, "Notifications"), /*#__PURE__*/React.createElement(Switch, {
    label: "Booking updates on WhatsApp",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Offers and promotions"
  }), /*#__PURE__*/React.createElement(Switch, {
    label: "Travel guide newsletter",
    defaultChecked: true
  })))));
}
Object.assign(window, {
  AccountScreen,
  BookingRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/AccountScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/DetailScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Card,
  Tag,
  Tabs,
  Input,
  Select,
  Dialog,
  Toast,
  Tooltip,
  Radio
} = window.YesTourBDDesignSystem_fa3831;
function DetailScreen({
  go
}) {
  const [tab, setTab] = React.useState('overview');
  const [pax, setPax] = React.useState(2);
  const [confirm, setConfirm] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  const [pay, setPay] = React.useState('bkash');
  const l = window.LISTINGS[0];
  const unit = l.price;
  const fee = 120;
  const total = unit * pax + fee;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-page)',
      paddingBottom: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-6) var(--space-6) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)',
      marginBottom: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      color: 'var(--color-link)',
      textDecoration: 'none'
    }
  }, "Home"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('search');
    },
    style: {
      color: 'var(--color-link)',
      textDecoration: 'none'
    }
  }, "Houseboat tours"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Cox\u2019s Bazar day tour")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 10,
      height: 340,
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.img,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateRows: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.IMG.marine,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.IMG.sunset,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => {},
    style: {
      position: 'absolute',
      inset: 0,
      border: 'none',
      borderRadius: 'var(--radius-lg)',
      background: 'rgba(5,30,61,.55)',
      color: '#fff',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "images",
    size: 18
  }), "+14 photos")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    variant: "solid"
  }, "Instant booking"), /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, l.offer)), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--navy-900)',
      letterSpacing: 'var(--tracking-tight)',
      lineHeight: 'var(--leading-tight)'
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(window.Stars, {
    value: l.rating,
    size: 14
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy-800)'
    }
  }, l.rating), "(", l.reviews, " reviews)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), l.place), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), "9:00 AM \u2013 5:30 PM"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 14
  }), "Max 40 guests"))), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'overview',
      label: 'Overview'
    }, {
      id: 'itinerary',
      label: 'Itinerary'
    }, {
      id: 'included',
      label: 'What’s included'
    }, {
      id: 'policy',
      label: 'Cancellation'
    }, {
      id: 'reviews',
      label: 'Reviews',
      count: l.reviews
    }],
    value: tab,
    onChange: setTab
  }), tab === 'itinerary' ? /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, [['9:00 AM', 'Pickup from Kolatoli point', 'Our coordinator meets you at the Kolatoli circle with a YesTourBD sign.'], ['10:15 AM', 'Board the houseboat at Nazirartek jetty', 'Life jackets, seating allocation and safety briefing.'], ['12:30 PM', 'Lunch on deck', 'Rice, grilled fish, seasonal vegetables and soft drinks.'], ['3:00 PM', 'Moheshkhali channel & bird watching', 'Roughly 90 minutes of open water and mangrove edges.'], ['5:30 PM', 'Drop off at Kolatoli', 'Back before sunset. Hotel drop-off on request.']].map(([t, h, b]) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '86px 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--teal-700)',
      paddingTop: 3
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: '2px solid var(--color-border)',
      paddingLeft: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)',
      marginTop: 3
    }
  }, b))))) : tab === 'included' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ['Return AC transfer from Kolatoli', 'Houseboat cruise, 6 hours', 'Lunch and afternoon snacks', 'Life jackets and safety crew', 'Guide (Bangla / English)'].map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--gray-800)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-600)',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  })), x))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ['Hotel accommodation', 'Personal expenses', 'Fish World entry ticket', 'Travel insurance'].map(x => /*#__PURE__*/React.createElement("span", {
    key: x,
    style: {
      display: 'inline-flex',
      gap: 8,
      alignItems: 'flex-start',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-400)',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 15
  })), x)))) : tab === 'policy' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      padding: 'var(--space-5)',
      background: 'var(--color-success-bg)',
      border: '1px solid var(--teal-200)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--teal-800)'
    }
  }, "Free cancellation up to 48 hours before departure"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--teal-800)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "Cancel within 48 hours and 50% of the fare is refunded. No refund for no-shows. Weather cancellations by the operator are refunded in full or moved to any other date you choose.")) : tab === 'reviews' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, window.REVIEWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: 'flex',
      gap: 'var(--space-4)',
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      flex: '0 0 auto',
      borderRadius: '50%',
      background: 'var(--navy-50)',
      color: 'var(--navy-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, r.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-900)'
    }
  }, r.name), /*#__PURE__*/React.createElement(window.Stars, {
    value: r.rating,
    size: 13
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, "\xB7 Feb 2026")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--gray-700)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, r.text))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--gray-800)',
      maxWidth: 640
    }
  }, "A full day on the water without the overnight commitment. You leave Kolatoli at nine, board a covered houseboat at Nazirartek, and spend six hours between the channel, the mangrove edge and a long lunch on deck. Back before sunset."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-4)'
    }
  }, [['calendar-check', 'Daily departure', 'Except Fridays in Ramadan'], ['utensils', 'Lunch on board', 'Grilled fish or chicken'], ['baby', 'Family friendly', 'Under 5 travel free'], ['life-buoy', 'Safety certified', 'BIWTA registered boat']].map(([ic, t, s]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 'var(--space-4)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-900)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, s)))))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 88,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(window.Price, {
    amount: unit,
    was: l.was
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Travel date",
    type: "date",
    defaultValue: "2026-03-12"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--gray-700)'
    }
  }, "Guests"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      border: '1px solid var(--color-border-strong)',
      borderRadius: 'var(--radius-md)',
      padding: '6px 10px'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "minus",
      size: 16
    }),
    "aria-label": "Fewer guests",
    variant: "ghost",
    size: "sm",
    onClick: () => setPax(Math.max(1, pax - 1))
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, pax, " ", pax === 1 ? 'adult' : 'adults'), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    }),
    "aria-label": "More guests",
    variant: "ghost",
    size: "sm",
    onClick: () => setPax(Math.min(12, pax + 1))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      paddingTop: 'var(--space-3)',
      borderTop: '1px solid var(--color-border)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u09F3", unit.toLocaleString('en-US'), " \xD7 ", pax), /*#__PURE__*/React.createElement("span", null, "\u09F3", (unit * pax).toLocaleString('en-US'))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Service fee"), /*#__PURE__*/React.createElement("span", null, "\u09F3", fee)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      paddingTop: 8,
      borderTop: '1px dashed var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy-900)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--navy-900)'
    }
  }, "\u09F3", total.toLocaleString('en-US')))), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    onClick: () => setConfirm(true)
  }, "Book now"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    fullWidth: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "message-circle",
      size: 17
    })
  }, "Ask on WhatsApp"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 13
  }), "Secure payment via SSLCommerz")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-4)',
      background: 'var(--navy-50)',
      border: '1px solid var(--navy-100)',
      borderRadius: 'var(--radius-md)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-800)',
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--navy-600)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 17
  })), /*#__PURE__*/React.createElement("span", null, "Booking for 10 or more? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('request');
    },
    style: {
      color: 'var(--color-link)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, "Request a group quote"), " instead \u2014 it\u2019s usually cheaper."))))), /*#__PURE__*/React.createElement(Dialog, {
    open: confirm,
    onClose: () => setConfirm(false),
    title: "Confirm and pay",
    description: `${l.title} · 12 Mar 2026 · ${pax} ${pax === 1 ? 'adult' : 'adults'}`,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setConfirm(false)
    }, "Back"), /*#__PURE__*/React.createElement(Button, {
      onClick: () => {
        setConfirm(false);
        setToast(true);
      }
    }, "Pay \u09F3", total.toLocaleString('en-US')))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Full name",
    defaultValue: "Nusrat Jahan"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mobile",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 15
    }),
    defaultValue: "+880 1712-345678"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Email for the voucher",
    defaultValue: "nusrat@example.com"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--gray-700)'
    }
  }, "Payment method"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)',
      flexWrap: 'wrap'
    }
  }, [['bkash', 'bKash'], ['nagad', 'Nagad'], ['card', 'Card']].map(([v, lab]) => /*#__PURE__*/React.createElement(Radio, {
    key: v,
    name: "pay",
    value: v,
    label: lab,
    checked: pay === v,
    onChange: () => setPay(v)
  })))))), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 20,
      bottom: 92,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    }),
    title: "Booking confirmed \u2014 YTB-8H2K41",
    message: "The voucher is in your email and under My bookings.",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setToast(false);
        go('account');
      }
    }, "View booking"),
    onClose: () => setToast(false)
  })) : null);
}
Object.assign(window, {
  DetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/DetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Card,
  Tag,
  Tabs,
  Input,
  Select,
  Tooltip
} = window.YesTourBDDesignSystem_fa3831;
const SEARCH_TABS = [{
  id: 'hotels',
  label: 'Hotels',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "bed-double",
    size: 15
  })
}, {
  id: 'houseboat',
  label: 'Houseboats',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "ship",
    size: 15
  })
}, {
  id: 'ship',
  label: 'Ship',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "sailboat",
    size: 15
  })
}, {
  id: 'air',
  label: 'Air',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "plane",
    size: 15
  })
}, {
  id: 'bus',
  label: 'Bus',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "bus",
    size: 15
  })
}, {
  id: 'car',
  label: 'Rent a car',
  icon: /*#__PURE__*/React.createElement(Icon, {
    name: "car-front",
    size: 15
  })
}];
function HeroSearch({
  go
}) {
  const [tab, setTab] = React.useState('hotels');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: SEARCH_TABS,
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr .9fr auto',
      gap: 'var(--space-4)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: tab === 'hotels' ? 'Destination or property' : 'Route',
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 16
    }),
    defaultValue: tab === 'hotels' ? "Cox's Bazar" : 'Teknaf → Saint Martin'
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Check in",
    type: "date",
    defaultValue: "2026-03-12"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Check out",
    type: "date",
    defaultValue: "2026-03-14"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Guests",
    options: [{
      label: '2 adults',
      value: '2'
    }, {
      label: '2 adults, 1 child',
      value: '3'
    }, {
      label: '4 adults',
      value: '4'
    }],
    defaultValue: "2"
  }), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }),
    onClick: () => go('search'),
    style: {
      paddingLeft: 'var(--space-6)',
      paddingRight: 'var(--space-6)'
    }
  }, "Search")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)',
      marginRight: 4
    }
  }, "Popular:"), ["Cox's Bazar", 'Saint Martin', 'Sajek', 'Tanguar Haor', 'Bandarban'].map(p => /*#__PURE__*/React.createElement(Tag, {
    key: p,
    label: p,
    onClick: () => go('search')
  }))));
}
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      paddingTop: 'var(--space-16)',
      paddingBottom: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.IMG.hero,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(5,30,61,.82) 0%, rgba(5,30,61,.62) 45%, rgba(247,249,251,1) 100%)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      maxWidth: 720,
      marginBottom: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      alignSelf: 'flex-start',
      padding: '6px 12px',
      borderRadius: 'var(--radius-full)',
      background: 'rgba(255,255,255,.14)',
      border: '1px solid rgba(255,255,255,.22)',
      color: '#fff',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 14
  }), "12 travel services \xB7 one account"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-5xl)',
      fontWeight: 'var(--weight-bold)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-tight)',
      color: '#fff'
    }
  }, "Book the whole trip, not just the ticket."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'rgba(255,255,255,.86)',
      maxWidth: 560
    }
  }, "Hotels, houseboats, ship and air tickets you can confirm right now \u2014 plus corporate tours, packages and visa help handled by a real person.")), /*#__PURE__*/React.createElement(HeroSearch, {
    go: go
  })));
}
function ServiceGrid({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      marginTop: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    eyebrow: "Everything we do",
    title: "Twelve services, two ways to book",
    action: /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "teal",
      variant: "solid"
    }, "Instant"), /*#__PURE__*/React.createElement(Badge, {
      tone: "brand",
      variant: "outline"
    }, "On request"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-4)'
    }
  }, window.SERVICES.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go(s.mode === 'instant' ? 'search' : 'request');
    },
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(ServiceTile, {
    s: s
  })))));
}
function ServiceTile({
  s
}) {
  const [hover, setHover] = React.useState(false);
  const instant = s.mode === 'instant';
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 'var(--space-5)',
      height: '100%',
      boxSizing: 'border-box',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hover ? 'translateY(-2px)' : 'none',
      transition: 'all var(--duration-normal) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: instant ? 'var(--teal-50)' : 'var(--navy-50)',
      color: instant ? 'var(--teal-600)' : 'var(--navy-700)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 21
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)',
      flex: 1
    }
  }, s.blurb), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      color: instant ? 'var(--teal-700)' : 'var(--navy-700)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, instant ? 'Book instantly' : 'Request a quote', /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 13
  })));
}
function ListingCard({
  l,
  go
}) {
  return /*#__PURE__*/React.createElement(Card, {
    image: l.img,
    imageHeight: 168,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('detail');
    },
    padding: "sm",
    badge: l.offer ? /*#__PURE__*/React.createElement(Badge, {
      tone: "gold",
      variant: "solid"
    }, l.offer) : /*#__PURE__*/React.createElement(Badge, {
      tone: "teal",
      variant: "solid"
    }, "Instant")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13
  }), l.place), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)',
      lineHeight: 'var(--leading-snug)'
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(window.Stars, {
    value: l.rating,
    size: 13
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy-800)'
    }
  }, l.rating), "(", l.reviews, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 2
    }
  }, l.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral"
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(window.Price, {
    amount: l.price,
    was: l.was
  })));
}
function OfferBand({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-16) auto 0',
      padding: '0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-xl)',
      background: 'var(--gradient-brand)',
      padding: 'var(--space-10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      maxWidth: 560,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid",
    size: "md"
  }, "Eid offer \xB7 ends 20 Mar"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 'var(--weight-bold)',
      color: '#fff',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Up to 25% off Cox\u2019s Bazar resorts + free houseboat day tour"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'rgba(255,255,255,.85)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "Two nights minimum. Applies to 40+ partner properties on Kolatoli and Marine Drive."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      marginTop: 'var(--space-2)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => go('search')
  }, "See offer hotels"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    style: {
      color: '#fff',
      border: '1px solid rgba(255,255,255,.35)'
    },
    onClick: () => go('request')
  }, "Ask on WhatsApp"))), /*#__PURE__*/React.createElement("img", {
    src: window.IMG.sunset,
    alt: "",
    style: {
      width: 320,
      height: 200,
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      flex: '0 0 auto'
    }
  })));
}
function Reviews() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-16) auto 0',
      padding: '0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    eyebrow: "Reviews",
    title: "What travellers say"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, window.REVIEWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.name,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(window.Stars, {
    value: r.rating
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-accent)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--gray-800)'
    }
  }, "\u201C", r.text, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: '50%',
      background: 'var(--navy-50)',
      color: 'var(--navy-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: 'var(--text-sm)'
    }
  }, r.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, r.place)))))));
}
function BlogTeasers() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-16) auto 0',
      padding: '0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    eyebrow: "Travel guides",
    title: "Plan before you pay",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "All guides")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, window.POSTS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.title,
    image: p.img,
    imageHeight: 150,
    padding: "sm",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--teal-700)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, p.cat, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-text-muted)',
      fontWeight: 400
    }
  }, "\xB7 ", p.read, " read")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)',
      lineHeight: 'var(--leading-snug)'
    }
  }, p.title)))));
}
function TrustStrip() {
  const items = [{
    icon: 'zap',
    title: 'Confirmed in minutes',
    body: 'Instant services issue tickets and vouchers straight to your account.'
  }, {
    icon: 'message-square-quote',
    title: 'Quotes within 2 hours',
    body: 'Corporate, group and visa requests get a written quotation, not a call-back maybe.'
  }, {
    icon: 'lock',
    title: 'Payments you recognise',
    body: 'bKash, Nagad and cards through SSLCommerz. No cash-in-advance to strangers.'
  }, {
    icon: 'headset',
    title: 'Humans on WhatsApp',
    body: 'Same team that took the booking answers the questions.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-16) auto 0',
      padding: 'var(--space-8) var(--space-6)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 'var(--space-8)'
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.title,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, i.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, i.body)))));
}
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(ServiceGrid, {
    go: go
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: 'var(--space-16) auto 0',
      padding: '0 var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    eyebrow: "Booked most this week",
    title: "Popular right now",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      onClick: () => go('search'),
      iconRight: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "See all")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, window.LISTINGS.slice(0, 3).map(l => /*#__PURE__*/React.createElement(ListingCard, {
    key: l.id,
    l: l,
    go: go
  })))), /*#__PURE__*/React.createElement(OfferBand, {
    go: go
  }), /*#__PURE__*/React.createElement(TrustStrip, null), /*#__PURE__*/React.createElement(Reviews, null), /*#__PURE__*/React.createElement(BlogTeasers, null));
}
Object.assign(window, {
  HomeScreen,
  ListingCard,
  ServiceTile,
  HeroSearch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/RequestScreen.jsx
try { (() => {
const {
  Button,
  Icon,
  Badge,
  Card,
  Tag,
  Input,
  Select,
  Checkbox,
  Radio,
  Toast,
  Tabs
} = window.YesTourBDDesignSystem_fa3831;
const REQUEST_TYPES = [{
  id: 'corporate',
  icon: 'briefcase',
  label: 'Corporate tour or event',
  blurb: 'Retreats, conferences, dealer meets'
}, {
  id: 'group',
  icon: 'users',
  label: 'Group / student tour',
  blurb: '10 guests or more'
}, {
  id: 'visa',
  icon: 'stamp',
  label: 'Visa assistance',
  blurb: 'Documents, appointment, submission'
}, {
  id: 'package',
  icon: 'package',
  label: 'Custom package',
  blurb: 'Built around your dates and budget'
}, {
  id: 'car',
  icon: 'car-front',
  label: 'Rent a car',
  blurb: 'Chader Gari, microbus, sedan'
}];
function RequestScreen({
  go
}) {
  const [type, setType] = React.useState('corporate');
  const [sent, setSent] = React.useState(false);
  const [contact, setContact] = React.useState('whatsapp');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-page)',
      paddingBottom: 'var(--space-12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--gradient-dusk)',
      padding: 'var(--space-12) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-narrow)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    variant: "solid",
    size: "md"
  }, "Request based \xB7 no payment now"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-4xl)',
      fontWeight: 'var(--weight-bold)',
      color: '#fff',
      letterSpacing: 'var(--tracking-tight)',
      lineHeight: 'var(--leading-tight)'
    }
  }, "Tell us the trip. We\u2019ll send the quotation."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      color: 'var(--navy-200)',
      lineHeight: 'var(--leading-relaxed)',
      maxWidth: 560
    }
  }, "Some trips are too specific for a booking form \u2014 34 people, three hotels, one bus. Fill this in and a coordinator replies within two working hours."))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      padding: 'var(--space-8)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, "1 \xB7 What do you need?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-3)'
    }
  }, REQUEST_TYPES.map(t => {
    const on = t.id === type;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setType(t.id),
      style: {
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-md)',
        background: on ? 'var(--navy-50)' : 'var(--color-bg-surface)',
        border: `1px solid ${on ? 'var(--navy-400)' : 'var(--color-border)'}`,
        boxShadow: on ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--duration-fast) var(--ease-standard)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? 'var(--navy-700)' : 'var(--color-text-muted)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 19
    })), /*#__PURE__*/React.createElement("strong", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--navy-900)'
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-muted)',
        lineHeight: 'var(--leading-normal)'
      }
    }, t.blurb));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, "2 \xB7 The details"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Destination(s)",
    required: true,
    placeholder: "e.g. Sylhet + Sreemangal"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Number of travellers",
    required: true,
    placeholder: "Select",
    options: [{
      label: '1–9',
      value: 'a'
    }, {
      label: '10–24',
      value: 'b'
    }, {
      label: '25–49',
      value: 'c'
    }, {
      label: '50+',
      value: 'd'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Preferred start date",
    type: "date"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Nights",
    type: "number",
    placeholder: "3"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Budget per person",
    placeholder: "Optional",
    options: [{
      label: 'Under ৳5,000',
      value: '1'
    }, {
      label: '৳5,000–15,000',
      value: '2'
    }, {
      label: '৳15,000+',
      value: '3'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Company / institution",
    placeholder: "Optional"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--gray-700)'
    }
  }, "Anything else we should plan around?"), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    placeholder: "Transport from Dhaka, one vegetarian meal per day, conference room for 40 on the second morning\u2026",
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',
      color: 'var(--color-text-primary)',
      padding: '10px 12px',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      resize: 'vertical',
      background: 'var(--color-bg-surface)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, ['Need transport', 'Need hotel', 'Need meals', 'Need event setup', 'Need guide'].map(x => /*#__PURE__*/React.createElement(Tag, {
    key: x,
    label: x,
    onClick: () => {}
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, "3 \xB7 How do we reach you?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Your name",
    required: true,
    defaultValue: "",
    placeholder: "Full name"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Mobile",
    required: true,
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "phone",
      size: 15
    }),
    placeholder: "+880 1XXX-XXXXXX"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    placeholder: "you@example.com",
    helperText: "We send the written quotation here."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--gray-700)'
    }
  }, "Reply on"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(Radio, {
    name: "reply",
    value: "whatsapp",
    label: "WhatsApp",
    checked: contact === 'whatsapp',
    onChange: () => setContact('whatsapp')
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "reply",
    value: "call",
    label: "Phone call",
    checked: contact === 'call',
    onChange: () => setContact('call')
  }), /*#__PURE__*/React.createElement(Radio, {
    name: "reply",
    value: "email",
    label: "Email",
    checked: contact === 'email',
    onChange: () => setContact('email')
  })))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "I agree to be contacted about this request.",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: () => setSent(true)
  }, "Send request"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "outline",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "message-circle",
      size: 17
    })
  }, "Send on WhatsApp instead")))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      position: 'sticky',
      top: 88
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)',
      color: 'var(--navy-900)'
    }
  }, "What happens next"), [['1', 'We read it', 'A coordinator, not a bot.'], ['2', 'Quotation in 2 hours', 'Written, itemised, in working hours.'], ['3', 'Adjust freely', 'Swap hotels, dates or transport.'], ['4', 'Pay 30% to hold', 'Balance before departure.']].map(([n, t, b]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: 'flex',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      flex: '0 0 auto',
      borderRadius: '50%',
      background: 'var(--teal-50)',
      color: 'var(--teal-700)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, b))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      background: 'var(--navy-900)',
      borderRadius: 'var(--radius-lg)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "headset",
    size: 20
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-base)'
    }
  }, "Rather just talk?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-200)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "Corporate desk, 9 AM \u2013 10 PM, seven days."), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: '#fff',
      textDecoration: 'none'
    }
  }, "+880 1XXX-XXXXXX")))), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 20,
      bottom: 92,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check-circle",
      size: 18
    }),
    title: "Request sent \u2014 REQ-2261",
    message: "A coordinator will reply on WhatsApp within two working hours.",
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "outline",
      onClick: () => {
        setSent(false);
        go('account');
      }
    }, "Track request"),
    onClose: () => setSent(false)
  })) : null);
}
Object.assign(window, {
  RequestScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/RequestScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SearchScreen.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Card,
  Tag,
  Tabs,
  Input,
  Select,
  Checkbox,
  Switch,
  Tooltip
} = window.YesTourBDDesignSystem_fa3831;
function FilterBlock({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      paddingBottom: 'var(--space-5)',
      borderBottom: '1px solid var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, title), children);
}
function SearchScreen({
  go
}) {
  const [sort, setSort] = React.useState('popular');
  const [view, setView] = React.useState('list');
  const [instantOnly, setInstantOnly] = React.useState(false);
  const [chips, setChips] = React.useState(["Cox's Bazar", '12–14 Mar', '2 adults']);
  const listings = window.LISTINGS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-page)',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy-900)',
      padding: 'var(--space-8) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr .9fr auto',
      gap: 'var(--space-4)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Destination",
    labelColor: "light",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 16
    }),
    defaultValue: "Cox's Bazar"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Check in",
    labelColor: "light",
    type: "date",
    defaultValue: "2026-03-12"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Check out",
    labelColor: "light",
    type: "date",
    defaultValue: "2026-03-14"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Guests",
    labelColor: "light",
    defaultValue: "2",
    options: [{
      label: '2 adults',
      value: '2'
    }, {
      label: '4 adults',
      value: '4'
    }]
  }), /*#__PURE__*/React.createElement(Button, {
    size: "md",
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }),
    style: {
      paddingLeft: 'var(--space-6)',
      paddingRight: 'var(--space-6)'
    }
  }, "Update"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-6)',
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      gap: 'var(--space-8)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 88,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-5)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, "Filters"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setChips([])
  }, "Clear")), /*#__PURE__*/React.createElement(FilterBlock, {
    title: "Booking type"
  }, /*#__PURE__*/React.createElement(Switch, {
    label: "Instant booking only",
    checked: instantOnly,
    onChange: (_, v) => setInstantOnly(v)
  })), /*#__PURE__*/React.createElement(FilterBlock, {
    title: "Service"
  }, ['Hotels & resorts', 'Houseboat tours', 'Ship tickets', 'Day tours', 'Attractions'].map((s, i) => /*#__PURE__*/React.createElement(Checkbox, {
    key: s,
    label: s,
    defaultChecked: i < 2
  }))), /*#__PURE__*/React.createElement(FilterBlock, {
    title: "Price per person"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u09F3 min"
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u09F3 max"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['Under ৳3,000', '৳3–6k', '৳6k+'].map(p => /*#__PURE__*/React.createElement(Tag, {
    key: p,
    label: p
  })))), /*#__PURE__*/React.createElement(FilterBlock, {
    title: "Guest rating"
  }, ['4.5 and above', '4.0 and above', '3.5 and above'].map(r => /*#__PURE__*/React.createElement(Checkbox, {
    key: r,
    label: r
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, "Can\u2019t find it?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-normal)'
    }
  }, "Tell us what you need and we\u2019ll quote it."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    fullWidth: true,
    onClick: () => go('request')
  }, "Request a quote"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)',
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Cox\u2019s Bazar \xB7 12\u201314 Mar"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)'
    }
  }, listings.length, " results \xB7 prices include VAT")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: [{
      id: 'popular',
      label: 'Popular'
    }, {
      id: 'price',
      label: 'Price'
    }, {
      id: 'rating',
      label: 'Rating'
    }],
    value: sort,
    onChange: setSort
  }), /*#__PURE__*/React.createElement(Tooltip, {
    label: view === 'grid' ? 'List view' : 'Grid view'
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: view === 'grid' ? 'list' : 'layout-grid',
      size: 18
    }),
    "aria-label": view === 'grid' ? 'List view' : 'Grid view',
    variant: view === 'grid' ? 'solid' : 'outline',
    onClick: () => setView(view === 'grid' ? 'list' : 'grid')
  })), /*#__PURE__*/React.createElement(Tooltip, {
    label: "Map view"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "map",
      size: 18
    }),
    "aria-label": "Map view",
    variant: view === 'map' ? 'solid' : 'ghost',
    onClick: () => setView(view === 'map' ? 'list' : 'map')
  })))), chips.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, chips.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    label: c,
    removable: true,
    onRemove: () => setChips(chips.filter(x => x !== c))
  }))) : null, view === 'map' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-16) var(--space-6)',
      textAlign: 'center',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gray-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map",
    size: 40
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      color: 'var(--navy-900)'
    }
  }, "Map view is not part of this UI kit"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 380,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-secondary)',
      lineHeight: 'var(--leading-relaxed)'
    }
  }, "No map design was supplied, so nothing was invented for it. The toggle is wired and ready for a real map surface."), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => setView('list')
  }, "Back to results")) : view === 'grid' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 'var(--space-4)'
    }
  }, listings.map(l => /*#__PURE__*/React.createElement(window.ListingCard, {
    key: l.id,
    l: l,
    go: go
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, listings.map(l => /*#__PURE__*/React.createElement(ResultRow, {
    key: l.id,
    l: l,
    go: go
  }))), view === 'map' ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Load more results")))));
}
function ResultRow({
  l,
  go
}) {
  const [hover, setHover] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: '260px 1fr 220px',
      gap: 0,
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transition: 'box-shadow var(--duration-normal) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.img,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      display: 'flex',
      gap: 6
    }
  }, l.offer ? /*#__PURE__*/React.createElement(Badge, {
    tone: "gold",
    variant: "solid"
  }, l.offer) : /*#__PURE__*/React.createElement(Badge, {
    tone: "teal",
    variant: "solid"
  }, "Instant")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "heart",
      size: 16,
      color: saved ? 'var(--red-500)' : 'currentColor'
    }),
    "aria-label": "Save",
    variant: "solid",
    size: "sm",
    onClick: () => setSaved(!saved),
    style: {
      background: 'rgba(255,255,255,.9)',
      color: 'var(--navy-800)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 13
  }), l.place), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--navy-900)'
    }
  }, l.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-secondary)'
    }
  }, /*#__PURE__*/React.createElement(window.Stars, {
    value: l.rating,
    size: 13
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--navy-800)'
    }
  }, l.rating), "(", l.reviews, " reviews)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 2
    }
  }, l.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
    key: t,
    tone: "neutral"
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 'auto',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--teal-700)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    size: 14
  }), "Free cancellation up to 48 hours before")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)',
      borderLeft: '1px solid var(--color-border)',
      background: 'var(--gray-50)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(window.Price, {
    amount: l.price,
    was: l.was
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)',
      marginTop: 4
    }
  }, "\u09F3", (l.price * 2).toLocaleString('en-US'), " total \xB7 2 guests")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: () => go('detail')
  }, "Book now"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    fullWidth: true,
    onClick: () => go('detail')
  }, "View details"))));
}
Object.assign(window, {
  SearchScreen,
  ResultRow
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SearchScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-chrome.jsx
try { (() => {
const {
  Button,
  IconButton,
  Icon,
  Badge,
  Input
} = window.YesTourBDDesignSystem_fa3831;
const NAV = [{
  id: 'home',
  label: 'Home'
}, {
  id: 'search',
  label: 'Hotels & Tours'
}, {
  id: 'tickets',
  label: 'Tickets'
}, {
  id: 'request',
  label: 'Corporate & Visa'
}, {
  id: 'blog',
  label: 'Travel guides'
}];
function Logo({
  height = 34,
  reverse = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark.png",
    alt: "",
    style: {
      height,
      width: height,
      objectFit: 'contain',
      borderRadius: 8,
      background: reverse ? 'rgba(255,255,255,.08)' : 'transparent'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 18,
      letterSpacing: 'var(--tracking-tight)',
      color: reverse ? '#fff' : 'var(--navy-800)'
    }
  }, "YesTour", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--teal-400)'
    }
  }, "BD")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontSize: 10.5,
      letterSpacing: 'var(--tracking-wide)',
      color: reverse ? 'var(--navy-200)' : 'var(--color-text-muted)',
      marginTop: 3
    }
  }, "all-in-one travel marketplace")));
}
function SiteHeader({
  route,
  go
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,.92)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--space-6)',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('home');
    },
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      marginRight: 'auto'
    }
  }, NAV.map(n => {
    const on = n.id === route;
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: "#",
      onClick: e => {
        e.preventDefault();
        go(n.id);
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: on ? 'var(--weight-semibold)' : 'var(--weight-medium)',
        color: on ? 'var(--navy-800)' : 'var(--color-text-secondary)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        paddingBottom: 3,
        borderBottom: `2px solid ${on ? 'var(--teal-400)' : 'transparent'}`
      }
    }, n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--teal-700)',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone-call",
    size: 16
  }), "+880 1XXX-XXXXXX"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => go('account'),
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Sign in"))));
}
function SocialLink({
  label,
  slug
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    title: label,
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-sm)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'var(--teal-600)' : hover ? 'var(--teal-500)' : 'transparent',
      border: `1px solid ${hover || active ? 'transparent' : 'rgba(255,255,255,.18)'}`,
      transition: 'background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `https://cdn.simpleicons.org/${slug}/ffffff`,
    alt: "",
    style: {
      width: 16,
      height: 16,
      display: 'block'
    }
  }));
}
function SiteFooter({
  go
}) {
  const col = (title, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-semibold)',
      color: '#fff',
      letterSpacing: 'var(--tracking-wide)'
    }
  }, title), items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--navy-200)',
      textDecoration: 'none',
      fontFamily: 'var(--font-body)'
    }
  }, i)));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--gradient-dusk)',
      color: '#fff',
      marginTop: 'var(--space-20)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-16) var(--space-6) var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    reverse: true
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      lineHeight: 'var(--leading-relaxed)',
      color: 'var(--navy-200)',
      maxWidth: 300
    }
  }, "Every major travel service in Bangladesh, booked or quoted in one place. Talk to a human any time on WhatsApp."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, [['Facebook', 'facebook'], ['Instagram', 'instagram'], ['YouTube', 'youtube']].map(([label, slug]) => /*#__PURE__*/React.createElement(SocialLink, {
    key: slug,
    label: label,
    slug: slug
  })))), col('Instant booking', ['Hotels & resorts', 'Houseboat tours', 'Saint Martin ship', 'Air tickets', 'Bus tickets', 'Fish World tickets']), col('On request', ['Corporate tours', 'Group tours', 'Event management', 'Visa assistance', 'Custom packages', 'Rent a car']), col('Company', ['About YesTourBD', 'Travel guides', 'Offers', 'Contact & support', 'Refund policy', 'Terms'])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,.12)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-5) var(--space-6)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--navy-200)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 YesTourBD. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "bKash"), /*#__PURE__*/React.createElement("span", null, "Nagad"), /*#__PURE__*/React.createElement("span", null, "Visa"), /*#__PURE__*/React.createElement("span", null, "Mastercard"), /*#__PURE__*/React.createElement("span", null, "SSLCommerz")))));
}
function ContactDock() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      right: 20,
      bottom: 20,
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    title: "WhatsApp",
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-full)',
      background: 'var(--teal-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 24
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    title: "Call",
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--radius-full)',
      background: 'var(--navy-800)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 22
  })));
}
function SectionHead({
  eyebrow,
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'var(--space-6)',
      marginBottom: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-wider)',
      textTransform: 'uppercase',
      color: 'var(--teal-600)'
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--navy-900)'
    }
  }, title)), action);
}
function Stars({
  value = 5,
  size = 14
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 1,
      color: 'var(--gold-500)'
    }
  }, [1, 2, 3, 4, 5].map(i => {
    const on = i <= Math.round(value);
    return /*#__PURE__*/React.createElement(Icon, {
      key: i,
      name: "star",
      size: size,
      color: on ? 'var(--gold-500)' : 'var(--gray-300)',
      filled: on
    });
  }));
}
function Price({
  amount,
  was,
  suffix = 'per person'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 7,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 'var(--weight-bold)',
      color: 'var(--navy-800)'
    }
  }, "\u09F3", amount.toLocaleString('en-US')), was ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-muted)',
      textDecoration: 'line-through'
    }
  }, "\u09F3", was.toLocaleString('en-US')) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--color-text-muted)'
    }
  }, suffix));
}
Object.assign(window, {
  Logo,
  SiteHeader,
  SiteFooter,
  ContactDock,
  SectionHead,
  Stars,
  Price,
  SocialLink,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/site-data.js
try { (() => {
// Fake content for the YesTourBD website UI kit.
const IMG = {
  hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=70',
  houseboat: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=70',
  marine: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=900&q=70',
  saintMartin: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=70',
  resort: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=70',
  sylhet: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&q=70',
  fishWorld: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=70',
  car: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=70',
  sunset: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=70'
};
const SERVICES = [{
  id: 'hotels',
  icon: 'bed-double',
  label: 'Hotel & Resort',
  mode: 'instant',
  blurb: '340+ properties in Cox\u2019s Bazar, Sylhet, Bandarban'
}, {
  id: 'houseboat',
  icon: 'ship',
  label: 'Houseboat Tour',
  mode: 'instant',
  blurb: 'Tanguar Haor & Cox\u2019s Bazar houseboats'
}, {
  id: 'stmartin',
  icon: 'sailboat',
  label: 'Saint Martin Ship',
  mode: 'instant',
  blurb: 'Karnaphuli, Bay One, Keari Sindbad'
}, {
  id: 'daytour',
  icon: 'sun',
  label: 'Houseboat Day Tour',
  mode: 'instant',
  blurb: 'Cox\u2019s Bazar, departs 9:00 AM daily'
}, {
  id: 'marine',
  icon: 'route',
  label: 'Marine Drive Tour',
  mode: 'instant',
  blurb: 'Inani, Himchari, Patuartek'
}, {
  id: 'car',
  icon: 'car-front',
  label: 'Rent a Car',
  mode: 'request',
  blurb: 'Chader Gari, microbus, sedan with driver'
}, {
  id: 'fish',
  icon: 'fish',
  label: 'Radiant Fish World',
  mode: 'instant',
  blurb: 'Skip-the-counter entry tickets'
}, {
  id: 'air',
  icon: 'plane',
  label: 'Air Ticket',
  mode: 'instant',
  blurb: 'Domestic & international fares'
}, {
  id: 'bus',
  icon: 'bus',
  label: 'Bus Ticket',
  mode: 'instant',
  blurb: 'AC & non-AC coaches nationwide'
}, {
  id: 'package',
  icon: 'package',
  label: 'Package Tour',
  mode: 'request',
  blurb: 'Family, honeymoon & student packages'
}, {
  id: 'corporate',
  icon: 'briefcase',
  label: 'Corporate & Events',
  mode: 'request',
  blurb: 'Retreats, conferences, group logistics'
}, {
  id: 'visa',
  icon: 'stamp',
  label: 'Visa Assistance',
  mode: 'request',
  blurb: 'Documents, appointment & submission'
}];
const LISTINGS = [{
  id: 1,
  title: 'Cox\u2019s Bazar Houseboat Day Tour',
  place: 'Cox\u2019s Bazar',
  img: IMG.houseboat,
  price: 3200,
  was: 4000,
  rating: 4.8,
  reviews: 214,
  tags: ['Full day', 'Lunch included'],
  mode: 'instant',
  offer: '20% OFF'
}, {
  id: 2,
  title: 'Saint Martin Ship \u2014 Bay One',
  place: 'Teknaf \u2192 Saint Martin',
  img: IMG.saintMartin,
  price: 3400,
  rating: 4.6,
  reviews: 431,
  tags: ['Business deck', 'Return ticket'],
  mode: 'instant'
}, {
  id: 3,
  title: 'Sayeman Beach Resort',
  place: 'Kolatoli, Cox\u2019s Bazar',
  img: IMG.resort,
  price: 8900,
  was: 11500,
  rating: 4.7,
  reviews: 1280,
  tags: ['Sea view', 'Breakfast'],
  mode: 'instant',
  offer: 'Deal'
}, {
  id: 4,
  title: 'Marine Drive Full-Day Tour',
  place: 'Inani \u2192 Patuartek',
  img: IMG.marine,
  price: 2400,
  rating: 4.5,
  reviews: 96,
  tags: ['AC car', '8 hours'],
  mode: 'instant'
}, {
  id: 5,
  title: 'Tanguar Haor Houseboat \u2014 2N',
  place: 'Sunamganj, Sylhet',
  img: IMG.sylhet,
  price: 6500,
  rating: 4.9,
  reviews: 152,
  tags: ['2 nights', 'All meals'],
  mode: 'instant'
}, {
  id: 6,
  title: 'Radiant Fish World Entry',
  place: 'Cox\u2019s Bazar',
  img: IMG.fishWorld,
  price: 700,
  rating: 4.3,
  reviews: 58,
  tags: ['Skip counter'],
  mode: 'instant'
}];
const REVIEWS = [{
  name: 'Nusrat Jahan',
  place: 'Dhaka',
  text: 'Booked the houseboat day tour at 11 PM and had the confirmation in nine minutes. The pickup was exactly where they said it would be.',
  rating: 5
}, {
  name: 'Tanvir Ahmed',
  place: 'Chattogram',
  text: 'We needed 34 seats and three rooms for an office retreat. Sent the request, got a quotation the same afternoon.',
  rating: 5
}, {
  name: 'Shahriar Kabir',
  place: 'Sylhet',
  text: 'Ship tickets to Saint Martin are usually a phone-call marathon. This was two screens.',
  rating: 4
}];
const POSTS = [{
  title: 'Saint Martin in December: what the ship schedule actually looks like',
  cat: 'Travel guide',
  read: '6 min',
  img: IMG.saintMartin
}, {
  title: 'Chader Gari to Sajek: costs, timings and the honest bits',
  cat: 'Rent a car',
  read: '4 min',
  img: IMG.car
}, {
  title: 'Nine things to pack for a Tanguar Haor houseboat night',
  cat: 'Houseboat',
  read: '3 min',
  img: IMG.sylhet
}];
const BOOKINGS = [{
  ref: 'YTB-8H2K41',
  title: 'Cox\u2019s Bazar Houseboat Day Tour',
  date: '12 Mar 2026',
  pax: '2 adults',
  total: 6400,
  status: 'confirmed',
  img: IMG.houseboat
}, {
  ref: 'YTB-7QW903',
  title: 'Sayeman Beach Resort \u2014 2 nights',
  date: '12\u201314 Mar 2026',
  pax: 'Deluxe sea view',
  total: 17800,
  status: 'paid',
  img: IMG.resort
}, {
  ref: 'YTB-5RT188',
  title: 'Corporate retreat \u2014 34 pax',
  date: 'Apr 2026 (tentative)',
  pax: 'Awaiting quotation',
  total: null,
  status: 'request',
  img: IMG.sylhet
}];
Object.assign(window, {
  IMG,
  SERVICES,
  LISTINGS,
  REVIEWS,
  POSTS,
  BOOKINGS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/site-data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
