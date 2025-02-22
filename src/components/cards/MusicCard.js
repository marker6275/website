import { colors, months } from "../../utils";

export function MusicCard({ id, title, link, month, year, composer, channel }) {
  return (
    <a href={channel} target="_blank" rel="noreferrer">
      <div
        className={`mb-5 bg-[#fefefe] w-[680px] h-[440px] drop-shadow-2xl flex flex-col items-center justify-center rounded-xl border-4 ${colors[id][0]} ${colors[id][1]} ${colors[id][2]} transition duration-500`}
      >
        <h1 className="text-2xl px-2 pt-2">{title}</h1>
        <p className="text-sm pb-2">
          Written by:<span className="font-medium"> {composer}</span>
        </p>
        <iframe
          width="640"
          height="350"
          title={title}
          allowFullScreen
          src={link}
          loading="lazy"
        />
        <p className="text-md self-end px-5 font-light">
          {months[month]} {year}
        </p>
      </div>
    </a>
  );
}
