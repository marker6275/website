import { MusicCard } from "../cards";
import info from "../../info.json";
import Link from "next/link";

export function SectionMusic() {
  const randomIndex = Math.floor(Math.random() * info.music.length);
  const featuredMusic = info.music[randomIndex];

  return (
    <div className="py-4">
      <h1 className="font-light text-5xl flex justify-center py-10">Music</h1>
      <div className="flex justify-center py-6">
        <MusicCard
          id={featuredMusic.id}
          title={featuredMusic.title}
          link={featuredMusic.link}
          month={parseInt(featuredMusic.date.substring(0, 2), 10) - 1}
          year={featuredMusic.date.substring(featuredMusic.date.length - 4)}
          composer={featuredMusic.composer}
          channel={
            featuredMusic.channel ? featuredMusic.channel : info.contact.youtube
          }
        />
      </div>
      <div className="flex justify-center mt-10">
        <Link href="/music">
          <div>
            <span className="text-md bg-neutral-800 text-white p-3 rounded-md hover:bg-neutral-800/80 duration-250">
              All Music
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
