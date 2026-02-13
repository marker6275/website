"use client";
import { useState, useEffect } from "react";
import { MusicCard } from "../../cards";
import info from "../../../info.json";
import { AnimatedContent } from "../../reactbits";

export function MusicContent() {
  const [featuredMusic, setFeaturedMusic] = useState<any>(null);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * info.music.length);
    setFeaturedMusic(info.music[randomIndex]);
  }, []);

  return (
    <AnimatedContent
      distance={100}
      direction="horizontal"
      reverse={false}
      duration={1.5}
      ease="bounce3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.2}
    >
      <div className="flex justify-center py-5 sm:py-10">
        {featuredMusic && (
          <MusicCard
            id={featuredMusic.id}
            title={featuredMusic.title}
            link={featuredMusic.link}
            month={parseInt(featuredMusic.date.substring(0, 2), 10) - 1}
            year={featuredMusic.date.substring(featuredMusic.date.length - 4)}
            composer={featuredMusic.composer}
            channel={
              featuredMusic.channel
                ? featuredMusic.channel
                : info.contact.youtube
            }
          />
        )}
      </div>
    </AnimatedContent>
  );
}

