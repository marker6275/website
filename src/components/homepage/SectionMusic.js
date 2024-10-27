import { MusicCard } from "../cards";
import info from "../../info.json";
import { Link } from "react-router-dom";

export function SectionMusic() {
  const randomIndex = Math.floor(Math.random() * info[0].length);
  const featuredMusic = info[0][randomIndex];

  return (
    <div className="flex-col align-items py-20">
      <h1 className="font-medium text-5xl flex justify-center pb-10">Music</h1>
      <div className="flex justify-center">
        <MusicCard
          id={featuredMusic.id}
          title={featuredMusic.title}
          link={featuredMusic.link}
          month={parseInt(featuredMusic.date.substring(0, 2), 10) - 1}
          year={featuredMusic.date.substring(featuredMusic.date.length - 4)}
          composer={featuredMusic.composer}
          channel={
            featuredMusic.channel ? featuredMusic.channel : info[1].youtube
          }
        />
      </div>
      <div className="px-36 font-bold flex justify-center mt-5">
        <Link to="/music">
          <div>
            <span className="text-md bg-[#4c5659] text-white p-3 rounded-md hover:bg-[#647175] duration-300">
              All Music
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
