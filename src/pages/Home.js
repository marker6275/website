import { SectionAboutMe, SectionMusic, SectionProjects } from '../components/homepage';

export function Home() {
  return (
    <div className='bg-[#D2D3D6]'>
      <SectionAboutMe />
      <SectionProjects />
      <hr />
      <SectionMusic />
    </div>
  );
}
