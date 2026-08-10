'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  USMap,
  type Point,
  type MapMarker,
  type GuessPair,
} from '@/components/nfl-geoguessr';
import type { NflGeoguessrTeam } from '@/lib/nfl-geoguessr/store';

const MAX_SCORE = 100;
const DECAY_K = 100 / Math.log(2);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function scoreFor(dist: number) {
  return Math.round(MAX_SCORE * Math.exp(-dist / DECAY_K));
}

type Phase = 'loading' | 'not-enough' | 'playing' | 'finished';

export default function NflGeoguessrPage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [rounds, setRounds] = useState<NflGeoguessrTeam[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [guess, setGuess] = useState<Point | null>(null);
  const [pastGuesses, setPastGuesses] = useState<MapMarker[]>([]);
  const [roundResults, setRoundResults] = useState<GuessPair[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  function startGame(teams: NflGeoguessrTeam[]) {
    const plotted = teams.filter((t) => t.x != null && t.y != null);
    if (plotted.length < 2) {
      setPhase('not-enough');
      return;
    }
    setRounds(shuffle(plotted));
    setRoundIndex(0);
    setTotalScore(0);
    setGuess(null);
    setPastGuesses([]);
    setRoundResults([]);
    setPhase('playing');
  }

  useEffect(() => {
    fetch('/nfl-geoguessr/api/')
      .then((r) => r.json())
      .then((data: NflGeoguessrTeam[]) => startGame(data));
  }, []);

  const current = rounds[roundIndex];
  const actual: Point | null = current
    ? { x: current.x as number, y: current.y as number }
    : null;

  const isLastRound = roundIndex === rounds.length - 1;

  function handleSubmit() {
    if (!guess || !actual) {
      return;
    }

    const s = scoreFor(distance(guess, actual));
    setTotalScore((prev) => prev + s);
    setPastGuesses((prev) => [...prev, guess]);
    setRoundResults((prev) => [...prev, { guess, actual, team: current.name }]);
    setGuess(null);
    if (isLastRound) {
      setPhase('finished');
    } else {
      setRoundIndex((i) => i + 1);
    }
  }

  useEffect(() => {
    if (phase !== 'playing' || !guess) {
      return;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Enter') handleSubmit();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  function handlePlayAgain() {
    fetch('/nfl-geoguessr/api/')
      .then((r) => r.json())
      .then((data: NflGeoguessrTeam[]) => startGame(data));
  }

  const progressLabel = useMemo(
    () => `Round ${roundIndex + 1} / ${rounds.length}`,
    [roundIndex, rounds.length],
  );

  if (phase === 'loading') {
    return (
      <div className="flex flex-1 items-center justify-center text-neutral-500">
        Loading…
      </div>
    );
  }

  if (phase === 'not-enough') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
        <h1 className="text-2xl font-semibold">Not enough teams plotted yet</h1>
        <p className="text-neutral-500 max-w-md text-lg">
          Plot at least two team locations before you can play.
        </p>
        <Link
          href="/nfl-geoguessr/admin"
          className="px-5 py-2.5 rounded bg-blue-600 text-white text-base font-medium"
        >
          Go to admin
        </Link>
      </div>
    );
  }

  if (phase === 'finished') {
    return (
      <div className="flex flex-col items-center gap-5 p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-3xl font-semibold">Game over</h1>

        <USMap pairs={roundResults} disabled />

        <p className="text-xl">
          Final score:{' '}
          <span className="font-bold">
            {totalScore} / {rounds.length * MAX_SCORE}
          </span>
        </p>
        <button
          onClick={handlePlayAgain}
          className="px-5 py-2.5 rounded bg-blue-600 text-white text-base font-medium"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 p-8 max-w-5xl mx-auto w-full">
      <div className="flex items-baseline justify-between w-full">
        <h1 className="text-2xl font-semibold">
          Where are the{' '}
          <span className="text-blue-600 dark:text-blue-400">
            {current?.name}
          </span>{' '}
          located?
        </h1>
        <span className="text-base text-neutral-500 shrink-0 ml-4">
          {progressLabel}
        </span>
      </div>

      <USMap
        onPick={setGuess}
        guess={guess}
        markers={pastGuesses}
        disabled={false}
      />

      <div className="w-full flex items-center justify-end min-h-[2.5rem]">
        <button
          onClick={handleSubmit}
          disabled={!guess}
          className="px-5 py-2.5 rounded bg-blue-600 text-white text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit guess
        </button>
      </div>
    </div>
  );
}
