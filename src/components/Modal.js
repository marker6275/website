import React from "react";

export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="bg-[#cfcfcf] bg-opacity-80 fixed top-0 left-0 h-screen w-screen">
                <div className="flex flex-col  items-center fixed top-[50vh] left-[50vw] -translate-x-[50%] -translate-y-[50%] w-[80vw] h-[90vh] bg-white border-2 border-gray-600 rounded-xl transition-transform transition-opacity transition-shadow-transform transform scale-100 opacity-100 visible shadow-md">
                    <p className="bg-blue-300 w-full">words</p>
                    <div>{this.props.title}</div>
                    <button className="bg-blue-400 p-2" onClick={e => {this.onClose(e)}}>Close</button>
                </div>
            </div>
        )
    }
}