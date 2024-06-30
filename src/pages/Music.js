import MusicCard from "../components/cards/MusicCard";
import data from '../info.json';

export default function Music() {
    const info = data[0];
    // 16th century composition, conducting philharmonia?

    return (
        <div className="flex flex-col py-10 items-center min-h-screen">
            <h1 className="text-6xl font-medium mb-5">
                Music
            </h1>
            <div className="flex flex-col items-center p-10 gap-x-20 gap-y-10 grid grid-cols-2">
                {info.map(item => (
                    <MusicCard 
                        id={item.id} 
                        title={item.title} 
                        link={item.link} 
                        month={parseInt(item.date.substring(0, 2), 10) - 1} 
                        year={item.date.substring(item.date.length - 4)} 
                        composer={item.composer} 
                        youtube={data[1].youtube}
                    />
                ))}
            </div>
        </div>
    )
}