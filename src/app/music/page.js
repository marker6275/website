import { MusicCard } from "../../components/cards";
import data from "../../info.json";

export default function MusicPage() {
  const info = data.music;

  return (
    <div className="flex flex-col py-5 items-center bg-gradient-to-b from-blue-200 via-white to-red-50">
      <h1 className="text-5xl my-5">Music</h1>
      <div className="flex flex-col items-center py-10 px-5 gap-x-20 gap-y-10 lg:grid lg:grid-cols-2">
        {info.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
