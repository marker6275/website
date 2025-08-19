"use client";

import { useRef } from "react";
import emailjs from "@emailjs/browser";
import data from "../../info.json";

export default function ContactPage() {
  const info = data.contact;
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("gmail", "contact_form", form.current, "Pnc3-bQJtA9NyvOwp")
      .then(
        (result) => {
          alert("Message sent!", result.status);
          if (typeof window !== "undefined") {
            window.location.reload(false);
          }
        },
        (error) => {
          alert(
            "There was an error sending this email:",
            error.status,
            error.text
          );
        }
      );
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-gradient-to-b from-blue-200 via-white to-sky-100">
      <div className="flex justify-center mt-24">
        {/* left */}
        <div className="flex justify-start m-10">
          <div className="bg-[#EFEFEF] px-12 pt-12 w-[44vw] border-2 border-black rounded-tl-3xl rounded-br-3xl hover:shadow-xl duration-300 font-light text-4xl">
            <div
              className="group h-20 w-28 overflow-hidden duration-1000 delay-800 ease-in-out hover:w-full relative cursor-pointer flex items-center "
              onClick={() => copyClipboard(info.email)}
              data-tooltip-target="tooltip-click"
              data-tooltip-trigger="click"
              type="button"
            >
              <span className="absolute whitespace-nowrap translate-x-0 transition duration-1000 group-hover:translate-x-[calc(100%-7rem-100%)] ease-out">
                <span className="group-hover:text-[#EFEFEF] transition duration-300">
                  EMAIL
                </span>{" "}
                {info.email}
              </span>
            </div>

            <div
              className="group h-20 w-32 overflow-hidden duration-1000 delay-800 ease-in-out hover:w-72 relative cursor-pointer flex items-center "
              onClick={() => copyClipboard(info.phone)}
              data-tooltip-target="tooltip-click"
              data-tooltip-trigger="click"
              type="button"
            >
              <span className="absolute whitespace-nowrap translate-x-0 transition duration-1000 group-hover:translate-x-[calc(100%-8rem-100%)] ease-out">
                <span className="group-hover:text-[#EFEFEF] transition duration-300">
                  PHONE
                </span>{" "}
                {info.phone}
              </span>
            </div>
            <a href={info.linkedin} target="_blank" rel="noreferrer">
              <h1 className="h-20 flex items-center text-[#0077B5]">
                LINKEDIN
              </h1>
            </a>
            <a href={info.github} target="_blank" rel="noreferrer">
              <h1 className="h-20 flex items-center text-black">GITHUB</h1>
            </a>
            <a href={info.instagram} target="_blank" rel="noreferrer">
              <h1 className="h-20 flex items-center text-[#E1306C]">
                INSTAGRAM
              </h1>
            </a>
          </div>
        </div>
        {/* right */}
        <div className="m-10 w-[660px]">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-[26vw] bg-[#DCDCDC] h-full flex flex-col items-center p-8 gap-5 rounded-tl-3xl rounded-br-3xl border-2 border-black hover:shadow-xl duration-300"
          >
            or you can email me:
            <input
              placeholder="name"
              name="user_name"
              required
              className="p-3 bg-[#EFEFEF] w-full hover:bg-blue-100 transition duration-200 rounded-md"
            />
            <input
              placeholder="email"
              required
              type="email"
              name="user_email"
              className="p-3 bg-[#EFEFEF] w-full hover:bg-blue-100 transition duration-200 rounded-md"
            />
            <input
              placeholder="subject"
              name="subject"
              required
              className="p-3 bg-[#EFEFEF] w-full hover:bg-blue-100 transition duration-200 rounded-md"
            />
            <textarea
              placeholder="message..."
              name="message"
              rows={5}
              required
              className="p-3 bg-[#EFEFEF] w-full resize-none hover:bg-blue-100 transition duration-200 rounded-md"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 transition duration-300 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
