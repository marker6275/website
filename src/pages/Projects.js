import ProjectCard from "../components/ProjectCard";
import ComingSoon from '../projects/ComingSoon.js'
import Website from "../projects/Website";

function Projects() {
    const projects = [<ComingSoon/>, <Website/>]

    return (
        <div className="bg-[#EBE8E2] h-fill flex flex-col items-center justify-center">
            <h1 className="text-6xl font-semibold mt-6 mb-20">
                My Projects
            </h1>
            <div className="grid grid-cols-2 flex justify-items-center w-full gap-y-20 p-10">
                {projects.map(item => (
                    <ProjectCard>{item}</ProjectCard>
                ))}
            </div>
            
        </div>
    )
}

export default Projects;