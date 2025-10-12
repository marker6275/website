"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarButton } from "./NavbarButton";
import { getSearchLink } from "../../../utils";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const openTimer = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  function handleMouseEnter() {
    openTimer.current = setTimeout(() => {
      setShowSearch(true);
    }, 3000);
  }

  function handleMouseLeave() {
    if (!showSearch) {
      clearTimeout(openTimer.current);
      setShowSearch(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const searchLink = getSearchLink(searchQuery);
      if (searchLink) {
        router.push(`${searchLink}`);
      }
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  return (
    // sticky top-0 z-10 to keep at top
    <div className="flex duration-500 bg-gradient-to-b from-blue-300 to-blue-200 justify-between pr-5">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/assets/logo.jpg"
            alt="Mark"
            width={40}
            height={40}
            className="rounded-full size-12 m-3 hover:animate-pulse"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/";
              }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
        <div>
          {showSearch && (
            <form>
              <input
                type="text"
                className="focus:outline-none bg-gray-100/50 rounded-md p-2 ml-1"
                onKeyDown={handleKeyDown}
                placeholder="How did you find this?"
                value={searchQuery}
                onInput={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="flex">
        <NavbarButton title="HOME" link="/" selected={pathname === "/"} />
        <NavbarButton
          title="PROJECTS"
          link="/projects"
          selected={pathname === "/projects"}
        />
        <NavbarButton
          title="MUSIC"
          link="/music"
          selected={pathname === "/music"}
        />
        <NavbarButton
          title="RESUME"
          link="/resume"
          selected={pathname === "/resume"}
        />
      </div>
    </div>
  );
}
