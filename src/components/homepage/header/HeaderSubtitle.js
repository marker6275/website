import { AnimatedContent } from "../../reactbits";

export function HeaderSubtitle() {
  return (
    <h2 className="ml-1 font-light text-sm sm:text-lg mt-1">
      <AnimatedContent
        distance={100}
        direction="horizontal"
        reverse={false}
        duration={1}
        delay={0.4}
        ease="bounce3.out"
      >
        <span className="text-gray-500">Software Developer</span>
      </AnimatedContent>
      <AnimatedContent
        distance={100}
        direction="horizontal"
        reverse={false}
        duration={1}
        delay={0.6}
        ease="bounce3.out"
      >
        <span className="text-gray-500">Amateur Musician</span>
      </AnimatedContent>
    </h2>
  );
}
