"use client";

import Link from "next/link";
import { AnimatedContent } from "../../reactbits";

export function HomepageButton({ text, href, reverse }) {
  return (
    <AnimatedContent
      distance={50}
      direction="horizontal"
      reverse={reverse}
      duration={1}
      ease="bounce3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.2}
    >
      <Link href={href}>
        <button className="px-8 py-4 rounded-md duration-300 transition-all hover:-translate-y-1 border-2 border-blue-500/75  bg-white hover:bg-blue-300/20 cursor-pointer font-normal">
          {text}
        </button>
      </Link>
    </AnimatedContent>
  );
}
