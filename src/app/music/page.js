"use client";

import { useState, useEffect } from "react";
import { MusicCard } from "../../components/cards";
import data from "../../info.json";
import { AnimatedContent } from "../../components/reactbits";
import Image from "next/image";

export default function MusicPage() {
  const info = data.music;
  const [showArrow, setShowArrow] = useState({
    load: true,
    reachedBottom: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - 100;
      if (isNearBottom) {
        setShowArrow({ load: false, reachedBottom: true });
      }
    };

    if (!showArrow.reachedBottom) {
      window.addEventListener("scroll", handleScroll);

      handleScroll();

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="flex flex-col py-5 items-center bg-gradient-to-b from-blue-200 via-white to-red-50">
      <h1 className="text-5xl my-5">Music</h1>
      <div className="flex flex-col items-center py-10 px-5 gap-x-20 gap-y-10 lg:grid lg:grid-cols-2">
        {info.map((item) => (
          <AnimatedContent
            key={item.id}
            initialOpacity={0}
            animateOpacity
            scale={1}
            threshold={0.2}
          >
            <MusicCard
              key={item.id}
              id={item.id}
              title={item.title}
              link={item.link}
              month={parseInt(item.date.substring(0, 2), 10) - 1}
              year={item.date.substring(item.date.length - 4)}
              composer={item.composer}
              channel={item.channel ? item.channel : data.contact.youtube}
            />
          </AnimatedContent>
        ))}
      </div>
      {showArrow.load && (
        <div className="fixed bottom-10 bg-emerald-600/45 rounded-full animate-bounce flex items-center justify-center p-1">
          <Image
            src="/assets/icons/down_arrow.png"
            alt="down_arrow"
            width={35}
            height={35}
          />
        </div>
      )}
    </div>
  );
}
