import { ProjectCard } from "../components/cards";
import { projects } from "../utils";

export function Projects() {
  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-b from-blue-200 via-white to-sky-100">
      <h1 className="text-5xl mb-5 ">Projects</h1>
      <div className="grid grid-cols-2 flex justify-items-center gap-10 p-10">
        {projects.map((item) => (
          <ProjectCard
            name={item.name}
            color={item.color}
            skills={item.skills}
            description={item.description}
            image={item.image}
          >
            {item.body}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}
