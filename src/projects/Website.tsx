import React from "react";
import { T, BL, ST, P, Line } from "../components/text";

function Web() {
  return (
    <div className="py-5">
      <T>Website</T>
      <Line />
      <ST>Details</ST>
      <P>
        This was just a simple website I made entirely on my own, which is
        something cool to show.
      </P>
      <br />
      <BL>
        <li>
          <b>React:</b> The actual website is written in React. It's just the
          framework I'm most comfortable with and it's really easy to work with.
        </li>
        <li>
          <b>Tailwind:</b> The styling is mostly done with Tailwind CSS, for the
          sole reason that it makes styling elements so much easier and makes
          code organization simple too since I don't have to keep track of
          individual elements and so many different <em>.css</em> files, but I'm
          coming to realize the limitations of tailwind.
        </li>
      </BL>
      <br />
      <P>
        This might be the first actual project I spent a lot of time on. I don't
        know what I wanted to come out of this besides just being able to have a
        website and put this on my resume, but otherwise, this was pretty fun.
        It was nice being able to put the skills that I learned about web
        devevelopment and front-end development and put them to use on
        something.
      </P>
      <br />
      <P>
        So for now this is all I have, but I think I'm going to keep updating
        this website for a while, especially the projects page whenever I make
        something cool or worth noting, I'll put it up on here. Same with my
        music page - I like showing off my music, even if it's to nobody. I'm
        going to keep adding my past projects onto this page when I get around
        to it. Hopefully, things will be a lot more organized and have more
        detail, especially on some technical projects.
      </P>
      <br />
      <P>
        Thanks for stopping by, I hope there will be something new for you next
        time.
      </P>
    </div>
  );
}

export const Website = {
  name: "Website",
  color: {
    border: {
      image: "border-blue-500",
      outer: "hover:border-blue-500",
    },
    text: "hover:text-blue-500",
  },
  description: "Where you are right now",
  image: "/assets/logo.jpg",
  body: <Web />,
};

