import { MusicCard } from "../../components/cards";
import data from "../../info.json";

export const metadata = {
  title: "Music | Mark Li",
};

export default function MusicPage() {
  const info = data.music;

  return (
    <div className="flex flex-col py-5 items-center bg-slate-50">
      <h1 className="text-5xl my-5">Music</h1>
      <div className="flex flex-col items-center py-10 px-5 gap-x-20 gap-y-10 lg:grid lg:grid-cols-2">
        {info.map((item: any) => (
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
      {/* {showArrow && !isMobile && (
        <div className="fixed bottom-10 bg-emerald-600/45 rounded-full animate-bounce flex items-center justify-center p-1">
          <Image
            src="/assets/icons/down_arrow.png"
            alt="down_arrow"
            width={35}
            height={35}
          />
        </div>
      )} */}
    </div>
  );
}

