import React from "react";
import { T, ST, P, Line } from "../components/text";
// Images now served from public directory

class Temp extends React.Component {
  render() {
    return (
      <div className="py-5">
        <D>XXX 20XX</D>
        <T>Title</T>
        <Line />
        <ST>Subtitle</ST>
        <P>Paragraph</P>
      </div>
    );
  }
}

export const Template = {
  name: "Template",
  color: "bg-white",
  text: "hover:text-white",
  skills: ["Skill1", "Skill2", "Skill3"],
  description: "Generic description",
  image: "/assets/not_found.jpg",
  body: <Temp />,
};
