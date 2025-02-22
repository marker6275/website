import React from "react";
import { Modal } from "../misc";

function makeSkillsString(skills) {
  return skills.join(", ");
}

export class ProjectCard extends React.Component {
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
      <div className="relative">
        <div
          onClick={(e) => {
            if (!this.state.show) {
              this.showModal(e);
            }
          }}
          className={`cursor-pointer ${this.props.color} p-10 w-[40vw] max-w-[750px] min-w-fit h-56 flex items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300 hover:cursor`}
        >
          <div className="flex flex-col gap-1">
            <span className="text-4xl font-medium">{this.props.name}</span>
            {this.props.description && (
              <p className="font-light">
                <span className="font-medium">Description: </span> {this.props.description}
              </p>
            )}
            {this.props.skills.length > 0 && (
              <p className="font-light">
                <span className="font-medium">Skills: </span>
                {makeSkillsString(this.props.skills)}
              </p>
            )}
          </div>
          <div className="absolute right-10">
            {this.props.image && (
              <img
                src={this.props.image}
                alt={this.props.image}
                className="h-32 w-32 rounded-full object-contain"
              />
            )}
          </div>
        </div>
        <Modal show={this.state.show} onClose={this.showModal}>
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
