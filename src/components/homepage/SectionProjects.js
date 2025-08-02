import { HomeProjectCard } from "../cards";
import { projects } from "../../utils";
import Link from "next/link";

export function SectionProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="py-5">
      <h1 className="font-light text-5xl flex justify-center py-10">
        Projects
      </h1>
      <div className="lg:grid lg:grid-cols-3 flex flex-col lg:flex-col gap-8 lg:gap-20 px-6 lg:px-12 py-6 lg:py-10">
        {featuredProjects.map((project) => (
          <HomeProjectCard
            key={project.name}
            name={project.name}
            color={project.color}
            text={project.text}
            link={project.link}
          >
            {project.body}
          </HomeProjectCard>
        ))}
      </div>

      <div className="flex justify-center my-10">
        <Link href="/projects">
          <div>
            <span className="text-md bg-neutral-800 text-white p-3 rounded-md hover:bg-neutral-800/80 duration-250">
              All Projects
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
