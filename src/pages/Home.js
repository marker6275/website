import SectionAboutMe from '../components/homepage/SectionAboutMe.js';
import SectionProjects from '../components/homepage/SectionProjects.js';

export default function Home() {
  return (
    <div className='bg-[#D2D3D6]'>
      <SectionAboutMe/>
      <SectionProjects/>
    </div>
  );
}
