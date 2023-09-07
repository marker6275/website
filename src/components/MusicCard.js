const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//   To add new colors
//   https://coolors.co/gradient-palette/1c49ff-ffffff?number=8

const colors = [
    ["text-[#1C49FF]", "hover:bg-[#E3E8FF]", "border-[#1C49FF]", "hover:border-[#E3E8FF]"],
    ["text-[#1C55E0]", "hover:bg-[#E3EAFB]", "border-[#1C55E0]", "hover:border-[#E3EAFB]"],
    ["text-[#1C61C2]", "hover:bg-[#E3EBF7]", "border-[#1C61C2]", "hover:border-[#E3EBF7]"],
    ["text-[#1C6DA3]", "hover:bg-[#E3EDF4]", "border-[#1C6DA3]", "hover:border-[#E3EDF4]"],
    ["text-[#1C7985]", "hover:bg-[#E3EEF0]", "border-[#1C7985]", "hover:border-[#E3EEF0]"],
    ["text-[#1C8566]", "hover:bg-[#E3F0EC]", "border-[#1C8566]", "hover:border-[#E3F0EC]"],
    ["text-[#1C9148]", "hover:bg-[#E3F1E8]", "border-[#1C9148]", "hover:border-[#E3F1E8]"],
    ["text-[#1C9D29]", "hover:bg-[#E3F3E4]", "border-[#1C9D29]", "hover:border-[#E3F3E4]"]
];

function MusicCard({id, title, link, month, year, composer, youtube}) {
    return (
        <a href={title === "Like The Movies (Cover)" ? "https://www.youtube.com/channel/UC6_aBGZxiOE6_REVYFSetcQ" : youtube} target="_blank" rel="noreferrer">
            <div className={`mb-5 bg-[#fefefe] w-[680px] h-[440px] drop-shadow-2xl flex flex-col items-center justify-center rounded-tr-xl rounded-bl-xl border-4 ${colors[id][2]} ${colors[id][0]} ${colors[id][1]} transition duration-500`}>
                <h1 className={`text-2xl px-2 pt-2 font-semibold`}>{title}</h1>
                <p className="text-sm pb-2 font-light">Written by:<span className="font-normal"> {composer}</span></p>
                <iframe width="640" height="360" title={title} allowFullScreen src={link} loading="lazy"/>
                <p className="text-md self-end px-5 font-medium">{months[month]} {year}</p>
            </div>
        </a>
    )
}

export default MusicCard;