import React from "react";

class Temp extends React.Component {
    render() {
        return (
            <div className="py-5">
                <h1 className="text-5xl mb-5 font-semibold">Template</h1>
                <hr className="mb-5" />
                <h1 className="font-semibold text-2xl pb-2 pt-5">Template</h1>
                <p>Template</p>
            </div>
        )
    }
}

export const Template = {
    name: "Template",
    color: "bg-white",
    text: "hover:text-white",
    body: <Temp />
}