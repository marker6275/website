import { React, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
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
// change domain name to custom name on gh-pages

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

function App() {
  const [showHome, setShowHome] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("intro")) {
      const timer = setTimeout(() => {
        localStorage.setItem("intro", true);
        setShowHome(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
    setShowHome(true);
  }, []);

  return (
    <div
      className={`justify-center items-center ${
        !showHome ? "fade-background justify-center items-center" : ""
      }`}
    >
      {!showHome && (
        <h1 className="hello font-inter font-semibold text-6xl absolute text-[#282828] w-56 text-center drop-shadow-2xl">
          Mark Li
        </h1>
      )}
      {showHome && (
        <div className="flex flex-col font-inter h-screen fade-background-in bg-gradient-to-b from-blue-200 via-white to-sky-100">
          {location.pathname !== "/resume" && <Navbar />}
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
