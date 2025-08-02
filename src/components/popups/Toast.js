'use client'
import React from "react";

export function Toast({ isFadingOut, message = "words" }) {
  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg px-6 py-3 text-center transition-all duration-300 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
      {message}
    </div>
  );
}