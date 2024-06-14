import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
export default function Navbar() {

    return (
        // sticky top-0 z-10 to keep at top
        <div className="bg-[#101010] h-10 hover:h-16 flex justify-center w-full font-inter duration-500">                
            <div className='flex'>
                <Link to="/music" className="flex justify-center items-center text-white w-32 hover:text-xl text-md duration-300">
                    MUSIC
                </Link>
                <Link to="/projects" className="flex justify-center items-center text-white w-32 hover:text-xl text-md duration-300">
                    PROJECTS
                </Link>
                <Link to="/">
                    <div className="w-16 h-full flex justify-center items-center text-white text-4xl">
                        <img src={logo} alt="Mark"/>
                    </div>
                </Link>
                <Link to="/resume" className="flex justify-center items-center text-white w-32 hover:text-xl text-md duration-300">
                    RESUME
                </Link>
                <Link to="/contact" className="flex justify-center items-center text-white w-32 hover:text-xl text-md duration-300">
                    CONTACT
                </Link>
            </div>
        </div>
    )
}