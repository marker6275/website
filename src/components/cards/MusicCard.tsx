'use client';
import { colors, months } from '@/utils';
import { useSafeMediaQuery } from '@/hooks';
import type { MusicCardProps } from '@/types/components';

export function MusicCard({
  id,
  title,
  link,
  month,
  year,
  composer,
  channel,
}: MusicCardProps) {
  const medium = useSafeMediaQuery('(max-width: 1023px)');
  const large = useSafeMediaQuery('(max-width: 1279px)');

  const videoId = link.split('/embed/')[1]?.split('?')[0];
  const thumbnailSrc = videoId
    ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
    : undefined;
  const watchUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : link;

  return (
    <div
      className={`bg-white w-[calc(100%-2rem)] mx-4 sm:mx-0 sm:w-[460px] lg:w-[500px] xl:w-[600px] max-w-full shadow-md flex flex-col items-start sm:items-center justify-center rounded-md border-2 ${colors[id][0]} ${colors[id][2]} transition duration-400 hover:-translate-y-1 hover:shadow-lg transition-all duration-800 ease-in-out`}
    >
      <a
        href={channel}
        target="_blank"
        rel="noopener noreferrer"
        className="contents"
      >
        <h1 className="text-2xl px-2 sm:px-0 pt-2 w-full max-w-full truncate text-left sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[560px]">
          {title}
        </h1>
        <p className="text-sm pb-2 px-2 sm:px-0 w-full max-w-full truncate text-left sm:max-w-[420px] lg:max-w-[460px] xl:max-w-[560px]">
          Written by: <span className="font-medium">{composer}</span>
        </p>
      </a>
      <iframe
        className="hidden sm:block"
        width={medium ? '420' : large ? '460' : '560'}
        height={medium ? '210' : large ? '265' : '350'}
        title={title}
        allowFullScreen
        src={link}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex sm:hidden items-center gap-3 border border-slate-300 rounded-md px-3 py-2 my-2 mx-2 w-[calc(100%-1rem)]"
      >
        {thumbnailSrc && (
          <img
            src={thumbnailSrc}
            alt={`${title} thumbnail`}
            width={128}
            height={72}
            className="rounded-sm object-cover shrink-0"
          />
        )}
        <span className="text-lg font-medium truncate min-w-0 flex-1 text-left">
          Watch on YouTube
        </span>
      </a>
      <a
        href={channel}
        target="_blank"
        rel="noopener noreferrer"
        className="contents"
      >
        <p className="text-md self-start md:self-end px-2 md:px-5 font-light w-full max-w-full truncate text-left md:text-right">
          {months[month]} {year}
        </p>
      </a>
    </div>
  );
}
