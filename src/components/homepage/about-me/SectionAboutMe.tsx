'use client';

import { AboutMeTitle } from './AboutMeTitle';
import { AboutMeText } from './AboutMeText';

export function SectionAboutMe() {
  return (
    <div className="flex">
      <div className="py-10 sm:py-14 px-6 sm:px-10 w-full md:w-1/2 select-none">
        <AboutMeTitle />
        <AboutMeText />
      </div>
    </div>
  );
}
