"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MobileNavbarButton } from "./MobileNavbarButton";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-200 p-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center w-28 justify-between">
            <Image
              src="/assets/logo.jpg"
              alt="Mark"
              width={32}
              height={32}
              className="rounded-md"
            />
            <h1 className="text-xl font-light">Mark Li</h1>
          </div>
        </Link>

        <button onClick={toggleMenu} className="text-black focus:outline-none">
          {isOpen ? (
            <svg
              className="size-7 transition-transform duration-300 ease-in transform rotate-90"
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
              className="size-7 transition-transform duration-300 ease-out transform"
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
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-96 translate-y-0 mt-4"
            : "opacity-0 max-h-0 -translate-y-2"
        }`}
        aria-hidden={!isOpen}
        aria-expanded={isOpen}
      >
        <ul>
          <li>
            <MobileNavbarButton toggle={toggleMenu} title="HOME" link="/" />
          </li>
          <MobileNavbarButton toggle={toggleMenu} title="MUSIC" link="/music" />
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
    </div>
  );
}
