"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Navbar, MobileNavbar } from "../components/navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  const [showHome, setShowHome] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });

  useEffect(() => {
    if (!sessionStorage.getItem("intro")) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("intro", true);
        setShowHome(true);
      }, 2300);
      return () => clearTimeout(timer);
    }
    setShowHome(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const renderNavbar = () => {
    if (pathname === "/resume" || pathname === "/bets") {
      return null;
    }
    return isMobile ? <MobileNavbar /> : <Navbar />;
  };

  return (
    <html lang="en">
      <body
        className={`justify-center items-center ${
          !showHome ? "fade-background justify-center items-center" : ""
        }`}
      >
        {!showHome && (
          <h1 className="intro font-inter text-6xl absolute text-[#282828] w-56 text-center drop-shadow-2xl font-light">
            Mark Li
          </h1>
        )}
        {showHome && (
          <div className="flex flex-col font-inter fade-background-in h-screen">
            {renderNavbar()}
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
