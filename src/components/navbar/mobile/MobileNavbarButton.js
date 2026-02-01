"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNavbarButton({ title, link, toggle }) {
  const pathname = usePathname();
  // Helper function to check if a path is active
  const isActive = () => {
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
    <Link
      href={link}
      onClick={toggle}
      className={`flex items-center justify-center py-2 font-light rounded-md transition-colors ${
        isActive() ? "bg-slate-800" : ""
      }`}
    >
      <div
        className={`${
          isActive() ? "text-white" : "text-black"
        } w-full text-center`}
      >
        {title}
      </div>
    </Link>
  );
}
