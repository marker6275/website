"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSafeMediaQuery } from "../../hooks/useSafeMediaQuery";
import { Navbar, MobileNavbar } from "./index";

export function NavbarWrapper() {
  const pathname = usePathname();
  const isMobile = useSafeMediaQuery("(max-width: 639px)");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const ignoredPathnames = ["/resume", "/bets"];

  if (
    ignoredPathnames.includes(pathname) ||
    ignoredPathnames.map((path) => path + "/").includes(pathname)
  ) {
    return null;
  }

  if (typeof window === "undefined") {
    return <Navbar />;
  }

  return isMobile ? <MobileNavbar /> : <Navbar />;
}

