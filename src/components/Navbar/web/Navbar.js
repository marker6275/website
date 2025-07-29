import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarButton } from "./NavbarButton";

export function Navbar() {
  return (
    // sticky top-0 z-10 to keep at top
    <div className="flex duration-500 bg-gradient-to-b from-blue-300 to-blue-200 justify-between pr-5">
      <Link href="/">
        <div className="w-10 h-10 m-3 hover:animate-pulse">
          <Image
            src="/assets/logo.jpg"
            alt="Mark"
            width={40}
            height={40}
            className="rounded-full"
          />
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
