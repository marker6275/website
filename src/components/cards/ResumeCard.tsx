'use client';

import { useEffect, useRef, useState } from 'react';
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
      className="relative pl-8 pb-6 lg:pl-0 lg:pb-0 lg:grid lg:grid-cols-2"
    >
      <div
        className={`lg:hidden absolute left-0 top-0 bottom-0 w-px ${styles.bar}`}
        style={{ opacity: 0.4 }}
      />

      <div
        className={
          isLeft
            ? 'lg:flex lg:justify-end lg:pr-8'
            : 'lg:col-start-2 lg:flex lg:justify-start lg:pl-8'
        }
      >
        <div
          className={`relative bg-white rounded-xl ${isLeft ? 'lg:rounded-r-none' : 'lg:rounded-l-none'} ring-1 ${styles.ring} shadow-sm px-4 py-3 lg:px-5 lg:py-4 w-full max-w-md transition-all duration-700 ease-out ${
            visible
              ? 'opacity-100 translate-x-0 lg:translate-y-0'
              : `opacity-0 translate-x-4 ${isLeft ? 'lg:-translate-x-8' : 'lg:translate-x-8'} lg:translate-y-2`
          }`}
        >
          <div
            className={`hidden lg:block absolute top-0 bottom-0 w-1 ${styles.bar}`}
            style={{
              [isLeft ? 'right' : 'left']: 0,
              opacity: 0.8,
            }}
          />
          <div
            className={`flex items-center gap-2 mb-1.5 flex-wrap ${isLeft ? 'lg:justify-end' : 'lg:justify-start'}`}
          >
            <span className="text-xs text-gray-500">
              {formatDate(entry.start)} — {formatDate(entry.end)}
            </span>
          </div>
          <h3
            className={`font-semibold text-base lg:text-lg text-gray-900 leading-snug ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
          >
            {entry.role}
          </h3>
          <p
            className={`text-sm text-gray-700 mt-0.5 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
          >
            {entry.org}
          </p>
          {entry.location && (
            <p
              className={`text-xs text-gray-500 italic ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}
            >
              {entry.location}
            </p>
          )}
        </div>
      </div>

      <div
        className={`lg:hidden absolute left-[-5px] top-5 h-3 w-3 rounded-full ${styles.dot} ring-4 ring-[#FAFAF9] transition-transform duration-500`}
        style={{ transform: visible ? 'scale(1)' : 'scale(0)' }}
      />

      <div
        className={`hidden lg:block absolute top-7 h-px ${styles.bar} transition-all duration-700 ease-out`}
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
        className={`hidden lg:block absolute top-[22px] h-3 w-3 rounded-full ${styles.dot} ring-4 ring-[#FAFAF9] transition-transform duration-500 ease-out`}
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
