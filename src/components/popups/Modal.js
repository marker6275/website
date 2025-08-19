"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({ show, onClose, children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !show) {
      return;
    }

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mounted, show]);

  if (!mounted || !show) {
    return null;
  }

  const markup = (
    <div
      className="bg-slate-600/70 fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="flex flex-col overflow-y-auto overflow-x-hidden relative w-[90vw] xl:w-[65vw] h-[90vh] bg-white border-2 border-gray-600 rounded-t-xl shadow-md">
        <div className="w-full h-full text-lg text-left px-5 text-pretty overflow-scroll">
          {children}
        </div>
      </div>
      <button
        className="bg-[#282828] py-2 px-8 w-[90vw] xl:w-[65vw] text-white rounded-b-xl hover:bg-[#343434] transition-colors duration-300 cursor-pointer"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
  return createPortal(markup, document.body);
}
