"use client";

import type { Project } from "@/types/projects";
import { ProjectCard } from "@/components/cards";
import {
  useMasonryColumnCount,
  usePartitionedProjects,
} from "./masonryColumns";

type ProjectsMasonryProps = {
  projects: Project[];
};

export function ProjectsMasonry({ projects }: ProjectsMasonryProps) {
  const columnCount = useMasonryColumnCount();
  const columns = usePartitionedProjects(projects, columnCount ?? 1);

  if (columnCount === null) {
    return <div className="mt-6 h-1 w-full" aria-hidden="true" />;
  }

  return (
    <div
      className="
        mt-6 flex w-full min-w-0 max-w-full flex-row items-start gap-4
        sm:gap-5
        lg:gap-5
      "
      aria-label="Projects"
    >
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className="flex min-w-0 flex-1 flex-col items-start gap-4 sm:gap-5 lg:gap-5"
        >
          {column.map((project) => (
            <div key={project.name} className="min-w-0 w-full">
              <ProjectCard
                name={project.name}
                color={project.color}
                description={project.description ?? ""}
                image={project.image}
                link={project.link}
                tags={project.tags}
                inProgress={project.inProgress}
              >
                {project.body}
              </ProjectCard>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
