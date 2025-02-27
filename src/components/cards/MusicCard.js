import { colors, months } from "../../utils";
import { useMediaQuery } from "react-responsive";

export function MusicCard({ id, title, link, month, year, composer, channel }) {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const medium = useMediaQuery({ query: "(max-width: 1023px)" });
  const large = useMediaQuery({ query: "(max-width: 1279px)" });
  return (
    <a href={channel} target="_blank" rel="noreferrer">
      <div
        className={`bg-[#fefefe] w-[360px] md:w[360px] lg:w-[472px] xl:w-[600px] drop-shadow-xl flex flex-col items-center justify-center rounded-xl border-4 ${colors[id][0]} ${colors[id][1]} ${colors[id][2]} transition duration-500`}
      >
        <h1 className="text-2xl px-2 pt-2">{title}</h1>
        <p className="text-sm pb-2">
          Written by:<span className="font-medium"> {composer}</span>
        </p>
        <iframe
          width={isMobile ? "320" : medium ? "320" : large ? "432" : "560"}
          height={isMobile ? "180" : medium ? "180" : large ? "265" : "350"}
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
