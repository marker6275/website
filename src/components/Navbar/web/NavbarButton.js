import React from "react";
import { Link } from "react-router-dom";

export function NavbarButton({ title, link }) {
  return (
    <div>
      <Link
        to={link}
        className="flex justify-center items-center font-light w-32 h-16 hover:text-xl text-lg duration-300 text-[#282828] hover:bg-gradient-to-b from-blue-400 to-blue-200"
      >
        {title}
      </Link>
    </div>
  );
}
