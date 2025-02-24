import { MusicCard } from "../cards";
import info from "../../info.json";
import { Link } from "react-router-dom";

export function SectionMusic() {
  const randomIndex = Math.floor(Math.random() * info.music.length);
  const featuredMusic = info.music[randomIndex];

  return (
    <div>
      <h1 className="font-light text-5xl flex justify-center my-10">Music</h1>
      <div className="flex justify-center my-5">
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
        <Link to="/music">
          <div>
            <span className="text-md bg-[#444] text-white p-3 rounded-md hover:bg-[#555] duration-300">
              All Music
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
