import ProjectCard from "../components/ProjectCard";
import ComingSoon from '../projects/ComingSoon.js'
import Website from "../projects/Website";
import PythonRedex from "../projects/PythonRedex.js";
import TextClassifier from "../projects/TextClassifier.js";

function Projects() {
    const projects = [TextClassifier, PythonRedex, Website, ComingSoon]

    return (
        <div className="bg-[#EBE8E2] h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-semibold mt-6 mb-20">
                My Projects
            </h1>
            <div className="grid grid-cols-2 flex justify-items-center w-full gap-y-20 p-10">
                {projects.map(item => (
                    <ProjectCard name={item.name} color={item.color}>{item.body}</ProjectCard>
                ))}
            </div>
            
        </div>
    )
}

export default Projects;