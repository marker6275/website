import { MusicCard } from '@/components/cards';
import data from '@/data/personal-info.json';

export const metadata = {
  title: 'Music | Mark Li',
};

export default function MusicPage() {
  const info = data.music;

  return (
    <div className="min-h-screen bg-slate-50 select-none">
      <main className="mx-auto flex w-full min-w-0 max-w-7xl flex-col items-start px-4 pb-12 pt-10">
        <h1 className="text-4xl font-medium tracking-tight text-slate-900 sm:text-5xl">
          Music
        </h1>
        <div className="flex w-full flex-col items-start gap-x-20 gap-y-4 py-5 md:gap-y-10 lg:grid lg:grid-cols-2 lg:justify-items-start">
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
      </main>
    </div>
  );
}
