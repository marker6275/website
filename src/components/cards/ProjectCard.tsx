"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  inProgress,
}: ProjectCardProps) {
  const projectSlug = getProjectSlug({ name });
  const projectPath = `/projects/${projectSlug}`;
  const hasBody = !!children && !link;
  const tagsToRender = (tags ?? []).slice(0, 3);

  const primary = image?.trim() ?? "";
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [image]);

  const showImage = Boolean(primary) && !broken;

  const cardBody = (
    <div
      className={`
        relative flex min-w-0 w-full max-w-full flex-row gap-0 overflow-hidden rounded-lg border-2 border-slate-400/80 bg-white sm:flex-col
        shadow-sm transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${color.text} ${color.border.outer}
      `}
    >
      {inProgress ? (
        <span
          className="pointer-events-none absolute right-2 top-2 z-10 rounded-full border border-green-700/90 bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-black sm:right-2.5 sm:top-2.5 sm:px-2.5 sm:py-1 sm:text-xs"
          aria-label="In progress"
        >
          In Progress
        </span>
      ) : null}
      {showImage ? (
        <div className="flex h-28 w-28 min-w-0 shrink-0 items-center justify-center bg-white leading-none sm:h-auto sm:w-full sm:justify-start">
          <div className="relative h-28 w-28 overflow-hidden rounded-full sm:hidden">
            <Image
              src={primary}
              alt={name}
              width={112}
              height={112}
              sizes="112px"
              className="h-full w-full object-cover transition-transform duration-300"
              loading="lazy"
              decoding="async"
              onError={() => setBroken(true)}
            />
          </div>

          <div className="relative isolate hidden w-full min-w-0 max-w-full min-h-[10.5rem] overflow-hidden sm:flex sm:items-center sm:justify-center">
            <Image
              src={primary}
              alt={name}
              width={800}
              height={800}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 28vw"
              className="h-auto w-full min-w-0 max-w-full object-contain transition-transform duration-300"
              style={{ width: "100%", height: "auto", maxWidth: "100%" }}
              onError={() => setBroken(true)}
            />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1 px-3 py-3 text-left justify-center sm:flex-none sm:px-3.5 sm:py-3 sm:justify-start">
        <h2 className="text-sm font-semibold leading-tight text-slate-900 sm:text-lg">
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

  if (link?.startsWith("/")) {
    return (
      <Link
        href={link}
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
