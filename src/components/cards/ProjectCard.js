"use client";
import { useState, useEffect } from "react";
import { Modal } from "../popups";
import Image from "next/image";

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

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="relative w-full">
      <div
        className={`group border-slate-800/70 cursor-pointer border-2 py-8 px-4 size-88 flex flex-col items-center rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 gap-2 overflow-hidden text-center ${color.text} ${color.border.hover}`}
        onClick={() => {
          if (link) {
            handleClick();
          } else if (!show) {
            showModal();
          }
        }}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className={`size-32 rounded-full object-cover border-2 ${color.border.solid} mb-4 group-hover:scale-105 duration-300`}
          />
        )}
        <div className="text-2xl font-semibold">{name}</div>
        <div className="font-light text-slate-800/70">{description}</div>
      </div>
      {/* <div
        onClick={() => {
          if (link) {
            handleClick();
          } else if (!show) {
            showModal();
          }
        }}
        className={`cursor-pointer border-2 ${color} bg-white p-5 lg:p-8 pb-6 md:w-[32vw] h-40 flex rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:cursor hover:-translate-y-0.5 gap-2 overflow-hidden`}
      >
        <div className="flex flex-col gap-3 md:gap-5 w-3/4 justify-between overflow-hidden">
          <div className="text-2xl xl:text-3xl line-clamp-1 overflow-hidden">
            {name}
          </div>
          {description && (
            <p className="text-lg line-clamp-2 overflow-visible">
              {description}
            </p>
          )}
        </div>
        <div className="absolute right-5 top-5 xl:relative xl:flex xl:top-0 xl:items-center overflow-visible">
          {image && (
            <Image
              src={image}
              alt={image}
              width={64}
              height={64}
              className="size-16 xl:size-24 rounded-full object-contain"
            />
          )}
        </div>
      </div> */}
      <Modal show={show} onClose={showModal}>
        {children}
      </Modal>
    </div>
  );
}
