import { ProjectsMasonry } from "@/components/projects";
import { projects } from "@/utils";

export const metadata = {
  title: "Projects | Mark Li",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full min-w-0 max-w-6xl overflow-x-clip px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Projects
        </h1>
        <ProjectsMasonry projects={projects} />
      </main>
    </div>
  );
}
