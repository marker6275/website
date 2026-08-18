'use client';

import { ProjectsTitle } from './ProjectsTitle';
import { ProjectsList } from './ProjectsList';
import { ProjectsText } from './ProjectsText';

export function SectionProjects() {
  return (
    <div className="py-10 sm:py-14 px-6 w-full sm:px-10 relative select-none">
      <ProjectsTitle />
      <div className="grid md:grid-cols-2">
        <ProjectsList />
        <ProjectsText />
      </div>
    </div>
  );
}
