import { AnimatedContent } from "../../reactbits";

export function AboutMeText() {
  return (
    <AnimatedContent
      distance={200}
      direction="horizontal"
      reverse={false}
      duration={1.5}
      ease="bounce3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
    >
      <div className="font-light text-xl sm:text-2xl py-5 px-10 sm:px-15">
        <p>
          Hi! My name is Mark Li. I'm a recent graduate from{" "}
          <span className="text-purple-700">Northwestern University</span> with
          a BS/MS in Computer Science and a BA in Music.
        </p>
        <br />
        <p>
          I'm interested in sustainable computing, web design, and embedded
          systems, but I'm always willing to learn something new. Outside of
          programming, I enjoy making music, playing ultimate frisbee, and
          trying new foods.
        </p>
        <br />
        <p>If you want to chat, feel free to reach out!</p>
      </div>
    </AnimatedContent>
  );
}

