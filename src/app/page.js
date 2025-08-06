import {
  SectionHeader,
  SectionAboutMe,
  SectionMusic,
  SectionProjects,
} from "../components/homepage";

export const metadata = {
  title: "Mark Li",
  keywords: [
    "Mark Li",
    "software developer",
    "portfolio",
    "full-stack engineer",
    "musician",
  ],
};

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-200 via-white to-red-50 py-5 sm:py-10">
      <SectionHeader />
      <SectionAboutMe />
      <SectionProjects />
      <SectionMusic />
    </div>
  );
}
