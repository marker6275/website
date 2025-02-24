import { HomeProjectCard } from "../cards";
import { projects } from "../../utils";
import { Link } from "react-router-dom";

export function SectionProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="py-5">
      <h1 className="font-light text-5xl flex justify-center py-5">Projects</h1>
      <div className="md:grid md:grid-cols-3 flex flex-col md:flex-col gap-6 md:gap-20 px-6 md:px-12 py-6 md:py-10">
        {featuredProjects.map((project) => (
          <HomeProjectCard
            name={project.name}
            color={project.color}
            text={project.text}
          >
            {project.body}
          </HomeProjectCard>
        ))}
      </div>
      <div className="px-6 md:px-12 text-blue-700 font-light text-md">
        <Link to="/projects">
          <h1>
            <span className="underline">All projects</span> {">"}
            {">"}
          </h1>
        </Link>
      </div>
    </div>
  );
}
