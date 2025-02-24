import email from "../../assets/icons/email.png";
import instagram from "../../assets/icons/instagram.png";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";
import { AboutMe } from "./AboutMeComponent";
import data from "../../info.json";

export function SectionAboutMe() {
  const contact = data.contact;

  console.log(contact);
  return (
    <div className="flex flex-col my-36">
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="cursor-pointer drop-shadow-2xl text-black text-6xl hover:text-[#002a87] transition-all duration-500 w-56 text-center">
              Mark Li
            </h1>
            <div className="flex gap-6 justify-center items-center mt-3">
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
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
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
        <AboutMe />
      </div>
    </div>
  );
}
