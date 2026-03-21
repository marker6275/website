"use client";

import Image from "next/image";
import Link from "next/link";
import { getProjectSlug } from "../../utils";
import type { ProjectCardProps } from "../../types/components/cards";

export function ProjectCard({
  name,
  color,
  description,
  image,
  children,
  link,
  tags,
}: ProjectCardProps) {
  const projectSlug = getProjectSlug({ name });
  const projectPath = `/projects/${projectSlug}`;
  const hasBody = !!children && !link;
  const tagsToRender = (tags ?? []).slice(0, 3);

  const cardBody = (
    <div
      className={`
        flex min-w-0 w-full max-w-full flex-row gap-0 overflow-hidden rounded-lg border-2 border-slate-200/80 bg-white sm:flex-col
        shadow-sm transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${color.text} ${color.border.outer}
      `}
    >
      <div className="flex h-24 w-24 min-w-0 shrink-0 items-center justify-center bg-white leading-none sm:h-auto sm:w-full sm:justify-start">
        {image ? (
          <>
            <div className="relative h-24 w-24 overflow-hidden rounded-full sm:hidden">
              <Image
                src={image}
                alt={name}
                width={96}
                height={96}
                sizes="96px"
                className="h-full w-full object-cover transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="relative isolate hidden w-full min-w-0 max-w-full overflow-hidden sm:block">
              <Image
                src={image}
                alt={name}
                width={800}
                height={800}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 28vw"
                className="h-auto w-full min-w-0 max-w-full object-contain transition-transform duration-300"
                style={{ width: "100%", height: "auto", maxWidth: "100%" }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-sm font-medium text-slate-400 sm:hidden">
              {name.slice(0, 1)}
            </div>

            <div className="hidden sm:block">
              <div className="flex aspect-square w-full items-center justify-center bg-white text-sm font-medium text-slate-400">
                {name.slice(0, 1)}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 px-2.5 py-2.5 text-left justify-center sm:flex-none sm:px-3 sm:py-2.5 sm:justify-start">
        <h2 className="text-sm font-semibold leading-tight text-slate-900 sm:text-base">
          {name}
        </h2>
        {description ? (
          <p className="line-clamp-1 text-xs leading-snug text-slate-600 sm:line-clamp-2 sm:text-sm">
            {description}
          </p>
        ) : null}
        {tagsToRender.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {tagsToRender.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium leading-none text-slate-600 sm:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );

  if (hasBody) {
    return (
      <Link
        href={projectPath}
        className="block min-w-0 w-full max-w-full outline-offset-4"
      >
        {cardBody}
      </Link>
    );
  }

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block min-w-0 w-full max-w-full outline-offset-4"
      >
        {cardBody}
      </a>
    );
  }

  return <div className="min-w-0 w-full max-w-full">{cardBody}</div>;
}
