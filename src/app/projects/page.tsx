import { ProjectsMasonry } from '@/components/projects';
import { PageBanner } from '@/components/banner';
import { projects } from '@/utils';

export const metadata = {
  title: 'Projects | Mark Li',
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen overflow-x-hidden pt-24 pb-12 select-none">
      <PageBanner title="Projects" dotClassName="rounded-sm bg-blue-700" />
      <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 sm:px-6 lg:px-8 mt-10">
        <ProjectsMasonry projects={projects} />
      </main>
    </div>
  );
}
