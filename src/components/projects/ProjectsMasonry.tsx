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

/**
 * Round-robin into columns so each horizontal “row” reads left → right in array order
 * (0, 1, 2 on the first row of tops, then 3, 4, 5, …) while column stacks handle uneven heights.
 */
export function ProjectsMasonry({ projects }: ProjectsMasonryProps) {
  const columnCount = useMasonryColumnCount();
  const columns = usePartitionedProjects(projects, columnCount);

  return (
    <div
      className="
        mt-10 flex w-full min-w-0 max-w-full flex-row gap-6 overflow-x-clip
        sm:gap-7
        lg:gap-8
      "
      aria-label="Projects"
    >
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className="flex min-w-0 flex-1 flex-col gap-6 sm:gap-7 lg:gap-8"
        >
          {column.map((project) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              color={project.color}
              description={project.description ?? ""}
              image={project.image}
              link={project.link}
              tags={project.tags}
            >
              {project.body}
            </ProjectCard>
          ))}
        </div>
      ))}
    </div>
  );
}
