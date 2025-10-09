import { AnimatedContent } from "../../reactbits";
import Link from "next/link";

export function ProjectsText() {
  return (
    <div className="px-10 sm:px-24 sm:py-16 font-light text-xl sm:text-2xl font-light flex flex-col items-center sm:block">
      <AnimatedContent
        distance={50}
        direction="horizontal"
        reverse={false}
        duration={1}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <p>
          I love creating things and bringing ideas to life - pretty much
          anything that sounds interesting.
        </p>
        <br />
        <p>
          If you’d like to collaborate or build something together, feel free to
          reach out!
        </p>
      </AnimatedContent>
      <br />
      <AnimatedContent
        distance={50}
        direction="horizontal"
        reverse={false}
        duration={1}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.2}
      >
        <Link href="/projects">
          <button className=" px-8 py-4 rounded-md duration-300 transition-all hover:-translate-y-1 border-2 border-blue-500/75  bg-white hover:bg-blue-300/20 cursor-pointer">
            Check out all my projects
          </button>
        </Link>
      </AnimatedContent>
    </div>
  );
}
