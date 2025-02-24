import {
  SectionAboutMe,
  SectionMusic,
  SectionProjects,
} from "../components/homepage";

export function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-200 via-white to-red-50 py-10">
      <SectionAboutMe />
      <SectionProjects />
      <SectionMusic />
    </div>
  );
}
