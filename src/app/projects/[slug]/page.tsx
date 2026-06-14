import { notFound } from "next/navigation";
import { getProjectBySlug, projects, generateSlug } from "@/utils";
import Link from "next/link";

export async function generateStaticParams() {
  return projects
    .filter((project) => !!project.body && !project.link)
    .map((project) => ({
      slug: generateSlug(project.name),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project?.body) {
    return {
      title: "Project Not Found | Mark Li",
    };
  }
  return {
    title: `${project.name} | Mark Li`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.body) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center py-5 bg-slate-50 min-h-screen">
      <div className="w-full max-w-6xl px-5">
        <Link
          href="/projects"
          className="group my-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 hover:shadow-md"
        >
          <svg
            className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        <div className="bg-white border-2 border-gray-600 rounded-xl shadow-md p-5 text-lg text-left">
          {project.body}
        </div>
      </div>
    </div>
  );
}
