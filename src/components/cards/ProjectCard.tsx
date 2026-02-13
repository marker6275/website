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
}: ProjectCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (link) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        window.open(link, "_blank");
      }
    }
  };

  const projectSlug = getProjectSlug({ name });
  const projectPath = `/projects/${projectSlug}`;
  const hasBody = !!children && !link;

  const cardContent = (
    <div
      className={`group border-slate-800/70 cursor-pointer border-2 py-8 px-4 size-88 flex flex-col items-center rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 gap-2 overflow-hidden text-center ${color.text} ${color.border.hover}`}
      onClick={link ? handleClick : undefined}
    >
      {image && (
        <Image
          src={image}
          alt={name}
          width={64}
          height={64}
          className={`size-32 rounded-full object-cover border-2 ${color.border.solid} mb-4 group-hover:scale-105 duration-300`}
        />
      )}
      <div className="text-2xl font-semibold">{name}</div>
      <div className="font-light text-slate-800/70">{description}</div>
    </div>
  );

  if (hasBody) {
    return (
      <Link href={projectPath} className="relative w-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="relative w-full">{cardContent}</div>;
}

