import { Timeline } from '@/components/resume';

export const metadata = {
  title: 'Resume | Mark Li',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 pt-10 pb-12 text-center select-none">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
        Resume
      </h1>
      <a
        href="/assets/Mark_Li_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900 pb-12"
      >
        View PDF resume
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 13h6M9 17h6"
          />
        </svg>
      </a>
      <Timeline />
    </div>
  );
}
