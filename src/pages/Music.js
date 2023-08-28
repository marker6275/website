import Navbar from "../components/Navbar";
import data from '../db.json';
import ReactPlayer from 'react-player/youtube'

export default function Music() {
    return (
        <div className="bg-[#EBE8E2] h-screen flex flex-col font-inter">
            <Navbar/>
            <div className="flex justify-center">
                <ul>
                    {data.map(item => (
                        <li key={item.id}><ReactPlayer url={item.link}/></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}