import { AnimatedContent } from "../../reactbits";

export function AboutMeTitle() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={true}
      duration={1.5}
      ease="bounce3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.1}
    >
      <h1 className="text-center sm:text-start font-light text-3xl sm:text-5xl mx-2 sm:mx-10 py-2 sm:py-5 px-5">
        About Me
      </h1>
    </AnimatedContent>
  );
}
