import {
  SectionAboutMe,
  SectionMusic,
  SectionProjects,
} from "../components/homepage";

export const metadata = {
  title: 'Mark Li',
  description: 'Personal website of Mark Li, software developer and amateur musician',
  keywords: ['Mark Li', 'software developer', 'portfolio', 'full-stack engineer', 'musician', 'React', 'Next.js'],
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-200 via-white to-red-100 py-10">
      <SectionAboutMe />
      <SectionProjects />
      <SectionMusic />
    </div>
  )
} 