import React from "react";
import { Modal } from "../misc";

export class HomeProjectCard extends React.Component {
  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    if (!this.state.show) {
      window.onscroll = function () {};
    }

    return (
      <div>
        <div
          onClick={(e) => {
            if (!this.state.show) {
              setTimeout(() => {
                this.showModal(e);
              }, 100);
            }
          }}
          className={`bg-[#bbb] hover:bg-neutral-300 font-extralight h-32 rounded-md flex items-center text-3xl text-left hover:cursor-pointer ${this.props.text} duration-300 p-5 shadow-md`}
        >
          {this.props.name}
        </div>
        <Modal show={this.state.show} onClose={this.showModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
