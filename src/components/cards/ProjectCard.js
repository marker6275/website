import React from "react";
import { Modal } from "../misc";

function makeSkillsString(skills) {
  return skills.join(", ");
}

export class ProjectCard extends React.Component {
  state = {
    show: false,
  };
  showModal = (_) => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    if (!this.state.show) {
      window.onscroll = function () {};
    }

    return (
      <div className="relative w-full">
        <div
          onClick={(e) => {
            if (!this.state.show) {
              this.showModal(e);
            }
          }}
          className={`cursor-pointer ${this.props.color} p-8 xl:w-[38vw] lg:w-[30vw] md:[52vw] h-52 flex items-center rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 hover:cursor`}
        >
          <div className="flex flex-col gap-1 w-3/4">
            <span className="text-3xl xl:text-4xl">{this.props.name}</span>
            {this.props.description && (
              <p className="text-sm xl:text-base">
                Description:
                <span className="text-sm xl:text-base font-light">
                  {" "}
                  {this.props.description}
                </span>
              </p>
            )}
            {this.props.skills.length > 0 && (
              <p className="text-sm xl:text-base">
                Skills:
                <span className="text-sm xl:text-base font-light">
                  {" "}
                  {makeSkillsString(this.props.skills)}
                </span>
              </p>
            )}
          </div>
          <div className="absolute right-5 top-5 xl:top-auto xl:right-10">
            {this.props.image && (
              <img
                src={this.props.image}
                alt={this.props.image}
                className="h-16 w-16 xl:h-32 xl:w-32 rounded-full object-contain"
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
