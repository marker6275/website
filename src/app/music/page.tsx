import { MusicCard } from '@/components/cards';
import { PageBanner } from '@/components/banner';
import data from '@/data/personal-info.json';

export const metadata = {
  title: 'Music | Mark Li',
};

export default function MusicPage() {
  const info = data.music;

  return (
    <div className="bg-[#FAFAF9] min-h-screen overflow-x-hidden pt-24 pb-12 select-none">
      <PageBanner
        title="Music"
        italic
        dotClassName="rounded-full bg-purple-700"
      />
      <div className="mx-auto flex w-fit max-w-full min-w-0 flex-col items-start px-6 mt-10">
        <div className="flex w-full flex-col items-start gap-x-20 gap-y-10 py-5 lg:grid lg:grid-cols-2 lg:justify-items-start">
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
    </div>
  );
}
