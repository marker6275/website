import email from "../../assets/icons/email.png";
import instagram from "../../assets/icons/instagram.png";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";
import data from "../../info.json";
import { useState, useEffect } from "react";
import ProfilePic from "../../assets/profile_pic.jpg";

export function SectionAboutMe() {
  const contact = data.contact;

  const name = "Mark Li";
  const [typedText, setTypedText] = useState("");

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
    <div className="my-20 mx-4">
      <div className="flex justify-center items-center duration-300">
        <img
          src={ProfilePic}
          alt="profile"
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
              }}
              style={{ cursor: "pointer", position: "relative" }}
              title="Click to copy email"
            >
              <img src={email} alt="email" className="w-8 h-8" />
            </div>
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="instagram" className="w-8 h-8" />
            </a>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              <img src={github} alt="github" className="w-8 h-8" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="linkedin" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
      {/* <AboutMe /> */}
    </div>
  );
}
