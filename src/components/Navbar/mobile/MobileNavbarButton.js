import React from "react";
import { Link } from "react-router-dom";

export function MobileNavbarButton({ title, link, toggle }) {
  return (
    <div>
      <Link
        to={link}
        onClick={toggle}
        className="flex items-center justify-center py-2 hover:bg-slate-500 font-light rounded-md"
      >
        {title}
      </Link>
    </div>
  );
}
