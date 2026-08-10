import Link from 'next/link';
import { NotFoundPathBadge } from '@/components/misc/NotFoundPathBadge';

export const metadata = {
  title: '404 | Mark Li',
};

export default function NotFound() {
  return (
    <div className="flex h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden bg-[#FAFAF9] px-6 text-center select-none">
      <NotFoundPathBadge />
      <span className="text-8xl font-thin text-slate-300 sm:text-9xl">
        404
      </span>
      <h1 className="mt-2 text-2xl font-light text-slate-800">
        Page not found
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 hover:shadow-md"
      >
        Back to home
      </Link>
    </div>
  );
}
