import { MusicCard } from "../../components/cards";
import data from "../../info.json";

export const metadata = {
  title: "Music | Mark Li",
};

export default function MusicPage() {
  const info = data.music;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full min-w-0 max-w-7xl overflow-x-clip px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-fit max-w-full min-w-0 flex-col items-start">
          <h1 className="text-start text-4xl font-semibold tracking-tight text-slate-900 lg:text-5xl">
            Music
          </h1>
          <div className="flex w-full flex-col items-start gap-x-20 gap-y-5 py-5 lg:grid lg:grid-cols-2 lg:justify-items-start">
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
        </div>
      </main>
    </div>
  );
}
