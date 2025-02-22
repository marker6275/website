import { HomeProjectCard } from "../cards";
import { projects } from "../../utils";
import { Link } from "react-router-dom";

export function SectionProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex-col align-items py-20">
      <h1 className="font-light text-5xl flex justify-center pb-10">
        Projects
      </h1>
      <div className="grid grid-cols-3 gap-20 px-36 py-10">
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
      <div className="px-36 text-blue-700 font-bold text-lg">
        <Link to="/projects">
          <div>
            <span className="underline">All projects</span> {">"}
            {">"}
          </div>
        </Link>
      </div>
    </div>
  );
}
