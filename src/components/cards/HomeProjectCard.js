"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../popups";

export function HomeProjectCard({ name, text, children, link }) {
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
          if (link) {
            window.open(link, "_blank");
          } else if (!show) {
            setTimeout(() => {
              showModal();
            }, 100);
          }
        }}
        className={`border-2 border-black bg-white font-extralight h-24 lg:h-32 rounded-lg flex items-center text-2xl sm:text-3xl hover:cursor-pointer ${text} transition-all duration-300 p-10 hover:-translate-y-1 hover:shadow-md hover:border-b-3 flex justify-start sm:justify-center`}
      >
        {name}
      </div>

      <Modal show={show} onClose={showModal}>
        {children}
      </Modal>
    </div>
  );
}
