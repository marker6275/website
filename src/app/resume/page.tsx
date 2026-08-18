import { Timeline } from '@/components/resume';
import { PageBanner } from '@/components/banner';

export const metadata = {
  title: 'Resume | Mark Li',
};

export default function ResumePage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen overflow-x-hidden pt-24 pb-12 select-none">
      <PageBanner
        title="Resume"
        dotClassName="rounded-full bg-red-700"
        accentClassName="border-gray-200"
        action={
          <a
            href="/assets/Mark_Li_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl border border-gray-300 bg-white px-5 py-2 text-base font-medium text-gray-600 transition-colors hover:border-gray-900 hover:text-gray-900 hover:bg-gray-100 hover:-translate-y-0.5"
          >
            View PDF Resume
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 3v5h5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6M9 17h6"
              />
            </svg>
          </a>
        }
      />
      <div className="mt-10">
        <Timeline />
      </div>
    </div>
  );
}
