"use client";

import { AnimatedContent } from "../../reactbits";
import type { HomepageDividerProps } from "../../../types/components/homepage";

export function HomepageDivider({ hide }: HomepageDividerProps) {
  return (
    <AnimatedContent
      distance={100}
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
      <hr className={`mx-10 sm:mx-15 ${hide ? "sm:hidden" : ""}`} />
    </AnimatedContent>
  );
}

