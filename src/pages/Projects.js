import ProjectCard from "../components/ProjectCard";
import NotFound from "../assets/not_found.jpg";

function Projects() {
    
    return (
        <div className="bg-[#EBE8E2] h-fill flex flex-col items-center justify-center">
            <h1 className="text-6xl font-semibold mt-6 mb-20">
                My Projects
            </h1>
            <div className="grid grid-cols-2 flex justify-items-center w-full gap-y-20 p-10">
                <ProjectCard image={NotFound} title="Title" intro="intro" show="true"/>
                <ProjectCard image={NotFound} title="Real title" intro="totally legit intro"/>
                <ProjectCard image={NotFound} title="Real title" intro="totally legit intro"/>
            </div>
        </div>
    )
}

export default Projects;