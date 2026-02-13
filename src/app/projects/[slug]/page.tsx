import { notFound } from "next/navigation";
import { getProjectBySlug, projects, generateSlug } from "../../../utils";
import Link from "next/link";

export async function generateStaticParams() {
  return projects
    .filter((project) => !!project.body && !project.link)
    .map((project) => ({
      slug: generateSlug(project.name),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.body) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center py-5 bg-slate-50 min-h-screen">
      <div className="w-full max-w-6xl px-5">
        <div className="bg-blue-500 p-2 text-white w-40 my-4 rounded-xl text-center hover:bg-blue-600 hover:cursor-pointer duration-300 hover:shadow-md hover:-translate-y-0.5">
          <Link
            href="/projects"
          >
            &larr; Back to Projects
          </Link>
        </div>
        <div className="bg-white border-2 border-gray-600 rounded-xl shadow-md p-5 text-lg text-left">
          {project.body}
        </div>
      </div>
    </div>
  );
}

