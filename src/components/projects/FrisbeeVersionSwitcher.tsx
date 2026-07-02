'use client';

import { useState } from 'react';

const VERSIONS = [
  {
    label: 'V1',
    src: '/assets/project_images/FrisbeeTracker/v1_demo.mp4',
    title: 'USA vs. Belgium 2025 U24 Mens World Championship',
  },
  {
    label: 'V2',
    src: '/assets/project_images/FrisbeeTracker/v2_demo.mp4',
    title: 'USA vs. Belgium 2025 U24 Mens World Championship',
  },
];

export function FrisbeeVersionSwitcher() {
  const [selected, setSelected] = useState(VERSIONS.length - 1);

  return (
    <div className="py-3">
      <div className="flex justify-center pb-3">
        <div className="relative flex rounded-full bg-gray-300 p-1">
          <div
            className="absolute inset-y-1 left-1 rounded-full bg-blue-400 shadow-sm transition-transform duration-300 ease-out"
            style={{
              width: `calc((100% - 0.5rem) / ${VERSIONS.length})`,
              transform: `translateX(${selected * 100}%)`,
            }}
          />
          {VERSIONS.map((v, i) => (
            <button
              key={v.label}
              type="button"
              onClick={() => setSelected(i)}
              className={`relative z-10 flex-1 px-5 py-1 rounded-full font-medium cursor-pointer transition-colors duration-300 ${
                i === selected ? 'text-white' : 'text-gray-600'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="relative w-1/2 aspect-video">
          {VERSIONS.map((v, i) => (
            <video
              key={v.label}
              controls
              preload="metadata"
              muted
              className={`absolute inset-0 h-full w-full rounded-md object-contain transition-opacity duration-300 ease-out ${
                i === selected ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <source src={v.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>

      <p
        key={selected}
        className="pt-2 text-center text-sm text-gray-500 motion-safe:animate-[fadeIn_0.3s_ease-out]"
      >
        {VERSIONS[selected].title}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
