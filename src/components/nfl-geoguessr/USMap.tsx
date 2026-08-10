'use client';

import { MAP_WIDTH, MAP_HEIGHT } from '@/lib/nfl-geoguessr/constants';

export type Point = { x: number; y: number };

export type MapMarker = Point & {
  color?: string;
  label?: string;
  tooltip?: string;
};

export type GuessPair = {
  guess: Point;
  actual: Point;
  team: string;
};

interface USMapProps {
  onPick?: (p: Point) => void;
  guess?: Point | null;
  actual?: Point | null;
  markers?: MapMarker[];
  pairs?: GuessPair[];
  disabled?: boolean;
}

function pctLeft(x: number) {
  return `${(x / MAP_WIDTH) * 100}%`;
}
function pctTop(y: number) {
  return `${(y / MAP_HEIGHT) * 100}%`;
}

function Pin({ x, y, color = '#dc2626', label, tooltip }: MapMarker) {
  return (
    <div
      className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: pctLeft(x), top: pctTop(y) }}
    >
      {tooltip && (
        <span className="pointer-events-none absolute bottom-full z-10 mb-1.5 whitespace-nowrap rounded bg-neutral-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow transition-opacity duration-100 group-hover:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
          {tooltip}
        </span>
      )}
      <div
        className="w-4 h-4 rounded-full border-2 border-white shadow"
        style={{ backgroundColor: color }}
      />
      {label && (
        <span className="mt-0.5 text-xs font-medium bg-white/90 dark:bg-black/80 px-1 rounded whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

export function USMap({
  onPick,
  guess,
  actual,
  markers = [],
  pairs = [],
  disabled = false,
}: USMapProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled || !onPick) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();

    const fracX = (e.clientX - rect.left) / rect.width;
    const fracY = (e.clientY - rect.top) / rect.height;

    const x = Math.min(Math.max(fracX * MAP_WIDTH, 0), MAP_WIDTH);
    const y = Math.min(Math.max(fracY * MAP_HEIGHT, 0), MAP_HEIGHT);
    onPick({ x, y });
  }

  return (
    <div
      className={`relative w-full select-none rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white ${
        disabled ? '' : 'cursor-crosshair'
      }`}
      style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
      onClick={handleClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/usmap.svg"
        alt="Map of the United States"
        className="absolute inset-0 w-full h-full pointer-events-none"
        draggable={false}
      />
      {((actual && guess) || pairs.length > 0) && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        >
          {actual && guess && (
            <line
              x1={guess.x}
              y1={guess.y}
              x2={actual.x}
              y2={actual.y}
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          )}
          {pairs.map((p, i) => (
            <line
              key={i}
              x1={p.guess.x}
              y1={p.guess.y}
              x2={p.actual.x}
              y2={p.actual.y}
              stroke="#6b7280"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
          ))}
        </svg>
      )}
      {markers.map((m, i) => (
        <Pin key={i} {...m} />
      ))}
      {pairs.map((p, i) => (
        <Pin
          key={`guess-${i}`}
          x={p.guess.x}
          y={p.guess.y}
          color="#2563eb"
          tooltip={p.team}
        />
      ))}
      {pairs.map((p, i) => (
        <Pin
          key={`actual-${i}`}
          x={p.actual.x}
          y={p.actual.y}
          color="#16a34a"
          tooltip={p.team}
        />
      ))}
      {guess && <Pin x={guess.x} y={guess.y} color="#2563eb" label="Guess" />}
      {actual && (
        <Pin x={actual.x} y={actual.y} color="#16a34a" label="Actual" />
      )}
    </div>
  );
}
