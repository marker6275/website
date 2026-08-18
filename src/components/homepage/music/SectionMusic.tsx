'use client';

import { MusicTitle } from './MusicTitle';
import { MusicText } from './MusicText';
import { MusicContent } from './MusicContent';

export function SectionMusic() {
  return (
    <div className="py-10 sm:py-14 px-6 sm:px-10 overflow-x-hidden w-full relative select-none">
      <MusicTitle />
      <div className="grid md:grid-cols-2">
        <MusicText />
        <MusicContent />
      </div>
    </div>
  );
}
