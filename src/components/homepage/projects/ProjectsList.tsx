import { AnimatedContent } from "../../reactbits";
import { HomeProjectCard } from "../../cards";
import { featuredProjects } from "../../../utils";
import type { Project } from "../../../types/projects";

export function ProjectsList() {
  return (
    <div className="flex flex-col lg:flex-col gap-8 px-6 lg:px-15 py-6">
      {featuredProjects.map((project: Project, index: number) => {
        return (
        <AnimatedContent
          key={index}
          distance={100}
          direction="horizontal"
          reverse={true}
          duration={1.5}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0.2 * (index + 1)}
          className="overflow-y-visible"
        >
          <HomeProjectCard
            key={index}
            name={project.name}
            color={project.color}
            link={project.link}
          >
            {project.body}
          </HomeProjectCard>
        </AnimatedContent>
      );
      })}
    </div>
  );
}

