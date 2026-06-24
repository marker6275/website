'use client';

import { useMemo } from 'react';
import { ResumeCard } from '@/components/cards';
import type { ResumeEntry } from '@/types/components';
import info from '@/data/personal-info.json';

const ENTRIES = info.resume as ResumeEntry[];

export function Timeline() {
  const ordered = useMemo(() => {
    const dateValue = (d: { year: number; month: number } | 'present') =>
      d === 'present' ? Infinity : d.year * 12 + d.month;
    const sortKey = (entry: ResumeEntry) =>
      dateValue(entry.category === 'education' ? entry.end : entry.start);
    return [...ENTRIES].sort((a, b) => sortKey(b) - sortKey(a));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8">
      <div className="relative">
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gray-200" />
        <div className="flex flex-col lg:gap-6">
          {ordered.map((entry) => (
            <ResumeCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
}
