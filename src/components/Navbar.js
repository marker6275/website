import React from 'react';

export default function Navbar() {
    return (
        <div className="bg-[#282828] h-20 flex justify-between w-full font-inter">
            <a href='/'>
                <div className="bg-blue-500 w-20 h-full flex justify-center items-center text-white text-4xl">
                    M
                </div>
            </a>
            <div className='flex'>
                <a href='/' className="flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg">
                    <div>
                        HOME
                    </div>
                </a>
                <a href='/music' className='flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg'>
                    <div>
                        MUSIC
                    </div>
                </a>
                <a href='/contact' className='flex p-3 justify-center items-center text-white w-40 hover:bg-[#424242] text-lg'>
                    <div>
                        CONTACT
                    </div>
                </a>
            </div>
        </div>
    )
}