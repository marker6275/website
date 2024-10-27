import {
  SectionAboutMe,
  SectionMusic,
  SectionProjects,
} from "../components/homepage";

export function Home() {
  return (
    <div>
      <SectionAboutMe />
      <SectionProjects />
      <SectionMusic />
    </div>
  );
}
