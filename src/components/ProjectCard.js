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
                <div onClick={e => {if (!this.state.show) {this.showModal(e)}}} className="cursor-pointer bg-red-200 p-10 md:w-[400px] lg:w-[750px] h-96 flex items-center gap-10 rounded-xl shadow-md hover:shadow-xl duration-300">
                    <img src={this.props.image} alt="" className="lg:h-[200px] md:h-[100px] w-auto"/>
                    <div className="ml-12 flex flex-col gap-5 self-start">
                        <h1 className="font-semibold text-4xl">{this.props.title}</h1>
                        <p className="text-lg">{this.props.intro}</p>
                    </div>
                </div>
                <Modal show={this.state.show} title={this.props.title} onClose={this.showModal}/>
            </div>
            
        )
    }
}

export default ProjectCard;