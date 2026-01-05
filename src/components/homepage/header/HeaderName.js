import { AnimatedContent } from "../../reactbits";

export function HeaderName() {
  return (
    <AnimatedContent
      distance={100}
      direction="horizontal"
      reverse={false}
      duration={1}
      delay={0.2}
      ease="bounce3.out"
    >
      <h1 className="text-slate-800 sm:text-6xl duration-300">Mark Li</h1>
    </AnimatedContent>
  );
}
