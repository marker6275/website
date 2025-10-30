"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavbarButton({ title, link, toggle }) {
  const pathname = usePathname();
  const isActive =
    pathname === link || (link !== "/" && pathname.startsWith(link));

  return (
    <Link
      href={link}
      onClick={toggle}
      className={`flex items-center justify-center py-2 font-light rounded-md transition-colors ${
        isActive ? "bg-slate-800" : ""
      }`}
    >
      <div
        className={`${
          isActive ? "text-white" : "text-black"
        } w-full text-center`}
      >
        {title}
      </div>
    </Link>
  );
}
