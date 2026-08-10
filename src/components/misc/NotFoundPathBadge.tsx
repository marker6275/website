'use client';

import { useEffect, useState } from 'react';

export function NotFoundPathBadge() {
  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <span className="mb-8 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-xs text-slate-400">
      {path || '/unknown'}
    </span>
  );
}
