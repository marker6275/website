import { notFound } from "next/navigation";
import { getProjectBySlug, projects, generateSlug } from "../../../utils";
import Link from "next/link";

export async function generateStaticParams() {
  return projects
    .filter((project) => project.body && !project.link)
    .map((project) => ({
      slug: generateSlug(project.name),
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project || !project.body) {
    return {
      title: "Project Not Found | Mark Li",
    };
  }
  return {
    title: `${project.name} | Mark Li`,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.body) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center py-5 bg-slate-50 min-h-screen">
      <div className="w-full max-w-6xl px-5">
        <Link
          href="/projects"
          className="text-blue-600 hover:text-blue-800 underline mb-5 inline-block"
        >
          ← Back to Projects
        </Link>
        <div className="bg-white border-2 border-gray-600 rounded-xl shadow-md p-5 text-lg text-left text-pretty">
          {project.body}
        </div>
      </div>
    </div>
  );
}

