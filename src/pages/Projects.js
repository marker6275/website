import { ProjectCard } from "../components/cards";
import { projects } from "../utils";

export function Projects() {
  return (
    <div className="flex flex-col items-center py-10 min-h-screen">
      <h1 className="text-6xl font-medium mb-5">Projects</h1>
      <div className="grid grid-cols-2 flex justify-items-center gap-20 p-20">
        {projects.map((item) => (
          <ProjectCard name={item.name} color={item.color} skills={item.skills}>
            {item.body}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}
