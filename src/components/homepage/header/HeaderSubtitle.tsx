import { AnimatedContent } from "../../reactbits";

export function HeaderSubtitle() {
  return (
    <h2 className="ml-1 font-light tracking-wide text-sm sm:text-lg mt-1 text-slate-500 leading-relaxed">
      <AnimatedContent
        distance={100}
        direction="horizontal"
        reverse={false}
        duration={1}
        delay={0.4}
        ease="bounce3.out"
      >
        <span>Software Engineer | Musician</span>
      </AnimatedContent>
    </h2>
  );
}

