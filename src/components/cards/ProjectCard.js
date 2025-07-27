'use client'
import React, { useState, useEffect } from "react";
import { Modal } from "../misc";

function makeSkillsString(skills) {
  return skills.join(", ");
}

export function ProjectCard({ name, color, description, skills = [], image, children }) {
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
          if (!show) {
            showModal();
          }
        }}
        className={`cursor-pointer ${color} p-8 xl:w-[38vw] lg:w-[30vw] md:[52vw] h-52 flex items-center rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:cursor`}
      >
        <div className="flex flex-col gap-1 w-3/4">
          <span className="text-3xl xl:text-4xl">{name}</span>
          {description && (
            <p className="text-sm xl:text-base">
              Description:
              <span className="text-sm xl:text-base font-light">
                {" "}
                {description}
              </span>
            </p>
          )}
          {skills.length > 0 && (
            <p className="text-sm xl:text-base">
              Skills:
              <span className="text-sm xl:text-base font-light">
                {" "}
                {makeSkillsString(skills)}
              </span>
            </p>
          )}
        </div>
        <div className="absolute right-5 top-5 xl:top-auto xl:right-10">
          {image && (
            <img
              src={image}
              alt={image}
              className="h-16 w-16 xl:h-32 xl:w-32 rounded-full object-contain"
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
