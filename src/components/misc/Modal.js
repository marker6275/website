'use client'
import React, { useEffect } from "react";

export function Modal({ show, onClose, children }) {
  useEffect(() => {
    if (show) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      const preventScroll = () => {
        window.scrollTo(scrollLeft, scrollTop);
      };

      window.onscroll = preventScroll;

      // Cleanup function to restore scrolling when modal closes
      return () => {
        window.onscroll = null;
      };
    }
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="bg-slate-600/70 fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center z-50">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden relative w-[90vw] xl:w-[65vw] h-[90vh] bg-white border-2 border-gray-600 rounded-t-xl shadow-md">
        <div className="w-full h-full text-lg text-left px-5 text-pretty overflow-scroll">
          {children}
        </div>
      </div>
      <button
        className="bg-[#282828] py-2 px-8 w-[90vw] xl:w-[65vw] text-white rounded-b-xl hover:bg-[#343434] transition-colors duration-300"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}
