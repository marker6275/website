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
        {projects.map((item) => (
          <ProjectCard
            key={item.name}
            name={item.name}
            color={item.color}
            description={item.description}
            image={item.image}
            link={item.link}
          >
            {item.body}
          </ProjectCard>
        ))}
      </div>
    </div>
  );
}

