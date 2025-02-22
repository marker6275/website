import React from "react";
import { T, ST, P, Line } from "../components/text";
import NotFound from "../assets/not_found.jpg";

class Temp extends React.Component {
  render() {
    return (
      <div className="py-5">
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
  image: NotFound,
  body: <Temp />,
};
