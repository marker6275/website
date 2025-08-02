"use client";

import { ProjectCard } from "../../components/cards";
import { projects } from "../../utils";
import { useState } from "react";
import { ProjectPageButton } from "../../components/buttons";

export default function ProjectsPage() {
  const [pageNumber, setPageNumber] = useState(0);
  const numberOfPages = Math.ceil(projects.length / 4);

  return (
    <div className="flex flex-col items-center py-5 bg-gradient-to-b from-blue-200 via-white to-red-50 h-auto md:h-screen">
      <h1 className="text-5xl my-5">Projects</h1>
      <div className="flex flex-col items-center md:grid md:grid-cols-2 gap-10 p-10">
        {projects
          .slice(pageNumber * 4, Math.min(pageNumber * 4 + 4, projects.length))
          .map((item) => (
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
      <div className="flex justify-center gap-2">
        {Array.from({ length: numberOfPages }).map((_, index) => (
          <ProjectPageButton
            key={index}
            pageNumber={index}
            isActive={pageNumber === index}
            setPageNumber={setPageNumber}
          />
        ))}
      </div>
    </div>
  );
}
