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
      <div>
        <div
          onClick={(e) => {
            if (!this.state.show) {
              this.showModal(e);
            }
          }}
          className={`cursor-pointer ${this.props.color} p-10 w-[40vw] max-w-[750px] min-w-fit h-56 flex items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300 hover:cursor`}
        >
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-semibold">{this.props.name}</span>
            {this.props.skills.length > 0 && (
              <p className="font-light">
                <span className="font-medium">Skills: </span>
                {makeSkillsString(this.props.skills)}
              </p>
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
