import { NowSections, type NowSection } from './NowSections';

export const metadata = {
  title: 'Now | Mark Li',
};

// Update this whenever you change the page — it's the whole point of a /now page.
const location = 'Chicago, IL';

const sections: NowSection[] = [
  {
    title: 'Projects',
    icon: '🛠️',
    accent: {
      label: 'text-amber-600',
      bullet: 'bg-amber-400',
      ring: 'hover:border-amber-300',
      tile: 'from-amber-50',
      iconBg: 'bg-amber-100',
    },
    body: 'A paragraph about what I’m building right now goes here — the why behind it, what I’ve learned, and where it’s headed next.',
    items: [
      {
        title: 'Kalshi Bot',
        description:
          'Trying to make back the money I spent on Claude Code, one event market at a time.',
      },
    ],
  },
  {
    title: 'Reading',
    icon: '📚',
    accent: {
      label: 'text-indigo-600',
      bullet: 'bg-indigo-400',
      ring: 'hover:border-indigo-300',
      tile: 'from-indigo-50',
      iconBg: 'bg-indigo-100',
    },
    body: 'What I’m reading and why — a paragraph on the ideas I’m chewing on at the moment.',
    items: [
      {
        title: 'Gödel, Escher, Bach',
        description: 'Douglas Hofstadter — minds, machines, and strange loops.',
      },
      {
        title: 'The Hitchhiker’s Guide to the Galaxy',
        description: 'Douglas Adams — a re-read, purely for fun.',
      },
    ],
  },
  {
    title: 'Music',
    icon: '🎵',
    accent: {
      label: 'text-rose-600',
      bullet: 'bg-rose-400',
      ring: 'hover:border-rose-300',
      tile: 'from-rose-50',
      iconBg: 'bg-rose-100',
    },
    body: 'A paragraph about what I’m playing and listening to lately.',
    items: [
      {
        title: 'Träumerei — Schumann',
        description: 'Slow and dreamy; working on the phrasing.',
      },
      {
        title: 'La Comparsa — Lecuona',
        description: 'A Cuban character piece I keep coming back to.',
      },
      {
        title: 'Congas',
        description: 'Learning to actually play the ones I own.',
      },
    ],
  },
  {
    title: 'Life',
    icon: '🌱',
    accent: {
      label: 'text-emerald-600',
      bullet: 'bg-emerald-400',
      ring: 'hover:border-emerald-300',
      tile: 'from-emerald-50',
      iconBg: 'bg-emerald-100',
    },
    body: 'A paragraph on what’s going on outside of work — goals, habits, and whatever I’m chasing right now.',
    items: [
      {
        title: 'A perfect brisket',
        description: 'Low and slow — still dialing in the bark.',
      },
      {
        title: 'FBI fitness test',
        description: 'Scoring at least 1 point in every category.',
      },
    ],
  },
];

export default function NowPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
              Now
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              What I'm up to these days
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <span aria-hidden>📍</span>
            {location}
          </span>
        </div>

        <NowSections sections={sections} />
      </main>
    </div>
  );
}
