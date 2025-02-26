import { RandomColorButton } from "../misc";

export function AboutMe() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-white to-[#eee] uration-300 px-8 md:px-16 py-6 shadow-md rounded-lg mx-10 md:mx-20">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-2xl py-4">About Me</h1>
        </div>
        <p className="font-light">
          Hey! I'm a senior at Northwestern University studying computer science
          and music. I just made this website as a small project and a place to
          put my music. I'm hoping to be able to update this with other things
          as well.
        </p>
        <p className="flex justify-start font-light">-</p>
        <p className="font-light">
          Meanwhile, here's a button that changes colors when you click on it :D
        </p>
        <div className="flex justify-center my-4">
          <RandomColorButton />
        </div>
      </div>
    </div>
  );
}
