import React from "react";
import { Modal } from "../misc";

export class HomeProjectCard extends React.Component {
  state = {
    show: false,
  };
  showModal = () => {
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
          className={`border-2 border-r-0 border-t-0 hover:border-4 hover:border-r-0 hover:border-t-0 border-neutral-400 hover:border-gray-800 hover:translate-x-2 hover:transition-y-2 font-extralight h-24 lg:h-32 flex items-center text-3xl text-left cursor-pointer ${this.props.text} transition-colors transition-transform duration-300 p-10`}
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
