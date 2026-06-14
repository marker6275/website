'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export type Accent = {
  label: string;
  bullet: string;
  ring: string;
  /** gradient start color for the tile background, e.g. "from-amber-50" */
  tile: string;
  /** tinted background for the icon chip, e.g. "bg-amber-100" */
  iconBg: string;
};

export type NowItem = {
  title: string;
  description?: string;
};

export type NowSection = {
  title: string;
  icon: string;
  accent: Accent;
  /** A paragraph (or several) shown at the top of the modal. */
  body?: string;
  items: NowItem[];
};

function SectionModal({
  section,
  show,
  onClose,
}: {
  section: NowSection;
  show: boolean;
  onClose: () => void;
}) {
  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center p-0 transition-opacity duration-200 sm:items-center sm:p-6 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!show}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="now-modal-title"
        className={`relative flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl transition-all duration-200 sm:rounded-2xl ${
          show ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-7 py-5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-2xl">
              {section.icon}
            </span>
            <h2
              id="now-modal-title"
              className={`text-xs font-semibold uppercase tracking-widest ${section.accent.label}`}
            >
              {section.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-2 -mt-1 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-7 py-6">
          {section.body && (
            <p className="whitespace-pre-line text-[15px] leading-relaxed text-slate-600">
              {section.body}
            </p>
          )}

          {section.items.length > 0 && (
            <ul className={`space-y-2.5 ${section.body ? 'mt-6' : ''}`}>
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className={`rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 transition-colors hover:bg-white ${section.accent.ring}`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${section.accent.bullet}`}
                    />
                    <div className="min-w-0">
                      <p className="font-medium leading-snug text-slate-800">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function NowSections({ sections }: { sections: NowSection[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);

  const open = (i: number) => {
    setActive(i);
    setRender(true);
    // next frame so the entrance transition runs
    requestAnimationFrame(() => setShow(true));
  };

  const close = () => {
    setShow(false);
    window.setTimeout(() => {
      setRender(false);
      setActive(null);
    }, 200);
  };

  // Esc to close + lock background scroll while the modal is mounted.
  useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [render]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:h-[calc(100vh-9rem)] lg:grid-rows-2">
        {sections.map((section, i) => (
          <button
            key={section.title}
            type="button"
            onClick={() => open(i)}
            className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br ${section.accent.tile} to-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${section.accent.ring} sm:p-8`}
          >
            {/* oversized watermark icon */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-6 select-none text-[8rem] leading-none opacity-[0.06] transition-transform duration-300 group-hover:scale-110"
            >
              {section.icon}
            </span>

            <span
              className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${section.accent.iconBg} text-2xl shadow-sm`}
            >
              {section.icon}
            </span>

            <span className="relative">
              <span className="block text-2xl font-semibold tracking-tight text-slate-900">
                {section.title}
              </span>
              <span
                className={`mt-1.5 flex items-center gap-1.5 text-sm font-medium ${section.accent.label}`}
              >
                {section.items.length}{' '}
                {section.items.length === 1 ? 'thing' : 'things'}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {render && active !== null && (
        <SectionModal section={sections[active]} show={show} onClose={close} />
      )}
    </>
  );
}
