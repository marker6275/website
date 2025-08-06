"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { Navbar, MobileNavbar } from "../components/navbar";
import { FadeContent } from "../components/reactbits";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery({ query: "(max-width: 639px)" });

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
      <body>
        <FadeContent
          duration={600}
          easing="ease-in"
          threshold={1}
          initialOpacity={0}
        >
          <div className="flex flex-col font-inter h-screen w-screen">
            {renderNavbar()}
            {children}
          </div>
        </FadeContent>
      </body>
    </html>
  );
}
