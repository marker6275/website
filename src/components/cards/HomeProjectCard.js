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
          className={`bg-[#bbc0de] h-32 rounded-md flex items-center text-3xl font-medium text-left hover:cursor-pointer  ${this.props.text} duration-300 p-5 shadow-md hover:shadow-xl`}
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
