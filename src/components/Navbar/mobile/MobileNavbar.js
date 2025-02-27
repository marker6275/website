import React, { useState } from "react";
import logo from "../../../assets/logo.jpg";
import { MobileNavbarButton } from "./MobileNavbarButton";
import { Link } from "react-router-dom";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-blue-200 p-4">
      <div className="flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center w-28 justify-between">
            <img src={logo} alt="Mark" className="rounded-md w-8 h-8" />
            <h1 className="text-xl font-light">Mark Li</h1>
          </div>
        </Link>

        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          )}
        </button>
      </div>
      {isOpen && (
        <div className="mt-2">
          <ul>
            <li>
              <MobileNavbarButton toggle={toggleMenu} title="HOME" link="/" />
            </li>
            <MobileNavbarButton
              toggle={toggleMenu}
              title="MUSIC"
              link="/music"
            />
            <MobileNavbarButton
              toggle={toggleMenu}
              title="PROJECTS"
              link="/projects"
            />
            <MobileNavbarButton
              toggle={toggleMenu}
              title="RESUME"
              link="/resume"
            />
          </ul>
        </div>
      )}
    </div>
  );
}
