'use client';

import React from 'react';
import {
  ArrowRight, Baby, BedDouble, Briefcase, Bus, Calendar, CalendarCheck, CarFront,
  Check, ChevronDown, ChevronRight, CircleAlert, CircleCheck, CircleHelp, CircleMinus,
  CirclePlus, CircleX, Clock, Download, Ellipsis, EllipsisVertical, Fish, Headset,
  Heart, Images, LayoutDashboard, LayoutGrid, LifeBuoy, List, Lock, Luggage, Map,
  MapPin, Menu, MessageCircle, MessageSquareQuote, Minus, Package, Phone, PhoneCall, Plane,
  Plus, Route, Sailboat, Search, ShieldCheck, Ship, SlidersHorizontal, Stamp, Star, Sun, Ticket, Users,
  Utensils, X, Zap,
  // Admin panel (M1.4 onward).
  Bell, ChartColumn, CreditCard, Image, Layers, LogOut, Newspaper, Percent, Shield,
  TrendingDown, TrendingUp,
} from 'lucide-react';

// The design system's Icon reads Lucide off `window` from a CDN build. Here the set is
// imported explicitly so it survives SSR and stays out of the bundle's long tail — the
// props contract in Icon.d.ts is unchanged. Add to REGISTRY when a screen needs a new glyph.
const REGISTRY = {
  ArrowRight, Baby, BedDouble, Briefcase, Bus, Calendar, CalendarCheck, CarFront,
  Check, ChevronDown, ChevronRight, CircleAlert, CircleCheck, CircleHelp, CircleMinus,
  CirclePlus, CircleX, Clock, Download, Ellipsis, EllipsisVertical, Fish, Headset,
  Heart, Images, LayoutDashboard, LayoutGrid, LifeBuoy, List, Lock, Luggage, Map,
  MapPin, Menu, MessageCircle, MessageSquareQuote, Minus, Package, Phone, PhoneCall, Plane,
  Plus, Route, Sailboat, Search, ShieldCheck, Ship, SlidersHorizontal, Stamp, Star, Sun, Ticket, Users,
  Utensils, X, Zap,
  Bell, ChartColumn, CreditCard, Image, Layers, LogOut, Newspaper, Percent, Shield,
  TrendingDown, TrendingUp,
};

// Newer lucide builds renamed several icons; keep the familiar names working.
const ALIASES = {
  CheckCircle: 'CircleCheck', AlertCircle: 'CircleAlert', XCircle: 'CircleX',
  PlusCircle: 'CirclePlus', MinusCircle: 'CircleMinus', HelpCircle: 'CircleHelp',
  MoreHorizontal: 'Ellipsis', MoreVertical: 'EllipsisVertical',
};

function lookup(name) {
  if (!name) return null;
  const pascal = String(name).replace(/(^[a-z]|-[a-z0-9])/g, (m) => m.replace('-', '').toUpperCase());
  const hit = REGISTRY[pascal] || (ALIASES[pascal] ? REGISTRY[ALIASES[pascal]] : null);
  if (!hit && process.env.NODE_ENV !== 'production') {
    console.warn(`[Icon] "${name}" is not in the registry — add it to components/foundation/Icon.jsx`);
  }
  return hit || null;
}

/**
 * Thin wrapper around the Lucide icon set.
 * Colour is applied to the wrapper as CSS `color`, so `var(--…)` tokens work;
 * the SVG itself always strokes `currentColor`.
 */
export function Icon({ name, size = 20, color, strokeWidth = 2, filled = false, style, className }) {
  // Resolved through createElement rather than <Glyph />: the glyph is looked up from a
  // static registry, not defined during render, and JSX here trips react-hooks/static-components.
  const glyph = lookup(name);

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-flex', width: size, height: size, flex: '0 0 auto', lineHeight: 0, color, ...style }}
    >
      {glyph
        ? React.createElement(glyph, {
          width: size,
          height: size,
          stroke: 'currentColor',
          fill: filled ? 'currentColor' : 'none',
          strokeWidth,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        })
        : null}
    </span>
  );
}
