import React from 'react';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';
import NavbarButton from './NavbarButton';

export default function Navbar() {

    return (
        // sticky top-0 z-10 to keep at top
        <div className="h-16 flex justify-center w-full font-inter duration-500 mb-10">                
            <div className='flex'>
                <NavbarButton title="MUSIC" link="/music"/>
                <NavbarButton title="PROJECTS" link="/projects"/>
                <Link to="/">
                    <div className="w-16">
                        <img src={logo} alt="Mark"/>
                    </div>
                </Link>
                <NavbarButton title="HOME" link="/"/>
                <NavbarButton title="CONTACT" link="/contact"/>
            </div>
        </div>
    )
}