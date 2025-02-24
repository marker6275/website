import { React, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar, MobileNavbar } from "./components/navbar";
import { useMediaQuery } from "react-responsive";
import {
  Home,
  Music,
  Projects,
  Contact,
  Future,
  Analyze,
  Resume,
} from "./pages";
import "./App.css";

// To update:
// npm run deploy

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  const [showHome, setShowHome] = useState(false);
  const location = useLocation();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  useEffect(() => {
    if (!localStorage.getItem("intro")) {
      const timer = setTimeout(() => {
        localStorage.setItem("intro", true);
        setShowHome(true);
      }, 2300);
      return () => clearTimeout(timer);
    }
    setShowHome(true);
  }, []);

  const renderNavbar = () => {
    if (location.pathname === "/resume") {
      return null;
    }
    return isMobile ? <MobileNavbar /> : <Navbar />;
  };

  return (
    <div
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
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/future" element={<Future />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
