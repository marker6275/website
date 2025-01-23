import { RandomColorButton } from "../misc";
import email from "../../assets/icons/email.png";
import instagram from "../../assets/icons/instagram.png";
import github from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";

export function SectionAboutMe() {
  return (
    <div className="flex flex-col my-36">
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="cursor-pointer drop-shadow-2xl text-[#282828] font-semibold text-6xl hover:text-[#002a87] transition-all duration-500 w-56 text-center">
              Mark Li
            </h1>
            <div className="flex gap-6 justify-center items-center mt-3">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    "markli2025@u.northwestern.edu"
                  );
                }}
                style={{ cursor: "pointer", position: "relative" }}
                title="Click to copy email"
              >
                <img src={email} alt="email" className="w-8 h-8" />
              </div>
              <a
                href="https://www.instagram.com/marker6275"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="instagram" className="w-8 h-8" />
              </a>
              <a
                href="https://github.com/marker6275"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="github" className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/mkli"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={linkedin} alt="linkedin" className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center bg-indigo-100 p-20 shadow-lg rounded-lg mr-20">
          <div>
            <div className="flex justify-center items-center">
              <h1 className="font-medium text-2xl mb-4">About Me</h1>
            </div>
            <p>
              Hey! I'm a senior at Northwestern University studying computer
              science and music. I just made this website as a small project and
              a place to put my music. I'm hoping to be able to update this with
              other things as well.
            </p>
            <p className="flex justify-start">-</p>
            <p>
              Meanwhile, here's a button that changes colors when you click on
              it :D
            </p>
            <div className="flex justify-center mt-4">
              <RandomColorButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
