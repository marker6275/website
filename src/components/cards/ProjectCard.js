"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "../misc";

export function ProjectCard({
  name,
  color,
  description,
  image,
  children,
  link,
}) {
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
    <div className="relative w-full">
      <div
        onClick={() => {
          if (link) {
            window.open(link, "_blank");
          } else if (!show) {
            showModal();
          }
        }}
        className={`cursor-pointer border-4 ${color} bg-gray-300/10 p-8 pb-12 lg:w-[36vw] h-52 flex rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:cursor hover:-translate-y-1 gap-2 hover:border-b-5`}
      >
        <div className="flex flex-col gap-5 w-3/4 h-full justify-between">
          <div className="text-2xl xl:text-3xl">{name}</div>
          {description && (
            <p className="text-sm md:text-base xl:text-lg line-clamp-1">
              Description:
              <span className="text-sm md:text-base xl:text-lg font-light">
                {" "}
                {description}
              </span>
            </p>
          )}
        </div>
        <div className="absolute right-5 top-5 xl:relative xl:flex xl:top-0 xl:items-center overflow-visible">
          {image && (
            <img
              src={image}
              alt={image}
              className="size-16 xl:size-32 rounded-full object-contain"
            />
          )}
        </div>
      </div>
      <Modal show={show} onClose={showModal}>
        {children}
      </Modal>
    </div>
  );
}
