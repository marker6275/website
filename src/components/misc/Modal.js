import React from "react";

export class Modal extends React.Component {
  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    if (this.props.show) {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    return (
      <div className="bg-[#cfcfcf] bg-opacity-80 fixed top-0 left-0 h-full w-full flex flex-col items-center justify-center z-50">
        <div className="flex flex-col overflow-y-auto overflow-x-hidden relative w-[65vw] h-[90vh] bg-white border-2 border-gray-600 rounded-t-xl shadow-md">
          <div className="w-full h-full text-lg text-left px-10">
            {this.props.children}
          </div>
        </div>
        <button
          className="bg-[#282828] py-2 px-8 w-[65vw] text-white rounded-b-xl hover:bg-[#343434] duration-300"
          onClick={(e) => {
            this.onClose(e);
          }}
        >
          Close
        </button>
      </div>
    );
  }
}
