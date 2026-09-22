'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ResumeCard } from '@/components/cards';
import type { ResumeEntry } from '@/types/components';
import info from '@/data/personal-info.json';

const ENTRIES = info.resume as ResumeEntry[];

// Distance (px) from the viewport bottom where the scroll indicator sits.
const INDICATOR_OFFSET = 24;

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(true);

  const ordered = useMemo(() => {
    const dateValue = (d: { year: number; month: number } | 'present') =>
      d === 'present' ? Infinity : d.year * 12 + d.month;
    const sortKey = (entry: ResumeEntry) =>
      dateValue(entry.category === 'education' ? entry.end : entry.start);
    return [...ENTRIES].sort((a, b) => sortKey(b) - sortKey(a));
  }, []);

  useEffect(() => {
    const update = () => {
      const element = containerRef.current;

      if (!element) {
        return;
      }

      const { bottom } = element.getBoundingClientRect();
      setAtEnd(bottom <= window.innerHeight - INDICATOR_OFFSET + 1);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <div ref={containerRef} className="relative">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-200" />
        <div className="flex flex-col md:gap-6">
          {ordered.map((entry) => (
            <ResumeCard key={entry.id} entry={entry} />
          ))}
        </div>

        {/* Rides down the timeline axis while there's more below, then rests at its end. */}
        <div
          className="sticky h-0 z-10 pointer-events-none"
          style={{ bottom: INDICATOR_OFFSET }}
        >
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Scroll for more"
            tabIndex={atEnd ? -1 : 0}
            className={`absolute bottom-0 left-0 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 ring-1 ring-gray-200 shadow-sm transition-opacity duration-300 hover:text-gray-600 ${
              atEnd ? 'opacity-0' : 'opacity-100 pointer-events-auto'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
