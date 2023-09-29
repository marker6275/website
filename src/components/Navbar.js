import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
export default function Navbar() {

    return (
        // sticky top-0 z-10 to keep at top
        <div className="bg-[#282828] h-20 flex justify-between w-full font-inter">
            <Link to="/">
                <div className="bg-blue-500 w-20 h-full flex justify-center items-center text-white text-4xl">
                    <img src={logo} alt="Mark"/>
                </div>
            </Link>
                
            <div className='flex'>
                <Link to="/" className="flex p-2 justify-center items-center text-white w-36 hover:bg-[#424242] text-lg">
                    HOME
                </Link>
                <Link to="/music" className="flex p-3 justify-center items-center text-white w-36 hover:bg-[#424242] text-lg">
                    MUSIC
                </Link>
                <Link to="/projects" className="flex p-3 justify-center items-center text-white w-36 hover:bg-[#424242] text-lg">
                    PROJECTS
                </Link>
                <Link to="/contact" className="flex p-3 justify-center items-center text-white w-36 hover:bg-[#424242] text-lg">
                    CONTACT
                </Link>
                {/* <Link to="/future" className="flex p-3 justify-center items-center text-white w-36 hover:bg-[#424242] text-lg">
                    NEXT
                </Link> */}
            </div>
        </div>
    )
}