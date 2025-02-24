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
    <div className="my-5">
      <div className="md:grid md:grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="mt-10 mb-16 md:my-0">
            <h1 className="cursor-pointer text-black font-light text-6xl sm:hover:text-blue-900 transition-all duration-500 text-center">
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
