import { colors, months } from "../../utils.js";

function MusicCard({id, title, link, month, year, composer, youtube}) {
    return (
        <a href={title === "Like The Movies (Cover)" ? "https://www.youtube.com/channel/UC6_aBGZxiOE6_REVYFSetcQ" : youtube} target="_blank" rel="noreferrer">
            <div className={`mb-5 bg-[#fefefe] w-[680px] h-[440px] drop-shadow-2xl flex flex-col items-center justify-center rounded-tr-xl rounded-bl-xl border-4 ${colors[id][0]} ${colors[id][1]} ${colors[id][2]} transition duration-500`}>
                <h1 className={`text-2xl px-2 pt-2 font-semibold`}>{title}</h1>
                <p className="text-sm pb-2 font-light">Written by:<span className="font-normal"> {composer}</span></p>
                <iframe width="640" height="360" title={title} allowFullScreen src={link} loading="lazy"/>
                <p className="text-md self-end px-5 font-medium">{months[month]} {year}</p>
            </div>
        </a>
    )
}

export default MusicCard;