import React from "react";
import clipboard from "../../assets/icons/clipboard.png";

export class Toast extends React.Component {
  render() {
    const { isFadingOut } = this.props;
    return (
      <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#fbf7f2] shadow-lg py-3 px-3 gap-3 rounded-md transition-all duration-300 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100 animate-fade-in'} flex justify-center items-center h-10 md:h-12`}>
        <img src={clipboard} alt="clipboard" className="w-6 h-6" />
        <p className="text-center text-sm md:text-base">{this.props.message}</p>
      </div>
    );
  }
}