import { AnimatedContent } from "../../reactbits";
import { HomeProjectCard } from "../../cards";
import { projects } from "../../../utils";

export function ProjectsList() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col lg:flex-col gap-8 px-6 lg:px-15 py-6">
      {featuredProjects.map((project, index) => (
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
            text={project.text}
            link={project.link}
          >
            {project.body}
          </HomeProjectCard>
        </AnimatedContent>
      ))}
    </div>
  );
}
