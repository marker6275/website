"use client";
import Link from "next/link";
import { getProjectSlug } from "../../utils";

export function HomeProjectCard({ name, color, children, link }) {
  const handleClick = (e) => {
    if (link) {
      e.preventDefault();
      window.open(link, "_blank");
    }
  };

  const projectSlug = getProjectSlug({ name });
  const projectPath = `/projects/${projectSlug}`;
  const hasBody = !!children && !link;

  const cardContent = (
    <div
      onClick={link ? handleClick : undefined}
      className={`border-2 border-slate-800/70 bg-white font-extralight h-24 lg:h-32 rounded-lg flex items-center text-2xl sm:text-3xl hover:cursor-pointer ${color.text} transition-all duration-300 p-10 hover:-translate-y-0.5 hover:shadow-md flex justify-start sm:justify-center`}
    >
      {name}
    </div>
  );

  if (hasBody) {
    return <Link href={projectPath}>{cardContent}</Link>;
  }

  return <div>{cardContent}</div>;
}
