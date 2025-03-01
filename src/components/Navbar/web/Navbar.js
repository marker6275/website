import React from "react";
import logo from "../../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { NavbarButton } from "./NavbarButton";

export function Navbar() {
  return (
    // sticky top-0 z-10 to keep at top
    <div className="flex duration-500 bg-gradient-to-b from-blue-300 to-blue-200 justify-between pr-5">
      <Link to="/">
        <div className="w-10 h-10 m-3 hover:w-16 hover:h-16 duration-1000">
          <img src={logo} alt="Mark" className="rounded-full " />
        </div>
      </Link>
      <div className="flex">
        <NavbarButton title="HOME" link="/" />
        <NavbarButton title="PROJECTS" link="/projects" />
        <NavbarButton title="MUSIC" link="/music" />
        <NavbarButton title="RESUME" link="/resume" />
      </div>
    </div>
  );
}
