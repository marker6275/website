import React from 'react';
import { Link } from 'react-router-dom';

export default function NavbarButton({ title, link }) {

    return (
        <div>
            <Link to={link} className="flex justify-center items-center w-32 h-16 hover:text-lg text-md duration-300 hover:shadow-md hover:bg-[#CACBCE]">
                {title}
            </Link>
        </div>
    )
}