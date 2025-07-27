'use client'
import React, { useState, useEffect } from "react";
import { Modal } from "../misc";

export function HomeProjectCard({ name, text, children }) {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (!show) {
      window.onscroll = function () {};
    }
  }, [show]);

  return (
    <div>
      <div
        onClick={() => {
          if (!show) {
            setTimeout(() => {
              showModal();
            }, 100);
          }
        }}
        className={`bg-neutral-300 hover:bg-stone-200 font-extralight h-24 lg:h-32 rounded-md flex items-center text-3xl text-left hover:cursor-pointer ${text} transition-colors transition-all duration-300 p-10 hover:shadow-md`}
      >
        {name}
      </div>
      <Modal show={show} onClose={showModal}>
        {children}
      </Modal>
    </div>
  );
}
