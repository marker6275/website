import projects from '../misc/ProjectList';
import HomeProjectCard from '../cards/HomeProjectCard';
import { Link } from 'react-router-dom';

export default function SectionProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex-col align-items py-20 bg-[#F1F1F1]">
      <h1 className="font-medium text-5xl flex justify-center pb-10">Projects</h1>
      <div className="grid grid-cols-3 gap-20 px-36 py-10">
        {featuredProjects.map((project) => <HomeProjectCard name={project.name} color={project.color} text={project.text}>{project.body}</HomeProjectCard>)}
      </div>
      <Link to='/projects'>
        <div className='px-36 text-[#495497] font-bold text-lg'>
          All projects {'>'}{'>'}
        </div>
      </Link>
    </div>
  );
}
