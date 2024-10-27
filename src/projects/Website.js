import React from "react";
import logo from "../assets/logo.jpg";

class Web extends React.Component {
  render() {
    return (
      <div className="py-5">
        <h1 className="text-5xl mb-5 font-semibold">Website</h1>
        <hr className="mb-5" />
        <h1 className="font-semibold text-2xl pb-2">Details</h1>
        <p>
          This was just a simple website I made entirely on my own, which is
          something cool to show.
        </p>
        <br />
        <ul className="pl-10 list-disc list-outside">
          <li>
            <b>ReactJS:</b> The actual website is written in React. It's just
            the framework I'm most comfortable with and it's really easy to work
            with.
          </li>
          <li>
            <b>Tailwind CSS:</b> The styling is done with Tailwind CSS, for the
            sole reason that it makes styling elements so much easier and makes
            code organization simple too since I don't have to keep track of
            individual elements and so many different <em>.css</em> files, but
            I'm coming to realize the limitations of tailwind.
          </li>
          <li>
            <b>EmailJS:</b> I also used EmailJS to do the emailing backend
            component. I didn't want to have to manage an entire backend just to
            send myself emails and EmailJS works well. As far as I know, the
            contact form works. Not that I'm expecting anyone to use it, but
            it's there.
          </li>
        </ul>
        <br />
        <p>
          This might be the first actual project I spent a lot of time on. I
          don't know what I wanted to come out of this besides just being able
          to have a website and put this on my resume, but otherwise, this was
          pretty fun. It was nice being able to put the skills that I learned
          about web devevelopment and front-end development and put them to use
          on something.
        </p>
        <br />
        <p>
          So for now this is all I have, but I think I'm going to keep updating
          this website for a while, especially the projects page whenever I make
          something cool or worth noting, I'll put it up on here. Same with my
          music page - I like showing off my music, even if it's to nobody. I'm
          going to keep adding my past projects onto this page when I get around
          to it. Hopefully, things will be a lot more organized and have more
          detail, especially on some technical projects.
        </p>
        <br />
        <p>
          Thanks for stopping by, I hope there will be something new for you
          next time.
        </p>
      </div>
    );
  }
}

export const Website = {
  name: "Website",
  color: "bg-blue-400",
  text: "hover:text-blue-700",
  skills: ["React", "Tailwind"],
  description: "Where you are right now",
  image: logo,
  body: <Web />,
};
