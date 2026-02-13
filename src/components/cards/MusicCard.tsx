"use client";
import { colors, months } from "../../utils";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";
import type { MusicCardProps } from "../../types/components/cards";

export function MusicCard({ id, title, link, month, year, composer, channel }: MusicCardProps) {
  const isMobile = useSafeMediaQuery("(max-width: 767px)");
  const medium = useSafeMediaQuery("(max-width: 1023px)");
  const large = useSafeMediaQuery("(max-width: 1279px)");
  return (
    <a href={channel} target="_blank" rel="noreferrer">
      <div
        className={`bg-white w-[360px] md:w[360px] lg:w-[472px] xl:w-[600px] shadow-md flex flex-col items-center justify-center rounded-xl border-2 ${colors[id][0]} ${colors[id][2]} transition duration-400`}
      >
        <h1 className="text-2xl px-2 pt-2">{title}</h1>
        <p className="text-sm pb-2">
          Written by:<span className="font-medium"> {composer}</span>
        </p>
        <iframe
          width={isMobile ? "320" : medium ? "360" : large ? "432" : "560"}
          height={isMobile ? "180" : medium ? "180" : large ? "265" : "350"}
          title={title}
          allowFullScreen
          src={link}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <p className="text-md self-end px-5 font-light">
          {months[month]} {year}
        </p>
      </div>
    </a>
  );
}

