'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ResumeCardProps } from '@/types/components';
import { formatDate, resumeCategoryStyles } from '@/utils';

const AXIS_GAP = 32;

export function ResumeCard({ entry }: ResumeCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const styles = resumeCategoryStyles[entry.category];
  const isLeft = entry.category === 'education';

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative pl-8 pb-6 md:pl-0 md:pb-0 md:grid md:grid-cols-2"
    >
      <div
        className={`md:hidden absolute left-0 top-0 bottom-0 w-px ${styles.bar}`}
        style={{ opacity: 0.4 }}
      />

      <div
        className={
          isLeft
            ? 'md:flex md:justify-end md:pr-8'
            : 'md:col-start-2 md:flex md:justify-start md:pl-8'
        }
      >
        <div
          className={`relative bg-white rounded-xl ${isLeft ? 'md:rounded-r-none' : 'md:rounded-l-none'} ring-1 ${styles.ring} shadow-sm px-4 py-3 md:px-5 md:py-4 w-full max-w-md transition-all duration-700 ease-out ${
            visible
              ? 'opacity-100 translate-x-0 md:translate-y-0'
              : `opacity-0 translate-x-4 ${isLeft ? 'md:-translate-x-8' : 'md:translate-x-8'} md:translate-y-2`
          }`}
        >
          <div
            className={`hidden md:block absolute top-0 bottom-0 w-1 ${styles.bar}`}
            style={{
              [isLeft ? 'right' : 'left']: 0,
              opacity: 0.8,
            }}
          />
          <div
            className={`flex items-start gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}
          >
            {entry.logo && (
              <div
                className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-lg ring-1 ${styles.ring}`}
              >
                <Image
                  src={entry.logo}
                  alt={`${entry.org} logo`}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1 text-left">
              <div
                className={`flex items-center gap-2 mb-1.5 flex-wrap justify-start ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
              >
                <span className="text-xs text-gray-500">
                  {formatDate(entry.start)} — {formatDate(entry.end)}
                </span>
              </div>
              <h3
                className={`font-semibold text-base md:text-lg text-gray-900 leading-snug ${isLeft ? 'md:text-right' : 'md:text-left'}`}
              >
                {entry.role}
              </h3>
              <p
                className={`text-sm text-gray-700 mt-0.5 ${isLeft ? 'md:text-right' : 'md:text-left'}`}
              >
                {entry.org}
              </p>
              {entry.location && (
                <p
                  className={`text-xs text-gray-500 italic ${isLeft ? 'md:text-right' : 'md:text-left'}`}
                >
                  {entry.location}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute left-[-5px] top-5 h-3 w-3 rounded-full ${styles.dot} ring-4 ring-[#FAFAF9] transition-transform duration-500`}
        style={{ transform: visible ? 'scale(1)' : 'scale(0)' }}
      />

      <div
        className={`hidden md:block absolute top-7 h-px ${styles.bar} transition-all duration-700 ease-out`}
        style={{
          [isLeft ? 'right' : 'left']: '50%',
          width: AXIS_GAP,
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: isLeft ? 'right center' : 'left center',
          opacity: visible ? 0.7 : 0,
          transitionDelay: '120ms',
        }}
      />

      <div
        className={`hidden md:block absolute top-[22px] h-3 w-3 rounded-full ${styles.dot} ring-4 ring-[#FAFAF9] transition-transform duration-500 ease-out`}
        style={{
          left: '50%',
          marginLeft: -6,
          transform: visible ? 'scale(1)' : 'scale(0)',
          transitionDelay: '320ms',
        }}
      />
    </div>
  );
}
