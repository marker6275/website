import React from "react";

class Temp extends React.Component {
    render() {
        return (    
            <div className="py-5">
                <h1 className="text-5xl mb-5">Template</h1>
                <hr className="mb-5"/>
                Template
            </div>
        )
    }
}

const Template = {
    name: "Template",
    color: "bg-white",
    body: <Temp/>
}
export default Template;