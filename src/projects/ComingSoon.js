import React from "react";
class Coming extends React.Component {
  render() {
    return (
      <div className="py-5">
        <h1 className="text-5xl mb-5 font-semibold">Coming Soon...</h1>
        <hr className="mb-5" />
        <p>So that's it for now :(</p>
        <br />
        <p>
          If you're reading this then it probably means you think my projects
          are cool :D (or at least I hope so) but I think I'm going to just be
          putting projects that I've worked on along with a little description.
          There are lots of things I want to create and I'll list them down
          below. It's likely that I've already started and just haven't
          completed them so come back another time and maybe this list will
          expand.
        </p>
        <br />
        <p>
          I don't exactly know what I want to do with this website, but it is
          really fun to add to and work on. I think I'm likely to just end up
          putting any cool projects or I thought were interesting (or more
          likely the ones that took the most work).
        </p>
        <br />
        <p>
          I'm also hoping to add more sections to this website such as a blog or
          resume page. I'd like to be able to include more about myself and my
          work on this website. I'll also probably update the design relatively
          often as I make graphic design more my passion and as I get sick of
          how it currently looks.
        </p>
      </div>
    );
  }
}

export const ComingSoon = {
  name: "Coming Soon",
  color: "bg-gray-400",
  text: "text-gray-400",
  skills: [],
  body: <Coming />,
};
