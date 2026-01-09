import { T, P, Line } from "../components/text";

function Coming() {
  return (
    <div className="py-5">
      <T>Coming Soon...</T>
      <Line />
      <P>So that's it for now :(</P>
      <br />
      <P>
        If you're reading this then it probably means you think my projects are
        cool :D (or at least I hope so) but I think I'm going to just be putting
        projects that I've worked on along with a little description. There are
        lots of things I want to create and I'll list them down below. It's
        likely that I've already started and just haven't completed them so come
        back another time and maybe this list will expand.
      </P>
      <br />
      <P>
        I don't exactly know what I want to do with this website, but it is
        really fun to add to and work on. I think I'm likely to just end up
        putting any cool projects or I thought were interesting (or more likely
        the ones that took the most work).
      </P>
      <br />
      <P>
        I'm also hoping to add more sections to this website such as a blog or
        resume page. I'd like to be able to include more about myself and my
        work on this website. I'll also probably update the design relatively
        often as I make graphic design more my passion and as I get sick of how
        it currently looks.
      </P>
    </div>
  );
}

export const ComingSoon = {
  name: "Coming Soon",
  color: {
    border: {
      solid: "border-gray-500",
      hover: "hover:border-gray-500",
    },
    text: "text-gray-400",
  },
  body: <Coming />,
};
