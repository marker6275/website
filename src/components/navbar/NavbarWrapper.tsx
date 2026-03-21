"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MobileNavbar } from "./mobile";
import { Navbar } from "./web";

export function NavbarWrapper() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  const ignoredPathnames = ["/resume", "/bets"];

  if (
    ignoredPathnames.includes(pathname) ||
    ignoredPathnames.map((path) => path + "/").includes(pathname)
  ) {
    return null;
  }

  if (isMobile === null) {
    return null;
  }

  return isMobile ? <MobileNavbar /> : <Navbar />;
}

