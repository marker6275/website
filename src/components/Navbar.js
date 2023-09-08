import React from 'react';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
export default function Navbar() {

    return (
        <div className="bg-[#282828] h-20 flex justify-between w-full font-inter">
            <a href='/'>
                <div className="bg-blue-500 w-20 h-full flex justify-center items-center text-white text-4xl">
                    <img src={logo} alt="Mark"/>
                </div>
            </a>
            <div className='flex'>
                <Link to="/" className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                        HOME
                </Link>
                {/* <a href='/' className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                    
                </a> */}
                <Link to="/music" className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                        MUSIC
                </Link>
                {/* <a href='/music' className='flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg'>
                    
                </a> */}
                <Link to="/contact" className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                CONTACT
                </Link>
                {/* <a href='/contact' className='flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg'>
                    <div>
                        CONTACT
                    </div>
                </a> */}
                <Link to="/future" className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                    Other
                </Link>
                {/* <a href='/future' className='flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg'>
                    <div>
                        Other
                    </div>
                </a> */}
            </div>
        </div>
    )
}