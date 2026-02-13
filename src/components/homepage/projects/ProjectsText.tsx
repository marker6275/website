import { AnimatedContent } from "../../reactbits";
import { HomepageButton } from "../shared";

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
          If you'd like to collaborate or build something together, feel free to
          reach out!
        </p>
      </AnimatedContent>
      <br />
      <HomepageButton
        text="Check out all my projects"
        href="/projects"
        reverse={false}
      />
    </div>
  );
}

