'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  USMap,
  type Point,
  type MapMarker,
  type GuessPair,
} from '@/components/nfl-geography';
import type { NflGeographyTeam } from '@/lib/nfl-geography/store';

const MAX_SCORE = 100;
const DECAY_K = 100 / Math.log(2);

type SubmitStatus = 'idle' | 'saving' | 'saved' | 'error';

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

type Phase = 'loading' | 'not-enough' | 'enter-name' | 'playing' | 'finished';

export default function NflGeographyPage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [allTeams, setAllTeams] = useState<NflGeographyTeam[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [rounds, setRounds] = useState<NflGeographyTeam[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [guess, setGuess] = useState<Point | null>(null);
  const [pastGuesses, setPastGuesses] = useState<MapMarker[]>([]);
  const [roundResults, setRoundResults] = useState<GuessPair[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const hasPostedScore = useRef(false);

  function startGame(teams: NflGeographyTeam[]) {
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
    setSubmitStatus('idle');
    hasPostedScore.current = false;
    setPhase('playing');
  }

  useEffect(() => {
    fetch('/nfl-geography/api/')
      .then((r) => r.json())
      .then((data: NflGeographyTeam[]) => {
        setAllTeams(data);
        const plotted = data.filter((t) => t.x != null && t.y != null);
        setPhase(plotted.length < 2 ? 'not-enough' : 'enter-name');
      });
  }, []);

  useEffect(() => {
    if (phase !== 'finished' || hasPostedScore.current) return;
    hasPostedScore.current = true;
    setSubmitStatus('saving');
    fetch('/nfl-geography/api/leaderboard/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: playerName,
        score: totalScore,
      }),
    })
      .then((r) => setSubmitStatus(r.ok ? 'saved' : 'error'))
      .catch(() => setSubmitStatus('error'));
  }, [phase, playerName, totalScore]);

  function handleStartGame() {
    if (!playerName.trim()) {
      return;
    }
    startGame(allTeams);
  }

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
    fetch('/nfl-geography/api/')
      .then((r) => r.json())
      .then((data: NflGeographyTeam[]) => startGame(data));
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
          href="/nfl-geography/admin"
          className="px-5 py-2.5 rounded bg-blue-600 text-white text-base font-medium"
        >
          Go to admin
        </Link>
      </div>
    );
  }

  if (phase === 'enter-name') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
        <h1 className="text-2xl font-semibold">NFL Geography</h1>
        <p className="text-neutral-500 max-w-md text-lg">
          Enter your name to start.
        </p>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStartGame();
            }
          }}
          placeholder="Your name"
          maxLength={40}
          autoFocus
          className="w-64 px-4 py-2.5 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-base text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleStartGame}
          disabled={!playerName.trim()}
          className="px-5 py-2.5 rounded bg-blue-600 text-white text-base font-medium disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start Game
        </button>
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
        <p className="text-sm text-neutral-500 h-5">
          {submitStatus === 'saving' && 'Saving your score…'}
          {submitStatus === 'saved' && 'Score saved to the leaderboard!'}
          {submitStatus === 'error' && "Couldn't save your score."}
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
