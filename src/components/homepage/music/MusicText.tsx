import { AnimatedContent } from "../../reactbits";
import { HomepageButton } from "../shared";

export function MusicText() {
  return (
    <div className="px-10 py-6 sm:px-24 sm:py-16 font-light text-xl sm:text-2xl font-light flex flex-col items-center sm:block">
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
          I don't ever want to lose my creative side through music. It's
          something where I can keep exploring, learning, and evolving at my own
          pace - something to keep me sane.
        </p>
        <br />
        <p>Here's a glimpse at some of the pieces I've worked on so far.</p>
      </AnimatedContent>
      <br />
      <HomepageButton text="All music" href="/music" reverse={true} />
    </div>
  );
}

