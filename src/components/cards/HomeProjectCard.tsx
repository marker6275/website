'use client';
import Link from 'next/link';
import { getProjectSlug } from '@/utils';
import type { HomeProjectCardProps } from '@/types/components';

export function HomeProjectCard({
  name,
  color,
  children,
  link,
}: HomeProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (link && !link.startsWith('/')) {
      e.preventDefault();
      window.open(link, '_blank');
    }
  };

  const projectSlug = getProjectSlug({ name });
  const projectPath = `/projects/${projectSlug}`;
  const hasBody = !!children && !link;
  const opensNewTab = !!link && !link.startsWith('/');

  const cardContent = (
    <div
      onClick={link && !link.startsWith('/') ? handleClick : undefined}
      className={`relative border-2 border-slate-800/70 bg-white font-extralight h-24 lg:h-32 rounded-lg flex items-center text-2xl sm:text-3xl hover:cursor-pointer ${color.text} transition-all duration-300 p-10 hover:-translate-y-0.5 hover:shadow-md flex justify-start sm:justify-center`}
    >
      {name}
      {opensNewTab ? (
        <span
          className="pointer-events-none absolute bottom-2 right-2 text-slate-400"
          aria-label="Opens in a new tab"
          title="Opens in a new tab"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </span>
      ) : null}
    </div>
  );

  if (hasBody) {
    return <Link href={projectPath}>{cardContent}</Link>;
  }

  if (link?.startsWith('/')) {
    return <a href={link}>{cardContent}</a>;
  }

  return <div>{cardContent}</div>;
}
