"use client";

import { useState, useEffect } from "react";
import { MusicCard } from "../cards";
import info from "../../info.json";
import Link from "next/link";
import { AnimatedContent } from "../reactbits";
import Image from "next/image";

export function SectionMusic() {
  const [featuredMusic, setFeaturedMusic] = useState(null);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * info.music.length);
    setFeaturedMusic(info.music[randomIndex]);
  }, [info.music]);

  return (
    <div className="py-5 sm:py-10 overflow-x-hidden sm:mx-15 relative">
      <AnimatedContent
        distance={450}
        direction="horizontal"
        reverse={true}
        duration={1.2}
        ease="bounce3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.2}
      >
        <div className="w-full sm:w-2/5 group">
          <Link href="/music">
            <div className="flex sm:justify-between justify-center items-center px-5 py-2 sm:py-5 sm:border-1 border-gray-800 sm:border-r-0 sm:border-t-0 cursor-pointer">
              <span
                className="absolute inset-0 bg-gradient-to-r from-blue-4000 sm:from-blue-400/50 z-0 to-white/0 origin-left transform scale-x-0 w-2/5
           group-hover:scale-x-100 transition-transform duration-500 ease-out"
              ></span>
              <h1 className="font-light text-3xl sm:text-5xl z-1 text-black">
                Music
              </h1>
              <Image
                src="/assets/icons/arrow.png"
                alt="arrow"
                width={100}
                height={100}
                className="size-12 z-1 hidden sm:block"
              />
            </div>
          </Link>
        </div>
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
      >
        <hr className="mx-10 sm:mx-15 sm:hidden" />
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
    </div>
  );
}
