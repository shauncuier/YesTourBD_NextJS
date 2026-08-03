'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar, AdminTopBar } from './chrome.jsx';
import c from './admin.module.css';

// Holds the one piece of state the layout has: whether the drawer is open below 900px. The
// staff details and the sign-out action come from the server layout above it.
export function AdminShell({ staff, signOutAction, title, subtitle, actions, children }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const close = React.useCallback(() => setMenuOpen(false), []);

  // A drawer left open across a navigation covers the page it just opened.
  const [lastPath, setLastPath] = React.useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  React.useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div className={c.shell}>
      <AdminSidebar staff={staff} open={menuOpen} onClose={close} signOutAction={signOutAction} />
      <div className={c.scrim} data-open={menuOpen ? 'true' : 'false'} onClick={close} aria-hidden="true" />
      <div className={c.main}>
        <AdminTopBar title={title} subtitle={subtitle} actions={actions} onOpenMenu={() => setMenuOpen(true)} />
        <div className={c.content}>{children}</div>
      </div>
    </div>
  );
}
