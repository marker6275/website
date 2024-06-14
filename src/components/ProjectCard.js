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
        if (!this.state.show) {
            window.onscroll = function() {};
        }
        
        return (
            <div>
                <div onClick={e => {if (!this.state.show) {setTimeout(() => {this.showModal(e)}, 100)}}} className={`cursor-pointer ${this.props.color} p-10 lg:w-[500px] h-48 flex justify-center items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300`}>
                    <h1 className="text-4xl font-semibold">
                        {this.props.name}
                    </h1>
                </div>
                <Modal show={this.state.show} onClose={this.showModal}>{this.props.children}</Modal>
            </div>
            
        )
    }
}

export default ProjectCard;