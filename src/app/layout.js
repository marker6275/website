import { NavbarWrapper } from "../components/navbar";
import { Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

const font = Open_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <NavbarWrapper />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
