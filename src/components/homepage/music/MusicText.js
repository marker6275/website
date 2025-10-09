import { AnimatedContent } from "../../reactbits";
import Link from "next/link";

export function MusicText() {
  return (
    <div className="px-10 sm:px-24 sm:py-16 font-light text-xl sm:text-2xl font-light flex flex-col items-center sm:block">
      <AnimatedContent
        distance={50}
        direction="horizontal"
        reverse={true}
        duration={1}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.1}
      >
        <p>
          I don’t ever want to lose my creative side through music. It’s
          something where I can keep exploring, learning, and evolving at my own
          pace - something to keep me sane.
        </p>
        <br />
        <p>Here's a glimpse at some of the pieces I’ve worked on so far.</p>
      </AnimatedContent>
      <br />
      <AnimatedContent
        distance={50}
        direction="horizontal"
        reverse={true}
        duration={1}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.2}
      >
        <Link href="/music">
          <button className="px-8 py-4 rounded-md duration-300 transition-all hover:-translate-y-1 border-2 border-blue-500/75  bg-white hover:bg-blue-300/20 cursor-pointer">
            All music
          </button>
        </Link>
      </AnimatedContent>
    </div>
  );
}
