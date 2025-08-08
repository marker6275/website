"use client";

import { AnimatedContent } from "../reactbits";

export function SectionAboutMe() {
  return (
    <div className="flex">
      <div className="py-5 w-full sm:w-1/2">
        <AnimatedContent
          distance={450}
          direction="horizontal"
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
        <AnimatedContent
          distance={450}
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
          <hr className="mx-10 sm:mx-15" />
        </AnimatedContent>
        <AnimatedContent
          distance={450}
          direction="horizontal"
          reverse={false}
          duration={1.5}
          ease="bounce3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.2}
        >
          <div className="font-extralight text-xl sm:text-2xl py-5 px-10 sm:px-15">
            <p>
              Hi! My name is Mark Li. I'm a recent graduate from{" "}
              <span className="text-purple-700">Northwestern University</span>{" "}
              with a BS/MS in Computer Science and a BA in Music.
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
      </div>
    </div>
  );
}
