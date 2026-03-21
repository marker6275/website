"use client";

import { MusicTitle } from "./MusicTitle";
import { HomepageDivider } from "../shared";
import { MusicText } from "./MusicText";
import { MusicContent } from "./MusicContent";

export function SectionMusic() {
  return (
    <div className="py-5 sm:py-10 overflow-x-hidden w-full relative">
      <MusicTitle />
      <HomepageDivider hide={true} />
      <div className="grid md:grid-cols-2">
        <MusicText />
        <MusicContent />
      </div>
    </div>
  );
}
