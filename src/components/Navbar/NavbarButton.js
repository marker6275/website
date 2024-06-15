import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarButton({ title, link }) {

    return (
        <div>
            <Link to={link} className="flex justify-center items-center text-black w-32 h-16 hover:text-xl text-md duration-300">
                {title}
            </Link>
        </div>    
    )
}