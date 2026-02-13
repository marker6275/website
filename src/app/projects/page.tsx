import { Project } from "@/types/projects";
import { ProjectCard } from "../../components/cards";
import { projects } from "../../utils";

export const metadata = {
  title: "Projects | Mark Li",
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center py-5 bg-slate-50">
      <h1 className="text-5xl my-5">Projects</h1>
      <div className="flex flex-col items-center grid md:grid-cols-2 lg:grid-cols-3 gap-16 p-10">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.name}
            name={project.name}
            color={project.color}
            description={project.description ?? ""}
            image={project.image}
            link={project.link}
          >
            {project.body}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}

