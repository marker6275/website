"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarButton } from "./NavbarButton";
import { getSearchLink } from "../../../utils";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const openTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  function handleMouseEnter() {
    openTimer.current = setTimeout(() => {
      setShowSearch(true);
    }, 3000);
  }

  function handleMouseLeave() {
    if (!showSearch) {
      if (openTimer.current) {
        clearTimeout(openTimer.current);
      }
      setShowSearch(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  // Helper function to check if a path is active
  const isActive = (link: string) => {
    if (link === "/") {
      return pathname === "/" || pathname === "";
    }
    // Normalize paths by removing trailing slashes for comparison
    const normalizedPathname = pathname.replace(/\/$/, "") || "/";
    const normalizedLink = link.replace(/\/$/, "") || "/";
    
    // Check exact match or if pathname is a sub-path of the link
    return (
      normalizedPathname === normalizedLink ||
      (normalizedPathname.startsWith(normalizedLink + "/") && normalizedLink !== "/")
    );
  };

  return (
    // sticky top-0 z-10 to keep at top
    <div className="flex justify-between pr-5 bg-slate-50">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/assets/logo.jpg"
            alt="Mark"
            width={40}
            height={40}
            className="rounded-full size-12 m-3 hover:animate-pulse"
            onClick={() => {
              window.location.href = "/";
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
                onInput={(e: React.FormEvent<HTMLInputElement>) => setSearchQuery(e.currentTarget.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="flex">
        <NavbarButton title="HOME" link="/" selected={isActive("/")} />
        <NavbarButton
          title="PROJECTS"
          link="/projects"
          selected={isActive("/projects")}
        />
        <NavbarButton
          title="MUSIC"
          link="/music"
          selected={isActive("/music")}
        />
        <NavbarButton
          title="RESUME"
          link="/resume"
          selected={isActive("/resume")}
        />
      </div>
    </div>
  );
}

