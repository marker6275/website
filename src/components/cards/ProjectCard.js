import React from 'react';
import { Modal } from '../misc';

export class ProjectCard extends React.Component {
    state = {
        show: false
    };
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };

    render() {
        if (!this.state.show) {
            window.onscroll = function () { };
        }

        return (
            <div>
                <div
                    onClick={e => { if (!this.state.show) { setTimeout(() => { this.showModal(e) }, 100) } }}
                    className={`cursor-pointer ${this.props.color} p-10 w-[40vw] max-w-[750px] min-w-fit h-56 flex items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300 hover:cursor text-4xl font-semibold`}>
                    {this.props.name}
                </div>
                <Modal show={this.state.show} onClose={this.showModal}>{this.props.children}</Modal>
            </div>

        )
    }
}