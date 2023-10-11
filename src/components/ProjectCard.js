import React from 'react';
import Modal from './Modal';

class ProjectCard extends React.Component {
    state = {
        show: false
    };
    showModal = e => {
        this.setState({
            show: !this.state.show
        });
    };
    render() {
        return (
            <div>
                <div onClick={e => {if (!this.state.show) {setTimeout(() => {this.showModal(e)}, 100)}}} className="cursor-pointer bg-red-200 p-10 md:w-[400px] lg:w-[750px] h-96 flex items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300">
                    <h1>
                        Project
                    </h1>
                </div>
                <Modal show={this.state.show} onClose={this.showModal}>{this.props.children}</Modal>
            </div>
            
        )
    }
}

export default ProjectCard;