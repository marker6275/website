"use client";

import { AnimatedContent } from "../../reactbits";
import { AboutMeTitle } from "./AboutMeTitle";
import { AboutMeText } from "./AboutMeText";
import { HomepageDivider } from "../shared";

export function SectionAboutMe() {
  return (
    <div className="flex">
      <div className="py-5 w-full md:w-1/2">
        <AboutMeTitle />
        <HomepageDivider hide={false} />
        <AboutMeText />
      </div>
    </div>
  );
}
