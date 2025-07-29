"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import data from "../../info.json";
import { Toast } from "../misc";

export function SectionAboutMe() {
  const contact = data.contact;

  const name = "Mark Li";
  const [typedText, setTypedText] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const typed = sessionStorage.getItem("typed");
    if (typed) {
      setTypedText(name);
    } else {
      let index = 0;
      const type = () => {
        if (index <= name.length) {
          setTypedText(name.substring(0, index));
          index++;
          setTimeout(type, 400);
        } else {
          sessionStorage.setItem("typed", "true");
        }
      };
      type();
    }
  }, []);

  return (
    <div className="my-15 mx-4">
      <div className="flex justify-center items-center duration-300">
        <Image
          src="../../assets/profile_pic.jpg"
          alt="profile"
          width={256}
          height={256}
          className="sm:w-64 sm:h-64 w-40 h-40 duration-300 sm:mr-8 mr-4 rounded-full object-cover"
        />
        <div>
          <h1 className="text-black font-light text-5xl sm:text-6xl duration-300">
            {typedText || <span className="invisible">Mark Li</span>}
          </h1>
          <h2 className="ml-1 font-light text-md sm:text-lg mt-1">
            <span className="text-gray-500">Software Developer</span>
            <br />
            <span className="text-gray-500">Amateur Musician</span>
          </h2>
          <div className="flex gap-4 sm:gap-6 space-between mt-2 ml-1 duration-300">
            <div
              onClick={() => {
                navigator.clipboard.writeText(contact.email);
                if (!showToast) {
                  setShowToast(true);
                  setIsFadingOut(false);
                  setTimeout(() => {
                    setIsFadingOut(true);
                    setTimeout(() => setShowToast(false), 300);
                  }, 2200);
                }
              }}
              style={{ cursor: "pointer", position: "relative" }}
              title="Click to copy email"
            >
              <Image
                src="/assets/icons/email.png"
                alt="email"
                width={32}
                height={32}
                className="w-8 h-8 hover:opacity-60 transition-all duration-250"
              />
            </div>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/instagram.png"
                alt="instagram"
                width={32}
                height={32}
                className="w-8 h-8 hover:opacity-60 transition-all duration-250"
              />
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <Image
                src="/assets/icons/github.png"
                alt="github"
                width={32}
                height={32}
                className="w-8 h-8 hover:opacity-60 transition-all duration-250"
              />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/icons/linkedin.png"
                alt="linkedin"
                width={32}
                height={32}
                className="w-8 h-8 hover:opacity-60 transition-all duration-250"
              />
            </a>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast message="Email copied to clipboard!" isFadingOut={isFadingOut} />
      )}
    </div>
  );
}
