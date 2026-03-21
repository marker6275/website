"use client";

import { ProjectsTitle } from "./ProjectsTitle";
import { HomepageDivider } from "../shared";
import { ProjectsList } from "./ProjectsList";
import { ProjectsText } from "./ProjectsText";

export function SectionProjects() {
  return (
    <div className="py-5 sm:py-10 w-full sm:mx-10 relative">
      <ProjectsTitle />
      <HomepageDivider hide={true} />
      <div className="grid md:grid-cols-2">
        <ProjectsList />
        <ProjectsText />
      </div>
    </div>
  );
}
