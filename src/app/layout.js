"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSafeMediaQuery } from "../hooks/useSafeMediaQuery";
import { Navbar, MobileNavbar } from "../components/navbar";
import { FadeContent } from "../components/reactbits";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isMobile = useSafeMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const renderNavbar = () => {
    if (pathname === "/resume" || pathname === "/bets") {
      return null;
    }

    if (typeof window === "undefined") {
      return <Navbar />;
    }

    return isMobile ? <MobileNavbar /> : <Navbar />;
  };

  return (
    <html lang="en">
      <body>
        <FadeContent
          duration={100}
          easing="ease-in"
          threshold={0}
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
