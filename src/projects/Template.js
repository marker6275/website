import React from "react";
import { T, ST, P, Line } from "../components/text";

function Temp() {
  return (
    <div className="py-5">
      <T>Title</T>
      <Line />
      <ST>Subtitle</ST>
      <P>Paragraph</P>
    </div>
  );
}

export const Template = {
  name: "Template",
  color: {
    border: {
      solid: "border-white",
      hover: "hover:border-white",
    },
    text: "hover:text-white",
  },
  description: "Generic description",
  image: "/assets/not_found.jpg",
  body: <Temp />,
};
