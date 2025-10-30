import { AnimatedContent } from "../../reactbits";

export function MusicTitle() {
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={true}
      duration={1.2}
      ease="bounce3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={0}
    >
      <div className="flex justify-center items-center px-5 py-2 sm:pt-4 sm:pb-8">
        <h1 className="text-start font-light text-3xl sm:text-5xl text-black">
          Music
        </h1>
      </div>
    </AnimatedContent>
  );
}
