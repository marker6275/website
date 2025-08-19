import React from "react";
import Link from "next/link";

export function NavbarButton({ title, link, selected }) {
  return (
    <div>
      <Link
        href={link}
        className={`flex justify-center items-center font-light h-16 hover:text-xl text-lg duration-300 text-[#282828] hover:bg-gradient-to-b from-blue-400 to-blue-200 px-8 ${
          selected ? "bg-gradient-to-b from-blue-400 to-blue-200 text-xl" : ""
        }`}
      >
        {title}
      </Link>
    </div>
  );
}
